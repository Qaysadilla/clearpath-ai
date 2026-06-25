import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClearPath AI - Turn Confusing Documents into Clear Next Steps",
  description: "AI-powered life-admin command center for students, newcomers, and families. Understand documents, track deadlines, and manage tasks with IBM watsonx.ai.",
  keywords: "document analysis, AI assistant, immigration help, student help, newcomer support, deadline tracker, task manager, IBM watsonx",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className={sourceSans.className}>{children}</body>
    </html>
  );
}

// Made with Bob
