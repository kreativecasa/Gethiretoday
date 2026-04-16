import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: { default: "Get Hire Today — Free AI Resume Builder", template: "%s | Get Hire Today" },
  description:
    "Build a professional, ATS-optimized resume in minutes with AI. 6 designer templates, real-time preview, and one-click PDF download. Start free.",
  keywords: [
    "resume builder", "free resume builder", "AI resume builder", "ATS resume", "ATS-friendly resume",
    "CV builder", "resume templates 2025", "cover letter builder", "professional resume", "Get Hire Today",
  ],
  metadataBase: new URL("https://gethiretoday.com"),
  alternates: { canonical: "https://gethiretoday.com" },
  openGraph: {
    title: "Get Hire Today — Free AI Resume Builder",
    description: "Build a professional, ATS-optimized resume in minutes with AI. Free templates, real-time preview, PDF download.",
    type: "website",
    locale: "en_US",
    url: "https://gethiretoday.com",
    siteName: "Get Hire Today",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Hire Today — Free AI Resume Builder",
    description: "Build a professional, ATS-optimized resume in minutes with AI.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {ga4Id && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga4Id}');` }} />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Get Hire Today",
            "url": "https://gethiretoday.com",
            "description": "Free AI-powered resume builder with ATS optimization, 6 professional templates, and one-click PDF download.",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "120" }
          })}}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
