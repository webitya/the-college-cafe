"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Star,
  MapPin,
  Calendar,
  IndianRupee,
  ExternalLink,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState, useMemo } from "react"

export default function CollegesList({ colleges, sortBy, onSortChange }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedColleges = colleges.slice(startIndex, endIndex)
    const totalPages = Math.ceil(colleges.length / itemsPerPage)

    return {
      colleges: paginatedColleges,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    }
  }, [colleges, currentPage])

  useMemo(() => {
    setCurrentPage(1)
  }, [colleges.length])

  const formatFees = (fees) => {
    const amount = Number.parseInt(fees)
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    }
    return `₹${(amount / 1000).toFixed(0)}K`
  }

  const getRatingColor = (rating) => {
    const rate = Number.parseFloat(rating)
    if (rate >= 4.5) return "bg-green-100 text-green-800"
    if (rate >= 4.0) return "bg-blue-100 text-blue-800"
    if (rate >= 3.5) return "bg-yellow-100 text-yellow-800"
    return "bg-gray-100 text-gray-800"
  }

  const getTypeColor = (type) => {
    const colors = {
      Engineering: "bg-blue-100 text-blue-800",
      Medical: "bg-red-100 text-red-800",
      Management: "bg-purple-100 text-purple-800",
      University: "bg-green-100 text-green-800",
      "Arts & Science": "bg-orange-100 text-orange-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePrevious = () => {
    if (paginatedData.hasPrev) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (paginatedData.hasNext) {
      handlePageChange(currentPage + 1)
    }
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(paginatedData.totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Showing {colleges.length} college{colleges.length !== 1 ? "s" : ""}
          </h2>
          {colleges.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              Page {currentPage} of {paginatedData.totalPages} ({itemsPerPage} per page)
            </p>
          )}
        </div>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
        >
          <option value="relevance">Sort by Relevance</option>
          <option value="rating">Sort by Rating</option>
          <option value="name">Sort by Name</option>
          <option value="fees">Sort by Fees</option>
          <option value="established">Sort by Year</option>
        </select>
      </div>

      {/* No Results */}
      {colleges.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <GraduationCap className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No colleges found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results.</p>
        </div>
      )}

      {/* Colleges Grid */}
      <div className="space-y-6">
        {paginatedData.colleges.map((college) => (
          <div
            key={college.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-yellow-200"
          >
            <div className="flex flex-col lg:flex-row">
              {/* College Image */}
              <div className="lg:w-1/3 relative h-48 lg:h-auto min-h-[200px]">
                <Image
                  src={college.image || "/placeholder.svg?height=200&width=300&query=college campus"}
                  alt={college.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3">
                  <div
                    className={`flex items-center px-2 py-1 rounded-full text-sm font-medium ${getRatingColor(college.rating)}`}
                  >
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    <span>{college.rating}</span>
                  </div>
                </div>
              </div>

              {/* College Info */}
              <div className="lg:w-2/3 p-6">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{college.name}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{college.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Est. {college.established}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{college.shortDescription}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(college.type)}`}>
                        {college.type}
                      </span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        NAAC Accredited
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                        Placement Assistance
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      <span className="font-medium">Starting Fees:</span>
                      <span className="ml-1 font-semibold text-gray-900">{formatFees(college.fees)}/year</span>
                    </div>
                    <Link
                      href={`/colleges/${college.slug}`}
                      className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
                    >
                      <span>View Details</span>
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {colleges.length > 0 && paginatedData.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-4">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, colleges.length)} of{" "}
            {colleges.length} results
          </div>

          <nav className="flex items-center space-x-1">
            <button
              onClick={handlePrevious}
              disabled={!paginatedData.hasPrev}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>

            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  pageNum === currentPage
                    ? "bg-yellow-500 text-white"
                    : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={!paginatedData.hasNext}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}
