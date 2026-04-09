import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main className="page-shell">
        <section className="shell page-hero">
          <span className="eyebrow">Contact</span>
          <h1>Get in touch.</h1>
          <p className="lead">
            Reach out for partnerships, community collaborations, media inquiries, or early
            involvement opportunities.
          </p>
        </section>

        <section className="shell split-grid section-gap">
          <div className="content-card">
            <span className="tiny-label">Connect with us</span>
            <h2>Start a conversation</h2>
            <p>
              We welcome conversations with organizers, communities, partners, and people looking
              to help shape more meaningful social technology.
            </p>

            <div className="content-bullets">
              <div>Press and partnerships</div>
              <div>Volunteer interest</div>
              <div>Community outreach</div>
              <div>Early product conversations</div>
            </div>
          </div>

          <ContactForm />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
