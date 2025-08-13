import Header from "../shared/Header"
import Footer from "../shared/Footer"
import AboutHero from "./AboutHero"
import AboutMission from "./AboutMission"
import AboutTeam from "./AboutTeam"
import AboutStats from "./AboutStats"
import AboutContact from "./AboutContact"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutHero />
        <AboutMission />
        <AboutStats />
        <AboutTeam />
        <AboutContact />
      </main>
      <Footer />
    </div>
  )
}
