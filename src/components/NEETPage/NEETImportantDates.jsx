import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import NotificationsIcon from "@mui/icons-material/Notifications"

export default function NEETImportantDates() {
  const importantDates = [
    {
      event: "NEET 2024 Application Form Release",
      date: "February 9, 2024",
      status: "Completed",
      type: "registration",
    },
    {
      event: "NEET 2024 Registration Last Date",
      date: "March 9, 2024",
      status: "Completed",
      type: "registration",
    },
    {
      event: "NEET 2024 Application Correction",
      date: "March 10-16, 2024",
      status: "Completed",
      type: "correction",
    },
    {
      event: "NEET 2024 Admit Card Release",
      date: "April 15, 2024",
      status: "Upcoming",
      type: "admit-card",
    },
    {
      event: "NEET 2024 Exam Date",
      date: "May 5, 2024",
      status: "Upcoming",
      type: "exam",
    },
    {
      event: "NEET 2024 Result Declaration",
      date: "June 4, 2024",
      status: "Upcoming",
      type: "result",
    },
    {
      event: "NEET 2024 Counselling Process",
      date: "June 2024 onwards",
      status: "Upcoming",
      type: "counselling",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-gray-100 text-gray-800"
      case "Upcoming":
        return "bg-yellow-100 text-yellow-800"
      case "Active":
        return "bg-green-100 text-green-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "exam":
        return "border-red-400 bg-red-50"
      case "registration":
        return "border-blue-400 bg-blue-50"
      case "result":
        return "border-green-400 bg-green-50"
      case "counselling":
        return "border-purple-400 bg-purple-50"
      default:
        return "border-gray-400 bg-gray-50"
    }
  }

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">NEET Important Dates 2024</h2>
          <p className="text-xl text-gray-600">
            Stay updated with all NEET related important dates, deadlines, and examination schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {importantDates.map((item, index) => (
            <div key={index} className={`p-6 rounded-lg border-l-4 ${getTypeColor(item.type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <CalendarTodayIcon className="text-gray-500 mr-2 text-sm" />
                    <h3 className="text-lg font-semibold text-gray-900">{item.event}</h3>
                  </div>
                  <p className="text-gray-700 mb-3">{item.date}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Never Miss an Update</h3>
            <p className="text-gray-700 mb-4">
              Subscribe to our notification service to get instant alerts about NEET exam dates, results, counselling
              schedules, and important announcements.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Subscribe to NEET Updates
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
