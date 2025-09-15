"use client"
import Link from "next/link"
import { useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import SchoolIcon from "@mui/icons-material/School"
import DonateButton from "./DonateButton"
import NavbarDrawer from "./NavbarDrawer"

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Current Affairs", href: "/current-affairs" },
    { name: "Library", href: "/library" },
    { name: "Jobs", href: "/jobs" },
    { name: "Colleges", href: "/colleges" },
    { name: "Government Jobs", href: "/government-jobs" },
    { name: "Blog", href: "/blog" },
    { name: "Weekly Quiz", href: "/quiz" },
    // { name: "Latest News", href: "/news" },
  ]

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <SchoolIcon className="text-yellow-500 text-3xl" />
              <span className="text-xl font-bold text-gray-800">THE COLLEGE CAFE</span>
            </Link>

            <nav className="hidden md:flex space-x-3 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              <DonateButton variant="primary" size="medium" />
            </nav>

            <div className="md:hidden flex items-center space-x-2">
              <DonateButton variant="primary" size="small" showText={false} />
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="p-2 rounded-md text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 transition-colors duration-200"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      <NavbarDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  )
}
