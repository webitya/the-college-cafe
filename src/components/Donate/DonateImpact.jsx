import { TrendingUp, People, Star } from "@mui/icons-material"

export default function DonateImpact() {
  const impactStats = [
    {
      icon: People,
      number: "10,000+",
      label: "Students Helped",
      description: "Students have received guidance and support",
    },
    {
      icon: Star,
      number: "500+",
      label: "Success Stories",
      description: "Students successfully placed in top colleges",
    },
    {
      icon: TrendingUp,
      number: "95%",
      label: "Success Rate",
      description: "Of our students achieve their educational goals",
    },
  ]

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Impact</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how your donations are making a real difference in students' lives across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {impactStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="text-white text-2xl" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-gray-600">{stat.description}</div>
              </div>
            )
          })}
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
          <p className="text-lg mb-6 opacity-90">
            Together, we can create a brighter future for students across India. Your support helps us continue
            providing quality education and guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-yellow-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              Become a Monthly Donor
            </button>
            <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white hover:text-yellow-600 transition-colors duration-200">
              Share Our Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
