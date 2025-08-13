import LinkedInIcon from "@mui/icons-material/LinkedIn"
import TwitterIcon from "@mui/icons-material/Twitter"

export default function AboutTeam() {
  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      description: "Educational consultant with 15+ years of experience in higher education guidance.",
    },
    {
      name: "Priya Sharma",
      role: "Head of Content",
      image: "/placeholder.svg?height=300&width=300",
      description: "Former college counselor specializing in engineering and medical college admissions.",
    },
    {
      name: "Amit Singh",
      role: "Technology Lead",
      image: "/placeholder.svg?height=300&width=300",
      description: "Tech expert ensuring our platform delivers the best user experience for students.",
    },
    {
      name: "Sneha Gupta",
      role: "Student Relations",
      image: "/placeholder.svg?height=300&width=300",
      description: "Dedicated to providing personalized support and guidance to every student.",
    },
  ]

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our dedicated team of education experts and technology professionals work tirelessly to serve students
            across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-yellow-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm mb-4">{member.description}</p>
              <div className="flex justify-center space-x-3">
                <LinkedInIcon className="text-gray-400 hover:text-blue-600 cursor-pointer" />
                <TwitterIcon className="text-gray-400 hover:text-blue-400 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
