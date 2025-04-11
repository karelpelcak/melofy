import "./globals.css";
import {AudioPlayerProvider} from "@/context/playerContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="max-w-screen max-h-screen bg-black text-white"
      >
      <AudioPlayerProvider>
          {children}
      </AudioPlayerProvider>
      </body>
    </html>
  );
}
