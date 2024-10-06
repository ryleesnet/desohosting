import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "./context/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeSoHosting",
  description: "Affordable, reliable hosting from @ryleesnet!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
    <html lang="en">
      <body className="bg-gradient-radial from-zinc-900 to-slate-900">{children}</body>
    </html>
    </UserProvider>
  );
}
