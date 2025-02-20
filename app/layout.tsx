import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Explainer Chatbot",
  description:
    "An AI-powered chatbot that provides explanations and answers to your questions.",
  icons: {
    icon: "/favicon.png",
  },
};
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen `}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
