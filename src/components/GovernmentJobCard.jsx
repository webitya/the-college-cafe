"use client"

import { useState, useEffect } from "react"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import PeopleIcon from "@mui/icons-material/People"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import SchoolIcon from "@mui/icons-material/School"
import CakeIcon from "@mui/icons-material/Cake"
import AssignmentIcon from "@mui/icons-material/Assignment"
import TimerIcon from "@mui/icons-material/Timer"
import LaunchIcon from "@mui/icons-material/Launch"
import LockIcon from "@mui/icons-material/Lock"
import WarningIcon from "@mui/icons-material/Warning"

export default function GovernmentJobCard({ job }) {
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date()
      const end = new Date(job.endDate)
      const diff = end - now

      if (diff <= 0) {
        setIsActive(false)
        setTimeRemaining({ expired: true })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      setTimeRemaining({ days, hours, minutes, expired: false })
      setIsActive(true)
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 60000)
    return () => clearInterval(interval)
  }, [job.endDate])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getTimerColor = () => {
    if (!timeRemaining || timeRemaining.expired) return "text-red-600"
    if (timeRemaining.days <= 7) return "text-red-600"
    if (timeRemaining.days <= 15) return "text-yellow-600"
    return "text-green-600"
  }

  const getCardBorder = () => {
    if (!isActive) return "border-red-200 bg-red-50"
    if (timeRemaining && timeRemaining.days <= 7) return "border-red-300 bg-red-50"
    if (timeRemaining && timeRemaining.days <= 15) return "border-yellow-300 bg-yellow-50"
    return "border-green-300 bg-green-50"
  }

  const getUrgencyIcon = () => {
    if (!isActive) return <LockIcon className="text-red-500 text-sm" />
    if (timeRemaining && timeRemaining.days <= 7) return <WarningIcon className="text-red-500 text-sm animate-pulse" />
    if (timeRemaining && timeRemaining.days <= 15) return <WarningIcon className="text-yellow-500 text-sm" />
    return <TimerIcon className="text-green-500 text-sm" />
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 border-2 ${getCardBorder()} group`}
    >
      <div className="mb-3">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
          {getUrgencyIcon()}
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <AccountBalanceIcon className="text-sm" />
          <span className="font-medium text-sm">{job.department}</span>
        </div>
      </div>

      <div className="mb-3 p-2 bg-gray-50 rounded-md">
        <div className="flex items-center justify-between">
          <span className="font-medium text-xs text-gray-700">Deadline</span>
          {timeRemaining && !timeRemaining.expired ? (
            <div className={`font-bold text-xs ${getTimerColor()}`}>
              {timeRemaining.days > 0 && <span>{timeRemaining.days}d </span>}
              {timeRemaining.hours > 0 && <span>{timeRemaining.hours}h </span>}
              <span>{timeRemaining.minutes}m</span>
            </div>
          ) : (
            <div className="font-bold text-xs text-red-600">Closed</div>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1">{formatDate(job.endDate)}</div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div className="flex items-center gap-1">
          <PeopleIcon className="text-blue-600 text-sm" />
          <span className="text-gray-700">
            <span className="font-semibold">{job.vacancies}</span> Posts
          </span>
        </div>
        <div className="flex items-center gap-1">
          <AttachMoneyIcon className="text-green-600 text-sm" />
          <span className="text-gray-700">{job.applicationFee}</span>
        </div>
        <div className="flex items-center gap-1">
          <CakeIcon className="text-purple-600 text-sm" />
          <span className="text-gray-700">{job.ageLimit}</span>
        </div>
        <div className="flex items-center gap-1">
          <SchoolIcon className="text-orange-600 text-sm" />
          <span className="text-gray-700 truncate">{job.eligibility.split(" ").slice(0, 2).join(" ")}</span>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="bg-blue-50 p-2 rounded-md">
          <div className="flex items-start gap-1">
            <SchoolIcon className="text-orange-600 text-sm mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-xs line-clamp-2">{job.eligibility}</span>
          </div>
        </div>
        <div className="bg-indigo-50 p-2 rounded-md">
          <div className="flex items-start gap-1">
            <AssignmentIcon className="text-indigo-600 text-sm mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-xs line-clamp-2">{job.selectionProcess}</span>
          </div>
        </div>
      </div>

      <div className="mb-3 p-2 bg-blue-50 rounded-md">
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span className="font-medium">Start:</span>
            <span>{formatDate(job.startDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">End:</span>
            <span>{formatDate(job.endDate)}</span>
          </div>
        </div>
      </div>

      {isActive ? (
        <a
          href={job.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2 group-hover:shadow-md"
        >
          <LaunchIcon className="text-sm" />
          Apply Now
        </a>
      ) : (
        <div className="w-full bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
          <LockIcon className="text-sm" />
          Application Closed
        </div>
      )}
    </div>
  )
}
