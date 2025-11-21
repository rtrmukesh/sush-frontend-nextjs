import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexreon Partner Portal",
  description:
    "Access the Nexreon Partner Portal to manage projects, track tasks, view reports, and collaborate with your team efficiently.",
  keywords: [
    "Nexreon",
    "Partner Portal",
    "Project Management",
    "Task Tracking",
  ],
  authors: [{ name: "Nexreon Team" }],
  icons: {
    icon: "/nexreon-fav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors closeButton position="top-right" />
      </body>
    </html>
  );
}
