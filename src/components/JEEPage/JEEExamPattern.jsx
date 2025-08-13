export default function JEEExamPattern() {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">JEE Exam Pattern</h2>
          <p className="text-xl text-gray-600">
            Understanding the exam structure is crucial for effective preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* JEE Main Pattern */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">JEE Main Pattern</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Mode</span>
                <span className="text-gray-700">Computer Based Test (CBT)</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Duration</span>
                <span className="text-gray-700">3 hours</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Total Questions</span>
                <span className="text-gray-700">90 (30 each subject)</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Total Marks</span>
                <span className="text-gray-700">300</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Marking Scheme</span>
                <span className="text-gray-700">+4 for correct, -1 for wrong</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-medium text-gray-900">Subjects</span>
                <span className="text-gray-700">Physics, Chemistry, Maths</span>
              </div>
            </div>
          </div>

          {/* JEE Advanced Pattern */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">JEE Advanced Pattern</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Mode</span>
                <span className="text-gray-700">Computer Based Test (CBT)</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Duration</span>
                <span className="text-gray-700">3 hours per paper</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Papers</span>
                <span className="text-gray-700">2 (Paper 1 & Paper 2)</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Total Marks</span>
                <span className="text-gray-700">372 (186 each paper)</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-medium text-gray-900">Question Types</span>
                <span className="text-gray-700">MCQ, Numerical, Match</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-medium text-gray-900">Subjects</span>
                <span className="text-gray-700">Physics, Chemistry, Maths</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
