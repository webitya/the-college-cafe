import nodemailer from "nodemailer"

const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendApplicationEmail = async (applicantData, jobData) => {
  // Email to applicant
  const applicantMailOptions = {
    from: process.env.EMAIL_USER,
    to: applicantData.email,
    subject: `Application Received - ${jobData.title} at ${jobData.company}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b;">Application Received Successfully!</h2>
        <p>Dear ${applicantData.name},</p>
        <p>Thank you for applying for the position of <strong>${jobData.title}</strong> at <strong>${jobData.company}</strong>.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Application Details:</h3>
          <p><strong>Position:</strong> ${jobData.title}</p>
          <p><strong>Company:</strong> ${jobData.company}</p>
          <p><strong>Your Email:</strong> ${applicantData.email}</p>
          <p><strong>Your Phone:</strong> ${applicantData.phone}</p>
          <p><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p>We have received your application and will review it shortly. If your profile matches our requirements, we will contact you within 7-10 business days.</p>
        
        <p>Best regards,<br>
        <strong>The College Cafe Team</strong></p>
      </div>
    `,
  }

  // Email to admin
  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Job Application - ${jobData.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b;">New Job Application Received</h2>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Job Details:</h3>
          <p><strong>Position:</strong> ${jobData.title}</p>
          <p><strong>Company:</strong> ${jobData.company}</p>
          <p><strong>Salary:</strong> ${jobData.salary}</p>
        </div>
        
        <div style="background-color: #e5f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Applicant Details:</h3>
          <p><strong>Name:</strong> ${applicantData.name}</p>
          <p><strong>Email:</strong> ${applicantData.email}</p>
          <p><strong>Phone:</strong> ${applicantData.phone}</p>
          <p><strong>Age:</strong> ${applicantData.age}</p>
          <p><strong>Qualification:</strong> ${applicantData.qualification}</p>
          <p><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <p>Please review the application and contact the candidate if suitable.</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(applicantMailOptions)
    await transporter.sendMail(adminMailOptions)
    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error: error.message }
  }
}
