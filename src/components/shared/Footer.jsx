"use client"
import { useEffect, useState } from "react"

export default function Footer() {
  const [dateTime, setDateTime] = useState("")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
      setDateTime(now.toLocaleDateString("en-US", options))
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 60000) // update every 1 min
    return () => clearInterval(interval)
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-white to-yellow-50 text-gray-800 pt-12 pb-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-yellow-600 mb-4">THE COLLEGE CAFE</h3>
            <p className="text-gray-600 text-sm">
              Your gateway to higher education in India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/colleges" className="hover:text-yellow-600 transition">Colleges</a></li>
              <li><a href="/jee" className="hover:text-yellow-600 transition">JEE</a></li>
              <li><a href="/neet" className="hover:text-yellow-600 transition">NEET</a></li>
              <li><a href="/about" className="hover:text-yellow-600 transition">About Us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/news" className="hover:text-yellow-600 transition">Latest News</a></li>
              <li><a href="/jobs" className="hover:text-yellow-600 transition">Jobs</a></li>
              <li><a href="/current-affairs" className="hover:text-yellow-600 transition">Current Affairs</a></li>
              <li><a href="/course" className="hover:text-yellow-600 transition">Course</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <p className="text-gray-600 text-sm">Email: info@thecollegecafe.com</p>
            <p className="text-gray-600 text-sm">Phone: +91 1234567890</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p className="mb-4 md:mb-0">© {currentYear} The College Cafe. All rights reserved.</p>
          
          {/* Powered by Webitya + Date */}
          <div className="flex items-center gap-2">
            <a
              href="https://webitya.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
            >
              <img src="/webitya.jpg" alt="Webitya Logo" className="w-5 h-5 rounded-full" />
              <span className="text-gray-600">
                Powered by{" "}
                <span className="font-semibold bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent group-hover:opacity-80 transition">
                  Webitya
                </span>
              </span>
            </a>
            <span className="ml-3 text-gray-500 text-xs">| {dateTime}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
