"use client"

import { useState } from "react"
import { getAvailableDates, getMonthName } from "../../lib/currentAffairsLoader"

const CurrentAffairsCalendar = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState("august-2025")
  const [availableDates] = useState(getAvailableDates())

  const months = Object.keys(availableDates)
  const currentMonthIndex = months.indexOf(currentMonth)

  const getDaysInMonth = (monthKey) => {
    const [month, year] = monthKey.split("-")
    const monthIndex = {
      january: 0,
      february: 1,
      march: 2,
      april: 3,
      may: 4,
      june: 5,
      july: 6,
      august: 7,
      september: 8,
      october: 9,
      november: 10,
      december: 11,
    }[month]

    return new Date(Number.parseInt(year), monthIndex + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (monthKey) => {
    const [month, year] = monthKey.split("-")
    const monthIndex = {
      january: 0,
      february: 1,
      march: 2,
      april: 3,
      may: 4,
      june: 5,
      july: 6,
      august: 7,
      september: 8,
      october: 9,
      november: 10,
      december: 11,
    }[month]

    return new Date(Number.parseInt(year), monthIndex, 1).getDay()
  }

  const handleDateClick = (day) => {
    const [month, year] = currentMonth.split("-")
    const paddedDay = day.toString().padStart(2, "0")
    const dateString = `${paddedDay}-${month}-${year}`
    onDateSelect(dateString)
  }

  const isDateAvailable = (day) => {
    return availableDates[currentMonth]?.includes(day)
  }

  const isDateSelected = (day) => {
    if (!selectedDate) return false
    const [selectedDay, selectedMonth, selectedYear] = selectedDate.split("-")
    const [currentMonthName, currentYear] = currentMonth.split("-")
    return Number.parseInt(selectedDay) === day && selectedMonth === currentMonthName && selectedYear === currentYear
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isAvailable = isDateAvailable(day)
      const isSelected = isDateSelected(day)

      days.push(
        <button
          key={day}
          onClick={() => isAvailable && handleDateClick(day)}
          disabled={!isAvailable}
          className={`
            h-8 w-8 text-xs rounded-full flex items-center justify-center transition-all
            ${
              isSelected
                ? "bg-purple-600 text-white font-bold"
                : isAvailable
                  ? "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                  : "text-gray-300 cursor-not-allowed"
            }
          `}
        >
          {day}
          {isAvailable && !isSelected && <div className="absolute w-1 h-1 bg-green-500 rounded-full mt-4"></div>}
        </button>,
      )
    }

    return days
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => currentMonthIndex > 0 && setCurrentMonth(months[currentMonthIndex - 1])}
          disabled={currentMonthIndex === 0}
          className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ←
        </button>

        <h3 className="font-semibold text-sm text-gray-900">{getMonthName(currentMonth)} 2025</h3>

        <button
          onClick={() => currentMonthIndex < months.length - 1 && setCurrentMonth(months[currentMonthIndex + 1])}
          disabled={currentMonthIndex === months.length - 1}
          className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className="h-6 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 relative">{renderCalendarDays()}</div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  )
}

export default CurrentAffairsCalendar
