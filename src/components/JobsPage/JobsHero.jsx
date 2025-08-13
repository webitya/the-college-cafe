import SearchIcon from "@mui/icons-material/Search"
import WorkIcon from "@mui/icons-material/Work"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import BusinessIcon from "@mui/icons-material/Business"

export default function JobsHero() {
  return (
    <section className="bg-gradient-to-br from-yellow-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Find Your Dream <span className="text-yellow-600">Career</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explore thousands of job opportunities, internships, and career guidance to kickstart your professional
            journey.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full px-6 py-4 text-lg border-2 border-yellow-300 rounded-full focus:outline-none focus:border-yellow-500 shadow-lg"
              />
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Location"
                className="w-full px-6 py-4 text-lg border-2 border-yellow-300 rounded-full focus:outline-none focus:border-yellow-500 shadow-lg"
              />
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200 shadow-lg">
              <SearchIcon className="mr-2" />
              Search Jobs
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <WorkIcon className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">5000+ Jobs</h3>
            <p className="text-gray-600">Active job openings across various industries and experience levels.</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BusinessIcon className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">500+ Companies</h3>
            <p className="text-gray-600">
              Top companies actively hiring fresh graduates and experienced professionals.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUpIcon className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">90% Success Rate</h3>
            <p className="text-gray-600">High placement success rate for candidates who use our platform.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
