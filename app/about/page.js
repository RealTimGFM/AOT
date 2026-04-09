import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main className="page-shell">
        <section className="shell page-hero">
          <span className="eyebrow">About Activists Of Tomorrow</span>
          <h1>Built for communities creating change.</h1>
          <p className="lead">
            Activists Of Tomorrow is a social platform dedicated to social and environmental
            justice, civic engagement, and collective action. We believe technology should
            strengthen communities, not exploit attention.
          </p>
        </section>

        <section className="shell feature-grid section-gap">
          <div className="card">
            <span className="card-tag">Mission</span>
            <h3>Connect and empower</h3>
            <p>
              To connect people and empower communities through digital tools that support action,
              solidarity, and civic participation.
            </p>
          </div>

          <div className="card">
            <span className="card-tag">Vision</span>
            <h3>Care over extraction</h3>
            <p>
              A social ecosystem where community care, justice, and participation matter more than
              profit-driven engagement.
            </p>
          </div>

          <div className="card">
            <span className="card-tag">Principles</span>
            <h3>Healthier engagement</h3>
            <p>
              Connection over addiction. Action over doomscrolling. Community over extraction.
            </p>
          </div>
        </section>

        <section className="shell content-card section-gap">
          <span className="tiny-label">What makes the platform different</span>
          <h2>Technology that supports collective action</h2>
          <div className="content-bullets">
            <div>Cause-centered discovery</div>
            <div>Community-led participation</div>
            <div>Actionable local opportunities</div>
            <div>Design that supports healthier engagement</div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
