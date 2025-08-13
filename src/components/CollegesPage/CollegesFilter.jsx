"use client"
import { useState } from "react"
import FilterListIcon from "@mui/icons-material/FilterList"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import SchoolIcon from "@mui/icons-material/School"
import StarIcon from "@mui/icons-material/Star"

export default function CollegesFilter() {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    rating: "",
  })

  const locations = ["Ranchi", "Jharkhand", "All India"]
  const types = ["Engineering", "Medical", "University", "Management", "Arts & Science"]
  const ratings = ["4.5+", "4.0+", "3.5+", "3.0+"]

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
        <h2 className="text-xl font-semibold text-gray-900">Filter Colleges</h2>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <LocationOnIcon className="text-gray-500 mr-2 text-sm" />
          <h3 className="font-medium text-gray-900">Location</h3>
        </div>
        <div className="space-y-2">
          {locations.map((location) => (
            <label key={location} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.location === location}
                onChange={() => handleFilterChange("location", location)}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="ml-2 text-gray-700">{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <SchoolIcon className="text-gray-500 mr-2 text-sm" />
          <h3 className="font-medium text-gray-900">College Type</h3>
        </div>
        <div className="space-y-2">
          {types.map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.type === type}
                onChange={() => handleFilterChange("type", type)}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="ml-2 text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <StarIcon className="text-gray-500 mr-2 text-sm" />
          <h3 className="font-medium text-gray-900">Rating</h3>
        </div>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.rating === rating}
                onChange={() => handleFilterChange("rating", rating)}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="ml-2 text-gray-700">{rating}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
        Apply Filters
      </button>
    </div>
  )
}
