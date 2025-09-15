"use client"

import { useState, useEffect } from "react"
import TimerIcon from "@mui/icons-material/Timer"

export default function CountdownTimer({ endDate, onExpire }) {
  const [timeRemaining, setTimeRemaining] = useState(null)

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date()
      const end = new Date(endDate)
      const diff = end - now

      if (diff <= 0) {
        setTimeRemaining({ expired: true })
        if (onExpire) onExpire()
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeRemaining({ days, hours, minutes, seconds, expired: false })
    }

    // Calculate initial time
    calculateTimeRemaining()

    // Update every second for more precise countdown
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [endDate, onExpire])

  if (!timeRemaining) return null

  if (timeRemaining.expired) {
    return (
      <div className="flex items-center gap-2 text-red-600 font-bold">
        <TimerIcon className="text-sm" />
        <span>Expired</span>
      </div>
    )
  }

  const getTimerColor = () => {
    if (timeRemaining.days <= 1) return "text-red-600"
    if (timeRemaining.days <= 7) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className={`flex items-center gap-2 font-bold ${getTimerColor()}`}>
      <TimerIcon className="text-sm" />
      <div className="flex gap-1">
        {timeRemaining.days > 0 && <span>{timeRemaining.days}d</span>}
        {timeRemaining.hours > 0 && <span>{timeRemaining.hours}h</span>}
        <span>{timeRemaining.minutes}m</span>
        <span>{timeRemaining.seconds}s</span>
      </div>
    </div>
  )
}
