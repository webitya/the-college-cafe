"use client"
import Link from "next/link"
import CloseIcon from "@mui/icons-material/Close"
import SchoolIcon from "@mui/icons-material/School"
import HomeIcon from "@mui/icons-material/Home"
import InfoIcon from "@mui/icons-material/Info"
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined"
import WorkIcon from "@mui/icons-material/Work"
import NewspaperIcon from "@mui/icons-material/Newspaper"
import ScienceIcon from "@mui/icons-material/Science"
import GavelIcon from "@mui/icons-material/Gavel" // for UPSC
import MenuBookIcon from "@mui/icons-material/MenuBook" // for Library
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import DonateButton from "./DonateButton"

export default function NavbarDrawer({ isOpen, onClose }) {
  const navItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "About Us", href: "/about", icon: InfoIcon },
    { name: "Colleges", href: "/colleges", icon: SchoolOutlinedIcon },
    { name: "JEE", href: "/jee", icon: ScienceIcon },
    { name: "NEET", href: "/neet", icon: LocalHospitalIcon },
    { name: "UPSC", href: "/upsc", icon: GavelIcon },
    { name: "Library", href: "/library", icon: MenuBookIcon },
    { name: "Jobs", href: "/jobs", icon: WorkIcon },
    { name: "Latest News", href: "/news", icon: NewspaperIcon },
  ]

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" onClick={onClose} />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-white">
          <div className="flex items-center space-x-3">
            <SchoolIcon className="text-yellow-500 text-2xl" />
            <span className="text-lg font-bold text-gray-800">THE COLLEGE CAFE</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <CloseIcon className="text-gray-600" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col p-4 space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-all duration-200 group"
              >
                <IconComponent className="text-xl group-hover:text-yellow-600 transition-colors duration-200" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Your Gateway to Higher Education</p>
            <div className="mb-4">
              <DonateButton
                variant="drawer"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              />
            </div>
            <div className="flex justify-center space-x-4">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
