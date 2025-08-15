"use client"

import { useState } from "react"
import CurrentAffairsHero from "../../components/CurrentAffairs/CurrentAffairsHero"
import CurrentAffairsCalendar from "../../components/CurrentAffairs/CurrentAffairsCalendar"
import CurrentAffairsList from "../../components/CurrentAffairs/CurrentAffairsList"
import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"

export default function CurrentAffairsPage() {
  const today = new Date().toISOString().split("T")[0]
  const [selectedDate, setSelectedDate] = useState(today >= "2025-08-05" ? today : "2025-08-05")

  return (
  <>
  <Header/>
    <main className="min-h-screen bg-white">
      <CurrentAffairsHero />
      <CurrentAffairsCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} today={today} />
      <CurrentAffairsList selectedDate={selectedDate} />
    </main>
    <Footer/>
  </>
  )
}
