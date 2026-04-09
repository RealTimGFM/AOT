import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const schema = z.object({
  fullName: z.string().min(2).max(80),
  email: z.string().email(),
  username: z
    .string()
    .min(3)
    .max(24)
    .regex(/^[a-zA-Z0-9_.-]+$/, "Use only letters, numbers, dots, dashes, or underscores."),
  motivation: z.string().min(10).max(400)
});

export async function POST(req) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const username = data.username.trim().toLowerCase();

    const exists = db
      .prepare("SELECT id FROM username_reservations WHERE lower(username) = lower(?)")
      .get(username);

    if (exists) {
      return NextResponse.json(
        { error: "That username is already reserved." },
        { status: 409 }
      );
    }

    db.prepare(`
      INSERT INTO username_reservations (full_name, email, username, motivation)
      VALUES (?, ?, ?, ?)
    `).run(data.fullName.trim(), data.email.trim().toLowerCase(), username, data.motivation.trim());

    return NextResponse.json({
      message: `@${username} has been reserved.`
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
