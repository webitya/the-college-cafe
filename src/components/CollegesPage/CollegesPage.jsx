"use client"
import { useState, useMemo } from "react"
import Header from "../shared/Header"
import Footer from "../shared/Footer"
import CollegesList from "./CollegesList"
import CollegesFilter from "./CollegesFilter"
import { collegesData } from "../../data/colleges/allColleges"
import { Search, Filter } from "lucide-react"

export default function CollegesPage() {
  const [filters, setFilters] = useState({
    location: [],
    type: [],
    rating: [],
    fees: [],
  })
  const [sortBy, setSortBy] = useState("relevance")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      const currentValues = Array.isArray(prev[filterType]) ? prev[filterType] : []
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]

      return { ...prev, [filterType]: newValues }
    })
  }

  const handleClearFilters = () => {
    setFilters({ location: [], type: [], rating: [], fees: [] })
    setSearchQuery("")
  }

  const filteredAndSortedColleges = useMemo(() => {
    const filtered = collegesData.filter((college) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          college.name.toLowerCase().includes(query) ||
          college.location.toLowerCase().includes(query) ||
          college.type.toLowerCase().includes(query) ||
          college.shortDescription.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      if (filters.location.length > 0) {
        const locationMatch = filters.location.some((loc) => {
          if (loc === "All India") return true
          if (loc === "All Jharkhand") return college.location.includes("Jharkhand")
          return college.location.includes(loc)
        })
        if (!locationMatch) return false
      }

      if (filters.type.length > 0 && !filters.type.includes(college.type)) return false

      if (filters.rating.length > 0) {
        const collegeRating = Number.parseFloat(college.rating)
        const ratingMatch = filters.rating.some((rating) => {
          const minRating = Number.parseFloat(rating.replace("+", ""))
          return collegeRating >= minRating
        })
        if (!ratingMatch) return false
      }

      if (filters.fees.length > 0) {
        const collegeFees = Number.parseInt(college.fees)
        const feesMatch = filters.fees.some((range) => {
          if (range === "0-100000") return collegeFees <= 100000
          if (range === "100000-300000") return collegeFees > 100000 && collegeFees <= 300000
          if (range === "300000-500000") return collegeFees > 300000 && collegeFees <= 500000
          if (range === "500000+") return collegeFees > 500000
          return false
        })
        if (!feesMatch) return false
      }

      return true
    })

    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => Number.parseFloat(b.rating) - Number.parseFloat(a.rating))
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "fees":
        filtered.sort((a, b) => Number.parseInt(a.fees) - Number.parseInt(b.fees))
        break
      case "established":
        filtered.sort((a, b) => Number.parseInt(b.established) - Number.parseInt(a.established))
        break
      default:
        break
    }

    return filtered
  }, [filters, sortBy, searchQuery])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-yellow-50">
      <Header />

      {/* Sticky search bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search colleges by name, location, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white/60 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center w-11 h-11 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 pt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar filter */}
            <aside className="lg:w-1/4 hidden lg:block sticky top-28 h-[80vh] overflow-y-auto 
              bg-white/70 backdrop-blur-md border rounded-2xl shadow-md p-5
              scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-100 hover:scrollbar-thumb-yellow-500 transition-all">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-yellow-500" /> Filters
              </h2>
              <div className="space-y-6">
                <CollegesFilter
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </aside>

            {/* Colleges list */}
            <section className="lg:w-3/4 min-h-[70vh]">
              <CollegesList
                colleges={filteredAndSortedColleges}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </section>
          </div>
        </div>
      </main>

      {/* Mobile filter drawer */}
      {isMobileFilterOpen && (
        <CollegesFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          isMobile={true}
          onClose={() => setIsMobileFilterOpen(false)}
        />
      )}

      <Footer />
    </div>
  )
}
