"use client"

import { useState, useEffect } from "react"
import { collegeNewsData, newsCategories, searchColleges } from "../../data/CollegeNewsData/collegeNewsData"
import Header from "../../components/shared/Header"
import Footer from "../../components/shared/Footer"
import SearchIcon from "@mui/icons-material/Search"
import SchoolIcon from "@mui/icons-material/School"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import LaunchIcon from "@mui/icons-material/Launch"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import ShareIcon from "@mui/icons-material/Share"
import FilterListIcon from "@mui/icons-material/FilterList"
import SortIcon from "@mui/icons-material/Sort"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PeopleIcon from "@mui/icons-material/People"
import BusinessIcon from "@mui/icons-material/Business"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import NotificationsIcon from "@mui/icons-material/Notifications"

export default function CollegeNewsPage() {
  const [selectedCollege, setSelectedCollege] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [bookmarkedNews, setBookmarkedNews] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [collegeTypeFilter, setCollegeTypeFilter] = useState("all")
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBookmarks = localStorage.getItem("collegeNewsBookmarks")
      if (savedBookmarks) {
        setBookmarkedNews(JSON.parse(savedBookmarks))
      }

      const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768)
      checkIsDesktop()
      window.addEventListener("resize", checkIsDesktop)
      return () => window.removeEventListener("resize", checkIsDesktop)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("collegeNewsBookmarks", JSON.stringify(bookmarkedNews))
    }
  }, [bookmarkedNews])

  const filteredColleges = searchColleges(collegeNewsData, searchTerm).filter((college) => {
    const matchesType = collegeTypeFilter === "all" || college.type.toLowerCase() === collegeTypeFilter.toLowerCase()
    return matchesType
  })

  const getFilteredAndSortedNews = (news) => {
    let filteredNews = [...news]

    if (selectedCategory !== "all") {
      filteredNews = filteredNews.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Sort news
    filteredNews.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date) - new Date(a.date)
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return new Date(b.date) - new Date(a.date)
      }
    })

    return filteredNews
  }

  const toggleBookmark = (newsId) => {
    setBookmarkedNews((prev) => (prev.includes(newsId) ? prev.filter((id) => id !== newsId) : [...prev, newsId]))
  }

  const shareNews = async (newsItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: newsItem.title,
          text: newsItem.description,
          url: newsItem.learnMoreLink,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${newsItem.title}\n${newsItem.description}\n${newsItem.learnMoreLink}`)
      alert("News details copied to clipboard!")
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#dc2626"
      case "medium":
        return "#ea580c"
      case "low":
        return "#059669"
      default:
        return "#6b7280"
    }
  }

  const getCategoryColor = (category) => {
    const categoryObj = newsCategories.find((cat) => cat.id === category.toLowerCase())
    return categoryObj ? categoryObj.color : "#6b7280"
  }

  if (selectedCollege) {
    const filteredNews = getFilteredAndSortedNews(selectedCollege.news)

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#fef7e6" }}>
        <Header />

        {/* Enhanced Header with College Info */}
        <div style={{ backgroundColor: "#f59e0b", padding: "16px 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
              <button
                onClick={() => setSelectedCollege(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "white",
                  color: "#f59e0b",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                <ArrowBackIcon style={{ fontSize: "20px" }} />
                Back
              </button>
              <div style={{ flex: 1 }}>
                <h1 style={{ color: "white", fontSize: "24px", fontWeight: "bold", margin: "0" }}>
                  {selectedCollege.shortName}
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <LocationOnIcon style={{ fontSize: "16px", color: "white", opacity: "0.8" }} />
                    <span style={{ color: "white", fontSize: "14px", opacity: "0.9" }}>{selectedCollege.location}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <BusinessIcon style={{ fontSize: "16px", color: "white", opacity: "0.8" }} />
                    <span style={{ color: "white", fontSize: "14px", opacity: "0.9" }}>{selectedCollege.type}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <PeopleIcon style={{ fontSize: "16px", color: "white", opacity: "0.8" }} />
                    <span style={{ color: "white", fontSize: "14px", opacity: "0.9" }}>
                      {selectedCollege.totalStudents}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FilterListIcon style={{ fontSize: "20px", color: "white" }} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#374151",
                  }}
                >
                  {newsCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <SortIcon style={{ fontSize: "20px", color: "white" }} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "#374151",
                  }}
                >
                  <option value="date">Latest First</option>
                  <option value="priority">Priority</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* News Content */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#1f2937", marginBottom: "4px" }}>
              Latest News & Updates
            </h2>
            <p style={{ color: "#6b7280", margin: "0", fontSize: "14px" }}>{filteredNews.length} news items found</p>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {filteredNews.map((newsItem) => (
              <div
                key={newsItem.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "20px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        backgroundColor: getCategoryColor(newsItem.category),
                        color: "white",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {newsItem.category}
                    </div>
                    <div
                      style={{
                        backgroundColor: getPriorityColor(newsItem.priority),
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "10px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                      }}
                    >
                      {newsItem.priority}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <CalendarTodayIcon style={{ fontSize: "14px", color: "#6b7280" }} />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>{formatDate(newsItem.date)}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      onClick={() => toggleBookmark(newsItem.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {bookmarkedNews.includes(newsItem.id) ? (
                        <BookmarkIcon style={{ fontSize: "18px", color: "#f59e0b" }} />
                      ) : (
                        <BookmarkBorderIcon style={{ fontSize: "18px", color: "#6b7280" }} />
                      )}
                    </button>
                    <button
                      onClick={() => shareNews(newsItem)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ShareIcon style={{ fontSize: "18px", color: "#6b7280" }} />
                    </button>
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#1f2937",
                    marginBottom: "8px",
                    lineHeight: "1.3",
                  }}
                >
                  {newsItem.title}
                </h3>

                <p
                  style={{
                    color: "#4b5563",
                    lineHeight: "1.5",
                    marginBottom: "12px",
                    fontSize: "14px",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {newsItem.description}
                </p>

                <a
                  href={newsItem.learnMoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "#f59e0b",
                    color: "white",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontWeight: "600",
                    fontSize: "13px",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#d97706")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#f59e0b")}
                >
                  {newsItem.buttonText || "Learn More"}
                  <LaunchIcon style={{ fontSize: "14px" }} />
                </a>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <NotificationsIcon style={{ fontSize: "48px", color: "#d1d5db", marginBottom: "12px" }} />
              <h3 style={{ fontSize: "18px", color: "#6b7280", marginBottom: "6px" }}>No news found</h3>
              <p style={{ color: "#9ca3af", margin: "0", fontSize: "14px" }}>
                Try adjusting your filters to see more news.
              </p>
            </div>
          )}
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fef7e6" }}>
      <Header />

      <div style={{ backgroundColor: "#f59e0b", padding: "16px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
          {/* Compact Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SchoolIcon style={{ fontSize: "24px", color: "white" }} />
            </div>
            <div>
              <h1 style={{ color: "white", fontSize: "24px", fontWeight: "bold", margin: "0", lineHeight: "1.2" }}>
                College News Hub
              </h1>
              <p style={{ color: "white", fontSize: "13px", margin: "0", opacity: "0.9", lineHeight: "1.3" }}>
                Stay updated with latest exam schedules, holidays, and announcements
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "12px",
              flexDirection: isDesktop ? "row" : "column",
            }}
          >
            {/* Search Bar */}
            <div style={{ position: "relative", flex: "1" }}>
              <SearchIcon
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                  fontSize: "18px",
                }}
              />
              <input
                type="text"
                placeholder="Search colleges by name, location, type, or abbreviation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 40px",
                  fontSize: "14px",
                  border: "none",
                  borderRadius: "8px",
                  outline: "none",
                  backgroundColor: "white",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Filter Dropdown */}
            <select
              value={collegeTypeFilter}
              onChange={(e) => setCollegeTypeFilter(e.target.value)}
              style={{
                padding: "10px 12px",
                fontSize: "14px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "white",
                color: "#374151",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                minWidth: "140px",
                cursor: "pointer",
              }}
            >
              <option value="all">All Types</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              padding: "8px 16px",
              borderRadius: "8px",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <TrendingUpIcon style={{ fontSize: "16px", color: "white", opacity: "0.9" }} />
              <span style={{ color: "white", fontSize: "13px", fontWeight: "600" }}>
                {filteredColleges.length} of {collegeNewsData.length} colleges
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <NotificationsIcon style={{ fontSize: "16px", color: "white", opacity: "0.9" }} />
              <span style={{ color: "white", fontSize: "13px", fontWeight: "600" }}>
                {filteredColleges.reduce((total, college) => total + college.news.length, 0)} total news
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              onClick={() => setSelectedCollege(college)}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "16px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
                transition: "all 0.2s",
                transform: "translateY(0)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)"
                e.currentTarget.style.borderColor = "#f59e0b"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)"
                e.currentTarget.style.borderColor = "#e5e7eb"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
                <div
                  style={{
                    backgroundColor: "#fef3c7",
                    padding: "8px",
                    borderRadius: "6px",
                    flexShrink: 0,
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {college.logo ? (
                    <img
                      src={college.logo || "/placeholder.svg"}
                      alt={`${college.shortName} logo`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "2px",
                      }}
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        e.target.style.display = "none"
                        e.target.nextSibling.style.display = "block"
                      }}
                    />
                  ) : null}
                  <SchoolIcon
                    style={{
                      fontSize: "20px",
                      color: "#f59e0b",
                      display: college.logo ? "none" : "block",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#1f2937",
                      margin: "0 0 4px 0",
                      lineHeight: "1.3",
                    }}
                  >
                    {college.shortName}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <LocationOnIcon style={{ fontSize: "14px", color: "#6b7280" }} />
                    <span style={{ color: "#6b7280", fontSize: "12px" }}>{college.location}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <BusinessIcon style={{ fontSize: "12px", color: "#6b7280" }} />
                      <span style={{ color: "#6b7280", fontSize: "11px" }}>{college.type}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <PeopleIcon style={{ fontSize: "12px", color: "#6b7280" }} />
                      <span style={{ color: "#6b7280", fontSize: "11px" }}>{college.totalStudents}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "12px",
                  borderTop: "1px solid #f3f4f6",
                }}
              >
                <span style={{ color: "#6b7280", fontSize: "12px" }}>{college.news.length} updates</span>
                <div
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: "600",
                  }}
                >
                  View News
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <SchoolIcon style={{ fontSize: "48px", color: "#d1d5db", marginBottom: "12px" }} />
            <h3 style={{ fontSize: "18px", color: "#6b7280", marginBottom: "6px" }}>No colleges found</h3>
            <p style={{ color: "#9ca3af", margin: "0", fontSize: "14px", maxWidth: "400px", margin: "0 auto" }}>
              {searchTerm
                ? `No colleges match "${searchTerm}". Try searching with abbreviations (IIT, NIT), location (Ranchi), or college type.`
                : "Try adjusting your search terms or filters."}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
