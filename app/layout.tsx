import { Josefin_Sans } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/app/components/layout/Navbar"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Footer from "./components/layout/Footer"

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={josefinSans.className}>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          {/* Site footer */}
          <Footer />
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
