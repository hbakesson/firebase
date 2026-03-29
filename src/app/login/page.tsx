"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Definitive fix for Firebase Hosting redirect loops:
    // Clear legacy cookies that were renamed to __session.*
    const cookiesToClear = [
      "authjs.session-token",
      "authjs.callback-url",
      "authjs.csrf-token",
      "authjs.state",
      "authjs.pkce.code_verifier",
      "authjs.nonce"
    ];

    cookiesToClear.forEach(name => {
      // Clear both normal and __Secure- prefixed variants
      document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      document.cookie = `__Secure-${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    });

    console.log("Cleanup: Purged legacy Auth.js cookies to prevent redirect loops.");
  }, []);

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.replace("/");
    }
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    await signIn("google", { callbackUrl: "/" });
  }

  async function handleGuestSignIn() {
    setLoading(true);
    await signIn("guest", { callbackUrl: "/" });
  }

  return (
    <div className="login-page">
      <div className="login-card card">
        <div className="login-header">
          <h1>Project Tracker</h1>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Sign in to manage your projects
          </p>
        </div>

        {/* Google Sign In */}
        <button
          id="btn-google-signin"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="btn-google"
        >
          {/* ... SVG ... */}
          Continue with Google
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        {/* Guest access */}
        <button
          id="btn-guest-signin"
          onClick={handleGuestSignIn}
          disabled={loading}
          className="btn-secondary"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          Continue as Guest
        </button>

        <div className="divider">
          <span>or sign in with email</span>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailSignIn} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="field-error">{error}</p>}

          <button
            id="btn-email-signin"
            type="submit"
            disabled={loading}
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
