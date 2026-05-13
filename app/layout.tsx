import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const soliden = localFont({
  src: [
    {
      path: "../public/Soliden-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Soliden-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-soliden",
});

export const metadata: Metadata = {
  title: "Ye Etaba",
  description: "Ye Etaba Consultancy",
  icons: {
    icon: "/ye-etaba-logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${soliden.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
