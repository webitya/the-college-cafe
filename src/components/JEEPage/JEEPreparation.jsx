import LightbulbIcon from "@mui/icons-material/Lightbulb"
import ScheduleIcon from "@mui/icons-material/Schedule"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import AssessmentIcon from "@mui/icons-material/Assessment"

export default function JEEPreparation() {
  const preparationTips = [
    {
      title: "Create a Study Schedule",
      description: "Plan your daily study routine with dedicated time for each subject and regular breaks.",
      icon: <ScheduleIcon className="text-2xl" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Focus on Concepts",
      description: "Build strong conceptual foundation rather than just memorizing formulas and solutions.",
      icon: <LightbulbIcon className="text-2xl" />,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Practice Regularly",
      description: "Solve previous year papers and take mock tests to improve speed and accuracy.",
      icon: <MenuBookIcon className="text-2xl" />,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Analyze Performance",
      description: "Review your mistakes and weak areas to continuously improve your preparation strategy.",
      icon: <AssessmentIcon className="text-2xl" />,
      color: "bg-purple-50 text-purple-600",
    },
  ]

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Preparation Strategy</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert tips and strategies to help you crack JEE with confidence and achieve your dream rank.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Monthly Preparation Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1-6
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Foundation Building</h4>
              <p className="text-gray-600">Complete NCERT thoroughly and build strong conceptual foundation.</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                7-10
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Advanced Practice</h4>
              <p className="text-gray-600">Solve advanced problems and previous year questions extensively.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                11-12
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Mock Tests & Revision</h4>
              <p className="text-gray-600">Take regular mock tests and revise important concepts and formulas.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
