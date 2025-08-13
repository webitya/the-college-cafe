import Header from "../shared/Header"
import Footer from "../shared/Footer"
import JobsHero from "./JobsHero"
import JobsFilter from "./JobsFilter"
import JobsList from "./JobsList"
import CareerGuidance from "./CareerGuidance"

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <JobsHero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4">
              <JobsFilter />
            </aside>
            <main className="lg:w-3/4">
              <JobsList />
            </main>
          </div>
        </div>
        <CareerGuidance />
      </main>
      <Footer />
    </div>
  )
}
