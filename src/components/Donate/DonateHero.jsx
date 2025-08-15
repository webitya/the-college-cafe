import { Favorite, School, Group } from "@mui/icons-material"

export default function DonateHero() {
  return (
    <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-full shadow-lg">
              <Favorite className="text-white text-4xl" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Support Education,
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent block">
              Transform Lives
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your donation helps us provide quality educational resources, career guidance, and support to thousands of
            students across India. Together, we can make education accessible to all.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <School className="text-yellow-500 text-3xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Educational Resources</h3>
              <p className="text-gray-600">Fund comprehensive study materials and exam preparation resources</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Group className="text-orange-500 text-3xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Student Support</h3>
              <p className="text-gray-600">Provide career counseling and guidance to underprivileged students</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Favorite className="text-red-500 text-3xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Impact</h3>
              <p className="text-gray-600">Build a stronger educational community for future generations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
