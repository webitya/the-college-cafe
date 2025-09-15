import { connectToDatabase } from "../../../../lib/mongodb"
import { NextResponse } from "next/server"

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim("-")
}

export async function GET(request) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)

    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const skip = (page - 1) * limit

    const blogs = await db.collection("blogs").find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()

    const total = await db.collection("blogs").countDocuments()

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { db } = await connectToDatabase()
    const blogData = await request.json()

    // Generate slug from title
    const slug = generateSlug(blogData.title)

    // Check if slug already exists
    const existingBlog = await db.collection("blogs").findOne({ slug })
    if (existingBlog) {
      return NextResponse.json({ error: "Blog with this title already exists" }, { status: 400 })
    }

    const newBlog = {
      ...blogData,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      published: blogData.published || false,
    }

    const result = await db.collection("blogs").insertOne(newBlog)

    return NextResponse.json({
      message: "Blog created successfully",
      blogId: result.insertedId,
      slug,
    })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}
