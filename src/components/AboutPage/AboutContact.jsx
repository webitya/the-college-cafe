import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AccessTimeIcon from "@mui/icons-material/AccessTime"

export default function AboutContact() {
  return (
    <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-xl text-yellow-100 max-w-2xl mx-auto">
            Have questions about colleges or need personalized guidance? Our team is here to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <EmailIcon className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
            <p className="text-yellow-100">info@thecollegecafe.com</p>
            <p className="text-yellow-100">support@thecollegecafe.com</p>
          </div>

          <div className="text-center">
            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneIcon className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
            <p className="text-yellow-100">+91 9876543210</p>
            <p className="text-yellow-100">+91 9876543211</p>
          </div>

          <div className="text-center">
            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <LocationOnIcon className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Visit Us</h3>
            <p className="text-yellow-100">Main Road, Ranchi</p>
            <p className="text-yellow-100">Jharkhand, India</p>
          </div>

          <div className="text-center">
            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AccessTimeIcon className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Office Hours</h3>
            <p className="text-yellow-100">Mon - Fri: 9 AM - 6 PM</p>
            <p className="text-yellow-100">Sat: 10 AM - 4 PM</p>
          </div>
        </div>
      </div>
    </section>
  )
}
