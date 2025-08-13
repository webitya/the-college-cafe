import Link from "next/link"
import SearchIcon from "@mui/icons-material/Search"
import SchoolIcon from "@mui/icons-material/School"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import GroupIcon from "@mui/icons-material/Group"

export default function HomePageHero() {
  return (
    <section className="bg-gradient-to-br from-yellow-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-yellow-600 font-poppins">THE COLLEGE CAFE</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your Gateway to Higher Education in Ranchi, Jharkhand & Across India
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover top colleges, get latest updates on JEE & NEET, explore career opportunities, and make informed
            decisions about your future.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search colleges, courses, or locations..."
                className="w-full px-6 py-4 text-lg border-2 border-yellow-300 rounded-full focus:outline-none focus:border-yellow-500 shadow-lg"
              />
              <button className="absolute right-2 top-2 bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full transition-colors duration-200">
                <SearchIcon />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/colleges"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200 shadow-lg"
            >
              Explore Colleges
            </Link>
            <Link
              href="/jee"
              className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-300 transition-colors duration-200 shadow-lg"
            >
              JEE Preparation
            </Link>
            <Link
              href="/neet"
              className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-300 transition-colors duration-200 shadow-lg"
            >
              NEET Preparation
            </Link>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SchoolIcon className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">500+ Colleges</h3>
              <p className="text-gray-600">Comprehensive database of colleges across India</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUpIcon className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Latest Updates</h3>
              <p className="text-gray-600">Real-time admission and exam notifications</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GroupIcon className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Guidance</h3>
              <p className="text-gray-600">Professional counseling and career advice</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
