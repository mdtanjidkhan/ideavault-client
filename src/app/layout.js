import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarStructure from "@/components/NavbarStructure";
import { Providers } from "@/components/theme/Providers";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IdeaVault – Secure, Organize & Explore Brilliant Ideas",
  description: "IdeaVault is a modern platform designed to capture, structure, and showcase your innovative thoughts. Secure your creative concepts and explore a universe of inspiration.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <NavbarStructure></NavbarStructure>
          {children}
          <Footer></Footer>
        </Providers>

      </body>
    </html>
  );
}
