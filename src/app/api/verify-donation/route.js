import crypto from "crypto"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donorInfo } = await request.json()

    const donorEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank You for Your Donation!</h2>
          </div>
          <div class="content">
            <p>Dear ${donorInfo.name},</p>
            <p>Thank you for your generous donation of ₹${donorInfo.amount}!</p>
            <p>Your support helps us continue our mission.</p>
            <p>Best regards,<br/>The College Cafe Team</p>
          </div>
        </div>
      </body>
      </html>
    `

    console.log("[v0] Starting payment verification for:", razorpay_payment_id)
    console.log("[v0] Donor info:", { name: donorInfo.name, email: donorInfo.email, amount: donorInfo.amount })

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return Response.json({ success: false, error: "Invalid payment signature" }, { status: 400 })
    }

    console.log("[v0] Creating email transporter with:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? "***configured***" : "missing",
      pass: process.env.SMTP_PASS ? "***configured***" : "missing",
    })

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    console.log("[v0] Sending thank you email to:", donorInfo.email)
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: donorInfo.email,
      subject: "Thank You for Your Donation - THE COLLEGE CAFE",
      html: donorEmailHtml,
    })
    console.log("[v0] Thank you email sent successfully")

    // Send notification to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .donor-info { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎉 New Donation Received!</h2>
          </div>
          <div class="content">
            <div class="donor-info">
              <h3>Donor Information:</h3>
              <p><strong>Name:</strong> ${donorInfo.name}</p>
              <p><strong>Email:</strong> ${donorInfo.email}</p>
              <p><strong>Phone:</strong> ${donorInfo.phone || "Not provided"}</p>
              <p><strong>Amount:</strong> ₹${donorInfo.amount}</p>
              <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
              <p><strong>Order ID:</strong> ${razorpay_order_id}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              ${donorInfo.message ? `<p><strong>Message:</strong> "${donorInfo.message}"</p>` : ""}
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    console.log("[v0] Sending admin notification to:", process.env.ADMIN_EMAIL)
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Donation: ₹${donorInfo.amount} from ${donorInfo.name}`,
      html: adminEmailHtml,
    })
    console.log("[v0] Admin notification sent successfully")

    return Response.json({ success: true, message: "Payment verified and emails sent" })
  } catch (error) {
    console.error("[v0] Payment verification error:", error)
    console.error("[v0] Error details:", error.message)
    return Response.json({ success: false, error: "Failed to verify payment" }, { status: 500 })
  }
}
