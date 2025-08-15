"use client"

import { useState, useEffect } from "react"
import { loadCurrentAffairsData, getAllAvailableDatesFlat } from "../../lib/currentAffairsLoader"
import { AlertTriangle, AlertCircle, CheckCircle, Circle } from "lucide-react"

const CurrentAffairsList = ({ selectedDate, onDateSelect }) => {
  const [currentAffairs, setCurrentAffairs] = useState([])
  const [loading, setLoading] = useState(false)
  const [availableDates] = useState(getAllAvailableDatesFlat())

  useEffect(() => {
    const loadData = async () => {
      if (!selectedDate) return

      setLoading(true)
      try {
        const data = await loadCurrentAffairsData(selectedDate)
        setCurrentAffairs(data?.events || [])
      } catch (error) {
        console.error("Error loading current affairs:", error)
        setCurrentAffairs([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [selectedDate])

  const getImportanceColor = (importance) => {
    switch (importance?.toLowerCase()) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-green-500 bg-green-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const getImportanceIcon = (importance) => {
    const iconProps = { size: 16 }
    switch (importance?.toLowerCase()) {
      case "high":
        return <AlertTriangle {...iconProps} className="text-red-500" />
      case "medium":
        return <AlertCircle {...iconProps} className="text-yellow-500" />
      case "low":
        return <CheckCircle {...iconProps} className="text-green-500" />
      default:
        return <Circle {...iconProps} className="text-gray-500" />
    }
  }

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-")
    const monthNames = {
      january: "Jan",
      february: "Feb",
      march: "Mar",
      april: "Apr",
      may: "May",
      june: "Jun",
      july: "Jul",
      august: "Aug",
      september: "Sep",
      october: "Oct",
      november: "Nov",
      december: "Dec",
    }
    return `${monthNames[month]} ${Number.parseInt(day)}, ${year}`
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Date Selector */}
      <div className="mb-4">
        <select
          value={selectedDate || ""}
          onChange={(e) => onDateSelect(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Select a date</option>
          {availableDates.map((date) => (
            <option key={date} value={date}>
              {formatDate(date)}
            </option>
          ))}
        </select>
      </div>

      {/* Current Affairs List */}
      {currentAffairs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No current affairs available for this date.</p>
          <p className="text-sm mt-2">Select a different date to view content.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {currentAffairs.map((affair, index) => (
            <div
              key={affair.id || index}
              className={`border-l-4 p-3 rounded-r-lg ${getImportanceColor(affair.importance)} transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {getImportanceIcon(affair.importance)}
                    <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">{affair.category}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{affair.title}</h3>
                  <p
                    className="text-xs text-gray-700 leading-relaxed overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {affair.description || affair.summary}
                  </p>
                  {affair.source && <p className="text-xs text-gray-500 mt-1 italic">Source: {affair.source}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CurrentAffairsList
