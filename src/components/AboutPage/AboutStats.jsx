export default function AboutStats() {
  const stats = [
    { number: "500+", label: "Colleges Listed" },
    { number: "50,000+", label: "Students Helped" },
    { number: "100+", label: "Courses Covered" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" },
    { number: "5+", label: "Years of Experience" },
  ]

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
          <p className="text-xl text-gray-600">
            These numbers reflect our commitment to helping students achieve their educational goals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-yellow-600 mb-2">{stat.number}</div>
              <div className="text-gray-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
