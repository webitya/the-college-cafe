import { NextResponse } from "next/server"
import { sendQuizEmails } from "../../../lib/emailService.js"
import { generateCertificate, generateResultsPDF } from "../../../lib/pdfGenerator.js"
import { getQuizByWeek } from "../../../data/quizdata/index.js"

export async function POST(request) {
  try {
    console.log("[v0] API: Starting email sending process...")
    const { userDetails, quizResults, weekId } = await request.json()

    // Validate required fields
    if (!userDetails?.name || !userDetails?.email || !quizResults) {
      console.error("[v0] API: Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userDetails.email)) {
      console.error("[v0] API: Invalid email format")
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Get full quiz data for detailed results
    console.log("[v0] API: Getting quiz data for week:", weekId)
    const quizData = getQuizByWeek(weekId)
    if (!quizData) {
      console.error("[v0] API: Quiz data not found for week:", weekId)
      return NextResponse.json({ error: "Quiz data not found" }, { status: 404 })
    }

    console.log("[v0] API: Generating PDFs...")
    let certificatePDF, resultsPDF

    try {
      certificatePDF = generateCertificate(userDetails, quizResults)
      console.log("[v0] API: Certificate PDF generated successfully")
    } catch (pdfError) {
      console.error("[v0] API: Certificate PDF generation failed:", pdfError)
      throw new Error("Failed to generate certificate PDF: " + pdfError.message)
    }

    try {
      resultsPDF = generateResultsPDF(userDetails, quizResults, quizData)
      console.log("[v0] API: Results PDF generated successfully")
    } catch (pdfError) {
      console.error("[v0] API: Results PDF generation failed:", pdfError)
      throw new Error("Failed to generate results PDF: " + pdfError.message)
    }

    if (!certificatePDF || !resultsPDF) {
      throw new Error("PDF generation returned null or undefined")
    }

    console.log("[v0] API: Both PDFs generated, sending emails...")

    // Send emails
    const emailResult = await sendQuizEmails(userDetails, quizResults, certificatePDF, resultsPDF)

    console.log("[v0] API: Emails sent successfully")
    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
      userEmailId: emailResult.userEmailId,
      adminEmailId: emailResult.adminEmailId,
    })
  } catch (error) {
    console.error("[v0] API Error:", error)
    console.error("[v0] API Error Stack:", error.stack)
    return NextResponse.json(
      {
        error: "Failed to send emails",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
