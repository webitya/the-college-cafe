import Link from "next/link"
import Image from "next/image"
import StarIcon from "@mui/icons-material/Star"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import { collegesData } from "../../data/colleges/allColleges"

export default function FeaturedColleges() {
  const featuredColleges = collegesData.slice(0, 4)

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Featured Colleges</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover top-rated colleges in Ranchi, Jharkhand and across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredColleges.map((college) => (
            <Link
              key={college.id}
              href={`/colleges/${college.slug}`}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative h-48">
                <Image src={college.image || "/placeholder.svg"} alt={college.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{college.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <LocationOnIcon className="text-sm mr-1" />
                  <span className="text-sm">{college.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    {college.type}
                  </span>
                  <div className="flex items-center">
                    <StarIcon className="text-yellow-500 text-sm mr-1" />
                    <span className="text-sm font-medium">{college.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-3 line-clamp-2">{college.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/colleges"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-200"
          >
            View All Colleges
          </Link>
        </div>
      </div>
    </section>
  )
}
