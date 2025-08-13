import MenuBookIcon from "@mui/icons-material/MenuBook"
import PersonIcon from "@mui/icons-material/Person"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import WorkIcon from "@mui/icons-material/Work"

export default function CareerGuidance() {
  const guidanceTopics = [
    {
      title: "Resume Building",
      description: "Learn how to create a compelling resume that stands out to employers.",
      icon: <PersonIcon className="text-2xl" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Interview Preparation",
      description: "Master the art of interviews with our comprehensive preparation guide.",
      icon: <MenuBookIcon className="text-2xl" />,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Career Planning",
      description: "Strategic guidance to help you plan and advance your career effectively.",
      icon: <TrendingUpIcon className="text-2xl" />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Industry Insights",
      description: "Stay updated with the latest trends and opportunities in various industries.",
      icon: <WorkIcon className="text-2xl" />,
      color: "bg-orange-50 text-orange-600",
    },
  ]

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Guidance & Resources</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get expert advice and resources to accelerate your career growth and land your dream job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guidanceTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-lg ${topic.color} flex items-center justify-center mb-4`}>
                {topic.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{topic.title}</h3>
              <p className="text-gray-600">{topic.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
            Explore All Resources
          </button>
        </div>
      </div>
    </section>
  )
}
