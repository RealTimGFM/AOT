import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";

function resolveDbPath() {
  const isVercel = Boolean(process.env.VERCEL);
  const preferredDir = isVercel ? path.join("/tmp", "data") : path.join(process.cwd(), "data");

  try {
    fs.mkdirSync(preferredDir, { recursive: true });
    return path.join(preferredDir, "aot-demo.sqlite");
  } catch {
    return ":memory:";
  }
}

const db = new Database(resolveDbPath());

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS username_reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    motivation TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS volunteers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    area TEXT NOT NULL,
    availability TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    body TEXT NOT NULL,
    cover_tag TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

seedDemoUser();
seedPosts();

function seedDemoUser() {
  const passwordHash = bcrypt.hashSync("demo123", 10);
  db.prepare(`
    INSERT OR IGNORE INTO users (name, email, password_hash, role)
    VALUES (?, ?, ?, ?)
  `).run("Demo Organizer", "demo@aot.local", passwordHash, "member");
}

function seedPosts() {
  const posts = [
    {
      slug: "designing-for-action-not-doomscrolling",
      title: "Lorem ipsum dolor sit amet",
      category: "Lorem Ipsum",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      coverTag: "Lorem / Ipsum",
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
    },
    {
      slug: "why-community-maps-matter",
      title: "Consectetur adipiscing elit",
      category: "Dolor Sit",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      coverTag: "Dolor / Amet",
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
    },
    {
      slug: "building-trust-with-clear-ui",
      title: "Sed do eiusmod tempor",
      category: "Adipiscing Elit",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      coverTag: "Sit / Amet",
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
    }
  ];

  const insert = db.prepare(`
    INSERT INTO blog_posts (slug, title, category, excerpt, body, cover_tag)
    VALUES (@slug, @title, @category, @excerpt, @body, @coverTag)
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      category = excluded.category,
      excerpt = excluded.excerpt,
      body = excluded.body,
      cover_tag = excluded.cover_tag
  `);

  const tx = db.transaction((items) => {
    for (const item of items) insert.run(item);
  });

  tx(posts);
}

export { db };

export function getPosts() {
  return db.prepare(`
    SELECT
      id,
      slug,
      title,
      category,
      excerpt,
      body,
      cover_tag AS coverTag,
      created_at AS createdAt
    FROM blog_posts
    ORDER BY id DESC
  `).all();
}

export function getPostBySlug(slug) {
  return db.prepare(`
    SELECT
      id,
      slug,
      title,
      category,
      excerpt,
      body,
      cover_tag AS coverTag,
      created_at AS createdAt
    FROM blog_posts
    WHERE slug = ?
  `).get(slug);
}
