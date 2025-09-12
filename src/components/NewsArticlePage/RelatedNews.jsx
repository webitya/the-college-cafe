import Link from "next/link"
import { newsData } from "../../data/news/allNews"

export default function RelatedNews({ currentArticle }) {
  const relatedNews = newsData
    .filter((news) => news.id !== currentArticle.id && news.category === currentArticle.category)
    .slice(0, 3)

  if (relatedNews.length === 0) {
    return null
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="max-w-full px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Related Articles</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {relatedNews.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.slug}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={news.image || "/placeholder.svg?height=224&width=400&query=news article"}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                    {news.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {new Date(news.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2">
                  {news.title}
                </h3>

                <p className="text-gray-600 leading-relaxed line-clamp-3">{news.excerpt}</p>

                <div className="mt-6 flex items-center text-yellow-600 font-semibold group-hover:text-yellow-700 transition-colors">
                  <span className="text-sm">Read More</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
