import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { signOut } from "@/auth";

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
          <main className="container">
            <header>
              <div className="header-row">
                <div>
                  <h1>Project Tracker</h1>
                  <p style={{ color: "var(--text-muted)" }}>Manage your projects with ease and style.</p>
                </div>
                {session?.user && (
                  <div className="user-info">
                    <span className="user-badge">
                      {session.user.name ?? session.user.email}
                      <span className={`role-tag role-${session.user.role}`}>
                        {session.user.role}
                      </span>
                    </span>
                    <form
                      action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/login" });
                      }}
                    >
                      <button id="btn-signout" type="submit" className="secondary btn-sm">
                        Sign out
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </header>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
