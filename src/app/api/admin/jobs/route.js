import { NextResponse } from "next/server"
import { connectToDatabase } from "../../../../lib/mongodb"
import { ObjectId } from "mongodb"

// Middleware to check admin authentication
function checkAuth(request) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false
  }
  // In production, verify JWT token here
  return true
}

export async function GET(request) {
  try {
    const { db } = await connectToDatabase()
    const jobsCollection = db.collection("jobs")
    const jobs = await jobsCollection.find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      success: true,
      jobs,
    })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch jobs",
      },
      { status: 500 },
    )
  }
}

export async function POST(request) {
  try {
    const jobData = await request.json()

    const { db } = await connectToDatabase()
    const jobs = db.collection("jobs")

    const newJob = {
      ...jobData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await jobs.insertOne(newJob)
    newJob._id = result.insertedId

    return NextResponse.json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create job",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get("id")
    const jobData = await request.json()

    if (!jobId) {
      return NextResponse.json({ success: false, message: "Job ID is required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const jobs = db.collection("jobs")

    const updatedJob = {
      ...jobData,
      updatedAt: new Date(),
    }

    await jobs.updateOne({ _id: new ObjectId(jobId) }, { $set: updatedJob })

    return NextResponse.json({
      success: true,
      message: "Job updated successfully",
    })
  } catch (error) {
    console.error("Error updating job:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update job",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get("id")

    if (!jobId) {
      return NextResponse.json({ success: false, message: "Job ID is required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const jobs = db.collection("jobs")

    await jobs.deleteOne({ _id: new ObjectId(jobId) })

    return NextResponse.json({
      success: true,
      message: "Job deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting job:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete job",
      },
      { status: 500 },
    )
  }
}
