import Link from "next/link"
import Image from "next/image"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import { newsData } from "../../data/news/allNews"

export default function FeaturedNews() {
  const featuredNews = newsData.slice(0, 3)

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Stories</h2>
          <p className="text-xl text-gray-600">Top stories and breaking news from the education sector</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredNews.map((news, index) => (
            <Link
              key={news.id}
              href={`/news/${news.slug}`}
              className={`group ${
                index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              } bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden`}
            >
              <div className={`relative ${index === 0 ? "h-64 lg:h-80" : "h-48"}`}>
                <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium uppercase">
                    {news.category}
                  </span>
                </div>
              </div>
              <div className={`p-6 ${index === 0 ? "lg:p-8" : ""}`}>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <CalendarTodayIcon className="text-sm mr-2" />
                  {new Date(news.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <h3
                  className={`font-semibold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-200 ${
                    index === 0 ? "text-2xl lg:text-3xl" : "text-xl"
                  }`}
                >
                  {news.title}
                </h3>
                <p className={`text-gray-600 ${index === 0 ? "text-lg" : ""}`}>{news.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
