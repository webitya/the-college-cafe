import Link from "next/link"
// import Image from "next/image"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import PersonIcon from "@mui/icons-material/Person"
import { newsData } from "../../data/news/allNews"

export default function NewsList() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Latest News ({newsData.length})</h2>
        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
          <option>Sort by Latest</option>
          <option>Sort by Popular</option>
          <option>Sort by Category</option>
        </select>
      </div>

      <div className="space-y-8">
        {newsData.map((news) => (
          <article
            key={news.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <img src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium uppercase">
                    {news.category}
                  </span>
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                  <div className="flex items-center">
                    <CalendarTodayIcon className="text-sm mr-1" />
                    {new Date(news.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center">
                    <PersonIcon className="text-sm mr-1" />
                    Admin
                  </div>
                </div>
                <Link href={`/news/${news.slug}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-yellow-600 transition-colors duration-200 cursor-pointer">
                    {news.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3">{news.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Education</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Important</span>
                  </div>
                  <Link
                    href={`/news/${news.slug}`}
                    className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <nav className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">3</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">Next</button>
        </nav>
      </div>
    </div>
  )
}
