"use client"

import { useState, useEffect } from "react"
import DashboardIcon from "@mui/icons-material/Dashboard"
import WorkIcon from "@mui/icons-material/Work"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import PeopleIcon from "@mui/icons-material/People"
import LogoutIcon from "@mui/icons-material/Logout"
import AddIcon from "@mui/icons-material/Add"
import JobManagement from "./JobManagement"
import GovernmentJobManagement from "./GovernmentJobManagement"
import ApplicationsManagement from "./ApplicationsManagement"

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalGovJobs: 0,
    totalApplications: 0,
    recentApplications: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: DashboardIcon },
    { id: "jobs", label: "Private Jobs", icon: WorkIcon },
    { id: "government-jobs", label: "Government Jobs", icon: AccountBalanceIcon },
    { id: "applications", label: "Applications", icon: PeopleIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <DashboardIcon className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogoutIcon />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === item.id
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="text-sm" />
                        {item.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                        <WorkIcon className="text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.totalJobs}</h3>
                        <p className="text-gray-600">Private Jobs</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <AccountBalanceIcon className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.totalGovJobs}</h3>
                        <p className="text-gray-600">Government Jobs</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <PeopleIcon className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.totalApplications}</h3>
                        <p className="text-gray-600">Total Applications</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <AddIcon className="text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.recentApplications}</h3>
                        <p className="text-gray-600">This Week</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setActiveTab("jobs")}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <WorkIcon className="text-amber-600" />
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-900">Add Private Job</h4>
                        <p className="text-sm text-gray-600">Create new job listing</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("government-jobs")}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <AccountBalanceIcon className="text-blue-600" />
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-900">Add Government Job</h4>
                        <p className="text-sm text-gray-600">Create new government opportunity</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "jobs" && <JobManagement />}
            {activeTab === "government-jobs" && <GovernmentJobManagement />}
            {activeTab === "applications" && <ApplicationsManagement />}
          </div>
        </div>
      </div>
    </div>
  )
}
