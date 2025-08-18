import type { Metadata } from "next";
import {Roboto} from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Real Estate App",
  description: "By Hasnain",
};

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <body>
        {children}
      </body>
      </SessionProvider>
    </html>
  );
}
