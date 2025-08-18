"use client"
import { useState, useMemo } from "react"
import Header from "../shared/Header"
import Footer from "../shared/Footer"
import CollegesList from "./CollegesList"
import CollegesFilter from "./CollegesFilter"
import { collegesData } from "../../data/colleges/allColleges"
import { Search, X, Sliders } from "lucide-react"

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

  const activeFiltersCount = useMemo(() => {
    return Object.values(filters).reduce((count, arr) => count + arr.length, 0)
  }, [filters])

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
        const rating = Number.parseFloat(college.rating)
        const ratingMatch = filters.rating.some((r) => rating >= Number(r.replace("+", "")))
        if (!ratingMatch) return false
      }
      if (filters.fees.length > 0) {
        const fees = Number.parseInt(college.fees)
        const feesMatch = filters.fees.some((range) => {
          if (range === "0-100000") return fees <= 100000
          if (range === "100000-300000") return fees > 100000 && fees <= 300000
          if (range === "300000-500000") return fees > 300000 && fees <= 500000
          if (range === "500000+") return fees > 500000
          return false
        })
        if (!feesMatch) return false
      }
      return true
    })

    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => Number(b.rating) - Number(a.rating))
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "fees":
        filtered.sort((a, b) => Number(a.fees) - Number(b.fees))
        break
      case "established":
        filtered.sort((a, b) => Number(b.established) - Number(a.established))
        break
    }
    return filtered
  }, [filters, sortBy, searchQuery])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-yellow-50">
      <Header />

      {/* Top Search Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-yellow-500 transition-colors" />
              <input
                type="text"
                placeholder="Search colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition-all placeholder:text-gray-400 text-gray-700 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden relative flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 shadow-lg"
            >
              <Sliders className="w-5 h-5" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 pt-20">
        <div className="mx-auto px-3 sm:px-4 lg:px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar (scrollable) */}
            <aside className="lg:w-1/4 hidden lg:block sticky top-32 h-[calc(100vh-10rem)]">
              <div className="h-full flex flex-col bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Sliders className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Filters</h2>
                        <p className="text-yellow-100 text-sm">Refine your search</p>
                      </div>
                    </div>
                    {activeFiltersCount > 0 && (
                      <span className="bg-white/20 rounded-full px-3 py-1 text-sm font-semibold">
                        {activeFiltersCount} active
                      </span>
                    )}
                  </div>
                </div>

                {/* Scrollable Filters */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-yellow-400/70 scrollbar-track-gray-100 hover:scrollbar-thumb-yellow-500/90">
                  <CollegesFilter
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                  />
                </div>

                {/* Footer Button */}
                {activeFiltersCount > 0 && (
                  <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                    <button
                      onClick={handleClearFilters}
                      className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 shadow-lg"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </aside>

            {/* Colleges List */}
            <section className="lg:w-3/4 min-h-[70vh]">
              <div className="mb-6 p-4 bg-white/70 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {filteredAndSortedColleges.length} Colleges Found
                      </h3>
                      <p className="text-sm text-gray-600">
                        {activeFiltersCount > 0 ? `${activeFiltersCount} filters applied` : "Showing all colleges"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <CollegesList colleges={filteredAndSortedColleges} sortBy={sortBy} onSortChange={setSortBy} />
            </section>
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Filters</h2>
                  <p className="text-yellow-100 text-sm">
                    {activeFiltersCount > 0 ? `${activeFiltersCount} active` : "No filters applied"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-yellow-400/70 scrollbar-track-gray-100 hover:scrollbar-thumb-yellow-500/90">
              <CollegesFilter
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isMobile
                onClose={() => setIsMobileFilterOpen(false)}
              />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleClearFilters}
                  className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 shadow-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
