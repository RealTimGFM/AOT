"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("aot_demo_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem("aot_demo_user");
      }
    }
  }, []);

  function logout() {
    localStorage.removeItem("aot_demo_user");
    setUser(null);
    setOpen(false);
  }

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand">
          <span className="brand-mark">A</span>
          <span>Activists Of Tomorrow</span>
        </Link>

        <nav className="desktop-links">
          {links.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href="/#reserve">Reserve username</a>
          <a href="/#get-involved">Get involved</a>
        </nav>

        <div className="header-actions">
          {user ? (
            <>
              <span className="user-pill">Hi, {user.name?.split(" ")[0]}</span>
              <button type="button" className="btn-subtle" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="ghost-link">
                Log in
              </Link>
              <Link href="/signup" className="btn-primary small">
                Sign up
              </Link>
            </>
          )}

          <button
            type="button"
            className="menu-btn"
            aria-label="Open menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? "X" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-panel">
          <div className="shell mobile-panel-inner">
            {links.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <a href="/#reserve" onClick={() => setOpen(false)}>
              Reserve username
            </a>
            <a href="/#get-involved" onClick={() => setOpen(false)}>
              Get involved
            </a>

            {user ? (
              <button type="button" className="btn-subtle full" onClick={logout}>
                Log out
              </button>
            ) : (
              <div className="mobile-auth">
                <Link href="/login" className="ghost-link" onClick={() => setOpen(false)}>
                  Log in
                </Link>
                <Link href="/signup" className="btn-primary small" onClick={() => setOpen(false)}>
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
