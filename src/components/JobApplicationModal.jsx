"use client"

import { useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import BusinessIcon from "@mui/icons-material/Business"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import WorkIcon from "@mui/icons-material/Work"
import PersonIcon from "@mui/icons-material/Person"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import CakeIcon from "@mui/icons-material/Cake"
import SchoolIcon from "@mui/icons-material/School"
import AttachFileIcon from "@mui/icons-material/AttachFile"

export default function JobApplicationModal({ job, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    qualification: "",
    resume: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({
        ...prev,
        resume: file,
      }))
    } else {
      alert("Please select a PDF file for your resume")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("age", formData.age)
      formDataToSend.append("qualification", formData.qualification)
      formDataToSend.append("jobId", job.id)
      formDataToSend.append("jobTitle", job.title)
      formDataToSend.append("company", job.company)
      if (formData.resume) {
        formDataToSend.append("resume", formData.resume)
      }

      const response = await fetch("/api/apply-job", {
        method: "POST",
        body: formDataToSend,
      })

      const result = await response.json()

      if (result.success) {
        setSubmitMessage("Application submitted successfully! Check your email for confirmation.")
        setTimeout(() => {
          onClose()
          setFormData({
            name: "",
            email: "",
            phone: "",
            age: "",
            qualification: "",
            resume: null,
          })
          setSubmitMessage("")
        }, 3000)
      } else {
        setSubmitMessage("Failed to submit application. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/20 bg-white/50 backdrop-blur-sm rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Apply for Job</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-white/30"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Job Details</h3>
                <div className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl p-4 space-y-3 shadow-lg">
                  <h4 className="text-lg font-semibold text-gray-800">{job.title}</h4>

                  <div className="flex items-center gap-2 text-gray-600">
                    <BusinessIcon className="text-sm" />
                    <span>{job.company}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <LocationOnIcon className="text-sm" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <AttachMoneyIcon className="text-green-600 text-sm" />
                    <span className="font-semibold text-green-600">{job.salary}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <WorkIcon className="text-blue-600 text-sm" />
                    <span className="text-gray-700">{job.experience}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Job Description</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>
              </div>

              <div className="bg-white/40 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Requirements</h4>
                <ul className="space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600 text-sm flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/40 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-amber-100/80 backdrop-blur-sm text-amber-800 text-sm rounded-full border border-amber-200/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Application Form</h3>

              {submitMessage && (
                <div
                  className={`p-4 rounded-xl mb-4 backdrop-blur-sm border ${
                    submitMessage.includes("successfully")
                      ? "bg-green-100/80 text-green-800 border-green-200/50"
                      : "bg-red-100/80 text-red-800 border-red-200/50"
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              <div className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl p-6 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <PersonIcon className="text-sm" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-white/40 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <EmailIcon className="text-sm" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-white/40 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <PhoneIcon className="text-sm" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-white/40 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <CakeIcon className="text-sm" />
                      Age *
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      min="18"
                      max="65"
                      className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-white/40 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Enter your age"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <SchoolIcon className="text-sm" />
                      Qualification *
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-white/40 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Enter your highest qualification"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                      <AttachFileIcon className="text-sm" />
                      Resume (PDF) *
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      required
                      className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-white/40 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50/80 file:text-amber-700 hover:file:bg-amber-100/80"
                    />
                    {formData.resume && <p className="text-sm text-green-600 mt-1">Selected: {formData.resume.name}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-500/90 hover:bg-amber-600/90 disabled:bg-gray-400/70 backdrop-blur-sm text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-lg"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
