"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  FaBookOpen as BookOpenIcon,
  FaClock as ClockIcon,
  FaUsers as UsersIcon,
  FaTrophy as AwardIcon,
  FaPlay as PlayIcon,
  FaDownload as DownloadIcon,
  FaChevronRight as ChevronRightIcon,
  FaFileAlt as FileTextIcon,
} from "react-icons/fa"
import { courses } from "../../lib/courseData"
import Header from "../../components/shared/Header"
import Footer from "../../components/shared/Footer"

export default function EnglishCoursePage() {
  const router = useRouter()
  const [selectedCourse, setSelectedCourse] = useState(null)

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "Intermediate":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Advanced":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Expert":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
   <>
   <Header/>

 <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">LaieslyBird English Courses</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Master English at your own pace with our structured learning programs
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                <span>10,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <AwardIcon className="h-5 w-5" />
                <span>Certified Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5" />
                <span>Interactive Learning</span>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => router.push("/resources")}
                className="inline-flex items-center px-6 py-3 text-lg font-medium rounded-lg bg-white text-blue-600 hover:bg-gray-100 transition-colors duration-200 shadow-md"
              >
                <FileTextIcon className="h-5 w-5 mr-2" />
                Browse Resources
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Selection */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Learning Path</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Select the course that matches your current level and time commitment. Each course is designed to build your
            skills progressively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-white rounded-lg border shadow-sm ${
                selectedCourse === course.id ? "ring-2 ring-purple-500" : ""
              }`}
              onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
            >
              <div className="text-center pb-4 p-6">
                <div className="text-4xl mb-2">
                  {course.duration <= 7 ? "🚀" : course.duration <= 21 ? "📚" : course.duration <= 30 ? "🎯" : "👑"}
                </div>
                <h3 className="text-xl font-semibold">{course.name}</h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(course.level)}`}
                >
                  {course.level}
                </span>
              </div>
              <div className="space-y-4 p-6 pt-0">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <ClockIcon className="h-4 w-4" />
                  <span>{course.duration} Days</span>
                </div>
                <p className="text-center text-gray-600">{course.description}</p>
                <ul className="space-y-1 text-sm">
                  {course.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/course/${course.id}`)
                  }}
                >
                  Start Course
                  <ChevronRightIcon className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Course Details */}
        {selectedCourse && (
          <div className="mb-8 bg-white rounded-lg border shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {courses.find((c) => c.id === selectedCourse)?.name} - Course Overview
                  </h3>
                  <p className="text-lg mt-2 text-gray-600">
                    {courses.find((c) => c.id === selectedCourse)?.description}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium border ${getLevelColor(courses.find((c) => c.id === selectedCourse)?.level || "")}`}
                >
                  {courses.find((c) => c.id === selectedCourse)?.level}
                </span>
              </div>
            </div>
            <div className="p-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Course Features</h3>
                  <ul className="space-y-3">
                    {courses
                      .find((c) => c.id === selectedCourse)
                      ?.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Sample Daily Lesson</h3>
                  <div className="bg-gray-100 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <BookOpenIcon className="h-5 w-5 text-purple-500" />
                      <span className="font-medium">
                        Day 1: {courses.find((c) => c.id === selectedCourse)?.lessons[0]?.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlayIcon className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Video Lecture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DownloadIcon className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Downloadable Resources</span>
                    </div>
                    <div className="text-sm text-gray-600">+ Practice Questions, Vocabulary, and more...</div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <button className="flex-1 inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200">
                  Enroll Now - Start Learning
                  <ChevronRightIcon className="h-5 w-5 ml-2" />
                </button>
                <button className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg border border-purple-200 text-purple-600 bg-transparent hover:bg-purple-50 transition-colors duration-200">
                  Preview Course
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="text-center bg-white rounded-lg border shadow-sm">
            <div className="pt-6 p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpenIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Structured Learning</h3>
              <p className="text-gray-600">Daily lessons with clear objectives and progressive skill building</p>
            </div>
          </div>
          <div className="text-center bg-white rounded-lg border shadow-sm">
            <div className="pt-6 p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlayIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Video Lectures</h3>
              <p className="text-gray-600">Expert-led video content with clear explanations and examples</p>
            </div>
          </div>
          <div className="text-center bg-white rounded-lg border shadow-sm">
            <div className="pt-6 p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DownloadIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Resources</h3>
              <p className="text-gray-600">Downloadable PDFs, worksheets, and reference materials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
   <Footer/>
   </>
  )
}
