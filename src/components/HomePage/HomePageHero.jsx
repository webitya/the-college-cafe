"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import SearchIcon from "@mui/icons-material/Search"
import SchoolIcon from "@mui/icons-material/School"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import GroupIcon from "@mui/icons-material/Group"
import StarIcon from "@mui/icons-material/Star"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"

export default function HomePageHero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const searchRef = useRef(null)
  const router = useRouter()

  const heroImages = [
    "/modern-college-campus.png",
    "/engineering-laboratory.png",
    "/college-library-students.png",
    "/graduation-ceremony.png",
    "/college-classroom-teaching.png",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  const searchKeywords = [
    // College Names
    "Birla Institute of Technology",
    "BIT Mesra",
    "BIT",
    "Mesra",
    "National Institute of Technology",
    "NIT Jamshedpur",
    "NIT",
    "Jamshedpur",
    "Indian Institute of Technology",
    "IIT Dhanbad",
    "IIT",
    "Dhanbad",
    "Ranchi University",
    "Ranchi",

    // Courses
    "B.Tech Computer Science",
    "Computer Science",
    "CSE",
    "B.Tech",
    "Mechanical Engineering",
    "Mechanical",
    "M.Tech",
    "Electrical Engineering",
    "Electrical",
    "EEE",
    "AI and Data Science",
    "Artificial Intelligence",
    "Data Science",

    // Locations
    "Ranchi",
    "Jharkhand",
    "Mesra",
    "Jamshedpur",
    "Dhanbad",

    // Types & Categories
    "Engineering",
    "University",
    "Technical",
    "Premier Institute",
    "NAAC Accredited",
    "NBA Accredited",
    "IIT",
    "NIT",

    // Popular Searches
    "Top Engineering Colleges",
    "Best Colleges in Jharkhand",
    "Engineering Admission",
    "BITSAT",
    "JEE Main",
    "GATE",
    "Placement",
    "Campus",
    "Hostel",
    "Fees",
  ]

  const filterSuggestions = (query) => {
    if (!query.trim()) return []

    const filtered = searchKeywords.filter((keyword) => keyword.toLowerCase().includes(query.toLowerCase())).slice(0, 8)

    return filtered
  }

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = filterSuggestions(searchQuery)
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowSuggestions(false)
      router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    router.push(`/colleges?search=${encodeURIComponent(suggestion)}`)
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length)
  }

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
  }

  return (
    <section className="bg-gradient-to-r from-yellow-50 to-white h-[90vh] px-4 sm:px-6 lg:px-8 flex lg:items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:items-center h-full">
          {/* Left Side - All Content */}
          <div className="flex flex-col justify-between h-full py-4 lg:py-0 lg:space-y-4">
            <div className="space-y-4 lg:space-y-4">
              <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-full text-xs font-medium">
                <StarIcon className="w-3 h-3 mr-1" />
                India's Trusted Education Platform
              </div>

              <h1 className="text-2xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                Welcome to <span className="text-yellow-600">THE COLLEGE CAFE</span>
              </h1>

              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                Your one-stop destination for finding the perfect college. Explore top institutions, get expert
                guidance, and make informed decisions about your future.
              </p>

              {/* Search Bar */}
              <div className="relative" ref={searchRef}>
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative flex items-center bg-white rounded-full shadow-lg border border-yellow-200 overflow-hidden">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onFocus={() => searchQuery.trim() && setShowSuggestions(suggestions.length > 0)}
                      placeholder="Search colleges, courses, locations..."
                      className="flex-1 px-4 py-3 lg:px-4 lg:py-2.5 text-sm focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 lg:px-4 lg:py-2.5 transition-colors duration-200 disabled:opacity-50"
                      disabled={!searchQuery.trim()}
                    >
                      <SearchIcon className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl mt-2 z-50 max-h-40 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 lg:px-4 py-2 hover:bg-yellow-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center"
                      >
                        <SearchIcon className="text-gray-400 mr-2 w-3 h-3 lg:w-3 lg:h-3" />
                        <span className="text-gray-700 text-xs">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/colleges"
                  className="bg-yellow-400/20 backdrop-blur-md border border-yellow-300/30 hover:bg-yellow-400/30 hover:border-yellow-400/50 text-yellow-800 px-6 py-3 lg:px-5 lg:py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                >
                  Explore Colleges
                </Link>
                <div className="flex gap-3">
                  <Link
                    href="/jee"
                    className="flex-1 sm:flex-none bg-yellow-100/30 backdrop-blur-md border border-yellow-200/40 hover:bg-yellow-200/40 hover:border-yellow-300/60 text-yellow-700 px-4 py-3 lg:px-4 lg:py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg text-center"
                  >
                    JEE Prep
                  </Link>
                  <Link
                    href="/neet"
                    className="flex-1 sm:flex-none bg-yellow-100/30 backdrop-blur-md border border-yellow-200/40 hover:bg-yellow-200/40 hover:border-yellow-300/60 text-yellow-700 px-4 py-3 lg:px-4 lg:py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg text-center"
                  >
                    NEET Prep
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Section - Positioned at bottom on mobile */}
            <div className="grid grid-cols-3 gap-3 sm:gap-3 mt-6 lg:mt-0">
              <div className="text-center bg-white rounded-lg p-3 lg:p-3 shadow-lg">
                <div className="bg-yellow-100 w-8 h-8 lg:w-8 lg:h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                  <SchoolIcon className="text-yellow-600 w-4 h-4 lg:w-4 lg:h-4" />
                </div>
                <h3 className="text-lg lg:text-lg font-bold text-gray-800 mb-1">500+</h3>
                <p className="text-gray-600 text-xs">Colleges Listed</p>
              </div>

              <div className="text-center bg-white rounded-lg p-3 lg:p-3 shadow-lg">
                <div className="bg-yellow-100 w-8 h-8 lg:w-8 lg:h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUpIcon className="text-yellow-600 w-4 h-4 lg:w-4 lg:h-4" />
                </div>
                <h3 className="text-lg lg:text-lg font-bold text-gray-800 mb-1">24/7</h3>
                <p className="text-gray-600 text-xs">Live Updates</p>
              </div>

              <div className="text-center bg-white rounded-lg p-3 lg:p-3 shadow-lg">
                <div className="bg-yellow-100 w-8 h-8 lg:w-8 lg:h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                  <GroupIcon className="text-yellow-600 w-4 h-4 lg:w-4 lg:h-4" />
                </div>
                <h3 className="text-lg lg:text-lg font-bold text-gray-800 mb-1">Expert</h3>
                <p className="text-gray-600 text-xs">Guidance Available</p>
              </div>
            </div>
          </div>

          {/* Right Side - Auto-changing Images */}
          <div className="hidden lg:block relative">
            <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`College campus ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Image overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              <button
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Previous image"
              >
                <ArrowBackIosIcon className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Next image"
              >
                <ArrowForwardIosIcon className="w-4 h-4" />
              </button>

              {/* Image indicators */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
                {heroImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
