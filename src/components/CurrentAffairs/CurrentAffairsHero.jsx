import CalendarToday from "@mui/icons-material/CalendarToday"
import TrendingUp from "@mui/icons-material/TrendingUp"
import MenuBook from "@mui/icons-material/MenuBook"

export default function CurrentAffairsHero() {
  return (
    <section className="bg-gradient-to-br from-yellow-50 to-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-100 p-4 rounded-full">
              <TrendingUp className="text-4xl text-yellow-600" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">Latest Current Affairs</h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay ahead with daily current affairs updates. Essential knowledge for competitive exams and general
            awareness.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <CalendarToday className="text-3xl text-yellow-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Updates</h3>
              <p className="text-gray-600">Fresh current affairs every day with 5-10 important news items</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <MenuBook className="text-3xl text-orange-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Exam Focused</h3>
              <p className="text-gray-600">Curated content relevant for UPSC SSC Banking and other competitive exams</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <TrendingUp className="text-3xl text-red-600 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Trending Topics</h3>
              <p className="text-gray-600">Focus on trending and important topics that matter for your preparation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
