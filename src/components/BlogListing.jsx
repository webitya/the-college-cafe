"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import SearchIcon from "@mui/icons-material/Search"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import VisibilityIcon from "@mui/icons-material/Visibility"
import CategoryIcon from "@mui/icons-material/Category"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { convertGoogleDriveUrl } from "../lib/google-drive-utils"

export default function BlogListing() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    pages: 0,
  })

  useEffect(() => {
    fetchBlogs()
  }, [pagination.page, selectedCategory, searchTerm])

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })

      if (selectedCategory) params.append("category", selectedCategory)
      if (searchTerm) params.append("search", searchTerm)

      const response = await fetch(`/api/blogs?${params}`)
      const data = await response.json()

      setBlogs(data.blogs || [])
      setPagination((prev) => ({ ...prev, ...data.pagination }))

      // Extract unique categories
      const uniqueCategories = [...new Set(data.blogs?.map((blog) => blog.category).filter(Boolean))]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPagination((prev) => ({ ...prev, page: 1 }))
    fetchBlogs()
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
    window.scrollTo({ top: 0, behavior: "smooth" })
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

  if (loading && blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading blog posts...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Career Insights & Job Market Trends</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto text-pretty">
              Stay ahead in your career journey with expert insights, industry trends, and practical advice for job
              seekers and professionals.
            </p>
          </div>
        </div>
      </section> */}

      <div className="mx-auto px-4 py-4">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>

            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <SearchIcon />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory
                ? "Try adjusting your search criteria or browse all posts."
                : "Check back soon for new content!"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {blog.featuredImage && (
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={
                          extractImageUrl(blog.featuredImage) || "/placeholder.svg?height=240&width=400&query=blog post"
                        }
                        alt={blog.title}
                        width={400}
                        height={240}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 text-balance">
                      <Link href={`/blog/${blog.slug}`} className="hover:text-blue-600 transition-colors">
                        {blog.title}
                      </Link>
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3 text-pretty">{blog.excerpt}</p>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                            +{blog.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Read More
                      <ArrowForwardIcon fontSize="small" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      page === pagination.page
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
