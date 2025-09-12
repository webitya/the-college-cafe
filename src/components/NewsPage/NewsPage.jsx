"use client"
import { useState, useMemo } from "react"
import Header from "../shared/Header"
import Footer from "../shared/Footer"
import NewsList from "./NewsList"
import FeaturedNews from "./FeaturedNews"
import { newsData } from "../../data/news/allNews"

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Filter news based on search term
  const filteredNews = useMemo(() => {
    if (!searchTerm.trim()) return newsData

    return newsData.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  // Generate search suggestions
  const suggestions = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) return []

    const titleSuggestions = newsData
      .filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5)
      .map((article) => ({
        type: "title",
        text: article.title,
        id: article.id,
      }))

    const categorySuggestions = [...new Set(newsData.map((article) => article.category))]
      .filter((category) => category.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 3)
      .map((category) => ({
        type: "category",
        text: category,
        id: category,
      }))

    return [...titleSuggestions, ...categorySuggestions]
  }, [searchTerm])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === "title") {
      setSearchTerm(suggestion.text)
    } else {
      setSearchTerm(suggestion.text)
    }
    setShowSuggestions(false)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setShowSuggestions(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full px-4 py-3 pl-12 pr-12 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.type}-${suggestion.id}-${index}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center space-x-2">
                        {suggestion.type === "category" ? (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Category</span>
                        ) : (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Article</span>
                        )}
                        <span className="text-sm text-gray-700 truncate">{suggestion.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {searchTerm && (
              <div className="mt-3 text-sm text-gray-600">
                {filteredNews.length > 0 ? (
                  <span>
                    Found {filteredNews.length} article{filteredNews.length !== 1 ? "s" : ""} for "{searchTerm}"
                  </span>
                ) : (
                  <span>No articles found for "{searchTerm}"</span>
                )}
              </div>
            )}
          </div>
        </div>

        {!searchTerm && <FeaturedNews />}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <NewsList newsData={filteredNews} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
