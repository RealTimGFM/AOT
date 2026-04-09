import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <SiteHeader />

      <main className="page-shell">
        <section className="shell page-hero">
          <span className="eyebrow">Blog / News</span>
          <h1>Lorem ipsum dolor sit amet.</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </section>

        <section className="shell blog-grid section-gap">
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
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
