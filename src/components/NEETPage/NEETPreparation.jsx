import MenuBookIcon from "@mui/icons-material/MenuBook"
import ScheduleIcon from "@mui/icons-material/Schedule"
import AssessmentIcon from "@mui/icons-material/Assessment"
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety"

export default function NEETPreparation() {
  const preparationTips = [
    {
      title: "NCERT Mastery",
      description: "Master NCERT textbooks thoroughly as 80-85% questions come directly from NCERT.",
      icon: <MenuBookIcon className="text-2xl" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Consistent Study Schedule",
      description: "Maintain a disciplined study routine with equal focus on all three subjects daily.",
      icon: <ScheduleIcon className="text-2xl" />,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Regular Testing",
      description: "Take mock tests and solve previous year papers to improve speed and accuracy.",
      icon: <AssessmentIcon className="text-2xl" />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Health & Wellness",
      description: "Maintain good health, proper sleep, and stress management during preparation.",
      icon: <HealthAndSafetyIcon className="text-2xl" />,
      color: "bg-red-50 text-red-600",
    },
  ]

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">NEET Preparation Strategy</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Proven strategies and expert tips to help you crack NEET and secure admission in top medical colleges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {preparationTips.map((tip, index) => (
            <div key={index} className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
              <div className={`w-16 h-16 rounded-lg ${tip.color} flex items-center justify-center mb-4`}>
                {tip.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Subject-wise Preparation Strategy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                P
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Physics</h4>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Focus on numerical problems</li>
                <li>• Practice derivations regularly</li>
                <li>• Understand concepts clearly</li>
                <li>• Solve previous year questions</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                C
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Chemistry</h4>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Memorize organic reactions</li>
                <li>• Practice inorganic facts</li>
                <li>• Solve numerical in physical</li>
                <li>• Make formula sheets</li>
              </ul>
            </div>
            <div className="text-center">
              <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                B
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Biology</h4>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Read NCERT line by line</li>
                <li>• Make diagrams and flowcharts</li>
                <li>• Focus on human physiology</li>
                <li>• Practice MCQs regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
