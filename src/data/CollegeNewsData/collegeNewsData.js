import { bitMesraNews } from "./bitMesraNews.js"
import { nitJamshedpurNews } from "./nitJamshedpurNews.js"
import { iitDhanbadNews } from "./iitDhanbadNews.js"
import { ranchiUniversityNews } from "./ranchiUniversityNews.js"
import { xissNews } from "./xissNews.js"
import { cujNews } from "./cujNews.js"

const collegeRegistry = {
  bitMesra: {
    newsData: bitMesraNews,
    config: {
      id: 1,
      collegeName: "Birla Institute of Technology (BIT Mesra)",
      shortName: "BIT Mesra",
      location: "Ranchi, Jharkhand",
      type: "Private",
      established: "1955",
      website: "https://bitmesra.ac.in",
      image: "/bit-mesra-campus.png",
      logo: "/bit-mesra-logo.png",
      totalStudents: "13000+",
      keywords: ["BIT", "Birla", "Technology", "Mesra", "Engineering", "Private"],
    },
  },
  nitJamshedpur: {
    newsData: nitJamshedpurNews,
    config: {
      id: 2,
      collegeName: "National Institute of Technology (NIT Jamshedpur)",
      shortName: "NIT Jamshedpur",
      location: "Jamshedpur, Jharkhand",
      type: "Government",
      established: "1960",
      website: "https://nitjsr.ac.in",
      image: "/nit-jamshedpur-building.png",
      logo: "/nit-jamshedpur-logo.png",
      totalStudents: "4500+",
      keywords: ["NIT", "National", "Technology", "Jamshedpur", "Engineering", "Government"],
    },
  },
  iitDhanbad: {
    newsData: iitDhanbadNews,
    config: {
      id: 3,
      collegeName: "Indian Institute of Technology (IIT Dhanbad)",
      shortName: "IIT Dhanbad",
      location: "Dhanbad, Jharkhand",
      type: "Government",
      established: "1926",
      website: "https://iitism.ac.in",
      image: "/iit-dhanbad-main-building.png",
      logo: "/iit-dhanbad-logo.png",
      totalStudents: "5200+",
      keywords: ["IIT", "Indian", "Technology", "Dhanbad", "Engineering", "Government", "ISM"],
    },
  },
  ranchiUniversity: {
    newsData: ranchiUniversityNews,
    config: {
      id: 4,
      collegeName: "Ranchi University",
      shortName: "Ranchi University",
      location: "Ranchi, Jharkhand",
      type: "Government",
      established: "1960",
      website: "https://ranchiuniversity.ac.in",
      image: "/ranchi-university-gate.png",
      logo: "/ranchi-university-logo.png",
      totalStudents: "25000+",
      keywords: ["Ranchi", "University", "RU", "Government", "Arts", "Science"],
    },
  },
  xiss: {
    newsData: xissNews,
    config: {
      id: 5,
      collegeName: "Xavier Institute of Social Service (XISS)",
      shortName: "XISS",
      location: "Ranchi, Jharkhand",
      type: "Private",
      established: "1955",
      website: "https://xiss.ac.in",
      image: "/xiss-ranchi-campus.png",
      logo: "/generic-institute-logo.png",
      totalStudents: "1200+",
      keywords: ["XISS", "Xavier", "Social", "Service", "Management", "Private"],
    },
  },
  cuj: {
    newsData: cujNews,
    config: {
      id: 6,
      collegeName: "Central University of Jharkhand",
      shortName: "CUJ",
      location: "Ranchi, Jharkhand",
      type: "Government",
      established: "2009",
      website: "https://cuj.ac.in",
      image: "/central-university-jharkhand-modern-campus.png",
      logo: "/central-university-jharkhand-logo.png",
      totalStudents: "3500+",
      keywords: ["CUJ", "Central", "University", "Jharkhand", "Government"],
    },
  },
}

export const collegeNewsData = Object.values(collegeRegistry).map(({ newsData, config }) => ({
  ...config,
  news: newsData,
}))

const comingSoonColleges = [
  {
    id: 101,
    collegeName: "Jharkhand University of Technology (JUT)",
    shortName: "JUT",
    location: "Ranchi, Jharkhand",
    type: "Government",
    established: "Coming Soon",
    website: "#",
    image: "/modern-university-campus.png",
    logo: "/generic-university-logo.png",
    totalStudents: "TBA",
    keywords: ["JUT", "Jharkhand", "University", "Technology", "Engineering"],
    isComingSoon: true,
    expectedLaunch: "2024",
  },
  {
    id: 102,
    collegeName: "Ranchi Institute of Medical Sciences (RIMS)",
    shortName: "RIMS",
    location: "Ranchi, Jharkhand",
    type: "Government",
    established: "Coming Soon",
    website: "#",
    image: "/medical-college.png",
    logo: "/medical-college-logo.png",
    totalStudents: "TBA",
    keywords: ["RIMS", "Ranchi", "Medical", "Sciences", "Healthcare"],
    isComingSoon: true,
    expectedLaunch: "2024",
  },
  {
    id: 103,
    collegeName: "Jharkhand Business School (JBS)",
    shortName: "JBS",
    location: "Jamshedpur, Jharkhand",
    type: "Private",
    established: "Coming Soon",
    website: "#",
    image: "/business-school-campus.png",
    logo: "/business-school-logo.png",
    totalStudents: "TBA",
    keywords: ["JBS", "Jharkhand", "Business", "School", "Management", "MBA"],
    isComingSoon: true,
    expectedLaunch: "2025",
  },
  {
    id: 104,
    collegeName: "Dhanbad College of Engineering (DCE)",
    shortName: "DCE",
    location: "Dhanbad, Jharkhand",
    type: "Government",
    established: "Coming Soon",
    website: "#",
    image: "/engineering-college-campus.png",
    logo: "/engineering-college-logo.png",
    totalStudents: "TBA",
    keywords: ["DCE", "Dhanbad", "College", "Engineering", "Technology"],
    isComingSoon: true,
    expectedLaunch: "2025",
  },
]

export const allColleges = [...collegeNewsData, ...comingSoonColleges]

export const searchColleges = (colleges, searchTerm) => {
  if (!searchTerm.trim()) return colleges

  const terms = searchTerm
    .toLowerCase()
    .split(" ")
    .filter((term) => term.length > 0)

  return colleges.filter((college) => {
    const searchableText = [
      college.collegeName,
      college.shortName,
      college.location,
      college.type,
      college.established,
      ...(college.keywords || []),
    ]
      .join(" ")
      .toLowerCase()

    // Fuzzy matching - check if any term matches
    return terms.some((term) => {
      // Exact match
      if (searchableText.includes(term)) return true

      // Partial match for longer terms
      if (term.length >= 3) {
        return searchableText.split(" ").some((word) => word.startsWith(term) || word.includes(term))
      }

      // Abbreviation match
      const words = searchableText.split(" ")
      const abbreviation = words.map((word) => word.charAt(0)).join("")
      return abbreviation.includes(term)
    })
  })
}

export const newsCategories = [
  { id: "all", name: "All News", color: "#6b7280" },
  { id: "exam", name: "Exams", color: "#dc2626" },
  { id: "holiday", name: "Holidays", color: "#059669" },
  { id: "admission", name: "Admissions", color: "#7c3aed" },
  { id: "event", name: "Events", color: "#ea580c" },
  { id: "placement", name: "Placements", color: "#0891b2" },
  { id: "achievement", name: "Achievements", color: "#ca8a04" },
  { id: "facility", name: "Facilities", color: "#be185d" },
  { id: "program", name: "Programs", color: "#4338ca" },
  { id: "research", name: "Research", color: "#16a34a" },
  { id: "infrastructure", name: "Infrastructure", color: "#9333ea" },
  { id: "scholarship", name: "Scholarships", color: "#dc2626" },
  { id: "course", name: "Courses", color: "#7c3aed" },
  { id: "technology", name: "Technology", color: "#0891b2" },
]

export const buttonTextOptions = [
  "Learn More",
  "View Details",
  "Download Now",
  "Apply Now",
  "Register Now",
  "Submit Form",
  "Check Schedule",
  "Download Guidelines",
  "View Notice",
  "Access Platform",
  "Join Program",
  "Enroll Now",
  "View Winners",
  "Check Eligibility",
  "Download Hall Ticket",
  "Download Timetable",
  "Submit Paper",
  "View Program",
  "Access Library",
  "Download Schedule",
]
