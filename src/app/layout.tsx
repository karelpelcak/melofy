import Head from "next/head";
import "./globals.css";
import {PlayerProvider} from "@/context/playerContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <Head>
        <link rel="apple-touch-icon" href="/public/apple-touch-icon.png" />
    </Head>
      <body
        className="max-w-screen max-h-screen bg-black text-white"
      >
      <PlayerProvider>
          {children}
      </PlayerProvider>
      </body>
    </html>
  );
}
