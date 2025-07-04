import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcast Summarizer - AI-Powered Episode Summaries",
  description:
    "Get concise, AI-generated summaries of podcast episodes. Save time and discover key insights from your favorite shows.",
  keywords: [
    "podcast",
    "AI",
    "summary",
    "artificial intelligence",
    "audio content",
  ],
  authors: [{ name: "Your Name" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Podcast Summarizer - AI-Powered Episode Summaries",
    description: "Get concise, AI-generated summaries of podcast episodes.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Podcast Summarizer",
    description: "AI-powered podcast episode summaries",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary error="">
          <body className={inter.className}>{children}</body>
        </ErrorBoundary>
      </body>
    </html>
  );
}
