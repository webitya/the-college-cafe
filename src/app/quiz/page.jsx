"use client"
import Link from "next/link"
import { Clock, Trophy, ArrowRight, CheckCircle } from "lucide-react"
import { getAvailableWeeks } from "../../data/quizdata/index.js"
import Header from "../../components/shared/Header"
import Footer from "../../components/shared/Footer"

export default function QuizPage() {
  const availableWeeks = getAvailableWeeks()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Weekly <span className="text-yellow-500">Quiz Challenge</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose your week and test your knowledge with 50 comprehensive questions
          </p>
        </div>
      </section>

      {/* Quiz Selection */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Choose Your Quiz Week</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableWeeks.map((week) => (
              <div
                key={week.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-yellow-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Week {week.number}</h3>
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    50 Questions
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-gray-800 mb-3">{week.title}</h4>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{week.description}</p>

                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>60 minutes</span>
                </div>

                <Link
                  href={`/quiz/${week.id}`}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Start Quiz</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">What You Get</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Instant Results</h3>
              <p className="text-gray-600 text-sm">Get your score immediately after completion</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">PDF Certificate</h3>
              <p className="text-gray-600 text-sm">Download professional achievement certificates</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Email Results</h3>
              <p className="text-gray-600 text-sm">Receive detailed analysis via email</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
