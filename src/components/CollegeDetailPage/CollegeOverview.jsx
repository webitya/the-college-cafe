import CheckCircleIcon from "@mui/icons-material/CheckCircle"

export default function CollegeOverview({ college }) {
  return (
    <section className="bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">College Overview</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">{college.overview?.description}</p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {college.overview?.highlights?.map((highlight, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircleIcon className="text-green-500 mr-3 text-sm" />
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Facts</h3>
            <div className="space-y-4">
              <div>
                <span className="font-medium text-gray-900">Established:</span>
                <span className="ml-2 text-gray-700">{college.established}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Type:</span>
                <span className="ml-2 text-gray-700">{college.type}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Campus Area:</span>
                <span className="ml-2 text-gray-700">{college.campus?.area}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Location:</span>
                <span className="ml-2 text-gray-700">{college.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
