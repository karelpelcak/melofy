import "./globals.css";
import {AudioPlayerProvider} from "@/context/playerContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <AudioPlayerProvider>
          {children}
      </AudioPlayerProvider>
      </body>
    </html>
  );
}
