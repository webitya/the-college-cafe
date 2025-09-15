import { connectToDatabase } from "../../../../../lib/mongodb"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"

export async function GET(request, { params }) {
  try {
    const { db } = await connectToDatabase()
    const { id } = params

    const blog = await db.collection("blogs").findOne({
      _id: new ObjectId(id),
    })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error fetching blog:", error)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { db } = await connectToDatabase()
    const { id } = params
    const updateData = await request.json()

    // Generate new slug if title changed
    if (updateData.title) {
      const slug = updateData.title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim("-")
      updateData.slug = slug
    }

    updateData.updatedAt = new Date()

    const result = await db.collection("blogs").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog updated successfully" })
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { db } = await connectToDatabase()
    const { id } = params

    const result = await db.collection("blogs").deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
