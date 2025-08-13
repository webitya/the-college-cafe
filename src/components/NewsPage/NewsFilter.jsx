"use client"
import { useState } from "react"
import FilterListIcon from "@mui/icons-material/FilterList"
import CategoryIcon from "@mui/icons-material/Category"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"

export default function NewsFilter() {
  const [filters, setFilters] = useState({
    category: "",
    timeframe: "",
  })

  const categories = ["JEE", "NEET", "Colleges", "Jobs", "General", "Admissions", "Results"]
  const timeframes = ["Today", "This Week", "This Month", "Last 3 Months", "This Year"]

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value,
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
      <div className="flex items-center mb-6">
        <FilterListIcon className="text-yellow-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Filter News</h2>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <CategoryIcon className="text-gray-500 mr-2 text-sm" />
          <h3 className="font-medium text-gray-900">Category</h3>
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category === category}
                onChange={() => handleFilterChange("category", category)}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="ml-2 text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Time Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <CalendarTodayIcon className="text-gray-500 mr-2 text-sm" />
          <h3 className="font-medium text-gray-900">Time Period</h3>
        </div>
        <div className="space-y-2">
          {timeframes.map((timeframe) => (
            <label key={timeframe} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.timeframe === timeframe}
                onChange={() => handleFilterChange("timeframe", timeframe)}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="ml-2 text-gray-700">{timeframe}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
        Apply Filters
      </button>

      {/* Newsletter Signup */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
        <p className="text-gray-600 text-sm mb-3">Get the latest news delivered to your inbox.</p>
        <input
          type="email"
          placeholder="Your email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-2"
        />
        <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
          Subscribe
        </button>
      </div>
    </div>
  )
}
