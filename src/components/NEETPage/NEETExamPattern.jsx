export default function NEETExamPattern() {
  const subjectWisePattern = [
    {
      subject: "Physics",
      questions: 50,
      marks: 200,
      sections: "Section A: 35 questions, Section B: 15 questions (attempt 10)",
    },
    {
      subject: "Chemistry",
      questions: 50,
      marks: 200,
      sections: "Section A: 35 questions, Section B: 15 questions (attempt 10)",
    },
    {
      subject: "Biology",
      questions: 100,
      marks: 400,
      sections: "Botany: 50 questions, Zoology: 50 questions",
    },
  ]

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">NEET Exam Pattern</h2>
          <p className="text-xl text-gray-600">
            Understanding the exam structure and marking scheme is essential for effective preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* General Pattern */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">General Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Mode</span>
                <span className="text-gray-700">Offline (Pen & Paper)</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Duration</span>
                <span className="text-gray-700">3 hours 20 minutes</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Total Questions</span>
                <span className="text-gray-700">200</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Questions to Attempt</span>
                <span className="text-gray-700">180</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Total Marks</span>
                <span className="text-gray-700">720</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-medium text-gray-900">Marking Scheme</span>
                <span className="text-gray-700">+4 for correct, -1 for wrong</span>
              </div>
            </div>
          </div>

          {/* Language Options */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Available Languages</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                "English",
                "Hindi",
                "Assamese",
                "Bengali",
                "Gujarati",
                "Kannada",
                "Malayalam",
                "Marathi",
                "Odia",
                "Punjabi",
                "Tamil",
                "Telugu",
                "Urdu",
              ].map((language, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
                  <span className="text-gray-700 font-medium">{language}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subject-wise Pattern */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Subject-wise Distribution</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Questions</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Marks</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Section Details</th>
                </tr>
              </thead>
              <tbody>
                {subjectWisePattern.map((subject, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">{subject.subject}</td>
                    <td className="py-4 px-4 text-center text-gray-700">{subject.questions}</td>
                    <td className="py-4 px-4 text-center text-gray-700">{subject.marks}</td>
                    <td className="py-4 px-4 text-gray-700">{subject.sections}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
