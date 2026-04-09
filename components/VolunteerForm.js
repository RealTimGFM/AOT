"use client";

import { useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  area: "Development",
  availability: "",
  message: ""
};

export default function VolunteerForm() {
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
      const res = await fetch("/api/volunteer", {
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
        <span className="tiny-label">Join the network</span>
        <h3>Get involved</h3>
        <p>Join a growing network of people building communities around justice, care, and action.</p>
      </div>

      <div className="form-grid">
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

      <div className="form-grid">
        <label>
          Area
          <select name="area" value={form.area} onChange={handleChange}>
            <option>Development</option>
            <option>Design</option>
            <option>Community</option>
            <option>Outreach</option>
            <option>Research</option>
          </select>
        </label>

        <label>
          Availability
          <input
            name="availability"
            placeholder="Weekends / evenings / flexible"
            value={form.availability}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <label>
        Message
        <textarea
          name="message"
          rows="4"
          placeholder="How would you like to contribute?"
          value={form.message}
          onChange={handleChange}
          required
        />
      </label>

      {status.message && <div className={`status ${status.type}`}>{status.message}</div>}

      <button type="submit" className="btn-primary full" disabled={loading}>
        {loading ? "Sending..." : "Join the movement"}
      </button>
    </form>
  );
}
