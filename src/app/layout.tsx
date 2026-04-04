import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";
import { Inter, Outfit } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Project Tracker",
  description: "A polished, glassmorphic project management system.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <SessionProvider>
          {!session?.user ? (
            <main className="container">{children}</main>
          ) : (
            <div className="app-shell">
              <Sidebar 
                user={{
                  name: session.user.name,
                  email: session.user.email,
                  role: session.user.role,
                  organizationId: session.user.organizationId
                }} 
              />
              <main className="main-content">
                <div className="container">
                  {children}
                </div>
              </main>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
