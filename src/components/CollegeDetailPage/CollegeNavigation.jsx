"use client"
import { useState } from "react"

export default function CollegeNavigation() {
  const [activeSection, setActiveSection] = useState("overview")

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "courses", label: "Courses & Fees" },
    { id: "campus", label: "Campus" },
    { id: "gallery", label: "Gallery" },
    { id: "placement", label: "Placement" },
    { id: "admissions", label: "Admissions" },
    { id: "notices", label: "Notices & Updates" },
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                activeSection === item.id
                  ? "border-yellow-500 text-yellow-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
