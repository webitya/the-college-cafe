"use client"

import { useState, useEffect } from "react"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"

export default function GovernmentJobManagement() {
  const [jobs, setJobs] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    vacancies: "",
    applicationLink: "",
    startDate: "",
    endDate: "",
    eligibility: "",
    ageLimit: "",
    applicationFee: "",
    selectionProcess: "",
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/admin/government-jobs")
      const data = await response.json()
      if (data.success) {
        setJobs(data.jobs)
      }
    } catch (error) {
      console.error("Failed to fetch government jobs:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const jobData = {
      ...formData,
      vacancies: Number.parseInt(formData.vacancies),
    }

    try {
      const url = editingJob ? `/api/admin/government-jobs/${editingJob.id}` : "/api/admin/government-jobs"
      const method = editingJob ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      })

      const result = await response.json()

      if (result.success) {
        fetchJobs()
        resetForm()
        alert(editingJob ? "Government job updated successfully!" : "Government job created successfully!")
      } else {
        alert("Failed to save government job")
      }
    } catch (error) {
      alert("Error saving government job")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      department: "",
      vacancies: "",
      applicationLink: "",
      startDate: "",
      endDate: "",
      eligibility: "",
      ageLimit: "",
      applicationFee: "",
      selectionProcess: "",
    })
    setEditingJob(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Government Jobs Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <AddIcon />
          Add Government Job
        </button>
      </div>

      {/* Government Job Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {editingJob ? "Edit Government Job" : "Add New Government Job"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Vacancies *</label>
                    <input
                      type="number"
                      name="vacancies"
                      value={formData.vacancies}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Application Fee *</label>
                    <input
                      type="text"
                      name="applicationFee"
                      value={formData.applicationFee}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., ₹500"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age Limit *</label>
                    <input
                      type="text"
                      name="ageLimit"
                      value={formData.ageLimit}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 35 years"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Application Link *</label>
                    <input
                      type="url"
                      name="applicationLink"
                      value={formData.applicationLink}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Application Start Date *</label>
                    <input
                      type="datetime-local"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Application End Date *</label>
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria *</label>
                  <textarea
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selection Process *</label>
                  <textarea
                    name="selectionProcess"
                    value={formData.selectionProcess}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    {editingJob ? "Update Job" : "Create Job"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Government Jobs List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Government Job Listings</h3>
          {jobs.length === 0 ? (
            <div className="text-center py-8">
              <AccountBalanceIcon className="text-gray-300 text-4xl mx-auto mb-4" />
              <p className="text-gray-500">No government jobs found. Add your first government job listing!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                      <p className="text-gray-600">{job.department}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{job.vacancies} Vacancies</span>
                        <span>Fee: {job.applicationFee}</span>
                        <span>Age: {job.ageLimit}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <span>Deadline: {new Date(job.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingJob(job)
                          setFormData({
                            title: job.title,
                            department: job.department,
                            vacancies: job.vacancies.toString(),
                            applicationLink: job.applicationLink,
                            startDate: job.startDate.slice(0, 16),
                            endDate: job.endDate.slice(0, 16),
                            eligibility: job.eligibility,
                            ageLimit: job.ageLimit,
                            applicationFee: job.applicationFee,
                            selectionProcess: job.selectionProcess,
                          })
                          setShowForm(true)
                        }}
                        className="text-blue-600 hover:text-blue-800 p-2"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this government job?")) {
                            // Handle delete
                            alert("Delete functionality would be implemented here")
                          }
                        }}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <DeleteIcon />
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
