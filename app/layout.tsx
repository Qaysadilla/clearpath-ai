import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClearPath AI - Turn Confusion into Clarity",
  description: "AI-powered document analysis that helps you understand official letters, emails, and notices. Get plain-language summaries, deadlines, action items, and draft replies.",
  keywords: "document analysis, AI assistant, immigration help, student help, newcomer support, document translation, deadline tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

// Made with Bob
