import { newsData } from "../../data/news/allNews"

export default function FeaturedNews() {
  const featuredArticles = newsData.slice(0, 3)

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {article.image && (
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full capitalize">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex justify-between items-center">
                  <time className="text-gray-500 text-sm">{new Date(article.date).toLocaleDateString()}</time>
                  <a href={`/news/${article.slug}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Read More →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
