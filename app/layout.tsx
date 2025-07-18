import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/shared/providers"
import UserDetailsCheck from "./components/UserDetailsCheck";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <UserDetailsCheck>
            <Header />
            {children}
            <Footer />
          </UserDetailsCheck>
        </Providers>
      </body>
    </html >
  );
}
