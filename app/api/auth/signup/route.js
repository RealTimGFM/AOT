import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(6).max(100)
});

export async function POST(req) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const email = data.email.trim().toLowerCase();

    const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (existing) {
      return NextResponse.json({ error: "That email already exists." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const result = db.prepare(`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `).run(data.name.trim(), email, passwordHash, "member");

    return NextResponse.json({
      message: "Account created successfully.",
      user: {
        id: result.lastInsertRowid,
        name: data.name.trim(),
        email,
        role: "member"
      }
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Invalid input." },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
