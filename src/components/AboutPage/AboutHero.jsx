import SchoolIcon from "@mui/icons-material/School"
import GroupIcon from "@mui/icons-material/Group"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"

export default function AboutHero() {
  return (
    <section className="bg-gradient-to-br from-yellow-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-yellow-600">THE COLLEGE CAFE</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Empowering students to make informed decisions about their higher education journey through comprehensive
            college information and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <SchoolIcon className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Comprehensive Database</h3>
            <p className="text-gray-600">
              Detailed information about 500+ colleges across India with courses, fees, and admission details.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUpIcon className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Latest Updates</h3>
            <p className="text-gray-600">
              Real-time notifications about admissions, exam dates, and important educational announcements.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <GroupIcon className="text-yellow-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Guidance</h3>
            <p className="text-gray-600">
              Professional counseling and personalized advice to help students choose the right career path.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
