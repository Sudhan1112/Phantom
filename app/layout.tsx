import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phantom AI — The Native Intelligence Layer for Candidate Excellence",
  description:
    "Context-aware AI assistance, orchestrated in real time across assessments, coding challenges, mock interviews, and real-time meetings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      style={
        {
          ["--font-sans" as string]: "var(--font-geist-sans)",
          ["--font-display" as string]: "var(--font-geist-sans)",
        } as React.CSSProperties
      }
    >
      <body className="min-h-svh bg-[#050505] font-[family-name:var(--font-geist-sans)] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
