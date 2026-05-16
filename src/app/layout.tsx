import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "../providers/QueryProvider";

export const metadata: Metadata = {
  title: "Habesha Property Hub",
  description: "Ethiopia's premium property marketplace for listings, buyers, and sellers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
