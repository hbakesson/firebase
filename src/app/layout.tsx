import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
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
