import { newsData } from "../../data/news/allNews"
import Header from "../shared/Header"
import Footer from "../shared/Footer"
import RelatedNews from "../NewsArticlePage/RelatedNews"

function FormattedContent({ content }) {
  // Handle both old string format and new array format for backward compatibility
  if (typeof content === "string") {
    // Legacy format - split content by double line breaks for paragraphs
    const paragraphs = content.split("\\n\\n")

    return (
      <div className="prose prose-lg max-w-none">
        {paragraphs.map((paragraph, index) => {
          if (paragraph.startsWith("###")) {
            const headingText = paragraph.replace("###", "").trim()
            return (
              <h3 key={index} className="text-2xl font-bold mt-8 mb-4 text-gray-900">
                {headingText}
              </h3>
            )
          } else if (
            paragraph.startsWith("Important:") ||
            paragraph.startsWith("Note:") ||
            paragraph.startsWith("Tip:") ||
            paragraph.startsWith("Alert:") ||
            paragraph.startsWith("Warning:")
          ) {
            return (
              <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8 rounded-r-lg shadow-sm">
                <p className="text-gray-800 font-medium leading-relaxed">
                  {paragraph.split("\\n").map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex < paragraph.split("\\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            )
          } else if (paragraph.startsWith("---")) {
            return <hr key={index} className="my-12 border-gray-200" />
          } else if (paragraph.trim() === "") {
            return null
          } else {
            return (
              <p key={index} className="mb-8 text-gray-700 leading-relaxed text-lg text-balance">
                {paragraph.split("\\n").map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    {lineIndex < paragraph.split("\\n").length - 1 && <br />}
                  </span>
                ))}
              </p>
            )
          }
        })}
      </div>
    )
  }

  // New structured format
  return (
    <div className="prose prose-lg max-w-none">
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="mb-8 text-gray-700 leading-relaxed text-lg text-balance">
                {block.text}
              </p>
            )

          case "heading":
            const HeadingTag = `h${block.level}`
            const headingClasses = {
              1: "text-4xl font-bold mt-16 mb-8 text-gray-900",
              2: "text-3xl font-bold mt-12 mb-6 text-gray-900",
              3: "text-2xl font-bold mt-10 mb-5 text-gray-900",
              4: "text-xl font-bold mt-8 mb-4 text-gray-900",
            }
            return (
              <HeadingTag key={index} className={headingClasses[block.level] || headingClasses[3]}>
                {block.text}
              </HeadingTag>
            )

          case "subheading":
            return (
              <h4 key={index} className="text-lg font-semibold mt-8 mb-4 text-gray-800 border-b border-gray-200 pb-2">
                {block.text}
              </h4>
            )

          case "callout":
            return (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg shadow-sm"
              >
                <p className="text-gray-800 font-medium leading-relaxed flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></span>
                  <span className="flex-1">{block.text}</span>
                </p>
              </div>
            )

          case "list":
            return (
              <ul key={index} className="mb-8 space-y-3 pl-4">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-700 leading-relaxed flex items-start text-lg">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-4 mt-3 flex-shrink-0"></span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            )

          case "divider":
            return <hr key={index} className="my-12 border-gray-200" />

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-gray-400 pl-6 my-8 italic text-gray-600 text-lg bg-gray-50 py-4 rounded-r-lg"
              >
                {block.text}
              </blockquote>
            )

          default:
            return null
        }
      })}
    </div>
  )
}

export default function NewsArticlePage({ slug }) {
  const article = newsData.find((news) => news.slug === slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Article Not Found</h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                The requested news article is not available or may have been moved.
              </p>
              <a
                href="/news"
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to News
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="w-full">
        <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-white bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${article.image || "/news-article-hero-background.jpg"}')`,
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0" />

          <div className="relative z-10 w-full h-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-4 sm:mb-6">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-full capitalize border border-white/30">
                  {article.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight text-balance px-2">
                {article.title}
              </h1>
              <div className="flex items-center justify-center text-white/90 text-sm sm:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <article className="prose prose-lg prose-gray max-w-none">
              {article.excerpt && (
                <div className="not-prose mb-8 sm:mb-12">
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed font-light text-balance border-l-4 border-blue-500 pl-4 sm:pl-6 italic bg-gray-50 py-4 sm:py-6 rounded-r-lg">
                    {article.excerpt}
                  </p>
                </div>
              )}

              <div className="article-content space-y-6 sm:space-y-8">
                <FormattedContent content={article.content} />
              </div>
            </article>
          </div>
        </div>

        <div className="w-full bg-gray-50 border-t border-gray-200">
          <RelatedNews currentArticle={article} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
