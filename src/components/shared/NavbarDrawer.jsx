"use client"
import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import CloseIcon from "@mui/icons-material/Close"
import SchoolIcon from "@mui/icons-material/School"
import HomeIcon from "@mui/icons-material/Home"
import InfoIcon from "@mui/icons-material/Info"
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined"
import WorkIcon from "@mui/icons-material/Work"
import NewspaperIcon from "@mui/icons-material/Newspaper"
import GavelIcon from "@mui/icons-material/Gavel"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import PublicIcon from "@mui/icons-material/Public"
import CampaignIcon from "@mui/icons-material/Campaign"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import DonateButton from "./DonateButton"

export default function NavbarDrawer({ isOpen, onClose }) {
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const navItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "About Us", href: "/about", icon: InfoIcon },
    { name: "Colleges", href: "/colleges", icon: SchoolOutlinedIcon },
    { name: "Weekly QUIZ", href: "/quiz", icon: GavelIcon },
    { name: "Library", href: "/library", icon: MenuBookIcon },
    { name: "Jobs", href: "/jobs", icon: WorkIcon },
    { name: "Government Jobs", href: "/government-jobs", icon: AccountBalanceIcon },
    { name: "Current Affairs", href: "/current-affairs", icon: PublicIcon },
    { name: "College News", href: "/college-news", icon: CampaignIcon },
    { name: "Latest News", href: "/news", icon: NewspaperIcon },
  ]

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white/70 backdrop-blur-xl border-l border-white/40 shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/40 bg-white/50 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <SchoolIcon className="text-yellow-500 text-xl" />
            <span className="text-base font-semibold text-gray-800">THE COLLEGE CAFE</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <CloseIcon className="text-gray-600" />
          </button>
        </div>

        {/* Main Content (nav + footer) */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto">
          {/* Navigation */}
          <nav className="flex flex-col p-4 space-y-1">
            {navItems.map((item) => {
              const IconComponent = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center space-x-3 p-2 rounded-md transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-yellow-400 via-orange-300 to-pink-300 text-white shadow-sm"
                        : "text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
                    }`}
                >
                  <IconComponent
                    className={`text-lg transition-colors duration-200 ${isActive ? "text-white" : "text-gray-500"}`}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer (Always sticks to bottom) */}
          <div className="p-4 border-t border-white/40 bg-white/60 backdrop-blur-md">
            <div className="flex flex-col items-center space-y-3">
              <DonateButton
                variant="drawer"
                className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 hover:from-yellow-500 hover:via-orange-500 hover:to-pink-500 text-white font-medium py-2.5 rounded-lg shadow-sm transition-colors duration-200"
              />
              <a
                href="https://webitya.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs transition"
              >
                <img src="/webitya.jpeg" alt="Webitya Logo" className="w-4 h-4 rounded-full" />
                <span className="text-gray-600">
                  Powered by{" "}
                  <span className="font-semibold bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                    Webitya
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
