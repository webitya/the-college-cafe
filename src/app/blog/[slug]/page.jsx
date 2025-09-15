import { notFound } from "next/navigation"
import BlogPost from "../../../components/BlogPost"
import Header from "../../components/shared/Header"
import Footer from "../../components/shared/Footer"

async function getBlogPost(slug) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blogs/${slug}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export async function generateMetadata({ params }) {
  const blog = await getBlogPost(params.slug)

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  const title = blog.metaTitle || blog.title
  const description = blog.metaDescription || blog.excerpt || `Read ${blog.title} on our career blog.`
  const keywords = blog.metaKeywords || (blog.tags ? blog.tags.join(", ") : "")

  return {
    title: `${title} | College Job Portal Blog`,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${blog.slug}`,
      images: blog.featuredImage
        ? [
            {
              url: blog.featuredImage.includes("drive.google.com")
                ? `https://drive.google.com/uc?export=view&id=${blog.featuredImage.match(/\/file\/d\/([a-zA-Z0-9-_]+)/)?.[1]}`
                : blog.featuredImage,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ]
        : [],
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: ["College Job Portal"],
      section: blog.category,
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    other: {
      "article:published_time": blog.createdAt,
      "article:modified_time": blog.updatedAt,
      "article:author": "College Job Portal",
      "article:section": blog.category,
      "article:tag": blog.tags?.join(","),
    },
  }
}

export default async function BlogPostPage({ params }) {
  const blog = await getBlogPost(params.slug)

  if (!blog) {
    notFound()
  }

  return <>
  <Header/>
  <BlogPost blog={blog} />
  <Footer/>
  </>
}
