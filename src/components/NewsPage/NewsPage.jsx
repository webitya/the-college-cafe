import Header from "../shared/Header"
import Footer from "../shared/Footer"
import NewsHero from "./NewsHero"
import NewsFilter from "./NewsFilter"
import NewsList from "./NewsList"
import FeaturedNews from "./FeaturedNews"

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <NewsHero />
        <FeaturedNews />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4">
              <NewsFilter />
            </aside>
            <main className="lg:w-3/4">
              <NewsList />
            </main>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
