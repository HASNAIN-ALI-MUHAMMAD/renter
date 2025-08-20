import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import TopBar from "./(pages)/(utils)/components/TopBar";

export const metadata: Metadata = {
  title: "Real Estate App",
  description: "By Hasnain",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <body>
        <TopBar/>
        {children}
      </body>
      </SessionProvider>
    </html>
  );
}
