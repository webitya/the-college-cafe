import InfoIcon from "@mui/icons-material/Info"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

export default function JEEOverview() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About JEE Examination</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Joint Entrance Examination (JEE) is the gateway to India's premier engineering institutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <InfoIcon className="text-blue-500 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-900">JEE Main</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircleIcon className="text-green-500 mr-3 mt-1 text-sm" />
                <div>
                  <p className="font-medium text-gray-900">Conducted by NTA</p>
                  <p className="text-gray-600">National Testing Agency conducts JEE Main twice a year</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="text-green-500 mr-3 mt-1 text-sm" />
                <div>
                  <p className="font-medium text-gray-900">Admission to NITs, IIITs, GFTIs</p>
                  <p className="text-gray-600">
                    Direct admission to National Institutes of Technology and other institutes
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="text-green-500 mr-3 mt-1 text-sm" />
                <div>
                  <p className="font-medium text-gray-900">Qualification for JEE Advanced</p>
                  <p className="text-gray-600">Top 2.5 lakh candidates qualify for JEE Advanced</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-6">
              <InfoIcon className="text-purple-500 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-900">JEE Advanced</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircleIcon className="text-green-500 mr-3 mt-1 text-sm" />
                <div>
                  <p className="font-medium text-gray-900">Conducted by IITs</p>
                  <p className="text-gray-600">One of the seven IITs conducts JEE Advanced annually</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="text-green-500 mr-3 mt-1 text-sm" />
                <div>
                  <p className="font-medium text-gray-900">Admission to IITs</p>
                  <p className="text-gray-600">Gateway to 23 Indian Institutes of Technology</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="text-green-500 mr-3 mt-1 text-sm" />
                <div>
                  <p className="font-medium text-gray-900">Highly Competitive</p>
                  <p className="text-gray-600">Only top performers from JEE Main can appear</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
