import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "YesBoth — Consent Communication Made Simple",
    template: "%s | YesBoth"
  },
  description: "Free multilingual consent message generator for adults. 100% local, private & secure. No data leaves your device. Available in FR, EN, ES, IT.",
  keywords: [
    "consent",
    "communication",
    "agreement",
    "privacy",
    "local app",
    "consentement",
    "communication",
    "accord",
    "vie privée",
    "RGPD",
    "GDPR compliant",
    "multilingual",
    "free tool",
    "SAS BASK'IN BIARRITZ",
    "BASK'IN BIARRITZ",
    "Xavier CHAUMET-NICOLAS",
    "innovation Biarritz",
    "tech Pays Basque"
  ],
  authors: [
    { name: "Xavier CHAUMET-NICOLAS", url: "https://arteandigital.fr" },
    { name: "SAS BASK'IN BIARRITZ", url: "https://arteandigital.fr" }
  ],
  creator: "Xavier CHAUMET-NICOLAS - SAS BASK'IN BIARRITZ",
  publisher: "SAS BASK'IN BIARRITZ",
  manifest: "/manifest.json",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "es_ES", "it_IT"],
    url: "https://yesboth.netlify.app",
    siteName: "YesBoth",
    title: "YesBoth — Consent Communication Made Simple",
    description: "Free multilingual consent message generator. 100% local & private. No data leaves your device.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "YesBoth - Both say yes",
        type: "image/png"
      }
    ]
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "YesBoth — Consent Communication Made Simple",
    description: "Free multilingual consent message generator. 100% local & private.",
    images: ["/logo.png"],
    creator: "@arteandigital"
  },
  
  // Icons & Favicon
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" }
    ],
    shortcut: "/logo.png"
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  
  alternates: {
    canonical: "https://yesboth.netlify.app",
    languages: {
      "en": "https://yesboth.netlify.app",
      "fr": "https://yesboth.netlify.app",
      "es": "https://yesboth.netlify.app",
      "it": "https://yesboth.netlify.app"
    }
  },
  
  category: "Communication Tools"
};

export const viewport: Viewport = {
  themeColor: "#5B9BD5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "YesBoth",
    "alternateName": "Both say yes",
    "url": "https://yesboth.netlify.app",
    "description": "Free multilingual consent message generator for adults. 100% local, private & secure.",
    "applicationCategory": "CommunicationApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "creator": [
      {
        "@type": "Person",
        "name": "Xavier CHAUMET-NICOLAS",
        "jobTitle": "Founder & CEO",
        "affiliation": {
          "@type": "Organization",
          "name": "BASK'IN BIARRITZ",
          "legalName": "SAS BASK'IN BIARRITZ",
          "url": "https://arteandigital.fr",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Biarritz",
            "addressRegion": "Nouvelle-Aquitaine",
            "addressCountry": "FR"
          }
        }
      },
      {
        "@type": "Organization",
        "name": "SAS BASK'IN BIARRITZ",
        "legalName": "SAS BASK'IN BIARRITZ",
        "alternateName": "BASK'IN BIARRITZ",
        "url": "https://arteandigital.fr",
        "sameAs": [
          "https://arteandigital.fr"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Biarritz",
          "addressRegion": "Nouvelle-Aquitaine",
          "addressCountry": "FR"
        },
        "founder": {
          "@type": "Person",
          "name": "Xavier CHAUMET-NICOLAS"
        }
      }
    ],
    "publisher": {
      "@type": "Organization",
      "name": "SAS BASK'IN BIARRITZ",
      "alternateName": "BASK'IN BIARRITZ",
      "url": "https://arteandigital.fr",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yesboth.netlify.app/logo.png"
      }
    },
    "inLanguage": ["en", "fr", "es", "it"],
    "featureList": [
      "Multilingual support (FR, EN, ES, IT)",
      "100% local processing",
      "No data collection",
      "GDPR compliant",
      "Free to use"
    ],
    "keywords": "consent, communication, privacy, GDPR, SAS BASK'IN BIARRITZ, Xavier CHAUMET-NICOLAS, Bidart, Pays Basque"
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="YesBoth" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#F8F7F4] min-h-screen">
        {children}
      </body>
    </html>
  );
}
