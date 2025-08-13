import LinkedInIcon from "@mui/icons-material/LinkedIn"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"

export default function AboutTeam() {
  const teamMembers = [
    {
      name: "Rajnish Maurya",
      role: "Founder",
      image: "https://laser360clinic.com/wp-content/uploads/2020/08/user-image.jpg",
      description: "Visionary leader with extensive experience in educational technology and student guidance.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/rajnish-maurya",
        twitter: "https://twitter.com/rajnish_maurya",
        instagram: "https://instagram.com/rajnish.maurya",
        youtube: "https://youtube.com/@rajnishmaurya",
        whatsapp: "https://wa.me/919876543210",
      },
    },
    {
      name: "Aditya Kumar",
      role: "CEO",
      image: "https://laser360clinic.com/wp-content/uploads/2020/08/user-image.jpg",
      description: "Strategic leader driving innovation in college admission guidance and educational services.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/aditya-kumar-ceo",
        twitter: "https://twitter.com/aditya_kumar",
        instagram: "https://instagram.com/aditya.kumar",
        youtube: "https://youtube.com/@adityakumar",
        whatsapp: "https://wa.me/919876543211",
      },
    },
    {
      name: "Rajshakher Pathak",
      role: "Co-founder",
      image: "https://laser360clinic.com/wp-content/uploads/2020/08/user-image.jpg",
      description: "Educational expert specializing in engineering and medical college admissions across India.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/rajshakher-pathak",
        twitter: "https://twitter.com/rajshakher_pathak",
        instagram: "https://instagram.com/rajshakher.pathak",
        youtube: "https://youtube.com/@rajshakherpathak",
        whatsapp: "https://wa.me/919876543212",
      },
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
                <a
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  <LinkedInIcon className="w-6 h-6" />
                </a>
                <a
                  href={member.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  <TwitterIcon className="w-6 h-6" />
                </a>
                <a
                  href={member.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
                >
                  <InstagramIcon className="w-6 h-6" />
                </a>
                <a
                  href={member.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                >
                  <YouTubeIcon className="w-6 h-6" />
                </a>
                <a
                  href={member.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-500 transition-colors duration-200"
                >
                  <WhatsAppIcon className="w-6 h-6" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
