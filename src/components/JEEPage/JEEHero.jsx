import MenuBookIcon from "@mui/icons-material/MenuBook"
import SchoolIcon from "@mui/icons-material/School"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"

export default function JEEHero() {
  return (
    <section className="bg-gradient-to-br from-yellow-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            JEE <span className="text-yellow-600">Preparation Guide</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Complete preparation guide for JEE Main and JEE Advanced. Get exam pattern, syllabus, preparation tips, and
            important dates all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MenuBookIcon className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Complete Syllabus</h3>
            <p className="text-gray-600">
              Detailed syllabus for Physics, Chemistry, and Mathematics with topic-wise breakdown.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <SchoolIcon className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Exam Pattern</h3>
            <p className="text-gray-600">
              Latest exam pattern, marking scheme, and question paper structure for both JEE Main and Advanced.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUpIcon className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Preparation Tips</h3>
            <p className="text-gray-600">
              Expert tips, study strategies, and time management techniques from successful candidates.
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200">
              Start Preparation
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-300 transition-colors duration-200">
              Download Syllabus
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
