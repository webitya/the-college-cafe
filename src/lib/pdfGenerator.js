import jsPDF from "jspdf"

export const generateCertificate = (userDetails, quizResults) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  })

  // Certificate background
  doc.setFillColor(255, 248, 220) // Light yellow background
  doc.rect(0, 0, 297, 210, "F")

  // Border
  doc.setDrawColor(255, 193, 7) // Yellow border
  doc.setLineWidth(3)
  doc.rect(10, 10, 277, 190)

  // Inner border
  doc.setDrawColor(255, 193, 7)
  doc.setLineWidth(1)
  doc.rect(15, 15, 267, 180)

  // Header
  doc.setFontSize(28)
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "bold")
  doc.text("THE COLLEGE CAFE", 148.5, 40, { align: "center" })

  doc.setFontSize(18)
  doc.setFont("helvetica", "normal")
  doc.text("Certificate of Achievement", 148.5, 55, { align: "center" })

  // Decorative line
  doc.setDrawColor(255, 193, 7)
  doc.setLineWidth(2)
  doc.line(80, 65, 217, 65)

  // Main content
  doc.setFontSize(16)
  doc.setFont("helvetica", "normal")
  doc.text("This is to certify that", 148.5, 85, { align: "center" })

  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(255, 193, 7)
  doc.text(userDetails.name, 148.5, 105, { align: "center" })

  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "normal")
  doc.text("has successfully completed", 148.5, 125, { align: "center" })

  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.text(`${quizResults.quiz} - Week ${quizResults.week}`, 148.5, 140, { align: "center" })

  doc.setFontSize(14)
  doc.setFont("helvetica", "normal")
  doc.text(
    `with a score of ${quizResults.score}/${quizResults.totalQuestions} (${quizResults.percentage}%)`,
    148.5,
    155,
    { align: "center" },
  )

  // Date
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  doc.setFontSize(12)
  doc.text(`Date: ${currentDate}`, 50, 180)

  // Signature line
  doc.text("The College Cafe Team", 200, 180)
  doc.line(180, 175, 250, 175)

  return doc
}

export const generateResultsPDF = (userDetails, quizResults, quizData) => {
  const doc = new jsPDF()

  // Header
  doc.setFillColor(255, 193, 7)
  doc.rect(0, 0, 210, 30, "F")

  doc.setFontSize(20)
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "bold")
  doc.text("THE COLLEGE CAFE", 105, 20, { align: "center" })

  // Title
  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.text("Quiz Results Report", 105, 45, { align: "center" })

  // User details
  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text(`Name: ${userDetails.name}`, 20, 65)
  doc.text(`Email: ${userDetails.email}`, 20, 75)
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 85)

  // Quiz details
  doc.setFont("helvetica", "bold")
  doc.text("Quiz Details:", 20, 105)
  doc.setFont("helvetica", "normal")
  doc.text(`Quiz: ${quizResults.quiz}`, 20, 115)
  doc.text(`Week: ${quizResults.week}`, 20, 125)
  doc.text(`Total Questions: ${quizResults.totalQuestions}`, 20, 135)
  doc.text(`Correct Answers: ${quizResults.score}`, 20, 145)
  doc.text(`Score: ${quizResults.percentage}%`, 20, 155)

  // Performance analysis
  doc.setFont("helvetica", "bold")
  doc.text("Performance Analysis:", 20, 175)
  doc.setFont("helvetica", "normal")

  let grade = "F"
  let performance = "Needs improvement"
  if (quizResults.percentage >= 90) {
    grade = "A+"
    performance = "Outstanding"
  } else if (quizResults.percentage >= 80) {
    grade = "A"
    performance = "Excellent"
  } else if (quizResults.percentage >= 70) {
    grade = "B+"
    performance = "Good"
  } else if (quizResults.percentage >= 60) {
    grade = "B"
    performance = "Satisfactory"
  } else if (quizResults.percentage >= 50) {
    grade = "C"
    performance = "Average"
  }

  doc.text(`Grade: ${grade}`, 20, 185)
  doc.text(`Performance: ${performance}`, 20, 195)

  // Add detailed answers if space allows
  if (quizData && quizData.questions) {
    doc.addPage()
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Detailed Results:", 20, 20)

    let yPosition = 35
    const pageHeight = 280
    const lineHeight = 8

    quizData.questions.forEach((question, index) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage()
        yPosition = 20
      }

      const userAnswer = quizResults.answers[question.id]
      const isCorrect = userAnswer === question.correctAnswer

      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.text(`Q${index + 1}: ${question.question}`, 20, yPosition)
      yPosition += lineHeight

      doc.setFont("helvetica", "normal")
      doc.text(`Your answer: ${question.options[userAnswer] || "Not answered"}`, 20, yPosition)
      yPosition += lineHeight

      doc.text(`Correct answer: ${question.options[question.correctAnswer]}`, 20, yPosition)
      yPosition += lineHeight

      doc.setTextColor(isCorrect ? 0 : 255, 0, 0)
      doc.text(`Result: ${isCorrect ? "Correct" : "Incorrect"}`, 20, yPosition)
      doc.setTextColor(0, 0, 0)
      yPosition += lineHeight * 2
    })
  }

  return doc
}
