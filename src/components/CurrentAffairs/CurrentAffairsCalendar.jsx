"use client"

import ArrowBack from "@mui/icons-material/ArrowBack"
import ArrowForward from "@mui/icons-material/ArrowForward"
import CalendarToday from "@mui/icons-material/CalendarToday"

export default function CurrentAffairsCalendar({ selectedDate, onDateSelect, today }) {
  // Generate dates for August 2025 starting from 5th
  const generateDates = () => {
    const dates = []
    for (let i = 5; i <= 31; i++) {
      const date = `2025-08-${i.toString().padStart(2, "0")}`
      const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "short" })
      dates.push({ date, day: i, dayName })
    }
    return dates
  }

  const dates = generateDates()

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <CalendarToday className="text-2xl text-yellow-600 mr-2" />
            <h2 className="text-3xl font-bold text-gray-800">Select Date</h2>
          </div>
          <p className="text-gray-600">Choose a date to view current affairs for that day</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <ArrowBack className="text-gray-600" />
            </button>
            <h3 className="text-xl font-semibold text-gray-800">August 2025</h3>
            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <ArrowForward className="text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {dates.map(({ date, day, dayName }) => {
              const isSelected = selectedDate === date
              const isToday = today === date
              const isAvailable = date <= "2025-08-07" // Only first 3 days have data

              return (
                <button
                  key={date}
                  onClick={() => onDateSelect(date)}
                  disabled={!isAvailable}
                  className={`p-3 rounded-lg text-center transition-all duration-200 relative ${
                    isSelected
                      ? "bg-yellow-500 text-white shadow-md"
                      : isToday
                        ? "bg-blue-100 border-2 border-blue-400 text-blue-700"
                        : isAvailable
                          ? "bg-gray-50 hover:bg-yellow-50 text-gray-700 hover:text-yellow-700"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <div className="text-xs font-medium mb-1">{dayName}</div>
                  <div className="text-lg font-bold">{day}</div>
                  {isToday && !isSelected && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
