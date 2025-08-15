export const metadata = {
  title: "Terms and Conditions - THE COLLEGE CAFE",
  description: "Terms and conditions for using THE COLLEGE CAFE services and platform",
}

import Header from "../../components/shared/Header"
import Footer from "../../components/shared/Footer"

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Terms and Conditions</h1>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">PART A: GENERAL TERMS AND CONDITIONS</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  This document is a computer-generated electronic record published in terms of Rule 3 of the
                  Information Technology Intermediary Guidelines and Digital Media Ethics Code Rules 2021 amended from
                  time to time read with Information Technology Act 2000 amended from time to time and does not require
                  any physical or digital signatures.
                </p>

                <p>
                  These Terms and Conditions constitute a legal agreement between You and THE COLLEGE CAFE. The Terms
                  govern Your access to and use of our services including educational information technology software
                  analytics or any other services tools or products offered or made available by THE COLLEGE CAFE and
                  our affiliates.
                </p>

                <p>
                  The Services may be offered or made available to You via our website mobile applications software APIs
                  social media or other access channels. You refers to customers who may be a non-registered individual
                  or corporate body who register for use or access the Platform or Services.
                </p>

                <p>
                  Please read these Terms carefully before accessing the Platform or using the Services. By accessing
                  the Platform or using the Services You agree to be bound by these Terms including our Privacy Policy
                  and any other policy applicable to the Services received via the Platform.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. PROPRIETARY RIGHTS</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We and our licensors as applicable remain the sole owner of all right title and interest in the
                  Services including the Platform and the website including any intellectual property rights therein.
                </p>

                <p>
                  You acknowledge that the Services contain proprietary and confidential information that is protected
                  by applicable intellectual property and other laws.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. USER RESPONSIBILITIES</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  You agree to use the Services only for lawful purposes and in accordance with these Terms. You are
                  responsible for maintaining the confidentiality of your account information.
                </p>

                <p>
                  You agree not to use the Services for any unlawful purpose or in any way that could damage disable
                  overburden or impair the Services.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. PRIVACY AND DATA PROTECTION</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We collect and process your personal information in accordance with our Privacy Policy. By using our
                  Services you consent to the collection and use of your information as described in our Privacy Policy.
                </p>

                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access alteration disclosure or destruction.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. LIMITATION OF LIABILITY</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  THE COLLEGE CAFE shall not be liable for any indirect incidental special consequential or punitive
                  damages including without limitation loss of profits data use goodwill or other intangible losses.
                </p>

                <p>
                  Our total liability to you for all damages losses and causes of action shall not exceed the amount
                  paid by you for the Services during the twelve months preceding the claim.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. TERMINATION</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We may terminate or suspend your access to the Services immediately without prior notice or liability
                  for any reason whatsoever including without limitation if you breach the Terms.
                </p>

                <p>
                  Upon termination your right to use the Services will cease immediately. All provisions of the Terms
                  which by their nature should survive termination shall survive termination.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. GOVERNING LAW</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes
                  arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the
                  courts in Ranchi Jharkhand.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. CONTACT INFORMATION</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>If you have any questions about these Terms please contact us at:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">THE COLLEGE CAFE</p>
                  <p>Email: info@thecollegecafe.in</p>
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
