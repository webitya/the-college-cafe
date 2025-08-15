"use client"
import { useState } from "react"
import { Person, Email, Phone, CurrencyRupee } from "@mui/icons-material"

export default function DonateForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    customAmount: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState("")

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount)
    setFormData((prev) => ({
      ...prev,
      amount: amount,
      customAmount: "",
    }))
  }

  const handleCustomAmount = (e) => {
    const value = e.target.value
    setFormData((prev) => ({
      ...prev,
      customAmount: value,
      amount: value,
    }))
    setSelectedAmount("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Initialize Razorpay payment
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        // Initialize Razorpay
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: "INR",
          name: "THE COLLEGE CAFE",
          description: "Donation for Educational Support",
          order_id: data.orderId,
          handler: async (response) => {
            console.log("[v0] Payment successful, verifying and sending emails...")

            // Verify payment and send thank you email
            const verifyResponse = await fetch("/api/verify-donation", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...response,
                donorInfo: formData,
              }),
            })

            const verifyData = await verifyResponse.json()
            console.log("[v0] Verification response:", verifyData)

            if (verifyData.success) {
              const params = new URLSearchParams({
                payment_id: response.razorpay_payment_id,
                amount: formData.amount,
                name: formData.name,
              })
              window.location.href = `/donate/thank-you?${params.toString()}`
            } else {
              console.error("[v0] Payment verification failed:", verifyData.error)
              alert("Payment successful but there was an issue with confirmation. Please contact support.")
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#F59E0B",
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
      }
    } catch (error) {
      console.error("Donation error:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Make a Donation</h2>
          <p className="text-lg text-gray-600">Every contribution makes a difference in a student's life</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Person className="inline mr-2 text-yellow-500" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Email className="inline mr-2 text-yellow-500" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline mr-2 text-yellow-500" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Donation Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                <CurrencyRupee className="inline mr-2 text-yellow-500" />
                Donation Amount *
              </label>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-3 px-4 rounded-xl border-2 font-semibold transition-all duration-200 ${
                      selectedAmount === amount
                        ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                        : "border-gray-300 hover:border-yellow-300 hover:bg-yellow-50"
                    }`}
                  >
                    ₹{amount.toLocaleString()}
                  </button>
                ))}
              </div>

              <input
                type="number"
                name="customAmount"
                value={formData.customAmount}
                onChange={handleCustomAmount}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter custom amount"
                min="1"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                placeholder="Share why you're supporting us..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.name || !formData.email || !formData.amount}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold py-4 px-8 rounded-xl hover:from-yellow-500 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              {isLoading ? "Processing..." : `Donate ₹${formData.amount || "0"}`}
            </button>
          </form>
        </div>
      </div>

      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  )
}
