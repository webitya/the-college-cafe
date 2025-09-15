"use client"

import { useState, useEffect } from "react"
import JobCard from "../../components/JobCard"
import JobApplicationModal from "../../components/JobApplicationModal"
import WorkIcon from "@mui/icons-material/Work"
import SearchIcon from "@mui/icons-material/Search"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import SortIcon from "@mui/icons-material/Sort"
import TuneIcon from "@mui/icons-material/Tune"
import Footer from "../../components/shared/Footer"
import Header from "../../components/shared/Header"

export default function JobsPage() {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [salaryRange, setSalaryRange] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [jobType, setJobType] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        search: searchTerm,
        location: locationFilter,
        experience: experienceLevel,
        jobType: jobType,
        sortBy:
          sortBy === "newest"
            ? "postedDate"
            : sortBy === "oldest"
              ? "postedDate"
              : sortBy.includes("salary")
                ? "salary"
                : "company",
        sortOrder: sortBy === "oldest" || sortBy === "salary-low" ? "asc" : "desc",
      })

      if (salaryRange) {
        const [min, max] = salaryRange.split("-")
        if (min) params.append("minSalary", min)
        if (max && max !== "+") params.append("maxSalary", max)
      }

      const response = await fetch(`/api/jobs?${params}`)
      if (!response.ok) throw new Error("Failed to fetch jobs")

      const data = await response.json()
      setJobs(data.jobs)
      setFilteredJobs(data.jobs)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error("Error fetching jobs:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [searchTerm, locationFilter, salaryRange, experienceLevel, jobType, sortBy])

  const handleApplyClick = (job) => {
    setSelectedJob(job)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedJob(null)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setLocationFilter("")
    setSalaryRange("")
    setExperienceLevel("")
    setJobType("")
    setSortBy("newest")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job opportunities...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <WorkIcon className="text-red-300 text-6xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-600 mb-2">Error Loading Jobs</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchJobs}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
  <>
  <Header/>
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <WorkIcon className="text-amber-500 text-2xl" />
            <h1 className="text-2xl font-bold text-gray-900">Job Opportunities</h1>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, skills, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <LocationOnIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full lg:w-48 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2.5 border rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
                    showFilters
                      ? "bg-amber-50 border-amber-300 text-amber-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <TuneIcon className="text-sm" />
                  Filters
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                    <select
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Any Salary</option>
                      <option value="0-3">₹0 - ₹3 LPA</option>
                      <option value="3-6">₹3 - ₹6 LPA</option>
                      <option value="6-10">₹6 - ₹10 LPA</option>
                      <option value="10+">₹10+ LPA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Any Experience</option>
                      <option value="fresher">Fresher</option>
                      <option value="1-2">1-2 Years</option>
                      <option value="3-5">3-5 Years</option>
                      <option value="5+">5+ Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Any Type</option>
                      <option value="developer">Developer</option>
                      <option value="designer">Designer</option>
                      <option value="manager">Manager</option>
                      <option value="analyst">Analyst</option>
                      <option value="engineer">Engineer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="salary-high">Salary: High to Low</option>
                      <option value="salary-low">Salary: Low to High</option>
                      <option value="company">Company A-Z</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-600 text-sm">
              Showing <span className="font-semibold">{filteredJobs.length}</span> job
              {filteredJobs.length !== 1 ? "s" : ""}
            </p>
            {(searchTerm || locationFilter || salaryRange || experienceLevel || jobType) && (
              <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">Filtered</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <SortIcon className="text-sm" />
            <span>Sorted by: {sortBy.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</span>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <WorkIcon className="text-gray-300 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No jobs found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search criteria or filters</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <JobCard key={job._id || job.id} job={job} onApplyClick={() => handleApplyClick(job)} />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && selectedJob && (
        <JobApplicationModal job={selectedJob} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
    <Footer/>
  </>
  )
}
