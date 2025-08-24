"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Clock, CheckCircle, Menu } from "lucide-react"
import { getQuizByWeek } from "../../../data/quizdata/index.js"
import Header from "../../../components/shared/Header"

export default function QuizTakingPage() {
  const params = useParams()
  const router = useRouter()
  const [quiz, setQuiz] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false) // Mobile sidebar toggle

  useEffect(() => {
    const quizData = getQuizByWeek(params.week)
    if (!quizData) {
      router.push("/quiz")
      return
    }
    setQuiz(quizData)
  }, [params.week, router])

  useEffect(() => {
    if (isSubmitted) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isSubmitted])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleSubmit = () => {
    const score = calculateScore()
    const percentage = Math.round((score / quiz.questions.length) * 100)

    // Store results in localStorage for the results page
    const results = {
      quiz: quiz.title,
      week: quiz.weekNumber,
      score,
      totalQuestions: quiz.questions.length,
      percentage,
      answers,
      timeSpent: 3600 - timeLeft,
    }

    localStorage.setItem("quizResults", JSON.stringify(results))
    router.push(`/quiz/${params.week}/results`)
  }

  const calculateScore = () => {
    let score = 0
    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        score++
      }
    })
    return score
  }

  const getAnsweredCount = () => {
    return Object.keys(answers).length
  }

  const goToQuestion = (index) => {
    setCurrentQuestion(index)
  }

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    )
  }

  const currentQ = quiz.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-12">
            <div className="text-sm text-gray-600">
              {quiz.title} - Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-lg">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-900 text-sm">{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden p-1 text-gray-600 hover:text-gray-900"
              >
                <Menu className="h-4 w-4" />
              </button>
              <div className="hidden sm:block text-sm text-gray-600">
                {getAnsweredCount()}/{quiz.questions.length} answered
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex gap-6 lg:gap-8">
          <div
            className={`${showSidebar ? "fixed inset-0 z-40 bg-black bg-opacity-50 lg:bg-transparent lg:relative lg:inset-auto" : "hidden"} lg:block lg:w-80 lg:flex-shrink-0`}
          >
            <div
              className={`${showSidebar ? "absolute right-0 top-0 h-full w-80 bg-white shadow-xl" : ""} lg:relative lg:shadow-none`}
            >
              <div className="bg-white border border-gray-200 rounded-xl p-6 lg:sticky lg:top-32">
                {showSidebar && (
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 lg:hidden"
                  >
                    ×
                  </button>
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions</h3>
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {quiz.questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        goToQuestion(index)
                        setShowSidebar(false)
                      }}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentQuestion === index
                          ? "bg-yellow-500 text-white"
                          : answers[quiz.questions[index].id] !== undefined
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-gray-600">Current</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                    <span className="text-gray-600">Answered</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                    <span className="text-gray-600">Not answered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              {/* Quiz Header */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{quiz.title}</h1>
                  <div className="text-sm text-gray-500">
                    Question {currentQuestion + 1} of {quiz.questions.length}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
                  {currentQ.question}
                </h2>
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(currentQ.id, index)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        answers[currentQ.id] === index
                          ? "border-yellow-500 bg-yellow-50 text-yellow-900"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            answers[currentQ.id] === index ? "border-yellow-500 bg-yellow-500" : "border-gray-300"
                          }`}
                        >
                          {answers[currentQ.id] === index && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-gray-900 text-sm sm:text-base">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <div className="flex space-x-4">
                  {currentQuestion === quiz.questions.length - 1 ? (
                    <button
                      onClick={handleSubmit}
                      className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
                    >
                      Submit Quiz
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Warning */}
            {getAnsweredCount() < quiz.questions.length && (
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-yellow-800 text-sm">
                    You have {quiz.questions.length - getAnsweredCount()} unanswered questions. You can submit anytime,
                    but unanswered questions will be marked as incorrect.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
