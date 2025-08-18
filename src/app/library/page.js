"use client"

import { useState, useMemo } from "react"
import SearchIcon from "@mui/icons-material/Search"
import DownloadIcon from "@mui/icons-material/Download"
import FolderIcon from "@mui/icons-material/Folder"
import PictureAsPdf from "@mui/icons-material/PictureAsPdf"
import ExpandMore from "@mui/icons-material/ExpandMore"
import ExpandLess from "@mui/icons-material/ExpandLess"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { studyMaterials } from "../../data/studyMaterials/studyMaterials"
import Footer from "../../components/shared/Footer"
import Header from "../../components/shared/Header"

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCourses, setExpandedCourses] = useState({})
  const [selectedSubject, setSelectedSubject] = useState("")
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const searchMaterials = (searchTerm, materials, subjectKey, courseName) => {
    if (!searchTerm.trim()) return materials

    const searchWords = searchTerm.toLowerCase().trim().split(/\s+/)

    return materials.filter((material) => {
      const searchableText = [
        material.name,
        subjectKey,
        courseName,
        material.size || "",
        // Add more searchable fields if available
      ]
        .join(" ")
        .toLowerCase()

      // Check if any search word matches any part of the searchable text
      return searchWords.some((word) => {
        // Exact word match
        if (searchableText.includes(word)) return true

        // Fuzzy matching for typos (simple Levenshtein-like approach)
        const words = searchableText.split(/\s+/)
        return words.some((textWord) => {
          if (textWord.length < 3 || word.length < 3) {
            return textWord.startsWith(word) || word.startsWith(textWord)
          }

          // Allow 1-2 character differences for longer words
          const maxDiff = Math.floor(Math.max(word.length, textWord.length) * 0.3)
          return getLevenshteinDistance(word, textWord) <= maxDiff
        })
      })
    })
  }

  const getLevenshteinDistance = (str1, str2) => {
    const matrix = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null))

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
        matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + indicator)
      }
    }

    return matrix[str2.length][str1.length]
  }

  const filteredMaterials = useMemo(() => {
    let filtered = studyMaterials

    if (searchTerm.trim()) {
      const searchFiltered = {}

      Object.keys(studyMaterials).forEach((courseKey) => {
        const course = studyMaterials[courseKey]
        const filteredSubjects = {}

        Object.keys(course.subjects).forEach((subjectKey) => {
          const materials = searchMaterials(searchTerm, course.subjects[subjectKey], subjectKey, course.name)

          if (materials.length > 0) {
            filteredSubjects[subjectKey] = materials
          }
        })

        if (Object.keys(filteredSubjects).length > 0) {
          searchFiltered[courseKey] = {
            ...course,
            subjects: filteredSubjects,
          }
        }
      })

      filtered = searchFiltered
    }

    if (selectedSubject) {
      const subjectFiltered = {}

      Object.keys(filtered).forEach((courseKey) => {
        const course = filtered[courseKey]
        const filteredSubjects = {}

        Object.keys(course.subjects).forEach((subjectKey) => {
          if (subjectKey.toLowerCase() === selectedSubject.toLowerCase()) {
            filteredSubjects[subjectKey] = course.subjects[subjectKey]
          }
        })

        if (Object.keys(filteredSubjects).length > 0) {
          subjectFiltered[courseKey] = {
            ...course,
            subjects: filteredSubjects,
          }
        }
      })

      filtered = subjectFiltered
    }

    return filtered
  }, [searchTerm, selectedSubject])

  const toggleCourse = (courseKey) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [courseKey]: !prev[courseKey],
    }))
  }

  const selectSubject = (subjectKey) => {
    if (selectedSubject === subjectKey) {
      setSelectedSubject("")
    } else {
      setSelectedSubject(subjectKey)
    }
    setIsMobileDrawerOpen(false)
  }

  const getDownloadUrl = (viewUrl) => {
    const fileId = viewUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
    return fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : viewUrl
  }

  const handleDownload = async (url, fileName) => {
    setIsLoading(true)
    try {
      const downloadUrl = getDownloadUrl(url)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = fileName
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setTimeout(() => setIsLoading(false), 1000)
    }
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-white">
        {/* Desktop Sidebar */}
        <aside
          className="fixed top-16 left-0 h-full w-80 bg-white shadow-xl z-10 hidden lg:block border-r border-gray-200"
          role="navigation"
          aria-label="Course categories"
        >
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Course Categories</h2>

            {/* Search in Sidebar */}
            <div className="relative">
              <SearchIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 text-lg"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Search study materials"
              />
            </div>
          </div>

          <div className="overflow-y-auto" style={{ height: "calc(100vh - 200px)" }}>
            <div className="p-4">
              {Object.keys(studyMaterials).map((courseKey) => (
                <div key={courseKey} className="mb-3">
                  <button
                    onClick={() => toggleCourse(courseKey)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                    aria-expanded={expandedCourses[courseKey]}
                    aria-controls={`course-${courseKey}`}
                  >
                    <div className="flex items-center gap-2">
                      <FolderIcon className="text-blue-500 text-lg" aria-hidden="true" />
                      <span className="font-medium text-gray-800">{courseKey}</span>
                    </div>
                    {expandedCourses[courseKey] ? (
                      <ExpandLess className="text-gray-500" aria-hidden="true" />
                    ) : (
                      <ExpandMore className="text-gray-500" aria-hidden="true" />
                    )}
                  </button>

                  {expandedCourses[courseKey] && (
                    <div id={`course-${courseKey}`} className="mt-2 ml-4 space-y-1">
                      {Object.keys(studyMaterials[courseKey].subjects).map((subjectKey) => (
                        <button
                          key={subjectKey}
                          onClick={() => selectSubject(subjectKey)}
                          className={`w-full flex items-center justify-between p-2 rounded-md transition-colors ${
                            selectedSubject === subjectKey
                              ? "bg-yellow-100 border border-yellow-300 text-yellow-800"
                              : "bg-white hover:bg-gray-50 border border-gray-200"
                          }`}
                          aria-pressed={selectedSubject === subjectKey}
                        >
                          <span className="text-sm font-medium">
                            {selectedSubject === subjectKey && "✓ "}
                            {subjectKey}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              selectedSubject === subjectKey ? "bg-yellow-500 text-white" : "bg-blue-500 text-white"
                            }`}
                            aria-label={`${studyMaterials[courseKey].subjects[subjectKey].length} materials available`}
                          >
                            {studyMaterials[courseKey].subjects[subjectKey].length}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm fixed top-16 left-0 right-0 z-10 lg:hidden">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label="Open course categories menu"
              >
                <MenuIcon className="text-blue-600" />
              </button>

              <div className="relative flex-1">
                <SearchIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 text-lg"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  aria-label="Search study materials"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:block bg-white border-b border-gray-200 shadow-sm fixed top-16 left-80 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="relative max-w-md mx-auto">
              <SearchIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 text-lg"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Search study materials"
              />
            </div>
          </div>
        </header>

        {/* Mobile Drawer */}
        <aside
          className={`fixed top-16 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 lg:hidden ${
            isMobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="navigation"
          aria-label="Course categories"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Course Categories</h2>
              <button onClick={() => setIsMobileDrawerOpen(false)} className="p-1 rounded hover:bg-gray-100">
                <CloseIcon className="text-gray-500" />
              </button>
            </div>

            {/* Search in Mobile Drawer */}
            <div className="relative">
              <SearchIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 text-lg"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-y-auto" style={{ height: "calc(100vh - 220px)" }}>
            <div className="p-4">
              {Object.keys(studyMaterials).map((courseKey) => (
                <div key={courseKey} className="mb-3">
                  <button
                    onClick={() => toggleCourse(courseKey)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                    aria-expanded={expandedCourses[courseKey]}
                    aria-controls={`course-${courseKey}`}
                  >
                    <div className="flex items-center gap-2">
                      <FolderIcon className="text-blue-500 text-lg" aria-hidden="true" />
                      <span className="font-medium text-gray-800">{courseKey}</span>
                    </div>
                    {expandedCourses[courseKey] ? (
                      <ExpandLess className="text-gray-500" aria-hidden="true" />
                    ) : (
                      <ExpandMore className="text-gray-500" aria-hidden="true" />
                    )}
                  </button>

                  {expandedCourses[courseKey] && (
                    <div id={`course-${courseKey}`} className="mt-2 ml-4 space-y-1">
                      {Object.keys(studyMaterials[courseKey].subjects).map((subjectKey) => (
                        <button
                          key={subjectKey}
                          onClick={() => selectSubject(subjectKey)}
                          className={`w-full flex items-center justify-between p-2 rounded-md transition-colors ${
                            selectedSubject === subjectKey
                              ? "bg-yellow-100 border border-yellow-300 text-yellow-800"
                              : "bg-white hover:bg-gray-50 border border-gray-200"
                          }`}
                          aria-pressed={selectedSubject === subjectKey}
                        >
                          <span className="text-sm font-medium">
                            {selectedSubject === subjectKey && "✓ "}
                            {subjectKey}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              selectedSubject === subjectKey ? "bg-yellow-500 text-white" : "bg-blue-500 text-white"
                            }`}
                            aria-label={`${studyMaterials[courseKey].subjects[subjectKey].length} materials available`}
                          >
                            {studyMaterials[courseKey].subjects[subjectKey].length}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:ml-80 pt-14 lg:pt-14" role="main">
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Hidden H1 for SEO */}
            <h1 className="sr-only">Digital Library - Free Study Materials and Educational PDFs</h1>

            {/* Filter Status */}
            {selectedSubject && (
              <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-yellow-800">Filtered by: {selectedSubject}</h3>
                    <p className="text-sm text-yellow-700">Showing all {selectedSubject} materials</p>
                  </div>
                  <button
                    onClick={() => setSelectedSubject("")}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Clear Filter
                  </button>
                </div>
              </div>
            )}

            {/* Search Results */}
            {searchTerm && (
              <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-1">Search Results for {searchTerm}</h3>
                <p className="text-sm text-gray-600">
                  Found{" "}
                  {Object.keys(filteredMaterials).reduce(
                    (total, courseKey) =>
                      total +
                      Object.keys(filteredMaterials[courseKey].subjects).reduce(
                        (subTotal, subjectKey) => subTotal + filteredMaterials[courseKey].subjects[subjectKey].length,
                        0,
                      ),
                    0,
                  )}{" "}
                  materials
                </p>
              </div>
            )}

            {/* Materials Grid */}
            {Object.keys(filteredMaterials).length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <SearchIcon className="mx-auto text-gray-400 text-5xl mb-4" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No materials found</h3>
                <p className="text-gray-600">Try adjusting your search terms or browse categories</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.keys(filteredMaterials).map((courseKey) => (
                  <section key={courseKey} aria-labelledby={`course-heading-${courseKey}`}>
                    <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-4">
                      <h2 id={`course-heading-${courseKey}`} className="text-lg font-bold text-blue-800">
                        {filteredMaterials[courseKey].name} ({courseKey})
                      </h2>
                    </div>

                    {Object.keys(filteredMaterials[courseKey].subjects).map((subjectKey) => (
                      <div key={subjectKey} className="mb-6">
                        <h3 className="text-md font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                          {subjectKey}
                        </h3>

                        <div
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                          role="list"
                        >
                          {filteredMaterials[courseKey].subjects[subjectKey].map((material, index) => (
                            <article
                              key={index}
                              className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${
                                !material.available ? "opacity-60" : ""
                              }`}
                              role="listitem"
                            >
                              <div className="flex items-start gap-3">
                                <PictureAsPdf className="text-red-600 text-xl mt-1 flex-shrink-0" aria-hidden="true" />
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                                    {material.name}
                                    {!material.available && (
                                      <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
                                        Not Available
                                      </span>
                                    )}
                                  </h4>
                                  <p className="text-xs text-gray-500 mb-3">Size: {material.size}</p>
                                  <button
                                    onClick={() => material.available && handleDownload(material.url, material.name)}
                                    disabled={!material.available || isLoading}
                                    className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                                      material.available
                                        ? isLoading
                                          ? "bg-yellow-500 text-white cursor-wait"
                                          : "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                                    aria-label={`Download ${material.name} PDF`}
                                  >
                                    <DownloadIcon className="text-sm" aria-hidden="true" />
                                    {isLoading
                                      ? "Downloading..."
                                      : material.available
                                        ? "Download PDF"
                                        : "Not Available"}
                                  </button>
                                </div>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    ))}
                  </section>
                ))}
              </div>
            )}
          </div>
            <Footer />
        </main>
        
      </div>

    
    </>
  )
}
