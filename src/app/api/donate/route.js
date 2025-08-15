import Razorpay from "razorpay"

let razorpay = null

// Only initialize Razorpay if environment variables are available
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
}

export async function POST(request) {
  try {
    if (!razorpay) {
      return Response.json(
        {
          success: false,
          error: "Payment gateway not configured. Please contact administrator.",
        },
        { status: 500 },
      )
    }

    const { name, email, phone, amount, message } = await request.json()

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Number.parseInt(amount) * 100, // Convert to paise
      currency: "INR",
      receipt: `donation_${Date.now()}`,
      notes: {
        donor_name: name,
        donor_email: email,
        donor_phone: phone,
        message: message || "",
      },
    })

    return Response.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error("Donation creation error:", error)
    return Response.json({ success: false, error: "Failed to create donation order" }, { status: 500 })
  }
}
