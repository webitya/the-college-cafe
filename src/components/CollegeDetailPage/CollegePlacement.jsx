import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import BusinessIcon from "@mui/icons-material/Business"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"

export default function CollegePlacement({ college }) {
  return (
    <section className="bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Placement Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <TrendingUpIcon className="text-green-600 text-4xl mx-auto mb-4" />
          <div className="text-3xl font-bold text-green-600 mb-2">{college.placement?.placementRate}</div>
          <div className="text-gray-700 font-medium">Placement Rate</div>
        </div>

        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <AttachMoneyIcon className="text-blue-600 text-4xl mx-auto mb-4" />
          <div className="text-3xl font-bold text-blue-600 mb-2">{college.placement?.averagePackage}</div>
          <div className="text-gray-700 font-medium">Average Package</div>
        </div>

        <div className="text-center p-6 bg-purple-50 rounded-lg">
          <BusinessIcon className="text-purple-600 text-4xl mx-auto mb-4" />
          <div className="text-3xl font-bold text-purple-600 mb-2">{college.placement?.highestPackage}</div>
          <div className="text-gray-700 font-medium">Highest Package</div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Recruiters</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {college.placement?.topRecruiters?.map((recruiter, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="font-medium text-gray-900 text-sm">{recruiter}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
