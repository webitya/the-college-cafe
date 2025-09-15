"use client"

import BusinessIcon from "@mui/icons-material/Business"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import WorkIcon from "@mui/icons-material/Work"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"

export default function JobCard({ job, onApplyClick }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getDaysAgo = (dateString) => {
    const posted = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - posted)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysAgo = getDaysAgo(job.postedDate)

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-gray-200 hover:border-amber-300 group">
      <div className="mb-3">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {job.title}
          </h3>
          {daysAgo <= 7 && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium ml-2 flex-shrink-0">
              New
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-gray-600 mb-1">
          <BusinessIcon className="text-sm" />
          <span className="font-medium text-sm">{job.company}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <LocationOnIcon className="text-sm" />
          <span className="text-sm">{job.location}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <AttachMoneyIcon className="text-green-600 text-sm" />
            <span className="font-semibold text-green-600 text-sm">{job.salary}</span>
          </div>
          <div className="flex items-center gap-1">
            <WorkIcon className="text-blue-600 text-sm" />
            <span className="text-gray-700 text-sm">{job.experience}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <CalendarTodayIcon className="text-xs" />
          <span className="text-xs">
            {daysAgo === 1 ? "Yesterday" : daysAgo <= 7 ? `${daysAgo} days ago` : formatDate(job.postedDate)}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-md font-medium">
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">+{job.skills.length - 4}</span>
          )}
        </div>
      </div>

      <p className="text-gray-600 text-xs mb-4 line-clamp-2 leading-relaxed">{job.description}</p>

      <button
        onClick={onApplyClick}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 flex items-center justify-center gap-2 group-hover:shadow-md"
      >
        <TrendingUpIcon className="text-sm" />
        Apply Now
      </button>
    </div>
  )
}
