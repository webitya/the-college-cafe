"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Trophy, Download, Mail, Home, RotateCcw } from "lucide-react"
import DownloadModal from "../../../../components/DownloadModal.jsx"
import { getQuizByWeek } from "../../../../data/quizdata/index.js"
import Header from "../../../../components/shared/Header"
import Footer from "../../../../components/shared/Footer"

export default function QuizResultsPage() {
  const params = useParams()
  const router = useRouter()
  const [results, setResults] = useState(null)
  const [quizData, setQuizData] = useState(null)
  const [showDownloadModal, setShowDownloadModal] = useState(false)

  useEffect(() => {
    const storedResults = localStorage.getItem("quizResults")
    if (!storedResults) {
      router.push("/quiz")
      return
    }

    const parsedResults = JSON.parse(storedResults)
    setResults(parsedResults)

    // Get the full quiz data for detailed results
    const fullQuizData = getQuizByWeek(params.week)
    setQuizData(fullQuizData)
  }, [router, params.week])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: "A+", color: "text-green-600", bg: "bg-green-100" }
    if (percentage >= 80) return { grade: "A", color: "text-green-600", bg: "bg-green-100" }
    if (percentage >= 70) return { grade: "B+", color: "text-blue-600", bg: "bg-blue-100" }
    if (percentage >= 60) return { grade: "B", color: "text-blue-600", bg: "bg-blue-100" }
    if (percentage >= 50) return { grade: "C", color: "text-yellow-600", bg: "bg-yellow-100" }
    return { grade: "F", color: "text-red-600", bg: "bg-red-100" }
  }

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return "Outstanding! You're a quiz champion!"
    if (percentage >= 80) return "Excellent work! You have great knowledge!"
    if (percentage >= 70) return "Good job! You're doing well!"
    if (percentage >= 60) return "Not bad! Keep practicing to improve!"
    if (percentage >= 50) return "You passed! There's room for improvement!"
    return "Don't give up! Practice makes perfect!"
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    )
  }

  const gradeInfo = getGrade(results.percentage)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Results Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="h-10 w-10 text-yellow-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Completed!</h1>
          <p className="text-xl text-gray-600">{getPerformanceMessage(results.percentage)}</p>
        </div>

        {/* Results Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Score Section */}
            <div className="text-center">
              <div className="mb-6">
                <div className="text-6xl font-bold text-gray-900 mb-2">{results.percentage}%</div>
                <div
                  className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${gradeInfo.bg} ${gradeInfo.color}`}
                >
                  Grade: {gradeInfo.grade}
                </div>
              </div>
              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-semibold text-gray-900">{results.score}</span> out of{" "}
                  <span className="font-semibold text-gray-900">{results.totalQuestions}</span> correct
                </p>
                <p>Time taken: {formatTime(results.timeSpent)}</p>
              </div>
            </div>

            {/* Quiz Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quiz Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Quiz:</span>
                  <span className="font-medium text-gray-900">{results.quiz}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Week:</span>
                  <span className="font-medium text-gray-900">Week {results.week}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Questions:</span>
                  <span className="font-medium text-gray-900">{results.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Correct Answers:</span>
                  <span className="font-medium text-green-600">{results.score}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Incorrect Answers:</span>
                  <span className="font-medium text-red-600">{results.totalQuestions - results.score}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setShowDownloadModal(true)}
            className="flex items-center justify-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>Download Certificate</span>
          </button>
          <button
            onClick={() => setShowDownloadModal(true)}
            className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span>Email Results</span>
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/quiz"
            className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Take Another Quiz</span>
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      <Footer />

      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        quizResults={results}
        quizData={quizData}
      />
    </div>
  )
}
