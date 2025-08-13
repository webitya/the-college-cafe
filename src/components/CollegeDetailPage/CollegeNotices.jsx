import NotificationsIcon from "@mui/icons-material/Notifications"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import LinkIcon from "@mui/icons-material/Link"

export default function CollegeNotices({ college }) {
  return (
    <section className="bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Notices & Updates</h2>

      <div className="space-y-6">
        {college.notices?.map((notice, index) => (
          <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <div className="flex items-start">
              <NotificationsIcon className="text-yellow-600 mr-3 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{notice.title}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <CalendarTodayIcon className="text-sm mr-2" />
                  <span className="text-sm">
                    {new Date(notice.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <a
                  href={notice.link}
                  className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  <LinkIcon className="text-sm mr-1" />
                  Read Full Notice
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
          View All Notices
        </button>
      </div>
    </section>
  )
}
