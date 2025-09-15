"use client"

import { useState, useEffect } from "react"
import GovernmentJobCard from "../../components/GovernmentJobCard"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import SearchIcon from "@mui/icons-material/Search"
import FilterListIcon from "@mui/icons-material/FilterList"
import TuneIcon from "@mui/icons-material/Tune"
import SortIcon from "@mui/icons-material/Sort"
import Header from "../../components/shared/Header"
import Footer from "../../components/shared/Footer"

export default function GovernmentJobsPage() {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [vacancyRange, setVacancyRange] = useState("")
  const [feeRange, setFeeRange] = useState("")
  const [sortBy, setSortBy] = useState("deadline")
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")

  const fetchGovernmentJobs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        search: searchTerm,
        department: departmentFilter,
        sortBy:
          sortBy === "deadline"
            ? "endDate"
            : sortBy.includes("vacancies")
              ? "vacancies"
              : sortBy === "fee-low"
                ? "applicationFee"
                : sortBy,
        sortOrder: sortBy === "vacancies-low" || sortBy === "fee-low" ? "asc" : "desc",
      })

      if (vacancyRange) {
        const [min, max] = vacancyRange.split("-")
        if (min) params.append("minVacancies", min)
        if (max && max !== "+") params.append("maxVacancies", max)
      }

      if (feeRange && feeRange !== "free") {
        const [min, max] = feeRange.split("-")
        if (min) params.append("minFee", min)
        if (max && max !== "+") params.append("maxFee", max)
      }

      const response = await fetch(`/api/government-jobs?${params}`)
      if (!response.ok) throw new Error("Failed to fetch government jobs")

      const data = await response.json()

      const jobsWithStatus = data.governmentJobs.map((job) => ({
        ...job,
        isActive: new Date() < new Date(job.endDate),
        timeRemaining: calculateTimeRemaining(job.endDate),
      }))

      setJobs(jobsWithStatus)
      setFilteredJobs(jobsWithStatus)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error("Error fetching government jobs:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGovernmentJobs()
  }, [searchTerm, departmentFilter, vacancyRange, feeRange, sortBy])

  useEffect(() => {
    if (jobs.length === 0) return

    const interval = setInterval(() => {
      setJobs((prevJobs) =>
        prevJobs.map((job) => ({
          ...job,
          isActive: new Date() < new Date(job.endDate),
          timeRemaining: calculateTimeRemaining(job.endDate),
        })),
      )
    }, 60000)

    return () => clearInterval(interval)
  }, [jobs.length])

  useEffect(() => {
    let filtered = jobs

    if (statusFilter !== "all") {
      filtered = filtered.filter((job) => (statusFilter === "active" ? job.isActive : !job.isActive))
    }

    setFilteredJobs(filtered)
  }, [statusFilter, jobs])

  const calculateTimeRemaining = (endDate) => {
    const now = new Date()
    const end = new Date(endDate)
    const diff = end - now

    if (diff <= 0) {
      return { expired: true }
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return { days, hours, minutes, expired: false }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setDepartmentFilter("")
    setVacancyRange("")
    setFeeRange("")
    setSortBy("deadline")
    setStatusFilter("all")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading government job opportunities...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AccountBalanceIcon className="text-red-300 text-6xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-600 mb-2">Error Loading Government Jobs</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchGovernmentJobs}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const activeJobs = filteredJobs.filter((job) => job.isActive)
  const expiredJobs = filteredJobs.filter((job) => !job.isActive)

  return (
   <>
   <Header/>
 <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <AccountBalanceIcon className="text-blue-600 text-2xl" />
            <h1 className="text-2xl font-bold text-gray-900">Government Job Opportunities</h1>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, departments, eligibility, or selection process..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <FilterListIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Department"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full lg:w-48 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2.5 border rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
                    showFilters
                      ? "bg-blue-50 border-blue-300 text-blue-700"
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Jobs</option>
                      <option value="active">Active Only</option>
                      <option value="expired">Expired Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vacancies</label>
                    <select
                      value={vacancyRange}
                      onChange={(e) => setVacancyRange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Any Vacancies</option>
                      <option value="1-10">1-10 Posts</option>
                      <option value="11-50">11-50 Posts</option>
                      <option value="51-100">51-100 Posts</option>
                      <option value="100+">100+ Posts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Application Fee</label>
                    <select
                      value={feeRange}
                      onChange={(e) => setFeeRange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Any Fee</option>
                      <option value="free">Free</option>
                      <option value="1-500">₹1 - ₹500</option>
                      <option value="501-1000">₹501 - ₹1000</option>
                      <option value="1000+">₹1000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="deadline">Deadline</option>
                      <option value="newest">Newest First</option>
                      <option value="vacancies-high">Most Vacancies</option>
                      <option value="vacancies-low">Least Vacancies</option>
                      <option value="fee-low">Lowest Fee</option>
                      <option value="department">Department A-Z</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Clear All
                    </button>
                  </div>
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
            <div className="flex gap-2">
              {activeJobs.length > 0 && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  {activeJobs.length} Active
                </span>
              )}
              {expiredJobs.length > 0 && (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                  {expiredJobs.length} Expired
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <SortIcon className="text-sm" />
            <span>Sorted by: {sortBy.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</span>
          </div>
        </div>

        {activeJobs.length > 0 && (statusFilter === "all" || statusFilter === "active") && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-bold text-gray-900">Active Recruitments</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {activeJobs.map((job) => (
                <GovernmentJobCard key={job._id || job.id} job={job} />
              ))}
            </div>
          </div>
        )}

        {expiredJobs.length > 0 && (statusFilter === "all" || statusFilter === "expired") && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-900">Closed Recruitments</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {expiredJobs.map((job) => (
                <GovernmentJobCard key={job._id || job.id} job={job} />
              ))}
            </div>
          </div>
        )}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <AccountBalanceIcon className="text-gray-300 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No government jobs found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search criteria or filters</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>

   <Footer/>
   </>
  )
}
