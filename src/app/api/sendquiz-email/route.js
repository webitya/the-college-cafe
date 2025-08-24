import { NextResponse } from "next/server"
import { sendQuizEmails } from "../../../lib/emailService.js"
import { generateCertificate, generateResultsPDF } from "../../../lib/pdfGenerator.js"
import { getQuizByWeek } from "../../../data/quizdata/index.js"

export async function POST(request) {
  try {
    const { userDetails, quizResults, weekId } = await request.json()

    // Validate required fields
    if (!userDetails?.name || !userDetails?.email || !quizResults) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userDetails.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Get full quiz data for detailed results
    const quizData = getQuizByWeek(weekId)
    if (!quizData) {
      return NextResponse.json({ error: "Quiz data not found" }, { status: 404 })
    }

    // Generate PDFs
    const certificatePDF = generateCertificate(userDetails, quizResults)
    const resultsPDF = generateResultsPDF(userDetails, quizResults, quizData)

    // Send emails
    const emailResult = await sendQuizEmails(userDetails, quizResults, certificatePDF, resultsPDF)

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
      userEmailId: emailResult.userEmailId,
      adminEmailId: emailResult.adminEmailId,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        error: "Failed to send emails",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
