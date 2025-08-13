import Link from "next/link"
import Image from "next/image"
import StarIcon from "@mui/icons-material/Star"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import { collegesData } from "../../data/colleges/allColleges"

export default function CollegesList() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Showing {collegesData.length} colleges</h2>
        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
          <option>Sort by Relevance</option>
          <option>Sort by Rating</option>
          <option>Sort by Name</option>
          <option>Sort by Fees</option>
        </select>
      </div>

      <div className="space-y-6">
        {collegesData.map((college) => (
          <div
            key={college.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative h-48 md:h-auto">
                <Image src={college.image || "/placeholder.svg"} alt={college.name} fill className="object-cover" />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{college.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <LocationOnIcon className="text-sm mr-1" />
                      <span className="text-sm">{college.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <CalendarTodayIcon className="text-sm mr-1" />
                      <span className="text-sm">Established {college.established}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                    <StarIcon className="text-yellow-500 text-sm mr-1" />
                    <span className="text-sm font-medium text-yellow-800">{college.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{college.shortDescription}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {college.type}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    NAAC Accredited
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                    Placement Assistance
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Starting Fees:</span> ₹2,50,000/year
                  </div>
                  <Link
                    href={`/colleges/${college.slug}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
