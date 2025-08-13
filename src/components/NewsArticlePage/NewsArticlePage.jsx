import Header from "../shared/Header"
import Footer from "../shared/Footer"
import NewsArticleContent from "./NewsArticleContent"
import RelatedNews from "./RelatedNews"
import NewsletterSignup from "./NewsletterSignup"
import { newsData } from "../../data/news/allNews"

export default function NewsArticlePage({ slug }) {
  const article = newsData.find((news) => news.slug === slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600">The requested news article could not be found.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <NewsArticleContent article={article} />
        <RelatedNews currentArticle={article} />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  )
}
