import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  area: z.string().min(2).max(50),
  availability: z.string().min(2).max(80),
  message: z.string().min(10).max(500)
});

export async function POST(req) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    db.prepare(`
      INSERT INTO volunteers (name, email, area, availability, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      data.name.trim(),
      data.email.trim().toLowerCase(),
      data.area.trim(),
      data.availability.trim(),
      data.message.trim()
    );

    return NextResponse.json({
      message: "Thanks for reaching out. We'll be in touch."
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
