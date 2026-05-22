// BestAlt.org — X Alternatives SEO-affiliate site | GA4: G-D7L8DHTGSB
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BestAlt.org — Find the Best Alternatives to Any Tool",
    template: "%s | BestAlt.org",
  },
  description:
    "Discover the best alternatives to popular tools. Compare features, pricing, and find the perfect替代 for Notion, Canva, Zapier, Slack, and more.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0a0a] text-[#ededed] font-sans antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D7L8DHTGSB"
          strategy="afterInteractive"
        />
        <Script id="ga4">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-D7L8DHTGSB');
        `}</Script>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-white">
          Best<span className="text-blue-400">Alt</span>.org
        </a>
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="/" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="/about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="/contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-12 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
        <p className="mb-2">
          © 2025 BestAlt.org — Find better tools, faster.
        </p>
        <p className="text-xs text-gray-600">
          Disclosure: Some links on this site are affiliate links. We may earn
          a commission at no extra cost to you.
        </p>
      </div>
    </footer>
  );
}
