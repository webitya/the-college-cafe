"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import VisibilityIcon from "@mui/icons-material/Visibility"
import CategoryIcon from "@mui/icons-material/Category"
import ShareIcon from "@mui/icons-material/Share"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import TagIcon from "@mui/icons-material/Tag"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { convertGoogleDriveUrl } from "../lib/google-drive-utils"

export default function BlogPost({ blog }) {
  const router = useRouter()
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    fetchRelatedBlogs()
  }, [blog._id])

  const fetchRelatedBlogs = async () => {
    try {
      const response = await fetch(`/api/blogs?category=${blog.category}&limit=3`)
      const data = await response.json()

      // Filter out current blog and limit to 3
      const related = data.blogs?.filter((b) => b._id !== blog._id).slice(0, 3) || []
      setRelatedBlogs(related)
    } catch (error) {
      console.error("Failed to fetch related blogs:", error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const extractImageUrl = (driveUrl) => {
    return convertGoogleDriveUrl(driveUrl) || driveUrl
  }

  const renderContent = (content) => {
    if (!content) return null

    // Convert markdown-like formatting to HTML
    let html = content
      // Headers
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4 text-balance">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3 text-balance">$1</h3>')

      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

      // Links
      .replace(
        /\[([^\]]+)\]$$([^)]+)$$/g,
        '<a href="$2" class="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">$1</a>',
      )

      // Images - Updated to use centralized Google Drive utility
      .replace(/!\[([^\]]*)\]$$([^)]+)$$/g, (match, alt, src) => {
        const imageUrl = convertGoogleDriveUrl(src) || src
        return `<div class="my-8"><img src="${imageUrl}" alt="${alt}" class="w-full rounded-lg shadow-sm" /></div>`
      })

      // Lists
      .replace(/^- (.*$)/gm, '<li class="mb-2">$1</li>')

      // Paragraphs
      .split("\n\n")
      .map((paragraph) => {
        if (
          paragraph.includes("<h2") ||
          paragraph.includes("<h3") ||
          paragraph.includes("<li") ||
          paragraph.includes("<div")
        ) {
          return paragraph
        }
        if (paragraph.trim()) {
          return `<p class="mb-4 text-gray-700 leading-relaxed text-pretty">${paragraph.trim()}</p>`
        }
        return ""
      })
      .join("")

    // Wrap lists in ul tags
    html = html.replace(/(<li.*?<\/li>)/gs, (match) => {
      if (!match.includes("<ul>")) {
        return `<ul class="list-disc list-inside mb-4 space-y-2 text-gray-700">${match}</ul>`
      }
      return match
    })

    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = blog.title

  const handleShare = (platform) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    }

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400")
    }
    setShowShareMenu(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
    setShowShareMenu(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowBackIcon />
            <span>Back to Blog</span>
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-1">
              <CalendarTodayIcon fontSize="small" />
              <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
            </div>

            {blog.category && (
              <div className="flex items-center gap-1">
                <CategoryIcon fontSize="small" />
                <span className="text-blue-600 font-medium">{blog.category}</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <VisibilityIcon fontSize="small" />
              <span>{blog.views || 0} views</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ShareIcon fontSize="small" />
                <span>Share</span>
              </button>

              {showShareMenu && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border p-2 z-10 min-w-[200px]">
                  <button
                    onClick={() => handleShare("facebook")}
                    className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded"
                  >
                    <FacebookIcon className="text-blue-600" fontSize="small" />
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded"
                  >
                    <TwitterIcon className="text-blue-400" fontSize="small" />
                    <span>Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded"
                  >
                    <LinkedInIcon className="text-blue-700" fontSize="small" />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded"
                  >
                    <ContentCopyIcon className="text-gray-600" fontSize="small" />
                    <span>{copySuccess ? "Copied!" : "Copy Link"}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">{blog.title}</h1>

          {blog.excerpt && <p className="text-xl text-gray-600 leading-relaxed text-pretty">{blog.excerpt}</p>}
        </header>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="mb-8">
            <div className="aspect-video relative overflow-hidden rounded-lg shadow-sm">
              <img
                src={
                  extractImageUrl(blog.featuredImage) ||
                  "/placeholder.svg?height=400&width=800&query=blog featured image" ||
                  "/placeholder.svg" ||
                  "/placeholder.svg"
                }
                alt={blog.title}
                width={800}
                height={400}
                className="w-full h-full object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="prose prose-lg max-w-none">{renderContent(blog.content)}</div>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <TagIcon className="text-gray-500" />
              <h3 className="font-semibold text-gray-900">Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link key={relatedBlog._id} href={`/blog/${relatedBlog.slug}`} className="group">
                  <article className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    {relatedBlog.featuredImage && (
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={
                            extractImageUrl(relatedBlog.featuredImage) ||
                            "/placeholder.svg?height=160&width=280&query=related blog" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg"
                          }
                          alt={relatedBlog.title}
                          width={280}
                          height={160}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 280px"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-balance">
                        {relatedBlog.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2 text-pretty">{relatedBlog.excerpt}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
