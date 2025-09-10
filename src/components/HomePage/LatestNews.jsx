import Link from "next/link"
import Image from "next/image"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import { newsData } from "../../data/news/allNews"

export default function LatestNews() {
  const latestNews = newsData.slice(0, 3)

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest education news and announcements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestNews.map((news) => (
            <article
              key={news.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative h-48">
                <img src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
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
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{news.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
                <Link href={`/news/${news.slug}`} className="text-yellow-600 hover:text-yellow-700 font-medium">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/news"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-200"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  )
}
