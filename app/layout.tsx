import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from './client-layout'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Third Eye - Product Recognition",
  description: "AI-powered product recognition and price comparison",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <header className="bg-white shadow-sm">
              <div className="container mx-auto py-4">
                <h1 className="text-2xl font-bold text-gray-900">Third Eye</h1>
              </div>
            </header>
            <main className="container mx-auto py-8">
              {children}
            </main>
            <footer className="bg-white border-t">
              <div className="container mx-auto py-6">
                <p className="text-center text-gray-600">© 2024 Third Eye. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
