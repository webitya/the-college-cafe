import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const { type, data } = await request.json()

    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: "gmail", // You can change this to your preferred email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    let mailOptions = {}

    switch (type) {
      case "contact":
        mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `Contact Form Submission from ${data.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              <div style="background-color: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
                <p><strong>Subject:</strong> ${data.subject}</p>
                <p><strong>Message:</strong></p>
                <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
                  ${data.message}
                </div>
              </div>
              <p style="color: #6b7280; font-size: 14px;">
                This email was sent from THE COLLEGE CAFE contact form.
              </p>
            </div>
          `,
        }
        break

      case "newsletter":
        mailOptions = {
          from: process.env.EMAIL_USER,
          to: data.email,
          subject: "Welcome to THE COLLEGE CAFE Newsletter!",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #f59e0b; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">THE COLLEGE CAFE</h1>
                <p style="margin: 10px 0 0 0;">Welcome to our newsletter!</p>
              </div>
              <div style="padding: 30px 20px;">
                <h2 style="color: #1f2937;">Thank you for subscribing!</h2>
                <p>Dear ${data.name || "Subscriber"},</p>
                <p>Welcome to THE COLLEGE CAFE newsletter! You'll now receive:</p>
                <ul style="color: #4b5563;">
                  <li>Latest college admission updates</li>
                  <li>JEE and NEET preparation tips</li>
                  <li>Career guidance and job opportunities</li>
                  <li>Educational news and insights</li>
                </ul>
                <div style="background-color: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; color: #92400e;">
                    <strong>Stay tuned for our weekly updates!</strong>
                  </p>
                </div>
              </div>
              <div style="background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
                <p>© 2024 THE COLLEGE CAFE. All rights reserved.</p>
              </div>
            </div>
          `,
        }
        break

      case "job-application":
        mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.HR_EMAIL || process.env.EMAIL_USER,
          subject: `Job Application for ${data.position} - ${data.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
                New Job Application
              </h2>
              <div style="background-color: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Position:</strong> ${data.position}</p>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Experience:</strong> ${data.experience} years</p>
                <p><strong>Cover Letter:</strong></p>
                <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
                  ${data.coverLetter}
                </div>
              </div>
            </div>
          `,
        }
        break

      default:
        return Response.json({ error: "Invalid email type" }, { status: 400 })
    }

    await transporter.sendMail(mailOptions)

    return Response.json({
      success: true,
      message: "Email sent successfully",
    })
  } catch (error) {
    console.error("Email sending error:", error)
    return Response.json(
      {
        error: "Failed to send email",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
