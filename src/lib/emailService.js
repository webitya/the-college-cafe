import nodemailer from "nodemailer"

// Create transporter using environment variables
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: "gmail", // You can change this to your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Email templates
export const generateUserEmailTemplate = (userDetails, quizResults) => {
  const { name, email } = userDetails
  const { quiz, week, score, totalQuestions, percentage } = quizResults

  return {
    subject: `Your Quiz Results - ${quiz}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #FCD34D, #F59E0B); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; }
          .results-card { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .score { font-size: 2.5em; font-weight: bold; color: #F59E0B; text-align: center; }
          .grade { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 10px 0; }
          .grade-a { background: #d4edda; color: #155724; }
          .grade-b { background: #cce5ff; color: #004085; }
          .grade-c { background: #fff3cd; color: #856404; }
          .grade-f { background: #f8d7da; color: #721c24; }
          .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
          .btn { display: inline-block; padding: 12px 24px; background: #F59E0B; color: white; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏆 THE COLLEGE CAFE</h1>
            <h2>Quiz Results</h2>
          </div>
          
          <div class="content">
            <h3>Hello ${name}!</h3>
            <p>Congratulations on completing the <strong>${quiz}</strong>! Here are your results:</p>
            
            <div class="results-card">
              <div class="score">${percentage}%</div>
              <div style="text-align: center;">
                <span class="grade ${getGradeClass(percentage)}">${getGrade(percentage)}</span>
              </div>
              
              <table style="width: 100%; margin-top: 20px;">
                <tr>
                  <td><strong>Quiz:</strong></td>
                  <td>${quiz}</td>
                </tr>
                <tr>
                  <td><strong>Week:</strong></td>
                  <td>Week ${week}</td>
                </tr>
                <tr>
                  <td><strong>Score:</strong></td>
                  <td>${score} out of ${totalQuestions}</td>
                </tr>
                <tr>
                  <td><strong>Percentage:</strong></td>
                  <td>${percentage}%</td>
                </tr>
              </table>
            </div>
            
            <p><strong>Performance Analysis:</strong></p>
            <p>${getPerformanceMessage(percentage)}</p>
            
            <p>Your certificate and detailed results are attached to this email.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://thecollegecafe.in/quiz" class="btn">Take Another Quiz</a>
            </div>
            
            <p>Keep learning and improving! We're proud of your dedication to knowledge.</p>
            
            <p>Best regards,<br>The College Cafe Team</p>
          </div>
          
          <div class="footer">
            <p>&copy; 2024 The College Cafe. All rights reserved.</p>
            <p>Visit us at <a href="https://thecollegecafe.in" style="color: #FCD34D;">thecollegecafe.in</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  }
}

export const generateAdminEmailTemplate = (userDetails, quizResults) => {
  const { name, email } = userDetails
  const { quiz, week, score, totalQuestions, percentage } = quizResults

  return {
    subject: `New Quiz Lead - ${name} completed ${quiz}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #333; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; }
          .lead-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { background: #F59E0B; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📊 New Quiz Lead</h1>
            <h2>THE COLLEGE CAFE</h2>
          </div>
          
          <div class="content">
            <h3>New Quiz Completion Alert</h3>
            <p>A user has completed a quiz and provided their contact information. Here are the details:</p>
            
            <div class="lead-info">
              <h4>User Information:</h4>
              <table style="width: 100%;">
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>${name}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td><strong>Date:</strong></td>
                  <td>${new Date().toLocaleDateString()}</td>
                </tr>
              </table>
            </div>
            
            <div class="lead-info">
              <h4>Quiz Performance:</h4>
              <table style="width: 100%;">
                <tr>
                  <td><strong>Quiz:</strong></td>
                  <td>${quiz}</td>
                </tr>
                <tr>
                  <td><strong>Week:</strong></td>
                  <td>Week ${week}</td>
                </tr>
                <tr>
                  <td><strong>Score:</strong></td>
                  <td>${score}/${totalQuestions} (${percentage}%)</td>
                </tr>
                <tr>
                  <td><strong>Grade:</strong></td>
                  <td>${getGrade(percentage)}</td>
                </tr>
              </table>
            </div>
            
            <p><strong>Follow-up Action:</strong></p>
            <p>Consider reaching out to this user for:</p>
            <ul>
              <li>Course enrollment opportunities</li>
              <li>Educational counseling services</li>
              <li>Newsletter subscription</li>
              <li>Feedback on quiz experience</li>
            </ul>
            
            <p>This lead was generated from the Weekly Quiz system on The College Cafe website.</p>
          </div>
          
          <div class="footer">
            <p>The College Cafe Admin Panel</p>
            <p>Automated Lead Notification System</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }
}

// Helper functions
const getGrade = (percentage) => {
  if (percentage >= 90) return "A+"
  if (percentage >= 80) return "A"
  if (percentage >= 70) return "B+"
  if (percentage >= 60) return "B"
  if (percentage >= 50) return "C"
  return "F"
}

const getGradeClass = (percentage) => {
  if (percentage >= 80) return "grade-a"
  if (percentage >= 60) return "grade-b"
  if (percentage >= 50) return "grade-c"
  return "grade-f"
}

const getPerformanceMessage = (percentage) => {
  if (percentage >= 90) return "Outstanding performance! You have excellent knowledge in this subject area."
  if (percentage >= 80) return "Excellent work! You demonstrate strong understanding of the material."
  if (percentage >= 70) return "Good job! You have a solid grasp of the concepts covered."
  if (percentage >= 60) return "Not bad! With a bit more study, you can achieve even better results."
  if (percentage >= 50) return "You passed! Consider reviewing the material to strengthen your knowledge."
  return "Don't be discouraged! Every learning journey has its challenges. Keep practicing!"
}

// Main email sending function
export const sendQuizEmails = async (userDetails, quizResults, certificatePDF, resultsPDF) => {
  try {
    const transporter = createTransporter()

    // Generate email templates
    const userEmail = generateUserEmailTemplate(userDetails, quizResults)
    const adminEmail = generateAdminEmailTemplate(userDetails, quizResults)

    // Send email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: userDetails.email,
      subject: userEmail.subject,
      html: userEmail.html,
      attachments: [
        {
          filename: `${userDetails.name}_Certificate_Week${quizResults.week}.pdf`,
          content: certificatePDF.output("arraybuffer"),
          contentType: "application/pdf",
        },
        {
          filename: `${userDetails.name}_Results_Week${quizResults.week}.pdf`,
          content: resultsPDF.output("arraybuffer"),
          contentType: "application/pdf",
        },
      ],
    }

    // Send email to admin (lead notification)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Admin receives at the same email
      subject: adminEmail.subject,
      html: adminEmail.html,
    }

    // Send both emails
    const [userResult, adminResult] = await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions),
    ])

    return {
      success: true,
      userEmailId: userResult.messageId,
      adminEmailId: adminResult.messageId,
    }
  } catch (error) {
    console.error("Email sending error:", error)
    throw new Error("Failed to send emails: " + error.message)
  }
}
