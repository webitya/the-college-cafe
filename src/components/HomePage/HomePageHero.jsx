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
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  const searchKeywords = [
    "Birla Institute of Technology",
    "BIT Mesra",
    "NIT Jamshedpur",
    "IIT Dhanbad",
    "Ranchi University",
    "B.Tech Computer Science",
    "Mechanical Engineering",
    "Electrical Engineering",
    "AI and Data Science",
    "Jharkhand",
    "Top Engineering Colleges",
    "JEE Main",
    "NEET",
  ]

  const filterSuggestions = (query) => {
    if (!query.trim()) return []
    return searchKeywords.filter((kw) => kw.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
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
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
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

  const handleSuggestionClick = (s) => {
    setSearchQuery(s)
    setShowSuggestions(false)
    router.push(`/colleges?search=${encodeURIComponent(s)}`)
  }

  const goToPrevious = () =>
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  const goToNext = () =>
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)

  return (
    <section className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center py-10 lg:py-20">
          
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <div className="inline-flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
              <StarIcon className="w-3 h-3 mr-1" />
              India’s Trusted Education Platform
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
              Welcome to <span className="text-yellow-600">THE COLLEGE CAFE</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-lg">
              Your one-stop destination to explore colleges, courses, and exams.
              Get expert guidance and make informed decisions about your future.
            </p>

            {/* SEARCH BAR */}
            <div className="relative w-full max-w-lg" ref={searchRef}>
              <form onSubmit={handleSearch}>
                <div className="relative flex items-center bg-white rounded-full shadow-lg border border-yellow-200 overflow-hidden">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search colleges, courses, locations..."
                    className="flex-1 px-4 py-3 text-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!searchQuery.trim()}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 transition rounded-r-full disabled:opacity-50"
                  >
                    <SearchIcon fontSize="small" />
                  </button>
                </div>
              </form>

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                  {suggestions.map((s, i) => (
                    <div
                      key={i}
                      onClick={() => handleSuggestionClick(s)}
                      className="px-4 py-2 hover:bg-yellow-50 cursor-pointer text-sm text-gray-700 flex items-center"
                    >
                      <SearchIcon className="text-gray-400 mr-2" fontSize="small" />
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/colleges"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full text-sm font-medium transition shadow-md text-center"
              >
                Explore Colleges
              </Link>
              <div className="flex gap-3">
                <Link
                  href="/jee"
                  className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-5 py-3 rounded-full text-sm font-medium transition shadow-sm text-center"
                >
                  JEE Prep
                </Link>
                <Link
                  href="/neet"
                  className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-5 py-3 rounded-full text-sm font-medium transition shadow-sm text-center"
                >
                  NEET Prep
                </Link>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-6">
              {[
                { icon: <SchoolIcon />, label: "500+", sub: "Colleges" },
                { icon: <TrendingUpIcon />, label: "24/7", sub: "Live Updates" },
                { icon: <GroupIcon />, label: "Expert", sub: "Guidance" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center bg-white rounded-lg p-4 shadow-md"
                >
                  <div className="bg-yellow-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-yellow-600">{stat.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{stat.label}</h3>
                  <p className="text-gray-600 text-xs">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGES */}
          <div className="hidden lg:block relative">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              {heroImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    idx === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Campus ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              {/* arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition hover:scale-110"
              >
                <ArrowBackIosIcon fontSize="small" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition hover:scale-110"
              >
                <ArrowForwardIosIcon fontSize="small" />
              </button>

              {/* indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
                {heroImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === currentImageIndex ? "bg-white" : "bg-white/50"
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
