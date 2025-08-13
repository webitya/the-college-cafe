"use client"
import { useState } from "react"
import FilterListIcon from "@mui/icons-material/FilterList"
import WorkIcon from "@mui/icons-material/Work"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"

export default function JobsFilter() {
  const [filters, setFilters] = useState({
    jobType: "",
    location: "",
    experience: "",
    salary: "",
  })

  const jobTypes = ["Full Time", "Part Time", "Internship", "Contract", "Remote"]
  const locations = ["Ranchi", "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune"]
  const experienceLevels = ["Fresher", "1-2 years", "3-5 years", "5+ years"]
  const salaryRanges = ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10+ LPA"]

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
        <h2 className="text-xl font-semibold text-gray-900">Filter Jobs</h2>
      </div>

      {/* Job Type Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <WorkIcon className="text-gray-500 mr-2 text-sm" />
          <h3 className="font-medium text-gray-900">Job Type</h3>
        </div>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.jobType === type}
                onChange={() => handleFilterChange("jobType", type)}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="ml-2 text-gray-700">{type}</span>
            </label>
          ))}
        </div>
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

      {/* Experience Filter */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Experience Level</h3>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.experience === level}
                onChange={() => handleFilterChange("experience", level)}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="ml-2 text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary Filter */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <AttachMoneyIcon className="text-gray-500 mr-2 text-sm" />
          <h3 className="font-medium text-gray-900">Salary Range</h3>
        </div>
        <div className="space-y-2">
          {salaryRanges.map((range) => (
            <label key={range} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.salary === range}
                onChange={() => handleFilterChange("salary", range)}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="ml-2 text-gray-700">{range}</span>
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
