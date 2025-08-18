"use client"
import { useState } from "react"
import FavoriteIcon from "@mui/icons-material/Favorite"

export default function DonateButton({ variant = "primary", size = "medium", className = "", showText = true }) {
  const [isHovered, setIsHovered] = useState(false)

  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"

  const variants = {
    primary:
      "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-orange-500",
    secondary: "bg-white text-yellow-600 border-2 border-yellow-400 hover:bg-yellow-50 hover:border-yellow-500",
    minimal: "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50",
    drawer: "bg-yellow-500 hover:bg-yellow-600 text-white",
  }

  const sizes = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  }

  const handleDonate = () => {
    window.location.href = "/donate"
  }

  return (
    <button
      onClick={handleDonate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <FavoriteIcon
        className={`${showText ? "mr-2" : ""} transition-transform duration-300 ${isHovered ? "animate-pulse" : ""}`}
        style={{ fontSize: size === "small" ? "18px" : size === "large" ? "24px" : "20px" }}
      />
      {showText && <span>Donate Now</span>}
    </button>
  )
}
