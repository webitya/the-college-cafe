import Header from "../shared/Header"
import Footer from "../shared/Footer"
import JEEHero from "./JEEHero"
import JEEOverview from "./JEEOverview"
import JEESyllabus from "./JEESyllabus"
import JEEPreparation from "./JEEPreparation"
import JEEExamPattern from "./JEEExamPattern"
import JEEImportantDates from "./JEEImportantDates"

export default function JEEPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <JEEHero />
        <JEEOverview />
        <JEEExamPattern />
        <JEESyllabus />
        <JEEPreparation />
        <JEEImportantDates />
      </main>
      <Footer />
    </div>
  )
}
