import Header from "../../components/shared/Header"
import BlogListing from "../../components/BlogListing"
import Footer from "../../components/shared/Footer"

export const metadata = {
  title: "Blog - Career Insights & Job Market Trends | College Job Portal",
  description:
    "Stay updated with the latest career insights, job market trends, and professional development tips. Expert advice for students and job seekers.",
  keywords: "career blog, job market trends, career advice, professional development, job search tips, career insights",
  openGraph: {
    title: "Blog - Career Insights & Job Market Trends",
    description: "Stay updated with the latest career insights, job market trends, and professional development tips.",
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Career Insights & Job Market Trends",
    description: "Stay updated with the latest career insights, job market trends, and professional development tips.",
  },
  alternates: {
    canonical: "/blog",
  },
}

export default function BlogPage() {
  return <>
  <Header/>
<BlogListing />
  <Footer/>
  </>
}
