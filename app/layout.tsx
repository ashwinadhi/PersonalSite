import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ashwin Adhikari Portfolio",
  description: "Professional portfolio of Ashwin Adhikari, a Software QA Engineer with 2 years of experience",
    generator: 'v0.dev',
    icons :  "/favicon.ico"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'