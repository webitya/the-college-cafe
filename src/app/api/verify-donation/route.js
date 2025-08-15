import crypto from "crypto"
import nodemailer from "nodemailer"

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donorInfo } = await request.json()

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return Response.json({ success: false, error: "Invalid payment signature" }, { status: 400 })
    }

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send thank you email to donor
    const donorEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #FCD34D, #F97316); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight { background: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🙏 Thank You for Your Generous Donation!</h1>
            <p>THE COLLEGE CAFE</p>
          </div>
          <div class="content">
            <p>Dear ${donorInfo.name},</p>
            
            <p>We are incredibly grateful for your generous donation of <strong>₹${donorInfo.amount}</strong> to THE COLLEGE CAFE. Your support means the world to us and will directly impact the lives of students across India.</p>
            
            <div class="highlight">
              <h3>Donation Details:</h3>
              <p><strong>Amount:</strong> ₹${donorInfo.amount}</p>
              <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              ${donorInfo.message ? `<p><strong>Your Message:</strong> "${donorInfo.message}"</p>` : ""}
            </div>
            
            <p>Your contribution will help us:</p>
            <ul>
              <li>Provide quality educational resources to students</li>
              <li>Offer career guidance and counseling services</li>
              <li>Support underprivileged students in their educational journey</li>
              <li>Maintain and improve our platform for better user experience</li>
            </ul>
            
            <p>We will keep you updated on how your donation is making a difference. Thank you for believing in our mission to make quality education accessible to all.</p>
            
            <p>With heartfelt gratitude,<br>
            <strong>The Team at THE COLLEGE CAFE</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated email. For any queries, please contact us at ${process.env.ADMIN_EMAIL}</p>
          </div>
        </div>
      </body>
      </html>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: donorInfo.email,
      subject: "Thank You for Your Donation - THE COLLEGE CAFE",
      html: donorEmailHtml,
    })

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

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Donation: ₹${donorInfo.amount} from ${donorInfo.name}`,
      html: adminEmailHtml,
    })

    return Response.json({ success: true, message: "Payment verified and emails sent" })
  } catch (error) {
    console.error("Payment verification error:", error)
    return Response.json({ success: false, error: "Failed to verify payment" }, { status: 500 })
  }
}
