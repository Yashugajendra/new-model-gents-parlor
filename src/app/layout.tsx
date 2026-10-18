import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RITUALCUT — Your Style. Your Time. Your Ritual.",
  description:
    "An elevated bespoke barbershop experience. Reserve your appointment, experience artisan scissor work, royal hot towel shaves, and custom grooming rituals.",
  keywords: [
    "barbershop",
    "haircut",
    "luxury grooming",
    "hot towel shave",
    "beard sculpt",
    "RITUALCUT",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} dark`}>
      <body className="min-h-screen bg-[#09090b] text-[#f8fafc] font-sans antialiased selection:bg-[#c5a880] selection:text-[#09090b] flex flex-col">
        {children}
      </body>
    </html>
  );
}
