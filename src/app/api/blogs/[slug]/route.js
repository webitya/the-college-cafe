import { connectToDatabase } from "../../../../lib/mongodb"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  try {
    const { db } = await connectToDatabase()
    const { slug } = params

    const blog = await db.collection("blogs").findOne({
      slug: slug,
      published: true,
    })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    // Increment view count
    await db.collection("blogs").updateOne({ _id: blog._id }, { $inc: { views: 1 } })

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error fetching blog:", error)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}
