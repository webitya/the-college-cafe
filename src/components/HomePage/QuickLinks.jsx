import Link from "next/link"
import SchoolIcon from "@mui/icons-material/School"
import WorkIcon from "@mui/icons-material/Work"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import NewspaperIcon from "@mui/icons-material/Newspaper"
import InfoIcon from "@mui/icons-material/Info"

export default function QuickLinks() {
  const quickLinks = [
    {
      title: "JEE Preparation",
      description: "Complete guide for JEE Main & Advanced",
      icon: <MenuBookIcon className="text-3xl" />,
      href: "/jee",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "NEET Preparation",
      description: "Medical entrance exam preparation",
      icon: <LocalHospitalIcon className="text-3xl" />,
      href: "/neet",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Top Colleges",
      description: "Explore best colleges in India",
      icon: <SchoolIcon className="text-3xl" />,
      href: "/colleges",
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Job Opportunities",
      description: "Latest job openings and careers",
      icon: <WorkIcon className="text-3xl" />,
      href: "/jobs",
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Latest News",
      description: "Education news and updates",
      icon: <NewspaperIcon className="text-3xl" />,
      href: "/news",
      color: "bg-red-50 text-red-600",
    },
    {
      title: "About Us",
      description: "Learn more about our mission",
      icon: <InfoIcon className="text-3xl" />,
      href: "/about",
      color: "bg-gray-50 text-gray-600",
    },
  ]

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Quick Access</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need for your educational journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 group"
            >
              <div
                className={`w-16 h-16 rounded-lg ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
              >
                {link.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{link.title}</h3>
              <p className="text-gray-600">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
