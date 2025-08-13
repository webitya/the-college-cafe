import Header from "../shared/Header"
import Footer from "../shared/Footer"
import NEETHero from "./NEETHero"
import NEETOverview from "./NEETOverview"
import NEETSyllabus from "./NEETSyllabus"
import NEETPreparation from "./NEETPreparation"
import NEETExamPattern from "./NEETExamPattern"
import NEETImportantDates from "./NEETImportantDates"

export default function NEETPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <NEETHero />
        <NEETOverview />
        <NEETExamPattern />
        <NEETSyllabus />
        <NEETPreparation />
        <NEETImportantDates />
      </main>
      <Footer />
    </div>
  )
}
