import { NextResponse } from "next/server"
import { connectToDatabase } from "../../../../lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request) {
  try {
    const { db } = await connectToDatabase()
    const govJobsCollection = db.collection("government_jobs")
    const jobs = await govJobsCollection.find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({
      success: true,
      jobs,
    })
  } catch (error) {
    console.error("Error fetching government jobs:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch government jobs",
      },
      { status: 500 },
    )
  }
}

export async function POST(request) {
  try {
    const jobData = await request.json()

    const { db } = await connectToDatabase()
    const govJobs = db.collection("government_jobs")

    const newJob = {
      ...jobData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await govJobs.insertOne(newJob)
    newJob._id = result.insertedId

    return NextResponse.json({
      success: true,
      message: "Government job created successfully",
      job: newJob,
    })
  } catch (error) {
    console.error("Error creating government job:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create government job",
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
    const govJobs = db.collection("government_jobs")

    const updatedJob = {
      ...jobData,
      updatedAt: new Date(),
    }

    await govJobs.updateOne({ _id: new ObjectId(jobId) }, { $set: updatedJob })

    return NextResponse.json({
      success: true,
      message: "Government job updated successfully",
    })
  } catch (error) {
    console.error("Error updating government job:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update government job",
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
    const govJobs = db.collection("government_jobs")

    await govJobs.deleteOne({ _id: new ObjectId(jobId) })

    return NextResponse.json({
      success: true,
      message: "Government job deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting government job:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete government job",
      },
      { status: 500 },
    )
  }
}
