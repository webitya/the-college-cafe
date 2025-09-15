"use client"

import { useState, useEffect } from "react"
import PeopleIcon from "@mui/icons-material/People"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import WorkIcon from "@mui/icons-material/Work"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"

export default function ApplicationsManagement() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/admin/applications")
      const data = await response.json()
      if (data.success) {
        setApplications(data.applications)
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true
    if (filter === "pending") return app.status === "pending"
    if (filter === "reviewed") return app.status === "reviewed"
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Applications Management</h2>
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Applications ({filteredApplications.length})</h3>

          {filteredApplications.length === 0 ? (
            <div className="text-center py-8">
              <PeopleIcon className="text-gray-300 text-4xl mx-auto mb-4" />
              <p className="text-gray-500">No applications found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <div key={application._id} className="border border-gray-200 rounded-lg p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Applicant Details */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Applicant Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <PeopleIcon className="text-gray-500 text-sm" />
                          <span className="font-medium">{application.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <EmailIcon className="text-gray-500 text-sm" />
                          <a href={`mailto:${application.email}`} className="text-blue-600 hover:text-blue-800">
                            {application.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneIcon className="text-gray-500 text-sm" />
                          <a href={`tel:${application.phone}`} className="text-blue-600 hover:text-blue-800">
                            {application.phone}
                          </a>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Age:</span> {application.age}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Qualification:</span> {application.qualification}
                        </div>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Job Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <WorkIcon className="text-gray-500 text-sm" />
                          <span className="font-medium">{application.jobTitle}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Company:</span> {application.company}
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarTodayIcon className="text-gray-500 text-sm" />
                          <span className="text-sm text-gray-600">Applied: {formatDate(application.appliedAt)}</span>
                        </div>
                        {application.resumeFileName && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Resume:</span> {application.resumeFileName}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          application.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {application.status === "pending" ? "Pending Review" : "Reviewed"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          // Update status logic would go here
                          alert("Status update functionality would be implemented here")
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Mark as Reviewed
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
