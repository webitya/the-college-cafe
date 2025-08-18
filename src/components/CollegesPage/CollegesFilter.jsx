"use client"
import { useState } from "react"
import { Filter, MapPin, GraduationCap, Star, X, ChevronDown } from "lucide-react"

export default function CollegesFilter({ filters, onFilterChange, onClearFilters, isMobile = false, onClose }) {
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    type: true,
    rating: true,
    fees: true,
  })

  const locations = ["Ranchi", "Dhanbad", "Jamshedpur", "All Jharkhand", "All India"]
  const types = ["Engineering", "Medical", "University", "Management", "Arts & Science"]
  const ratings = ["4.5+", "4.0+", "3.5+", "3.0+"]
  const feeRanges = [
    { label: "Under ₹1L", value: "0-100000" },
    { label: "₹1L - ₹3L", value: "100000-300000" },
    { label: "₹3L - ₹5L", value: "300000-500000" },
    { label: "Above ₹5L", value: "500000+" },
  ]

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value)
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter((value) => (Array.isArray(value) ? value.length > 0 : value !== "")).length
  }

  const FilterSection = ({ title, icon: Icon, filterKey, options, isExpanded }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleSection(filterKey)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
      >
        <div className="flex items-center">
          <Icon className="w-4 h-4 text-gray-500 mr-2" />
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-2">
          {options.map((option) => {
            const value = typeof option === "string" ? option : option.value
            const label = typeof option === "string" ? option : option.label
            const isChecked = Array.isArray(filters[filterKey])
              ? filters[filterKey].includes(value)
              : filters[filterKey] === value

            return (
              <label key={value} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleFilterChange(filterKey, value)}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-white/20 backdrop-blur-md">
        <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <h2 className="text-lg font-semibold text-gray-900">Filter Colleges</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            <FilterSection
              title="Location"
              icon={MapPin}
              filterKey="location"
              options={locations}
              isExpanded={expandedSections.location}
            />
            <FilterSection
              title="College Type"
              icon={GraduationCap}
              filterKey="type"
              options={types}
              isExpanded={expandedSections.type}
            />
            <FilterSection
              title="Rating"
              icon={Star}
              filterKey="rating"
              options={ratings}
              isExpanded={expandedSections.rating}
            />
            <FilterSection
              title="Fees Range"
              icon={Filter}
              filterKey="fees"
              options={feeRanges}
              isExpanded={expandedSections.fees}
            />
          </div>

          <div className="p-4 border-t bg-gray-50 space-y-2 flex-shrink-0">
            <button
              onClick={onClearFilters}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Clear All Filters
            </button>
            <button
              onClick={onClose}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg sticky top-32">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Filter className="text-yellow-600 mr-2 w-5 h-5" />
            <h2 className="text-lg font-semibold text-gray-900">Filter Colleges</h2>
          </div>
          {getActiveFiltersCount() > 0 && (
            <button onClick={onClearFilters} className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">
              Clear All
            </button>
          )}
        </div>
      </div>

      <div>
        <FilterSection
          title="Location"
          icon={MapPin}
          filterKey="location"
          options={locations}
          isExpanded={expandedSections.location}
        />
        <FilterSection
          title="College Type"
          icon={GraduationCap}
          filterKey="type"
          options={types}
          isExpanded={expandedSections.type}
        />
        <FilterSection
          title="Rating"
          icon={Star}
          filterKey="rating"
          options={ratings}
          isExpanded={expandedSections.rating}
        />
        <FilterSection
          title="Fees Range"
          icon={Filter}
          filterKey="fees"
          options={feeRanges}
          isExpanded={expandedSections.fees}
        />
      </div>
    </div>
  )
}
