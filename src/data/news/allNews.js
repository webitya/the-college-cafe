import { jeeNewsData } from "./jeeNews"
import { neetNewsData } from "./neetNews"
import { collegeNewsData } from "./collegeNews"

// Original news data
const originalNewsData = [
  {
    id: 1,
    title: "JEE Main 2024 Registration Begins",
    category: "jee",
    date: "2024-01-20",
    image: "/placeholder.svg?height=200&width=300",
    excerpt: "National Testing Agency announces JEE Main 2024 registration dates and important guidelines.",
    content: "The National Testing Agency (NTA) has announced the registration dates for JEE Main 2024...",
    slug: "jee-main-2024-registration-begins",
  },
  {
    id: 2,
    title: "NEET 2024 Syllabus Updated",
    category: "neet",
    date: "2024-01-18",
    image: "/placeholder.svg?height=200&width=300",
    excerpt: "Medical Council of India releases updated NEET 2024 syllabus with important changes.",
    content: "The Medical Council of India has released the updated NEET 2024 syllabus...",
    slug: "neet-2024-syllabus-updated",
  },
  {
    id: 3,
    title: "New Engineering Colleges Approved in Jharkhand",
    category: "colleges",
    date: "2024-01-15",
    image: "/placeholder.svg?height=200&width=300",
    excerpt: "AICTE approves 5 new engineering colleges in Jharkhand for the academic year 2024-25.",
    content: "The All India Council for Technical Education (AICTE) has approved 5 new engineering colleges...",
    slug: "new-engineering-colleges-approved-jharkhand",
  },
]

// Combine all news data
export const newsData = [...originalNewsData, ...jeeNewsData, ...neetNewsData, ...collegeNewsData]

export const newsByCategory = {
  jee: [...originalNewsData.filter((news) => news.category === "jee"), ...jeeNewsData],
  neet: [...originalNewsData.filter((news) => news.category === "neet"), ...neetNewsData],
  colleges: [...originalNewsData.filter((news) => news.category === "colleges"), ...collegeNewsData],
  jobs: newsData.filter((news) => news.category === "jobs"),
  general: newsData.filter((news) => news.category === "general"),
}
