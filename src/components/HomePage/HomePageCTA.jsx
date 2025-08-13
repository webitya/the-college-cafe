"use client"
import { useState } from "react"
import EmailIcon from "@mui/icons-material/Email"
import NotificationsIcon from "@mui/icons-material/Notifications"

export default function HomePageCTA() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send the email to your backend
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <NotificationsIcon className="text-yellow-500 text-3xl" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Stay Updated with THE COLLEGE CAFE</h2>
        <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
          Get the latest updates on college admissions, exam notifications, and career opportunities directly in your
          inbox.
        </p>

        <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <EmailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-white hover:bg-gray-100 text-yellow-600 px-8 py-3 rounded-full font-semibold transition-colors duration-200 whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </div>
        </form>

        {isSubscribed && (
          <div className="mt-4 bg-white bg-opacity-20 text-white px-4 py-2 rounded-full inline-block">
            ✓ Successfully subscribed! Thank you for joining us.
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center text-yellow-100">
            <span className="w-2 h-2 bg-yellow-200 rounded-full mr-2"></span>
            Weekly college updates
          </div>
          <div className="flex items-center text-yellow-100">
            <span className="w-2 h-2 bg-yellow-200 rounded-full mr-2"></span>
            Exam notifications
          </div>
          <div className="flex items-center text-yellow-100">
            <span className="w-2 h-2 bg-yellow-200 rounded-full mr-2"></span>
            Career opportunities
          </div>
        </div>
      </div>
    </section>
  )
}
