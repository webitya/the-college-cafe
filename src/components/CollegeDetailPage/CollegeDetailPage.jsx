import Header from "../shared/Header"
import Footer from "../shared/Footer"
import CollegeHero from "./CollegeHero"
import CollegeNavigation from "./CollegeNavigation"
import CollegeOverview from "./CollegeOverview"
import CollegeCourses from "./CollegeCourses"
import CollegeCampus from "./CollegeCampus"
import CollegeGallery from "./CollegeGallery"
import CollegePlacement from "./CollegePlacement"
import CollegeAdmissions from "./CollegeAdmissions"
import CollegeNotices from "./CollegeNotices"
import { bitMesraData } from "../../data/colleges/bitMesra"

export default function CollegeDetailPage({ slug }) {
  // In a real app, you would fetch data based on slug
  const collegeData = bitMesraData // For now, using BIT Mesra data

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <CollegeHero college={collegeData} />
        <CollegeNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div id="overview">
            <CollegeOverview college={collegeData} />
          </div>
          <div id="courses" className="mt-12">
            <CollegeCourses college={collegeData} />
          </div>
          <div id="campus" className="mt-12">
            <CollegeCampus college={collegeData} />
          </div>
          <div id="gallery" className="mt-12">
            <CollegeGallery college={collegeData} />
          </div>
          <div id="placement" className="mt-12">
            <CollegePlacement college={collegeData} />
          </div>
          <div id="admissions" className="mt-12">
            <CollegeAdmissions college={collegeData} />
          </div>
          <div id="notices" className="mt-12">
            <CollegeNotices college={collegeData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
