import Link from "next/link"
import Image from "next/image"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import { newsData } from "../../data/news/allNews"

export default function RelatedNews({ currentArticle }) {
  const relatedNews = newsData
    .filter((news) => news.id !== currentArticle.id && news.category === currentArticle.category)
    .slice(0, 3)

  if (relatedNews.length === 0) {
    return null
  }

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedNews.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.slug}`}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative h-48">
                <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium uppercase">
                    {news.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <CalendarTodayIcon className="text-sm mr-2" />
                  {new Date(news.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-yellow-600 transition-colors duration-200">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">{news.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
