import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Andres Lorente Martinez | Software Engineer",
  description:
    "Portfolio de Andres Lorente Martinez - Software Engineer especializado en desarrollo web full-stack.",
  keywords: [
    "Andres Lorente Martinez",
    "Software Engineer",
    "Portfolio",
    "Full Stack",
    "TypeScript",
  ],
  authors: [{ name: "Andres Lorente Martinez" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
