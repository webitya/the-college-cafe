"use client"

import { useState, useEffect } from "react"
import AccessTime from "@mui/icons-material/AccessTime"
import TrendingUp from "@mui/icons-material/TrendingUp"
import LocalOffer from "@mui/icons-material/LocalOffer"
import ExpandMore from "@mui/icons-material/ExpandMore"
import ExpandLess from "@mui/icons-material/ExpandLess"

import { currentAffairs as aug05Data } from "../../data/current-affairs/august-2025/05-august-2025"
import { currentAffairs as aug06Data } from "../../data/current-affairs/august-2025/06-august-2025"
import { currentAffairs as aug07Data } from "../../data/current-affairs/august-2025/07-august-2025"

export default function CurrentAffairsList({ selectedDate }) {
  const [currentAffairs, setCurrentAffairs] = useState([])
  const [expandedItems, setExpandedItems] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCurrentAffairs(selectedDate)
  }, [selectedDate])

  const loadCurrentAffairs = (date) => {
    setLoading(true)

    let data = []
    switch (date) {
      case "2025-08-05":
        data = aug05Data
        break
      case "2025-08-06":
        data = aug06Data
        break
      case "2025-08-07":
        data = aug07Data
        break
      default:
        data = []
    }

    setCurrentAffairs(data)
    setLoading(false)
  }

  const getMonthName = (month) => {
    const months = {
      "01": "january",
      "02": "february",
      "03": "march",
      "04": "april",
      "05": "may",
      "06": "june",
      "07": "july",
      "08": "august",
      "09": "september",
      10: "october",
      11: "november",
      12: "december",
    }
    return months[month]
  }

  const toggleExpanded = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getImportanceColor = (importance) => {
    switch (importance) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      Education: "bg-blue-100 text-blue-800",
      "Science & Technology": "bg-purple-100 text-purple-800",
      Environment: "bg-green-100 text-green-800",
      Economy: "bg-orange-100 text-orange-800",
      Sports: "bg-red-100 text-red-800",
      "International Relations": "bg-indigo-100 text-indigo-800",
      Infrastructure: "bg-gray-100 text-gray-800",
      Healthcare: "bg-pink-100 text-pink-800",
      Finance: "bg-yellow-100 text-yellow-800",
      Energy: "bg-green-100 text-green-800",
      Business: "bg-blue-100 text-blue-800",
      Archaeology: "bg-amber-100 text-amber-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading current affairs...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Current Affairs for{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
          <p className="text-gray-600">{currentAffairs.length} important updates for today</p>
        </div>

        {currentAffairs.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-xl p-8">
              <AccessTime className="text-4xl text-gray-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Current Affairs Available</h3>
              <p className="text-gray-500">Current affairs for this date will be updated soon.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {currentAffairs.map((item, index) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}
                        >
                          {item.category}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getImportanceColor(item.importance)}`}
                        >
                          <TrendingUp className="text-xs mr-1" />
                          {item.importance}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">{item.title}</h3>

                      <p className="text-gray-600 mb-4 leading-relaxed">{item.summary}</p>

                      {expandedItems[item.id] && (
                        <div className="mb-4">
                          <p className="text-gray-700 leading-relaxed mb-4">{item.content}</p>

                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-sm"
                              >
                                <LocalOffer className="text-xs mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <AccessTime className="text-sm mr-1" />
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>

                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className="flex items-center px-4 py-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors"
                    >
                      {expandedItems[item.id] ? (
                        <>
                          <span className="mr-1">Show Less</span>
                          <ExpandLess />
                        </>
                      ) : (
                        <>
                          <span className="mr-1">Read More</span>
                          <ExpandMore />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
