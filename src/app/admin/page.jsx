"use client"

import { useState, useEffect } from "react"
import AdminLogin from "../../components/AdminLogin"
import AdminDashboard from "../../components/AdminDashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if admin is already logged in
    const adminToken = localStorage.getItem("adminToken")
    if (adminToken) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (token) => {
    localStorage.setItem("adminToken", token)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated ? <AdminLogin onLogin={handleLogin} /> : <AdminDashboard onLogout={handleLogout} />}
    </div>
  )
}
