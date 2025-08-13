"use client"
import { useState } from "react"

export default function NEETSyllabus() {
  const [activeSubject, setActiveSubject] = useState("physics")

  const syllabusData = {
    physics: {
      title: "Physics Syllabus",
      topics: [
        "Physical World and Measurement",
        "Kinematics",
        "Laws of Motion",
        "Work, Energy and Power",
        "Motion of System of Particles",
        "Gravitation",
        "Properties of Bulk Matter",
        "Thermodynamics",
        "Kinetic Theory",
        "Oscillations and Waves",
        "Electrostatics",
        "Current Electricity",
        "Magnetic Effects of Current",
        "Electromagnetic Induction",
        "Electromagnetic Waves",
        "Optics",
        "Dual Nature of Matter",
        "Atoms and Nuclei",
        "Electronic Devices",
      ],
    },
    chemistry: {
      title: "Chemistry Syllabus",
      topics: [
        "Some Basic Concepts of Chemistry",
        "Structure of Atom",
        "Classification of Elements",
        "Chemical Bonding",
        "States of Matter",
        "Thermodynamics",
        "Equilibrium",
        "Redox Reactions",
        "Hydrogen",
        "s-Block Elements",
        "p-Block Elements",
        "Organic Chemistry Basics",
        "Hydrocarbons",
        "Environmental Chemistry",
        "Solid State",
        "Solutions",
        "Electrochemistry",
        "Chemical Kinetics",
        "d and f Block Elements",
        "Coordination Compounds",
        "Haloalkanes and Haloarenes",
        "Alcohols, Phenols and Ethers",
        "Aldehydes, Ketones",
        "Carboxylic Acids",
        "Organic Compounds with Nitrogen",
        "Biomolecules",
        "Polymers",
        "Chemistry in Everyday Life",
      ],
    },
    biology: {
      title: "Biology Syllabus",
      topics: [
        "Diversity in Living World",
        "Structural Organisation in Animals and Plants",
        "Cell Structure and Function",
        "Plant Physiology",
        "Human Physiology",
        "Reproduction",
        "Genetics and Evolution",
        "Biology and Human Welfare",
        "Biotechnology",
        "Ecology and Environment",
      ],
    },
  }

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">NEET Syllabus</h2>
          <p className="text-xl text-gray-600">
            Complete NCERT-based syllabus for NEET preparation covering Class 11 and 12 topics.
          </p>
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
                    <span className="font-medium text-gray-900">{topic}</span>
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
