"use client";

import { useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export default function ContactForm() {
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
      const res = await fetch("/api/contact", {
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
        <span className="tiny-label">Contact us</span>
        <h3>Say hello</h3>
        <p>We'd love to hear from you.</p>
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

      <label>
        Subject
        <input
          name="subject"
          placeholder="Partnership / press / volunteering / product"
          value={form.subject}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Message
        <textarea
          name="message"
          rows="5"
          placeholder="Write your message here..."
          value={form.message}
          onChange={handleChange}
          required
        />
      </label>

      {status.message && <div className={`status ${status.type}`}>{status.message}</div>}

      <button type="submit" className="btn-primary full" disabled={loading}>
        {loading ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
