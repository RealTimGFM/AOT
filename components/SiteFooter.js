import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-brand">Activists Of Tomorrow</div>
          <p className="footer-copy">
            Activists Of Tomorrow is a community-driven social platform for social and
            environmental justice.
          </p>
        </div>

        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
          <a href="/#reserve">Reserve username</a>
        </div>
      </div>
    </footer>
  );
}
