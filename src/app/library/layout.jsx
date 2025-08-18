export const metadata = {
  title: "Digital Library - The College Cafe | Free Study Materials & PDFs",
  description:
    "Access thousands of free study materials, PDFs, and educational resources for BSC, BCA, BSCIT, MBA, BA, Polytechnic, IIT, ITI courses. Download physics, chemistry, mathematics, programming notes and more.",
  keywords:
    "study materials, free PDFs, college notes, BSC notes, BCA notes, BSCIT, MBA, BA, polytechnic, IIT, ITI, physics notes, chemistry notes, mathematics, programming, database management, web development, educational resources, college cafe",
  authors: [{ name: "The College Cafe" }],
  creator: "The College Cafe",
  publisher: "The College Cafe",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Digital Library - The College Cafe | Free Study Materials & PDFs",
    description:
      "Access thousands of free study materials, PDFs, and educational resources for various courses. Download notes for physics, chemistry, mathematics, programming and more.",
    url: "https://thecollegecafe.in/library",
    siteName: "The College Cafe",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Library - The College Cafe | Free Study Materials & PDFs",
    description: "Access thousands of free study materials, PDFs, and educational resources for various courses.",
    creator: "@thecollegecafe",
  },
  alternates: {
    canonical: "https://thecollegecafe.in/library",
  },
}

export default function LibraryLayout({ children }) {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "The College Cafe Digital Library",
            description:
              "Free digital library providing study materials and educational resources for college students",
            url: "https://thecollegecafe.in/library",
            sameAs: [
              "https://facebook.com/thecollegecafe",
              "https://twitter.com/thecollegecafe",
              "https://instagram.com/thecollegecafe",
            ],
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              description: "Free access to study materials and educational PDFs",
            },
            educationalCredentialAwarded: ["BSC", "BCA", "BSCIT", "MBA", "BA", "Polytechnic", "IIT", "ITI"],
          }),
        }}
      />
      {children}
    </>
  )
}
