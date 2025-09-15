import { NextResponse } from "next/server"
import clientPromise from "../../../../lib/mongodb"

export async function GET(request) {
  try {
    const client = await clientPromise
    const db = client.db("jobportal")
    const applications = db.collection("applications")

    const allApplications = await applications.find({}).sort({ appliedAt: -1 }).toArray()

    return NextResponse.json({
      success: true,
      applications: allApplications,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch applications",
      },
      { status: 500 },
    )
  }
}
