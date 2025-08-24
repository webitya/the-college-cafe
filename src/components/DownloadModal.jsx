"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { X, Download, Mail, User, AtSign, CheckCircle } from "lucide-react"
import { generateCertificate, generateResultsPDF } from "../lib/pdfGenerator.js"

export default function DownloadModal({ isOpen, onClose, quizResults, quizData }) {
  const params = useParams()
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [emailSent, setEmailSent] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!userDetails.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!userDetails.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleDownloadCertificate = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const certificatePDF = generateCertificate(userDetails, quizResults)
      certificatePDF.save(`${userDetails.name}_Certificate_Week${quizResults.week}.pdf`)

      // Send email notification
      await sendEmailNotification("certificate")
    } catch (error) {
      console.error("Error generating certificate:", error)
      alert("Error generating certificate. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadResults = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const resultsPDF = generateResultsPDF(userDetails, quizResults, quizData)
      resultsPDF.save(`${userDetails.name}_Results_Week${quizResults.week}.pdf`)

      // Send email notification
      await sendEmailNotification("results")
    } catch (error) {
      console.error("Error generating results:", error)
      alert("Error generating results. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const sendEmailNotification = async (type) => {
    try {
      const response = await fetch("/api/sendquiz-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userDetails,
          quizResults,
          weekId: params.week,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setEmailSent(true)
        console.log(`${type} email sent successfully:`, result)
      } else {
        console.error("Email sending failed:", result)
        alert(`Warning: ${type} downloaded but email sending failed. Please contact support.`)
      }
    } catch (error) {
      console.error("Email API error:", error)
      alert(`Warning: ${type} downloaded but email sending failed. Please contact support.`)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Download Results</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {emailSent ? (
            // Improved success state
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Success!</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Your certificate and results have been downloaded and sent to your email.
                </p>
                <p className="text-xs text-gray-500">Please check your inbox and spam folder.</p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            // Improved form design
            <div className="space-y-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                Enter your details to download your certificate and results. You'll also receive them via email.
              </p>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      value={userDetails.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={userDetails.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Quiz Summary</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Quiz:</span>
                    <span className="font-medium">{quizResults.quiz}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Score:</span>
                    <span className="font-medium">
                      {quizResults.score}/{quizResults.totalQuestions} ({quizResults.percentage}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Week:</span>
                    <span className="font-medium">{quizResults.week}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleDownloadCertificate}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>{isLoading ? "Processing..." : "Download Certificate"}</span>
                </button>

                <button
                  onClick={handleDownloadResults}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>{isLoading ? "Processing..." : "Download Detailed Results"}</span>
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">Certificate and results will be emailed automatically</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
