import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../providers/auth-provider";
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
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col font-sans antialiased"
      >
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
