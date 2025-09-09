import { jeeNewsData } from "./jeeNews"
import { neetNewsData } from "./neetNews"
import { collegeNewsData } from "./collegeNews"

// Original news data
const originalNewsData = [
  {
  id: 4,
  title: "Freelancing Kaise Shuru Kare? Zero se Hero banne ki Poori Game Plan",
  category: "career",
  date: "2025-09-09",
  image: "https://static.wixstatic.com/media/6542d9_224d1ad15e44480ab0a13a66e37cc9d4~mv2.jpg/v1/fill/w_925,h_529,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/6542d9_224d1ad15e44480ab0a13a66e37cc9d4~mv2.jpg?height=200&width=300",
  excerpt: "Confused about freelancing? Yeh step-by-step game plan tumhe 30 din ke andar pehla client dilane mein help karega.",
  content: "Kabhi socha hai — “Yaar, agar main apna boss hota toh kitna mast hota… apne time pe kaam, apne hisaab se income?” Agar yeh thought aaya hai, toh believe me, tum akela nahi ho. Har dusra banda soch raha hai ki job ke rat-race se nikalke apna kuch kare. Aur freelancing uska sabse easy gateway hai.\n\nLekin problem yeh hai ki shuruwaat mein sab confuse ho jaate hain — “Skill kya choose karun? Client kaise milega? Profile kaise banani hai?” Chinta mat karo — yeh blog ekdum step-by-step game plan hai jisse tum 30 din ke andar apna pehla freelancing project le aaoge.\n\nLevel 1: Apni 'Weapon' Choose Karo (Find Your Skill)\n1.1 Skill Selection: Jo aati hai, wahi chalao… warna nayi seekho. Without skill freelancing = bina hathiyaar ke battlefield.\n\nHigh-demand Skills 2024:\n- Quick Seekhne waali: Content Writing, Video Editing, Canva se Graphic Design, Social Media Marketing.\n- High Paying: WordPress Website Banana, SEO, Data Analysis.\n\n🔥 Action Tip: 10 minute nikalo aur phone ke notes mein 3–5 skills likho. Usmein se ek choose karo.\n\nLevel 2: Apna 'Thela' Lagao (Set Up Your Shop)\nPortfolio = Tumhari Dukaan. Sample Projects banao (fake Insta posts, demo articles, etc.) aur Behance, GitHub, Medium ya Carrd par showcase karo.\n\nFreelance Platforms:\n- Fiverr (Beginners, creatives)\n- Upwork (Long-term pro projects)\n- Freelancer.com (Indian clients, mixed work)\n- LinkedIn (Networking + hidden gems)\n\n🔥 Action Tip: Aaj hi Fiverr/Upwork par account banao aur profile setup karo.\n\nLevel 3: Pehla Client Jeeto (Land Your First Client)\nProposal ka mantra = A.I.C Formula:\nA = Acknowledge → Client ka naam + requirement\nI = Illustrate → Problem solve karne ka plan\nC = Credibility → Portfolio/sample attach karo\n\nPricing Game: Starter packages offer karo aur reviews pe focus karo.\n\nLevel 4: Kaam Poora Karo aur Aage Badho (Delivery & Growth)\n- Deadline se pehle delivery karo\n- Politely reviews maango\n- Repeat clients banao\n- Har saal ek skill add karo\n- Rates gradually badhao\n\nFreelancing ek marathon hai, sprint nahi. Agar consistent rahe toh pehla client pakka milega.\n\nSabse bada funda? Start Now — skill list banao, profile set karo aur proposal bhejo.\n\nTumhara Pehla Kadam: Comment karke batao tum kaunsi skill leke freelancing mein utarne wale ho.",
  slug: "freelancing-kaise-shuru-kare-zero-se-hero"
}
,
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
