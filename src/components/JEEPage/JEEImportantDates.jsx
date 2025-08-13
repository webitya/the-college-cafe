import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import NotificationsIcon from "@mui/icons-material/Notifications"

export default function JEEImportantDates() {
  const importantDates = [
    {
      event: "JEE Main 2024 Session 1 Registration",
      date: "December 2023 - January 2024",
      status: "Completed",
      type: "registration",
    },
    {
      event: "JEE Main 2024 Session 1 Exam",
      date: "January 24 - February 1, 2024",
      status: "Completed",
      type: "exam",
    },
    {
      event: "JEE Main 2024 Session 2 Registration",
      date: "February - March 2024",
      status: "Upcoming",
      type: "registration",
    },
    {
      event: "JEE Main 2024 Session 2 Exam",
      date: "April 1 - 15, 2024",
      status: "Upcoming",
      type: "exam",
    },
    {
      event: "JEE Advanced 2024 Registration",
      date: "April - May 2024",
      status: "Upcoming",
      type: "registration",
    },
    {
      event: "JEE Advanced 2024 Exam",
      date: "May 26, 2024",
      status: "Upcoming",
      type: "exam",
    },
  ]

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Important Dates</h2>
          <p className="text-xl text-gray-600">Stay updated with all JEE related important dates and deadlines.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {importantDates.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border-l-4 ${
                item.type === "exam"
                  ? "border-red-400 bg-red-50"
                  : item.type === "registration"
                    ? "border-blue-400 bg-blue-50"
                    : "border-green-400 bg-green-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <CalendarTodayIcon className="text-gray-500 mr-2 text-sm" />
                    <h3 className="text-lg font-semibold text-gray-900">{item.event}</h3>
                  </div>
                  <p className="text-gray-700 mb-2">{item.date}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Completed"
                        ? "bg-gray-100 text-gray-800"
                        : item.status === "Upcoming"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <NotificationsIcon className="text-gray-400 ml-4" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
            <NotificationsIcon className="text-yellow-600 text-3xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Updated</h3>
            <p className="text-gray-700 mb-4">
              Subscribe to our notifications to get instant updates about JEE exam dates, results, and important
              announcements.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Subscribe to Updates
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
