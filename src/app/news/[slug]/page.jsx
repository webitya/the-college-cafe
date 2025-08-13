import NewsArticlePage from "../../../components/NewsArticlePage/NewsArticlePage"
import { newsData } from "../../../data/news/allNews"

export async function generateMetadata({ params }) {
  const article = newsData.find((news) => news.slug === params.slug)

  if (!article) {
    return {
      title: "Article Not Found - THE COLLEGE CAFE",
      description: "The requested news article is not available.",
    }
  }

  return {
    title: `${article.title} | THE COLLEGE CAFE`,
    description: article.excerpt,
  }
}

export default function NewsArticle({ params }) {
  return <NewsArticlePage slug={params.slug} />
}
