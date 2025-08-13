import Image from "next/image"
import Link from "next/link"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import PersonIcon from "@mui/icons-material/Person"
import ShareIcon from "@mui/icons-material/Share"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

export default function NewsArticleContent({ article }) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-yellow-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/news" className="hover:text-yellow-600">
            News
          </Link>
          <span>/</span>
          <span className="text-gray-900">{article.title}</span>
        </div>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <div className="mb-4">
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium uppercase">
            {article.category}
          </span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">{article.title}</h1>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center">
              <PersonIcon className="text-sm mr-2" />
              <span>Admin</span>
            </div>
            <div className="flex items-center">
              <CalendarTodayIcon className="text-sm mr-2" />
              <span>
                {new Date(article.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ShareIcon className="text-gray-400" />
            <FacebookIcon className="text-gray-400 hover:text-blue-600 cursor-pointer" />
            <TwitterIcon className="text-gray-400 hover:text-blue-400 cursor-pointer" />
            <LinkedInIcon className="text-gray-400 hover:text-blue-700 cursor-pointer" />
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative h-64 lg:h-96 mb-8 rounded-lg overflow-hidden">
        <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 mb-6 leading-relaxed">{article.excerpt}</p>

        <div className="text-gray-700 leading-relaxed space-y-6">
          <p>
            {article.content ||
              `This is the full content of the article "${article.title}". The article provides comprehensive information about the latest developments in the education sector.`}
          </p>

          <p>
            The education landscape in India continues to evolve with new policies, technological advancements, and
            changing student needs. This development represents a significant step forward in improving educational
            opportunities for students across the country.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Highlights</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Important updates for students and educational institutions</li>
            <li>New opportunities for academic and career advancement</li>
            <li>Enhanced support systems for student success</li>
            <li>Improved accessibility to quality education</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What This Means for Students</h2>
          <p>
            Students should stay informed about these developments as they may impact admission processes, examination
            schedules, and career opportunities. It's recommended to regularly check official announcements and consult
            with educational counselors for personalized guidance.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Note</h3>
            <p className="text-gray-700">
              Students are advised to verify all information from official sources and stay updated with the latest
              announcements from relevant educational authorities.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Next Steps</h2>
          <p>
            For more detailed information and updates, students should visit the official websites of relevant
            educational institutions and examination conducting bodies. THE COLLEGE CAFE will continue to provide timely
            updates on all important educational developments.
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Education</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{article.category}</span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">News</span>
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Updates</span>
        </div>
      </div>
    </article>
  )
}
