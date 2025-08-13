import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import AssignmentIcon from "@mui/icons-material/Assignment"
import PaymentIcon from "@mui/icons-material/Payment"
import LinkIcon from "@mui/icons-material/Link"

export default function CollegeAdmissions({ college }) {
  return (
    <section className="bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Admissions & Important Dates</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Admission Process</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <AssignmentIcon className="text-blue-500 mr-3 mt-1" />
              <div>
                <div className="font-medium text-gray-900">Entrance Exam</div>
                <div className="text-gray-700">{college.admissions?.process}</div>
              </div>
            </div>
            <div className="flex items-start">
              <CalendarTodayIcon className="text-green-500 mr-3 mt-1" />
              <div>
                <div className="font-medium text-gray-900">Application Deadline</div>
                <div className="text-gray-700">{college.admissions?.applicationDeadline}</div>
              </div>
            </div>
            <div className="flex items-start">
              <CalendarTodayIcon className="text-orange-500 mr-3 mt-1" />
              <div>
                <div className="font-medium text-gray-900">Exam Date</div>
                <div className="text-gray-700">{college.admissions?.examDate}</div>
              </div>
            </div>
            <div className="flex items-start">
              <CalendarTodayIcon className="text-purple-500 mr-3 mt-1" />
              <div>
                <div className="font-medium text-gray-900">Counselling</div>
                <div className="text-gray-700">{college.admissions?.counselling}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Exam Dates</h3>
          <div className="space-y-4">
            {college.examDates?.map((exam, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-900">{exam.exam}</div>
                    <div className="text-gray-700">{exam.date}</div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      exam.status === "Upcoming" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {exam.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Fee Payment Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {college.feePaymentLinks?.map((link, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <PaymentIcon className="text-blue-500 mr-3 mt-1" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{link.title}</div>
                  <div className="text-gray-700 text-sm mb-2">{link.description}</div>
                  <a
                    href={link.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <LinkIcon className="text-sm mr-1" />
                    Access Portal
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
