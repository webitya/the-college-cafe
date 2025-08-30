import jsPDF from "jspdf"

export const generateCertificate = (userDetails, quizResults) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  })

  doc.setFillColor(255, 255, 255) // Pure white background
  doc.rect(0, 0, 297, 210, "F")

  // Elegant outer border
  doc.setDrawColor(255, 193, 7) // Golden yellow border
  doc.setLineWidth(4)
  doc.rect(8, 8, 281, 194)

  // Inner decorative borderF
  doc.setDrawColor(0, 123, 191) // Light blue accent
  doc.setLineWidth(1)
  doc.rect(18, 18, 261, 174)

  doc.setFontSize(32)
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "bold")
  doc.text("THE COLLEGE CAFE", 148.5, 35, { align: "center" })

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(100, 100, 100)
  doc.text("Educational Excellence & Professional Development", 148.5, 45, { align: "center" })

  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(255, 193, 7)
  doc.text("CERTIFICATE OF ACHIEVEMENT", 148.5, 65, { align: "center" })

  // Decorative flourish lines
  doc.setDrawColor(255, 193, 7)
  doc.setLineWidth(2)
  doc.line(60, 72, 120, 72)
  doc.line(177, 72, 237, 72)

  // Small decorative circles
  doc.circle(125, 72, 2, "F")
  doc.circle(172, 72, 2, "F")

  doc.setFontSize(14)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(0, 0, 0)
  doc.text("This is to certify that", 148.5, 90, { align: "center" })

  doc.setFontSize(28)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(0, 123, 191)
  doc.text(userDetails.name.toUpperCase(), 148.5, 108, { align: "center" })

  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "normal")
  doc.text("has successfully demonstrated exceptional knowledge and skill by completing", 148.5, 125, {
    align: "center",
  })

  doc.setFontSize(18)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(255, 193, 7)
  doc.text(`Weekly Knowledge Assessment - Week ${quizResults.week}`, 148.5, 140, { align: "center" })

  doc.setFontSize(14)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(0, 0, 0)
  doc.text(
    `achieving an outstanding score of ${quizResults.score} out of ${quizResults.totalQuestions} questions (${quizResults.percentage}%)`,
    148.5,
    155,
    { align: "center" },
  )

  let achievementLevel = ""
  if (quizResults.percentage >= 90) {
    achievementLevel = "with DISTINCTION"
  } else if (quizResults.percentage >= 80) {
    achievementLevel = "with EXCELLENCE"
  } else if (quizResults.percentage >= 70) {
    achievementLevel = "with MERIT"
  } else if (quizResults.percentage >= 60) {
    achievementLevel = "with PROFICIENCY"
  }

  if (achievementLevel) {
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(255, 193, 7)
    doc.text(achievementLevel, 148.5, 167, { align: "center" })
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(0, 0, 0)
  doc.text(`Issued on: ${currentDate}`, 40, 185)
  doc.text("Ranchi, Jharkhand, India", 40, 195)

  doc.setFontSize(20)
  doc.setFont("times", "italic") // More signature-like font
  doc.setTextColor(0, 0, 0)
  doc.text("THE COLLEGE CAFE", 220, 180, { align: "center" })

  // Signature line
  doc.setLineWidth(1)
  doc.setDrawColor(0, 0, 0)
  doc.line(190, 185, 250, 185)

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("", 220, 192, { align: "center" })

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
