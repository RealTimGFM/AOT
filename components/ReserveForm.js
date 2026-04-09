"use client";

import { useState } from "react";

const emptyForm = {
  fullName: "",
  email: "",
  username: "",
  motivation: ""
};

export default function ReserveForm() {
  const [form, setForm] = useState(emptyForm);
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
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Something went wrong." });
        return;
      }

      setStatus({ type: "success", message: data.message });
      setForm(emptyForm);
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="glass-form" onSubmit={handleSubmit}>
      <div className="form-head">
        <span className="tiny-label">Early access</span>
        <h3>Reserve your username</h3>
        <p>Claim your place early and stay connected as the platform grows.</p>
      </div>

      <div className="form-grid">
        <label>
          Full name
          <input
            name="fullName"
            placeholder="Your name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </label>

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
      </div>

      <label>
        Username
        <input
          name="username"
          placeholder="change.maker"
          value={form.username}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Why this username?
        <textarea
          name="motivation"
          rows="4"
          placeholder="Tell us what kind of change you want to be part of..."
          value={form.motivation}
          onChange={handleChange}
          required
        />
      </label>

      {status.message && <div className={`status ${status.type}`}>{status.message}</div>}

      <button type="submit" className="btn-primary full" disabled={loading}>
        {loading ? "Reserving..." : "Reserve my username"}
      </button>
    </form>
  );
}
