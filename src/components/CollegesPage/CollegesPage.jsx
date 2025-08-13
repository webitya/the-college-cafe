import Header from "../shared/Header"
import Footer from "../shared/Footer"
import CollegesList from "./CollegesList"
import CollegesFilter from "./CollegesFilter"

export default function CollegesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <div className="bg-gradient-to-r from-yellow-50 to-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Top Colleges in <span className="text-yellow-600">Ranchi & India</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the best engineering, medical, and other colleges with comprehensive information about courses,
              fees, placements, and admission process.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4">
              <CollegesFilter />
            </aside>
            <main className="lg:w-3/4">
              <CollegesList />
            </main>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
