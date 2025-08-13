import Link from "next/link"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import SchoolIcon from "@mui/icons-material/School"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <SchoolIcon className="text-yellow-500 text-3xl" />
              <span className="text-xl font-bold text-gray-800">THE COLLEGE CAFE</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Your trusted partner in finding the best colleges and educational opportunities. We provide comprehensive
              information about colleges, courses, and career guidance.
            </p>
            <div className="flex space-x-4">
              <FacebookIcon className="text-gray-400 hover:text-yellow-500 cursor-pointer" />
              <TwitterIcon className="text-gray-400 hover:text-yellow-500 cursor-pointer" />
              <InstagramIcon className="text-gray-400 hover:text-yellow-500 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/colleges" className="text-gray-600 hover:text-yellow-600">
                  Colleges
                </Link>
              </li>
              <li>
                <Link href="/jee" className="text-gray-600 hover:text-yellow-600">
                  JEE
                </Link>
              </li>
              <li>
                <Link href="/neet" className="text-gray-600 hover:text-yellow-600">
                  NEET
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-gray-600 hover:text-yellow-600">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-600 hover:text-yellow-600">
                  Latest News
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <EmailIcon className="text-yellow-500 text-sm" />
                <span className="text-gray-600 text-sm">info@thecollegecafe.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="text-yellow-500 text-sm" />
                <span className="text-gray-600 text-sm">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2">
                <LocationOnIcon className="text-yellow-500 text-sm" />
                <span className="text-gray-600 text-sm">Ranchi, Jharkhand</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">© 2024 THE COLLEGE CAFE. All rights reserved.</p>

            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 py-2 rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
              <p className="text-sm text-gray-700 font-medium">
                <span className="text-gray-600">Website Designed & Managed by</span>{" "}
                <Link
                  href="https://webitya.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-700 font-semibold hover:text-yellow-800 underline decoration-2 underline-offset-2 hover:decoration-yellow-600 transition-all duration-200"
                >
                  Webitya
                </Link>
              </p>
              <p className="text-xs text-gray-500 mt-1 font-mono">Professional Web Development Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
