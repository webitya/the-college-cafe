"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  FaDownload,
  FaFileAlt,
  FaVideo,
  FaHeadphones,
  FaImage,
  FaSearch,
  FaBook,
  FaStar,
  FaEye,
  FaChevronDown,
} from "react-icons/fa"
import { courses } from "../../lib/courseData"
import Header from "../../components/shared/Header"
import Footer from "../../components/shared/Footer"
const resources = [
  // Foundation English Resources
  {
    id: "foundation-alphabet-pdf",
    title: "English Alphabet & Pronunciation Guide",
    type: "pdf",
    courseId: "foundation-7",
    courseName: "Foundation English",
    lesson: 1,
    category: "Grammar",
    size: "2.3 MB",
    downloads: 1250,
    rating: 4.8,
    description: "Complete guide to English alphabet with pronunciation tips and practice exercises.",
    url: "/resources/foundation/alphabet-guide.pdf",
    isNew: true,
  },
  {
    id: "foundation-vocabulary-cards",
    title: "Basic Vocabulary Flashcards",
    type: "pdf",
    courseId: "foundation-7",
    courseName: "Foundation English",
    category: "Vocabulary",
    size: "1.8 MB",
    downloads: 980,
    rating: 4.6,
    description: "Essential vocabulary flashcards for beginners with images and examples.",
    url: "/resources/foundation/vocabulary-flashcards.pdf",
  },
  {
    id: "foundation-audio-pronunciation",
    title: "Pronunciation Audio Guide",
    type: "audio",
    courseId: "foundation-7",
    courseName: "Foundation English",
    lesson: 1,
    category: "Pronunciation",
    size: "15.2 MB",
    downloads: 756,
    rating: 4.9,
    description: "Audio guide for correct English pronunciation with native speaker examples.",
    url: "/resources/foundation/pronunciation-guide.mp3",
  },

  // Essential English Resources
  {
    id: "essential-grammar-workbook",
    title: "Grammar Mastery Workbook",
    type: "pdf",
    courseId: "essential-21",
    courseName: "Essential English",
    category: "Grammar",
    size: "5.7 MB",
    downloads: 2100,
    rating: 4.7,
    description: "Comprehensive grammar workbook with exercises and answer keys.",
    url: "/resources/essential/grammar-workbook.pdf",
    isPremium: true,
  },
  {
    id: "essential-reading-comprehension",
    title: "Reading Comprehension Practice",
    type: "pdf",
    courseId: "essential-21",
    courseName: "Essential English",
    category: "Reading",
    size: "3.4 MB",
    downloads: 1680,
    rating: 4.5,
    description: "Reading passages with comprehension questions for intermediate learners.",
    url: "/resources/essential/reading-practice.pdf",
  },
  {
    id: "essential-writing-templates",
    title: "Writing Templates & Examples",
    type: "pdf",
    courseId: "essential-21",
    courseName: "Essential English",
    category: "Writing",
    size: "2.1 MB",
    downloads: 1420,
    rating: 4.6,
    description: "Templates for essays, letters, and reports with examples.",
    url: "/resources/essential/writing-templates.pdf",
  },

  // Advanced English Resources
  {
    id: "advanced-business-english",
    title: "Business English Communication",
    type: "pdf",
    courseId: "advanced-30",
    courseName: "Advanced English",
    category: "Business",
    size: "4.2 MB",
    downloads: 890,
    rating: 4.8,
    description: "Professional communication guide for business environments.",
    url: "/resources/advanced/business-english.pdf",
    isNew: true,
  },
  {
    id: "advanced-academic-writing",
    title: "Academic Writing Guide",
    type: "pdf",
    courseId: "advanced-30",
    courseName: "Advanced English",
    category: "Academic",
    size: "6.1 MB",
    downloads: 1200,
    rating: 4.9,
    description: "Complete guide to academic writing with research and citation methods.",
    url: "/resources/advanced/academic-writing.pdf",
    isPremium: true,
  },

  // Master English Resources
  {
    id: "master-literature-analysis",
    title: "Literature Analysis Framework",
    type: "pdf",
    courseId: "master-90",
    courseName: "Master English",
    category: "Literature",
    size: "3.8 MB",
    downloads: 450,
    rating: 4.9,
    description: "Advanced framework for analyzing literature with examples from classic works.",
    url: "/resources/master/literature-analysis.pdf",
  },
  {
    id: "master-cultural-context",
    title: "Cultural Context in English",
    type: "video",
    courseId: "master-90",
    courseName: "Master English",
    category: "Culture",
    size: "120 MB",
    downloads: 320,
    rating: 4.7,
    description: "Video series exploring cultural nuances in English communication.",
    url: "/resources/master/cultural-context.mp4",
    isPremium: true,
  },

  // General Resources
  {
    id: "general-study-planner",
    title: "English Learning Study Planner",
    type: "pdf",
    courseId: "general",
    courseName: "General Resources",
    category: "Planning",
    size: "1.2 MB",
    downloads: 3200,
    rating: 4.4,
    description: "Customizable study planner to track your English learning progress.",
    url: "/resources/general/study-planner.pdf",
  },
  {
    id: "general-progress-tracker",
    title: "Progress Tracking Worksheet",
    type: "worksheet",
    courseId: "general",
    courseName: "General Resources",
    category: "Planning",
    size: "0.8 MB",
    downloads: 2800,
    rating: 4.3,
    description: "Track your daily progress and set learning goals.",
    url: "/resources/general/progress-tracker.pdf",
  },
]

export default function ResourcesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const getResourceIcon = (type) => {
    switch (type) {
      case "pdf":
        return FaFileAlt
      case "video":
        return FaVideo
      case "audio":
        return FaHeadphones
      case "image":
        return FaImage
      case "worksheet":
        return FaBook
      default:
        return FaFileAlt
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-800 border border-red-200"
      case "video":
        return "bg-blue-100 text-blue-800 border border-blue-200"
      case "audio":
        return "bg-green-100 text-green-800 border border-green-200"
      case "image":
        return "bg-purple-100 text-purple-800 border border-purple-200"
      case "worksheet":
        return "bg-orange-100 text-orange-800 border border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200"
    }
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "all" || resource.courseId === selectedCourse
    const matchesCategory =
      selectedCategory === "all" || resource.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesType = selectedType === "all" || resource.type === selectedType

    return matchesSearch && matchesCourse && matchesCategory && matchesType
  })

  const categories = Array.from(new Set(resources.map((r) => r.category)))
  const types = Array.from(new Set(resources.map((r) => r.type)))

  const handleDownload = (resource) => {
    console.log(`Downloading: ${resource.title}`)
  }

  return (
 <>
 <Header/>
   <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">LaieslyBird Resources</h1>
            <p className="text-xl opacity-90 mb-8">
              Download study materials, worksheets, and multimedia content to enhance your learning
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FaDownload className="h-5 w-5" />
                <span>{resources.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()} Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <FaFileAlt className="h-5 w-5" />
                <span>{resources.length} Resources</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBook className="h-5 w-5" />
                <span>All Courses</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Courses</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
                <option value="general">General Resources</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type.toUpperCase()}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const IconComponent = getResourceIcon(resource.type)
            return (
              <div
                key={resource.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6 pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold leading-tight text-gray-900">{resource.title}</h3>
                        <p className="text-sm text-gray-500">{resource.courseName}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {resource.isNew && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          New
                        </span>
                      )}
                      {resource.isPremium && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{resource.description}</p>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}
                    >
                      {resource.type.toUpperCase()}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                      {resource.category}
                    </span>
                    {resource.lesson && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                        Lesson {resource.lesson}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <FaDownload className="h-3 w-3" />
                        <span>{resource.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaStar className="h-3 w-3 text-yellow-400" />
                        <span>{resource.rating}</span>
                      </div>
                    </div>
                    <span>{resource.size}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(resource)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <FaDownload className="h-4 w-4" />
                      Download
                    </button>
                    <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                      <FaEye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <FaFileAlt className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">No resources found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}

        {/* Resource Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const categoryCount = resources.filter((r) => r.category === category).length
              return (
                <div
                  key={category}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-200 p-4 text-center"
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                >
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaBook className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-medium mb-1 text-gray-900">{category}</h3>
                  <p className="text-xs text-gray-500">{categoryCount} resources</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
 <Footer/>
 </>
  )
}
