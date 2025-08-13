"use client"
import { useState } from "react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export default function JEESyllabus() {
  const [activeSubject, setActiveSubject] = useState("physics")

  const syllabusData = {
    physics: {
      title: "Physics Syllabus",
      topics: [
        "Mechanics",
        "Thermodynamics",
        "Waves and Oscillations",
        "Electrostatics",
        "Current Electricity",
        "Magnetic Effects of Current",
        "Electromagnetic Induction",
        "Optics",
        "Modern Physics",
        "Electronic Devices",
      ],
    },
    chemistry: {
      title: "Chemistry Syllabus",
      topics: [
        "Atomic Structure",
        "Chemical Bonding",
        "States of Matter",
        "Thermodynamics",
        "Chemical Equilibrium",
        "Ionic Equilibrium",
        "Electrochemistry",
        "Chemical Kinetics",
        "Organic Chemistry",
        "Coordination Compounds",
      ],
    },
    mathematics: {
      title: "Mathematics Syllabus",
      topics: [
        "Sets and Relations",
        "Complex Numbers",
        "Quadratic Equations",
        "Sequences and Series",
        "Permutations and Combinations",
        "Binomial Theorem",
        "Matrices and Determinants",
        "Coordinate Geometry",
        "Calculus",
        "Probability",
      ],
    },
  }

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">JEE Syllabus</h2>
          <p className="text-xl text-gray-600">Complete topic-wise syllabus for JEE Main and Advanced preparation.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Subject Tabs */}
          <div className="lg:w-1/4">
            <div className="bg-gray-50 rounded-lg p-4">
              {Object.entries(syllabusData).map(([key, subject]) => (
                <button
                  key={key}
                  onClick={() => setActiveSubject(key)}
                  className={`w-full text-left p-4 rounded-lg mb-2 font-medium transition-colors duration-200 ${
                    activeSubject === key ? "bg-yellow-500 text-white" : "bg-white text-gray-700 hover:bg-yellow-50"
                  }`}
                >
                  {subject.title}
                </button>
              ))}
            </div>
          </div>

          {/* Syllabus Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">{syllabusData[activeSubject].title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {syllabusData[activeSubject].topics.map((topic, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{topic}</span>
                      <ExpandMoreIcon className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
