"use client"
import { newsData as defaultNewsData } from "../../data/news/allNews"
import { useRouter } from "next/navigation"

export default function NewsList({ newsData = defaultNewsData }) {
  const router = useRouter()

  const handleCardClick = (slug) => {
    router.push(`/news/${slug}`)
  }

  if (newsData.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
        <p className="text-gray-500">Try adjusting your search terms or browse all articles</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">All News</h2>
        <p className="text-gray-600">Browse all our latest articles and updates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.map((article) => (
          <article
            key={article.id}
            onClick={() => handleCardClick(article.slug)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            {article.image && (
              <div className="aspect-video">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <div className="mb-2">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full capitalize">
                  {article.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <time>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span className="text-blue-600 font-medium">Read More →</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
