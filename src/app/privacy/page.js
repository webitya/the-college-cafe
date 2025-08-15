export const metadata = {
  title: "Privacy Policy - THE COLLEGE CAFE",
  description: "Privacy policy for THE COLLEGE CAFE platform and services",
}

import Header from "../../components/common/Header"
import Footer from "../../components/common/Footer"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Privacy Policy</h1>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">INFORMATION WE COLLECT</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We collect information you provide directly to us when you create an account use our services or
                  communicate with us. This includes your name email address phone number and educational preferences.
                </p>

                <p>
                  We automatically collect certain information about your device and usage of our platform including IP
                  address browser type operating system and pages visited.
                </p>

                <p>
                  When you make donations through our platform we collect payment information necessary to process
                  transactions including billing address and payment method details.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">HOW WE USE YOUR INFORMATION</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We use your information to provide and improve our educational services including college information
                  exam preparation resources and career guidance.
                </p>

                <p>
                  Your information helps us personalize your experience send relevant updates about admissions and
                  educational opportunities and respond to your inquiries.
                </p>

                <p>
                  We process donation information to complete transactions send receipts and maintain records for tax
                  and legal compliance purposes.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">INFORMATION SHARING</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We do not sell rent or trade your personal information to third parties for marketing purposes. We may
                  share information with service providers who help us operate our platform.
                </p>

                <p>
                  We may disclose information when required by law or to protect our rights property or safety and that
                  of our users and the public.
                </p>

                <p>
                  With your consent we may share information with educational institutions or partners to help you
                  access relevant opportunities and services.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">DATA SECURITY</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access alteration disclosure or destruction.
                </p>

                <p>
                  Payment information is processed through secure payment gateways and we do not store complete payment
                  card details on our servers.
                </p>

                <p>
                  While we strive to protect your information no method of transmission over the internet is completely
                  secure and we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">YOUR RIGHTS</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  You have the right to access update or delete your personal information. You can manage your account
                  settings or contact us to exercise these rights.
                </p>

                <p>
                  You may opt out of receiving promotional communications from us by following the unsubscribe
                  instructions in those communications.
                </p>

                <p>
                  You can disable cookies in your browser settings though this may affect the functionality of our
                  platform.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">COOKIES AND TRACKING</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We use cookies and similar technologies to enhance your experience analyze usage patterns and provide
                  personalized content and advertisements.
                </p>

                <p>
                  Essential cookies are necessary for the platform to function properly while optional cookies help us
                  improve our services and understand user preferences.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">CHILDREN PRIVACY</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our services are intended for users who are at least 13 years old. We do not knowingly collect
                  personal information from children under 13 without parental consent.
                </p>

                <p>
                  If we become aware that we have collected information from a child under 13 we will take steps to
                  delete such information promptly.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">POLICY UPDATES</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by
                  posting the new policy on our platform and updating the effective date.
                </p>

                <p>
                  Your continued use of our services after any changes indicates your acceptance of the updated Privacy
                  Policy.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">CONTACT US</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>If you have any questions about this Privacy Policy please contact us at:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">THE COLLEGE CAFE</p>
                  <p>Email: privacy@thecollegecafe.in</p>
                  <p>Phone: +91 9876543210</p>
                  <p>Address: Ranchi Jharkhand India</p>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <p className="text-sm text-gray-600 text-center">Last updated: January 2025</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
