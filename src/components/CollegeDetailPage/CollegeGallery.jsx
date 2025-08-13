"use client"
import { useState } from "react"
import Image from "next/image"
import CloseIcon from "@mui/icons-material/Close"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export default function CollegeGallery({ college }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setSelectedImage(college.gallery[index])
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % college.gallery.length
    setCurrentIndex(nextIndex)
    setSelectedImage(college.gallery[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + college.gallery.length) % college.gallery.length
    setCurrentIndex(prevIndex)
    setSelectedImage(college.gallery[prevIndex])
  }

  return (
    <section className="bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Campus Gallery</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {college.gallery?.map((image, index) => (
          <div
            key={index}
            className="relative h-48 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200"
            onClick={() => openLightbox(index)}
          >
            <Image src={image || "/placeholder.svg"} alt={`Campus view ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
              <CloseIcon className="text-3xl" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ArrowBackIcon className="text-3xl" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ArrowForwardIcon className="text-3xl" />
            </button>

            <div className="relative h-96 md:h-[600px] w-full">
              <Image src={selectedImage || "/placeholder.svg"} alt="Campus view" fill className="object-contain" />
            </div>

            <div className="text-center text-white mt-4">
              {currentIndex + 1} of {college.gallery.length}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
