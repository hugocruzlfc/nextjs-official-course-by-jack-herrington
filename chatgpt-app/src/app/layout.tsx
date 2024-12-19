import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nextjs ChatGPT App",
  description: "ChatGPT app built with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session?.user) {
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider
          basePath="/api/auth"
          session={session}
        >
          <Navbar />
          <div className="flex flex-col md:flex-row px-2 md:px-5">
            <div className="flex-grow">{children}</div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
