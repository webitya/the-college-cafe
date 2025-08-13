import NewspaperIcon from "@mui/icons-material/Newspaper"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import NotificationsIcon from "@mui/icons-material/Notifications"

export default function NewsHero() {
  return (
    <section className="bg-gradient-to-br from-yellow-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Latest Education <span className="text-yellow-600">News & Updates</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest news, updates, and announcements from the world of education, admissions, and
            career opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <NewspaperIcon className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Breaking News</h3>
            <p className="text-gray-600">Get instant updates on admission notifications, exam dates, and results.</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUpIcon className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Trending Topics</h3>
            <p className="text-gray-600">Discover what's trending in education and career development.</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <NotificationsIcon className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Alerts</h3>
            <p className="text-gray-600">Never miss important deadlines and announcements with our alert system.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
