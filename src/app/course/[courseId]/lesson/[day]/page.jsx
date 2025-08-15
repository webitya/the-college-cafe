"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getCourseById, getLessonByDay } from "../../../../../lib/courseData"
import {
  FaBook,
  FaGlobe,
  FaQuestionCircle,
  FaVideo,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaVolumeUp,
  FaPlay,
  FaTimes,
  FaCheck,
  FaTimes as FaX,
  FaCheckCircle,
  FaDownload,
  FaFilePdf,
} from "react-icons/fa"
import Header from "../../../../../components/shared/Header"
import Footer from "../../../../../components/shared/Footer"
export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState(null)
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("overview")
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showQuizResults, setShowQuizResults] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const loadLessonData = async () => {
      const courseData = getCourseById(params.courseId)
      if (!courseData) {
        router.push("/")
        return
      }

      setCourse(courseData)
      const lessonData = await getLessonByDay(params.courseId, Number.parseInt(params.day))
      if (!lessonData) {
        router.push(`/course/${params.courseId}`)
        return
      }

      setLesson(lessonData)
      setLoading(false)
    }

    loadLessonData()
  }, [params.courseId, params.day, router])

  const speakWord = (word) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = "en-US"
      speechSynthesis.speak(utterance)
    }
  }

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }))
  }

  const submitQuiz = () => {
    setShowQuizResults(true)
  }

  const navigateLesson = (direction) => {
    const newDay = direction === "next" ? Number.parseInt(params.day) + 1 : Number.parseInt(params.day) - 1
    if (newDay >= 1 && newDay <= course.duration) {
      router.push(`/course/${params.courseId}/lesson/${newDay}`)
    }
  }

  const sections = [
    { id: "overview", name: "Overview", icon: FaBook },
    { id: "vocabulary", name: "Vocabulary", icon: FaGlobe },
    { id: "practice", name: "Practice", icon: FaQuestionCircle },
    { id: "video", name: "Video", icon: FaVideo },
    { id: "resources", name: "Resources", icon: FaDownload },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    )
  }

  if (!lesson || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson Not Found</h1>
          <button
            onClick={() => router.push(`/course/${params.courseId}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Course
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
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push(`/course/${params.courseId}`)}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FaArrowLeft className="mr-2 text-lg" />
                Back to Course
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{lesson.title}</h1>
                <p className="text-sm text-gray-600">
                  LaieslyBird {course.name} • Day {lesson.day}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateLesson("prev")}
                disabled={Number.parseInt(params.day) <= 1}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaChevronLeft className="text-lg mr-1" />
                Previous
              </button>
              <button
                onClick={() => navigateLesson("next")}
                disabled={Number.parseInt(params.day) >= course.duration}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <FaChevronRight className="text-lg ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
              <h3 className="font-semibold text-gray-800 mb-4">Lesson Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const IconComponent = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <IconComponent className="mr-3 text-lg" />
                      {section.name}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Overview Section */}
              {activeSection === "overview" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaBook className="mr-3 text-blue-600 text-2xl" />
                    Lesson Overview
                  </h2>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Syllabus</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {lesson.syllabus.map((topic, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <FaCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-700">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Learning Objectives</h3>
                    <p className="text-blue-700">
                      By the end of this lesson, you will have mastered key {course.level.toLowerCase()} concepts and
                      expanded your vocabulary with {lesson.todaysWords.length} new words.
                    </p>
                  </div>
                </div>
              )}

              {/* Vocabulary Section */}
              {activeSection === "vocabulary" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaGlobe className="mr-3 text-purple-600 text-2xl" />
                    Today's Vocabulary
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lesson.todaysWords.map((wordObj, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-blue-600">{wordObj.word}</h3>
                          <button
                            onClick={() => speakWord(wordObj.word)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          >
                            <FaVolumeUp className="text-lg" />
                          </button>
                        </div>
                        <p className="text-gray-700 mb-3">{wordObj.meaning}</p>
                        <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
                          <p className="text-sm text-gray-600 italic">"{wordObj.example}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practice Section */}
              {activeSection === "practice" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaQuestionCircle className="mr-3 text-green-600 text-2xl" />
                    Practice Questions
                  </h2>

                  {!showQuizResults ? (
                    <div className="space-y-6">
                      {lesson.practiceQuestions.map((question, qIndex) => (
                        <div key={qIndex} className="border border-gray-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Question {qIndex + 1}: {question.question}
                          </h3>
                          <div className="space-y-3">
                            {question.options.map((option, oIndex) => (
                              <label key={oIndex} className="flex items-center cursor-pointer">
                                <input
                                  type="radio"
                                  name={`question-${qIndex}`}
                                  value={oIndex}
                                  onChange={() => handleQuizAnswer(qIndex, oIndex)}
                                  className="mr-3 w-4 h-4 text-blue-600"
                                />
                                <span className="text-gray-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={submitQuiz}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                      >
                        <FaCheck className="mr-2" />
                        Submit Quiz
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Quiz Results</h3>
                        <p className="text-green-700">Great job completing the practice questions!</p>
                      </div>

                      {lesson.practiceQuestions.map((question, qIndex) => {
                        const userAnswer = quizAnswers[qIndex]
                        const isCorrect = userAnswer === question.correctAnswer

                        return (
                          <div key={qIndex} className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                              Question {qIndex + 1}: {question.question}
                            </h3>
                            <div className="space-y-2">
                              {question.options.map((option, oIndex) => (
                                <div
                                  key={oIndex}
                                  className={`p-3 rounded-lg flex items-center ${
                                    oIndex === question.correctAnswer
                                      ? "bg-green-100 border border-green-300"
                                      : userAnswer === oIndex && !isCorrect
                                        ? "bg-red-100 border border-red-300"
                                        : "bg-gray-50"
                                  }`}
                                >
                                  {oIndex === question.correctAnswer ? (
                                    <FaCheck className="w-5 h-5 text-green-600 mr-3" />
                                  ) : userAnswer === oIndex && !isCorrect ? (
                                    <FaX className="w-5 h-5 text-red-600 mr-3" />
                                  ) : (
                                    <div className="w-5 h-5 mr-3" />
                                  )}
                                  <span
                                    className={`${
                                      oIndex === question.correctAnswer
                                        ? "text-green-800 font-semibold"
                                        : "text-gray-700"
                                    }`}
                                  >
                                    {option}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Video Section */}
              {activeSection === "video" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaVideo className="mr-3 text-red-600 text-2xl" />
                    Video Lecture
                  </h2>

                  <div className="space-y-6">
                    {!showVideo ? (
                      <div className="bg-gray-100 rounded-lg p-8 text-center">
                        <FaVideo className="text-6xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Video Lecture</h3>
                        <p className="text-gray-600 mb-4">Watch the comprehensive video lesson for Day {lesson.day}</p>
                        <button
                          onClick={() => setShowVideo(true)}
                          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center mx-auto"
                        >
                          <FaPlay className="mr-2" />
                          Play Video
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-800">{lesson.title} - Video Lecture</h3>
                          <button
                            onClick={() => setShowVideo(false)}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            <FaTimes className="text-xl" />
                          </button>
                        </div>

                        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                          <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                            src={`https://www.youtube.com/embed/${lesson.videoId || "dQw4w9WgXcQ"}?autoplay=1&rel=0&modestbranding=1`}
                            title={`${lesson.title} - Video Lecture`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Video Notes:</h4>
                          <ul className="text-blue-700 space-y-1">
                            <li>• Follow along with the instructor</li>
                            <li>• Practice pronunciation as you watch</li>
                            <li>• Take notes on key concepts</li>
                            <li>• Replay sections as needed</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Resources Section */}
              {activeSection === "resources" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaDownload className="mr-3 text-orange-600 text-2xl" />
                    Download Resources
                  </h2>

                  <div className="mb-6">
                    <p className="text-gray-600 mb-4">Download additional materials and worksheets for this lesson.</p>
                  </div>

                  <div className="max-w-md mx-auto">
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <FaFilePdf className="text-4xl text-red-500 mr-4" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Lesson Resources</h3>
                          <p className="text-sm text-gray-600">Complete lesson materials and exercises</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">PDF • 2.5 MB</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Day {lesson.day}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const link = document.createElement("a")
                          link.href =
                            lesson.resourcePdf || `/resources/${params.courseId}/day${lesson.day}-resources.pdf`
                          link.download = `LaieslyBird-${course.name}-Day-${lesson.day}-Resources.pdf`
                          link.click()
                        }}
                        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <FaDownload className="mr-2" />
                        Download PDF
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                      <FaFilePdf className="mr-2" />
                      What's Included:
                    </h4>
                    <ul className="text-orange-700 space-y-1">
                      <li>• Complete lesson notes and explanations</li>
                      <li>• Practice exercises and worksheets</li>
                      <li>• Vocabulary reference with examples</li>
                      <li>• Additional learning activities</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
<Footer/>
</>
  )
}
