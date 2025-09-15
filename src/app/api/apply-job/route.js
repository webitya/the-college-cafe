import { NextResponse } from "next/server"
import { sendApplicationEmail } from "../../../lib/email"
import clientPromise from ".././../../lib/mongodb"

export async function POST(request) {
  try {
    const formData = await request.formData()

    const applicantData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      age: formData.get("age"),
      qualification: formData.get("qualification"),
      jobId: formData.get("jobId"),
      jobTitle: formData.get("jobTitle"),
      company: formData.get("company"),
    }

    const resume = formData.get("resume")

    // Store application in MongoDB
    const client = await clientPromise
    const db = client.db("jobportal")
    const applications = db.collection("applications")

    const applicationRecord = {
      ...applicantData,
      resumeFileName: resume ? resume.name : null,
      appliedAt: new Date(),
      status: "pending",
    }

    await applications.insertOne(applicationRecord)

    // Send emails
    const jobData = {
      title: applicantData.jobTitle,
      company: applicantData.company,
    }

    const emailResult = await sendApplicationEmail(applicantData, jobData)

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: "Application submitted successfully!",
      })
    } else {
      return NextResponse.json({
        success: false,
        message: "Application saved but email failed to send",
      })
    }
  } catch (error) {
    console.error("Application submission error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application",
      },
      { status: 500 },
    )
  }
}
