"use client" // Added client directive to enable event handlers

import { newsData } from "../../data/news/allNews"
import { useRouter } from "next/navigation"

export default function FeaturedNews() {
  const router = useRouter()
  const featuredArticles = newsData.slice(0, 3)

  const handleCardClick = (slug) => {
    router.push(`/news/${slug}`)
  }

  if (!featuredArticles || featuredArticles.length === 0) {
    return (
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Articles</h2>
          <p className="text-center text-gray-600">No featured articles available at the moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
              onClick={() => handleCardClick(article.slug)}
            >
              <img
                src={article.image || "/placeholder.svg?height=200&width=400&query=news article"}
                alt={article.title}
                className="w-full h-40 object-cover"
                onError={(e) => {
                  e.target.src = "/news-article.png"
                }}
              />
              <div className="p-4">
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full capitalize">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                <div className="flex justify-between items-center">
                  <time className="text-gray-500 text-sm">{new Date(article.date).toLocaleDateString()}</time>
                  <span className="text-blue-600 font-medium text-sm">Read More →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
