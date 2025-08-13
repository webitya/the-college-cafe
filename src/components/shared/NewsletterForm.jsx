"use client"
import { useState } from "react"
import { Email, CheckCircle, AlertCircle } from "@mui/icons-material"

export default function NewsletterForm({ className = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [status, setStatus] = useState("idle")
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "newsletter",
          data: formData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus("success")
        setMessage("Successfully subscribed to our newsletter!")
        setFormData({ name: "", email: "" })
      } else {
        setStatus("error")
        setMessage("Failed to subscribe. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred. Please try again later.")
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <Email className="text-yellow-500 mr-3" />
        <h3 className="text-xl font-bold text-gray-900">Subscribe to Newsletter</h3>
      </div>

      <p className="text-gray-600 mb-6">
        Get the latest updates on college admissions, exam preparation, and career opportunities.
      </p>

      {status === "success" && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <CheckCircle className="text-green-600 mr-2 text-sm" />
          <p className="text-green-800 text-sm">{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="text-red-600 mr-2 text-sm" />
          <p className="text-red-800 text-sm">{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe Now"}
        </button>
      </form>
    </div>
  )
}
