import InfoIcon from "@mui/icons-material/Info"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

export default function NEETOverview() {
  const neetFacts = [
    "Conducted by National Testing Agency (NTA)",
    "Single entrance exam for MBBS, BDS, AYUSH courses",
    "Admission to government and private medical colleges",
    "Based on NCERT syllabus of Class 11 and 12",
    "Conducted once a year in offline mode",
    "15% All India Quota and 85% State Quota seats",
  ]

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About NEET Examination</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            National Eligibility cum Entrance Test (NEET) is the single entrance examination for medical admissions in
            India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-6">
              <InfoIcon className="text-green-500 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-900">Key Information</h3>
            </div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              NEET is the most important medical entrance examination in India, serving as the gateway to MBBS, BDS, and
              AYUSH courses in government and private medical colleges across the country.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              With over 16 lakh students appearing annually, NEET is highly competitive and requires dedicated
              preparation with strong conceptual understanding and extensive practice.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Important Facts</h3>
            <div className="space-y-4">
              {neetFacts.map((fact, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircleIcon className="text-green-500 mr-3 mt-1 text-sm" />
                  <p className="text-gray-700">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 bg-green-50 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">NEET 2024 Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">16+ Lakh</div>
                <div className="text-gray-700">Applicants</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">1.08 Lakh</div>
                <div className="text-gray-700">MBBS Seats</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">720</div>
                <div className="text-gray-700">Maximum Marks</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">3 Hours</div>
                <div className="text-gray-700">Exam Duration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
