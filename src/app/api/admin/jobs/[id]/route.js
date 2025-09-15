import { NextResponse } from "next/server"
import clientPromise from "../../../../../lib/mongodb"

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const jobData = await request.json()

    const client = await clientPromise
    const db = client.db("jobportal")
    const jobs = db.collection("jobs")

    await jobs.updateOne({ id: Number.parseInt(id) }, { $set: { ...jobData, updatedAt: new Date() } })

    return NextResponse.json({
      success: true,
      message: "Job updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update job",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params

    const client = await clientPromise
    const db = client.db("jobportal")
    const jobs = db.collection("jobs")

    await jobs.deleteOne({ id: Number.parseInt(id) })

    return NextResponse.json({
      success: true,
      message: "Job deleted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete job",
      },
      { status: 500 },
    )
  }
}
