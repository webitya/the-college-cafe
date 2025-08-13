import LocationOnIcon from "@mui/icons-material/LocationOn"
import WorkIcon from "@mui/icons-material/Work"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"

export default function JobsList() {
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "TechCorp Solutions",
      location: "Ranchi, Jharkhand",
      type: "Full Time",
      salary: "₹4-6 LPA",
      experience: "0-2 years",
      postedDate: "2 days ago",
      description: "Looking for a passionate software engineer to join our growing team...",
      skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "Analytics Pro",
      location: "Delhi, India",
      type: "Full Time",
      salary: "₹3-5 LPA",
      experience: "1-3 years",
      postedDate: "1 day ago",
      description: "Seeking a detail-oriented data analyst to help drive business insights...",
      skills: ["Python", "SQL", "Excel", "Tableau"],
    },
    {
      id: 3,
      title: "Marketing Intern",
      company: "Digital Marketing Hub",
      location: "Mumbai, India",
      type: "Internship",
      salary: "₹15,000/month",
      experience: "Fresher",
      postedDate: "3 days ago",
      description: "Great opportunity for freshers to learn digital marketing strategies...",
      skills: ["Social Media", "Content Writing", "SEO", "Analytics"],
    },
    {
      id: 4,
      title: "Mechanical Engineer",
      company: "Industrial Solutions Ltd",
      location: "Jamshedpur, Jharkhand",
      type: "Full Time",
      salary: "₹3-4 LPA",
      experience: "0-1 years",
      postedDate: "1 week ago",
      description: "Entry-level position for mechanical engineering graduates...",
      skills: ["AutoCAD", "SolidWorks", "Manufacturing", "Quality Control"],
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Showing {jobs.length} jobs</h2>
        <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
          <option>Sort by Relevance</option>
          <option>Sort by Date</option>
          <option>Sort by Salary</option>
          <option>Sort by Company</option>
        </select>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-lg text-gray-700 font-medium mb-2">{job.company}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <LocationOnIcon className="text-sm mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <WorkIcon className="text-sm mr-1" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <AttachMoneyIcon className="text-sm mr-1" />
                    {job.salary}
                  </div>
                  <div className="flex items-center">
                    <AccessTimeIcon className="text-sm mr-1" />
                    {job.postedDate}
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-yellow-600">
                <BookmarkBorderIcon />
              </button>
            </div>

            <p className="text-gray-700 mb-4">{job.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Experience:</span> {job.experience}
              </div>
              <div className="flex gap-3">
                <button className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-lg font-medium border border-gray-300 transition-colors duration-200">
                  Save Job
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <nav className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">3</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">Next</button>
        </nav>
      </div>
    </div>
  )
}
