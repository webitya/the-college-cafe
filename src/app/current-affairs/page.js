"use client"

import { useState, useEffect } from "react"
import CurrentAffairsHero from "../../components/CurrentAffairs/CurrentAffairsHero"
import CurrentAffairsCalendar from "../../components/CurrentAffairs/CurrentAffairsCalendar"
import CurrentAffairsList from "../../components/CurrentAffairs/CurrentAffairsList"
import { getTodaysDate, getAllAvailableDatesFlat } from "../../lib/currentAffairsLoader"
import { Calendar, List } from "lucide-react"
import Header from "../../components/shared/Header"
import Footer from "../../components/shared/Footer"

const CurrentAffairsPage = () => {
  const [selectedDate, setSelectedDate] = useState("")
  const [viewMode, setViewMode] = useState("calendar")

  useEffect(() => {
    const todaysDate = getTodaysDate() // format: "23-august-2025"
    const availableDates = getAllAvailableDatesFlat()

    if (availableDates.length > 0) {
      if (availableDates.includes(todaysDate)) {
        setSelectedDate(todaysDate) // ✅ use today if available
      } else {
        // ✅ fallback: use latest available date instead of hardcoding
        setSelectedDate(availableDates[availableDates.length - 1])
      }
    }
  }, [])

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  const formatSelectedDate = () => {
    if (!selectedDate) return "No date selected"
    const [day, month, year] = selectedDate.split("-")
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
    return `${monthNames[month]} ${Number.parseInt(day)}`
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <CurrentAffairsHero />

        {/* Sticky Navigation */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10 px-4 py-2">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  viewMode === "calendar"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Calendar size={16} />
                Calendar
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  viewMode === "list"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <List size={16} />
                List
              </button>
            </div>
            <div className="text-sm font-medium text-gray-700">
              {formatSelectedDate()}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Calendar/List View */}
            <div className="lg:col-span-1">
              {viewMode === "calendar" ? (
                <CurrentAffairsCalendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-3">
                  <h3 className="font-semibold text-sm text-gray-900 mb-3">
                    Quick Date Selection
                  </h3>
                  <CurrentAffairsList
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                  />
                </div>
              )}
            </div>

            {/* Current Affairs Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h2 className="font-bold text-lg text-gray-900 mb-4">
                  Current Affairs - {formatSelectedDate()}
                </h2>
                <CurrentAffairsList
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CurrentAffairsPage
