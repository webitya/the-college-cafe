import { NextResponse } from "next/server"
import { connectToDatabase } from "../../../../lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    // Get jobs count from MongoDB
    const jobsCollection = db.collection("jobs")
    const totalJobs = await jobsCollection.countDocuments()

    // Get government jobs count from MongoDB
    const govJobsCollection = db.collection("government_jobs")
    const totalGovJobs = await govJobsCollection.countDocuments()

    // Get applications count
    const applications = db.collection("applications")
    const totalApplications = await applications.countDocuments()

    // Get recent applications (last 7 days)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const recentApplications = await applications.countDocuments({
      appliedAt: { $gte: weekAgo },
    })

    const stats = {
      totalJobs,
      totalGovJobs,
      totalApplications,
      recentApplications,
    }

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error("Stats fetch error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch stats",
      },
      { status: 500 },
    )
  }
}
