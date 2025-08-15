export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-yellow-500 mb-4">THE COLLEGE CAFE</h3>
            <p className="text-gray-600">Your gateway to higher education in India.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="/colleges" className="hover:text-yellow-500">
                  Colleges
                </a>
              </li>
              <li>
                <a href="/jee" className="hover:text-yellow-500">
                  JEE
                </a>
              </li>
              <li>
                <a href="/neet" className="hover:text-yellow-500">
                  NEET
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-yellow-500">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="/news" className="hover:text-yellow-500">
                  Latest News
                </a>
              </li>
              <li>
                <a href="/jobs" className="hover:text-yellow-500">
                  Jobs
                </a>
              </li>
              <li>
                <a href="/scholarships" className="hover:text-yellow-500">
                  Scholarships
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-600">Email: info@thecollegecafe.com</p>
            <p className="text-gray-600">Phone: +91 1234567890</p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 The College Cafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
