import CountUp from "./CountUp"

export default function Stats() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-yellow-600 mb-2">
              <CountUp end={500} />+
            </div>
            <p className="text-gray-600 font-medium">Colleges Listed</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-600 mb-2">
              <CountUp end={50000} />+
            </div>
            <p className="text-gray-600 font-medium">Students Helped</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-600 mb-2">
              <CountUp end={100} />+
            </div>
            <p className="text-gray-600 font-medium">Courses Available</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-600 mb-2">
              <CountUp end={95} />%
            </div>
            <p className="text-gray-600 font-medium">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}
