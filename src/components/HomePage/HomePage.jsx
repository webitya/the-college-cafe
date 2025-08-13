import Header from "../shared/Header"
import Footer from "../shared/Footer"
import HomePageHero from "./HomePageHero"
import HomePageCTA from "./HomePageCTA"
import FeaturedColleges from "./FeaturedColleges"
import LatestNews from "./LatestNews"
import QuickLinks from "./QuickLinks"
import Stats from "./Stats"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HomePageHero />
        <Stats />
        <FeaturedColleges />
        <QuickLinks />
        <LatestNews />
        <HomePageCTA />
      </main>
      <Footer />
    </div>
  )
}
