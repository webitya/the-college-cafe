import { Suspense } from "react"
import ThankYouContent from "../../../components/Donate/ThankYouContent"

export const metadata = {
  title: "Thank You for Your Donation - THE COLLEGE CAFE",
  description:
    "Thank you for supporting THE COLLEGE CAFE with your generous donation. Your contribution helps us provide quality educational resources to students across India.",
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
        <ThankYouContent />
      </Suspense>
    </div>
  )
}
