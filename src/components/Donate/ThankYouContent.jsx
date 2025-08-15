"use client"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Home, Receipt, Share } from "@mui/icons-material"

export default function ThankYouContent() {
  const searchParams = useSearchParams()
  const paymentId = searchParams.get("payment_id")
  const amount = searchParams.get("amount")
  const name = searchParams.get("name")

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle className="text-green-500 mx-auto" style={{ fontSize: "120px" }} />
        </div>

        {/* Thank You Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You{name ? `, ${name}` : ""}!</h1>

        <p className="text-xl text-gray-600 mb-8">
          Your generous donation has been successfully processed. We are incredibly grateful for your support!
        </p>

        {/* Donation Details */}
        {(amount || paymentId) && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center">
              <Receipt className="mr-2 text-yellow-500" />
              Donation Details
            </h2>
            <div className="space-y-3 text-left">
              {amount && (
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-green-600">₹{amount}</span>
                </div>
              )}
              {paymentId && (
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-mono text-sm text-gray-800">{paymentId}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-800">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Impact Message */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Your Impact</h3>
          <p className="text-gray-700">
            Your contribution will help us provide quality educational resources, career guidance, and support to
            students across India. You're making a real difference in their educational journey!
          </p>
        </div>

        {/* Email Confirmation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-800">
            📧 A confirmation email with your donation receipt has been sent to your email address.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
          >
            <Home className="mr-2" />
            Back to Home
          </Link>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "I just donated to THE COLLEGE CAFE",
                  text: "Join me in supporting quality education for students across India!",
                  url: window.location.origin,
                })
              } else {
                // Fallback for browsers that don't support Web Share API
                navigator.clipboard.writeText(
                  `I just donated to THE COLLEGE CAFE! Join me in supporting quality education: ${window.location.origin}`,
                )
                alert("Link copied to clipboard!")
              }
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
          >
            <Share className="mr-2" />
            Share Your Support
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-sm text-gray-500">
          <p>For any questions about your donation, please contact us at support@thecollegecafe.in</p>
        </div>
      </div>
    </div>
  )
}
