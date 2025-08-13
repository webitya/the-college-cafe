import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee"
import SchoolIcon from "@mui/icons-material/School"

export default function CollegeCourses({ college }) {
  return (
    <section className="bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Courses & Fees</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {college.courses?.map((course, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <AccessTimeIcon className="text-sm mr-2" />
                  <span className="text-sm">{course.duration}</span>
                </div>
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Popular</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
                <CurrencyRupeeIcon className="text-green-600 text-sm mr-2" />
                <span className="font-medium text-gray-900">Fees:</span>
                <span className="ml-2 text-gray-700">{course.fees}</span>
              </div>
              <div className="flex items-center">
                <SchoolIcon className="text-blue-600 text-sm mr-2" />
                <span className="font-medium text-gray-900">Eligibility:</span>
                <span className="ml-2 text-gray-700">{course.eligibility}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                Apply for {course.name}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Admission Process</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <p className="text-sm text-gray-700">Application</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <p className="text-sm text-gray-700">Entrance Exam</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <p className="text-sm text-gray-700">Counselling</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold">4</span>
            </div>
            <p className="text-sm text-gray-700">Admission</p>
          </div>
        </div>
      </div>
    </section>
  )
}
