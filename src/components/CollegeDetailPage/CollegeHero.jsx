import Image from "next/image"
import StarIcon from "@mui/icons-material/Star"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import SchoolIcon from "@mui/icons-material/School"

export default function CollegeHero({ college }) {
  return (
    <section className="bg-gradient-to-r from-yellow-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-1/3">
            <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
              <Image src={college.image || "/placeholder.svg"} alt={college.name} fill className="object-cover" />
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                {college.type}
              </span>
              <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                <StarIcon className="text-green-600 text-sm mr-1" />
                <span className="text-sm font-medium text-green-800">
                  {college.overview?.highlights?.[0] || "Accredited"}
                </span>
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{college.name}</h1>

            <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
              <div className="flex items-center">
                <LocationOnIcon className="text-sm mr-2" />
                <span>{college.location}</span>
              </div>
              <div className="flex items-center">
                <CalendarTodayIcon className="text-sm mr-2" />
                <span>Established {college.established}</span>
              </div>
              <div className="flex items-center">
                <SchoolIcon className="text-sm mr-2" />
                <span>{college.campus?.area || "Large Campus"}</span>
              </div>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">{college.overview?.description}</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-yellow-600">{college.placement?.placementRate}</div>
                <div className="text-sm text-gray-600">Placement Rate</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-yellow-600">{college.placement?.averagePackage}</div>
                <div className="text-sm text-gray-600">Avg Package</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-yellow-600">{college.courses?.length || 10}+</div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-yellow-600">A+</div>
                <div className="text-sm text-gray-600">NAAC Grade</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Apply Now
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 transition-colors duration-200">
                Download Brochure
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 transition-colors duration-200">
                Virtual Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
