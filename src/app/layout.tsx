import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/site-config";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

/* Self-hosted (full family, not the Google Fonts subset): the GF subsets
   for both IBM Plex Mono and JetBrains Mono stop before U+2500, so the
   status marks (● ◐ ✔ ◆) and arrows (→ ↗) the UI relies on were being
   resolved from a fallback face with different metrics — the wonky,
   "better at zoom" glyphs. The full JetBrains Mono variable face carries
   them at a uniform 600/1000 em. */
const jetbrainsMono = localFont({
  src: "../../public/fonts/JetBrainsMono[wght].woff2",
  weight: "100 800",
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: ["ui-monospace", "SF Mono", "Menlo", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.aboutSummary,
  alternates: { canonical: "/" },
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.githubUrl }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} - ${siteConfig.role}`,
    description: siteConfig.aboutSummary,
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: siteConfig.profileImage,
        width: 800,
        height: 800,
        alt: `Portrait of ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.role}`,
    description: siteConfig.aboutSummary,
    images: [siteConfig.profileImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0e11" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  email: `mailto:${siteConfig.email}`,
  telephone: siteConfig.phone,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.profileImage}`,
  sameAs: [siteConfig.githubUrl, siteConfig.linkedInUrl],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Tanta University",
  },
  knowsAbout: [
    "Flutter",
    "Dart",
    "BLoC",
    "MVVM",
    "Clean Architecture",
    "Firebase",
    "REST API",
    "Mobile App Development",
  ],
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${archivo.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-secondary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:bg-surface-raised focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
