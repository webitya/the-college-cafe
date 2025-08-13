import AboutPage from "../../components/AboutPage/AboutPage"
import ContactForm from "../../components/shared/ContactForm"

export const metadata = {
  title: "About Us - THE COLLEGE CAFE",
  description:
    "Learn about THE COLLEGE CAFE mission to help students find the best colleges and educational opportunities in India.",
}

export default function About() {
  return (
    <div>
      <AboutPage />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
