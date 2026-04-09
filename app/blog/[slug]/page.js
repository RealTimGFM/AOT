import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getPostBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SiteHeader />

      <main className="page-shell">
        <article className="shell article-card">
          <div className="article-cover">{post.coverTag}</div>
          <div className="article-meta">
            <span className="post-category">{post.category}</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>

          <h1>{post.title}</h1>
          <p className="article-excerpt">{post.excerpt}</p>

          <div className="rich-text">
            {post.body.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
