"use client"

import { useState, useEffect } from "react"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import WorkIcon from "@mui/icons-material/Work"

export default function JobManagement() {
  const [jobs, setJobs] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    salary: "",
    location: "",
    experience: "",
    description: "",
    requirements: "",
    skills: "",
    jobType: "Full-time",
    applicationDeadline: "",
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/admin/jobs")
      const data = await response.json()
      if (data.success) {
        setJobs(data.jobs)
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
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
      requirements: formData.requirements.split("\n").filter((req) => req.trim()),
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill),
      postedDate: new Date().toISOString(),
    }

    try {
      const url = editingJob ? `/api/admin/jobs/${editingJob.id}` : "/api/admin/jobs"
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
        alert(editingJob ? "Job updated successfully!" : "Job created successfully!")
      } else {
        alert("Failed to save job")
      }
    } catch (error) {
      alert("Error saving job")
    }
  }

  const handleEdit = (job) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      company: job.company,
      salary: job.salary,
      location: job.location,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements.join("\n"),
      skills: job.skills.join(", "),
      jobType: job.jobType,
      applicationDeadline: job.applicationDeadline,
    })
    setShowForm(true)
  }

  const handleDelete = async (jobId) => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(`/api/admin/jobs/${jobId}`, {
          method: "DELETE",
        })

        const result = await response.json()

        if (result.success) {
          fetchJobs()
          alert("Job deleted successfully!")
        } else {
          alert("Failed to delete job")
        }
      } catch (error) {
        alert("Error deleting job")
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      salary: "",
      location: "",
      experience: "",
      description: "",
      requirements: "",
      skills: "",
      jobType: "Full-time",
      applicationDeadline: "",
    })
    setEditingJob(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Private Jobs Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <AddIcon />
          Add New Job
        </button>
      </div>

      {/* Job Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{editingJob ? "Edit Job" : "Add New Job"}</h3>

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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary *</label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., ₹8-12 LPA"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience *</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 2-4 years"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (one per line) *</label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Bachelor's degree in Computer Science&#10;2+ years of experience with React.js&#10;Strong knowledge of HTML, CSS, JavaScript"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated) *</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    required
                    placeholder="React, JavaScript, HTML, CSS, Git"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
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

      {/* Jobs List */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Job Listings</h3>
          {jobs.length === 0 ? (
            <div className="text-center py-8">
              <WorkIcon className="text-gray-300 text-4xl mx-auto mb-4" />
              <p className="text-gray-500">No jobs found. Add your first job listing!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                      <p className="text-gray-600">{job.company}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>{job.location}</span>
                        <span>{job.salary}</span>
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(job)} className="text-blue-600 hover:text-blue-800 p-2">
                        <EditIcon />
                      </button>
                      <button onClick={() => handleDelete(job.id)} className="text-red-600 hover:text-red-800 p-2">
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
