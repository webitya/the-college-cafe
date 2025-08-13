import VisibilityIcon from "@mui/icons-material/Visibility"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import FavoriteIcon from "@mui/icons-material/Favorite"

export default function AboutMission() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              THE COLLEGE CAFE was founded with a simple yet powerful vision: to bridge the gap between students and
              their dream colleges. We understand that choosing the right college is one of the most important decisions
              in a student's life.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Starting from Ranchi, Jharkhand, we have expanded our reach to cover colleges across India, providing
              students with comprehensive information, expert guidance, and the tools they need to make informed
              decisions about their future.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we are proud to have helped over 50,000 students find their perfect college match and pursue their
              academic dreams.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <TrackChangesIcon className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
                <p className="text-gray-700">
                  To democratize access to higher education information and empower every student to make the best
                  educational choices for their future.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <VisibilityIcon className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
                <p className="text-gray-700">
                  To become India's most trusted platform for college information and educational guidance, helping
                  millions of students achieve their academic goals.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <FavoriteIcon className="text-red-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Values</h3>
                <p className="text-gray-700">
                  Transparency, accuracy, and student-first approach guide everything we do. We believe in providing
                  honest, comprehensive information to help students succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
