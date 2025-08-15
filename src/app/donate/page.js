import DonateHero from "../../components/Donate/DonateHero"
import DonateForm from "../../components/Donate/DonateForm"
import DonateImpact from "../../components/Donate/DonateImpact"

export const metadata = {
  title: "Donate Now - Support Education | THE COLLEGE CAFE",
  description:
    "Support THE COLLEGE CAFE in providing quality educational resources and guidance to students. Your donation helps us continue our mission of making education accessible to all.",
}

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white">
      <DonateHero />
      <DonateForm />
      <DonateImpact />
    </div>
  )
}
