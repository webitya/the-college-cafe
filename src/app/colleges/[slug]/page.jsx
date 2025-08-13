import CollegeDetailPage from "../../../components/CollegeDetailPage/CollegeDetailPage"
import { collegesData } from "../../../data/colleges/allColleges"

export async function generateMetadata({ params }) {
  const college = collegesData.find((c) => c.slug === params.slug)

  if (!college) {
    return {
      title: "College Not Found - THE COLLEGE CAFE",
      description: "The requested college information is not available.",
    }
  }

  return {
    title: `${college.name} - Admission, Fees, Courses | THE COLLEGE CAFE`,
    description: `Complete information about ${college.name} including admission process, course fees, syllabus, campus facilities, and placement details.`,
  }
}

export default function CollegeDetail({ params }) {
  return <CollegeDetailPage slug={params.slug} />
}
