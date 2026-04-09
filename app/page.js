import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CommunityMapPanel from "@/components/CommunityMapPanel";
import ReserveForm from "@/components/ReserveForm";
import VolunteerForm from "@/components/VolunteerForm";
import { getPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

const montrealPhoneMapEmbed = "https://www.google.com/maps?q=45.5017,-73.5673&z=13&output=embed";

const communityEvents = [
  {
    day: "Tonight",
    title: "Neighbourhood assembly",
    location: "Esplanade de la Place des Arts",
    area: "Quartier des Spectacles",
    position: { lat: 45.50839, lng: -73.56673 },
    phoneClass: "dot-1"
  },
  {
    day: "Tomorrow",
    title: "Volunteer onboarding",
    location: "Centre culturel Calixa-Lavallee",
    area: "Parc La Fontaine",
    position: { lat: 45.5274, lng: -73.57049 },
    phoneClass: "dot-2"
  },
  {
    day: "Weekend",
    title: "Mutual aid supply run",
    location: "Marche Atwater",
    area: "Saint-Henri",
    position: { lat: 45.48062, lng: -73.57777 },
    phoneClass: "dot-3"
  }
];

const values = ["Solidarity", "Persistence", "Pursuit of justice"];

const causes = [
  {
    title: "Climate Action",
    desc: "Find local clean-up drives, policy campaigns, and neighborhood action."
  },
  {
    title: "Housing Justice",
    desc: "Discover mutual aid, legal resources, tenant groups, and urgent signals."
  },
  {
    title: "Youth Voice",
    desc: "Build communities around education, voting, and civic participation."
  },
  {
    title: "Accessibility",
    desc: "Center inclusion with clearer design, advocacy spaces, and direct action."
  },
  {
    title: "Gender Equity",
    desc: "Share events, mobilize support, and connect people to on-the-ground work."
  },
  {
    title: "Food Security",
    desc: "Surface nearby initiatives, volunteers, and community support opportunities."
  }
];

export default function HomePage() {
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Social media for changemakers</span>
              <h1>The social media of changemakers.</h1>
              <p className="lead">
                Activists Of Tomorrow is a community-driven social platform built for social and
                environmental justice. Discover causes, connect with others, and turn attention
                into meaningful action.
              </p>

              <div className="cta-row">
                <a href="#reserve" className="btn-primary">
                  Reserve your username
                </a>
                <a href="#map" className="btn-secondary">
                  Explore community map
                </a>
              </div>

              <div className="metric-row">
                <div className="stat-card">
                  <strong>12K+</strong>
                  <span>community members</span>
                </div>
                <div className="stat-card">
                  <strong>240</strong>
                  <span>local circles</span>
                </div>
                <div className="stat-card">
                  <strong>85</strong>
                  <span>active campaigns</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="glow glow-1" />
              <div className="glow glow-2" />

              <div className="desktop-mock">
                <div className="mock-topbar">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="mock-grid">
                  <div className="mock-card large">
                    <div className="mock-kicker">Today's momentum</div>
                    <h3>Housing justice town hall</h3>
                    <p>218 nearby supporters - starts in 2 hours</p>
                  </div>

                  <div className="mock-card">
                    <div className="mini-tag">Community</div>
                    <p>Mutual aid requests matched in your district</p>
                  </div>

                  <div className="mock-card">
                    <div className="mini-tag">Campaign</div>
                    <p>Petition momentum + live volunteer signups</p>
                  </div>

                  <div className="mock-card wide">
                    <div className="mock-kicker">Cause channels</div>
                    <div className="mini-pills">
                      <span>Climate</span>
                      <span>Housing</span>
                      <span>Accessibility</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="phone-mock">
                <div className="phone-top">Community Map</div>

                <div className="phone-map">
                  <iframe
                    className="map-embed"
                    title="Montreal community map preview"
                    src={montrealPhoneMapEmbed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="phone-map-focus">Montreal</div>
                  {communityEvents.map((event) => (
                    <span
                      key={`${event.day}-${event.title}`}
                      className={`map-dot ${event.phoneClass}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <div className="phone-bottom-nav">
                  <span>Feed</span>
                  <span className="active">Map</span>
                  <span>Action</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="shell values-strip">
          {values.map((value) => (
            <div key={value} className="value-chip">
              {value}
            </div>
          ))}
        </section>

        <section className="shell section-gap">
          <div className="section-head">
            <span className="tiny-label">Built for action</span>
            <h2>Connection, action, and community</h2>
            <p>
              Designed to help people move from awareness to participation through healthier
              discovery, stronger community ties, and clearer paths to action.
            </p>
          </div>

          <div className="feature-grid">
            <div className="card">
              <span className="card-tag">01</span>
              <h3>Purpose over passive scrolling</h3>
              <p>
                Discover causes, campaigns, and people through focused pathways that lead toward
                participation instead of distraction.
              </p>
            </div>

            <div className="card">
              <span className="card-tag">02</span>
              <h3>Local action, visible</h3>
              <p>
                Community maps surface nearby events, volunteer opportunities, and organizing
                efforts so action feels immediate and shared.
              </p>
            </div>

            <div className="card">
              <span className="card-tag">03</span>
              <h3>Built for trust</h3>
              <p>
                Clear design, calm structure, and accessible patterns help communities focus on
                each other and the work ahead.
              </p>
            </div>
          </div>
        </section>

        <section className="shell section-gap">
          <div className="section-head">
            <span className="tiny-label">Causes</span>
            <h2>Choose where change starts</h2>
            <p>
              Explore the issues shaping communities and find spaces to organize, support, and act
              together.
            </p>
          </div>

          <div className="cause-grid">
            {causes.map((cause) => (
              <div key={cause.title} className="cause-card">
                <div className="cause-icon">{cause.title.charAt(0)}</div>
                <h3>{cause.title}</h3>
                <p>{cause.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="shell map-layout section-gap" id="map">
          <div className="map-copy">
            <span className="tiny-label">Community map</span>
            <h2>Find your people and take action across Montreal</h2>
            <p>
              Explore community events, campaigns, volunteer opportunities, and spaces for
              collective action across the city.
            </p>

            <div className="signal-list">
              <div>
                <span className="signal green" />
                Mutual aid drop
              </div>
              <div>
                <span className="signal pink" />
                Volunteer event
              </div>
              <div>
                <span className="signal blue" />
                Policy campaign
              </div>
            </div>
          </div>

          <div className="map-panel">
            <CommunityMapPanel events={communityEvents} />
          </div>
        </section>

        <section className="shell split-grid section-gap" id="get-involved">
          <div className="content-card">
            <span className="tiny-label">By the people, for the people</span>
            <h2>Build the movement together</h2>
            <p>
              Activists Of Tomorrow grows through collaboration across development, design,
              organizing, outreach, research, and community support.
            </p>

            <div className="content-bullets">
              <div>Volunteer opportunities</div>
              <div>Community building</div>
              <div>Campaign support</div>
              <div>Design and development</div>
            </div>

            <div className="cta-row">
              <Link href="/signup" className="btn-primary">
                Create an account
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact page
              </Link>
            </div>
          </div>

          <VolunteerForm />
        </section>

        <section className="shell section-gap" id="blog">
          <div className="section-head">
            <span className="tiny-label">Blog / news</span>
            <h2>Stories, ideas, and action</h2>
            <p>
              Explore reflections on civic engagement, ethical technology, community care, and
              product design for social impact.
            </p>
          </div>

          <div className="blog-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-cover">{post.coverTag}</div>
                <div className="blog-content">
                  <span className="post-category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="read-more">Read article -&gt;</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="shell reserve-layout section-gap" id="reserve">
          <div className="reserve-copy">
            <span className="tiny-label">Primary conversion</span>
            <h2>Reserve your username</h2>
            <p>
              Be among the first to claim your place in a platform built for collective action,
              solidarity, and meaningful community.
            </p>
            <div className="reserve-note">Claim your identity early and stay close to what comes next.</div>
          </div>

          <ReserveForm />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
