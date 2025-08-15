"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getCourseById, generateLessonsForCourse } from "../../../lib/courseData"
import Header from "../../../components/shared/Header"
import Footer from "../../../components/shared/Footer"
export default function CoursePage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedLesson, setExpandedLesson] = useState(null)

  useEffect(() => {
    const loadCourseData = async () => {
      const courseData = getCourseById(params.courseId)
      if (!courseData) {
        router.push("/")
        return
      }

      setCourse(courseData)
      const lessonsData = await generateLessonsForCourse(params.courseId)
      setLessons(lessonsData)
      setLoading(false)
    }

    loadCourseData()
  }, [params.courseId, router])

  const toggleLesson = (day) => {
    setExpandedLesson(expandedLesson === day ? null : day)
  }

  const startLesson = (day) => {
    router.push(`/course/${params.courseId}/lesson/${day}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h1>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    )
  }

  return (
   <>
   <Header/>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <span className="mr-2 text-xl">←</span>
            Back to Courses
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
              <p className="text-blue-100 text-lg mb-4">{course.description}</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <span className="mr-2 text-lg">🕐</span>
                  <span>{course.duration} Days</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-lg">📖</span>
                  <span>{course.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Lessons</h2>
              <p className="text-gray-600 mb-6">
                Complete all {course.duration} lessons to master {course.name}. Each lesson builds upon the previous
                one.
              </p>

              <div className="space-y-4">
                {lessons.map((lesson, index) => {
                  const isExpanded = expandedLesson === lesson.day

                  return (
                    <div key={lesson.day} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div
                        className="p-4 cursor-pointer transition-colors bg-white hover:bg-gray-50"
                        onClick={() => toggleLesson(lesson.day)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-green-500 text-lg">✓</span>
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                Day {lesson.day}: {lesson.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {lesson.syllabus.length} topics • {lesson.todaysWords.length} vocabulary words
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                startLesson(lesson.day)
                              }}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                            >
                              <span className="mr-1 text-sm">▶</span>
                              Start Lesson
                            </button>
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-gray-200 p-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                <span className="mr-2 text-blue-600">📖</span>
                                Syllabus
                              </h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {lesson.syllabus.slice(0, 3).map((topic, idx) => (
                                  <li key={idx} className="flex items-center">
                                    <span className="w-4 h-4 text-green-500 mr-2">✓</span>
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">Today s Words Preview</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                {lesson.todaysWords.slice(0, 3).map((word, idx) => (
                                  <div key={idx} className="flex items-center">
                                    <span className="font-medium text-blue-600 mr-2">{word.word}</span>
                                    <span className="text-gray-500">- {word.meaning}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Course Features</h3>
              <ul className="space-y-3">
                {course.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-5 h-5 text-green-500 mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Learning Path</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <span className="w-5 h-5 text-blue-500 mr-3">📹</span>
                  Video Lectures
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="w-5 h-5 text-purple-500 mr-3">❓</span>
                  Practice Questions
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="w-5 h-5 text-green-500 mr-3">⬇</span>
                  Downloadable Resources
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="w-5 h-5 text-orange-500 mr-3">📖</span>
                  Daily Vocabulary
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
              <h3 className="font-bold text-gray-800 mb-2">LaieslyBird Learning</h3>
              <p className="text-sm text-gray-600 mb-4">
                Master English with our structured approach designed for effective learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
   </>
  )
}
