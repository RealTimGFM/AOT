"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthCard({ mode = "login" }) {
  const router = useRouter();
  const isLogin = mode === "login";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch(isLogin ? "/api/auth/login" : "/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Something went wrong." });
        return;
      }

      localStorage.setItem("aot_demo_user", JSON.stringify(data.user));
      setStatus({ type: "success", message: data.message });
      setTimeout(() => router.push("/"), 700);
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="form-head">
        <span className="tiny-label">{isLogin ? "Welcome back" : "Join the platform"}</span>
        <h2>{isLogin ? "Log in" : "Sign up"}</h2>
        <p>
          {isLogin
            ? "Access your account and stay connected to the communities and causes you care about."
            : "Create your account to connect with causes, communities, and action near you."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <label>
            Name
            <input
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
        )}

        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="At least 6 characters"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        {status.message && <div className={`status ${status.type}`}>{status.message}</div>}

        <button type="submit" className="btn-primary full" disabled={loading}>
          {loading
            ? isLogin
              ? "Logging in..."
              : "Creating account..."
            : isLogin
              ? "Log in"
              : "Create account"}
        </button>
      </form>

      <div className="auth-switch">
        {isLogin ? (
          <>
            No account yet? <Link href="/signup">Sign up</Link>
          </>
        ) : (
          <>
            Already have an account? <Link href="/login">Log in</Link>
          </>
        )}
      </div>
    </div>
  );
}
