import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata = {
  title: "THE COLLEGE CAFE - Your Gateway to Higher Education",
  description:
    "Discover top colleges, latest news, JEE & NEET preparation resources, and career opportunities at THE COLLEGE CAFE.",
  generator: "THE COLLEGE CAFE",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className="font-sans bg-white text-gray-800 antialiased">{children}</body>
    </html>
  )
}
