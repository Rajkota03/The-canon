import { NextResponse } from "next/server";
import { generateText, Output } from "ai";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 60;

const RequestSchema = z.object({
  existingSlugs: z.array(z.string()).max(200).default([]),
  existingNames: z.array(z.string()).max(200).default([]),
  order: z.number().int().min(1).max(99),
});

const SlugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const FilmShellSchema = z.object({
  slug: z.string().min(2).max(60).regex(SlugRe, "lowercase-hyphenated slug"),
  title: z.string().min(2).max(100),
  year: z.number().int().min(1895).max(2030),
  runtime: z.string().min(3).max(20),
  whereToWatch: z.string().min(3).max(240),
  tagline: z.string().min(10).max(240),
  whyWatch: z.string().min(280).max(2200),
  gate: z.object({
    question: z.string().min(50).max(900),
    hint: z.string().min(20).max(400),
    rubric: z.string().min(100).max(1800),
    acceptedAnswers: z.array(z.string().min(2).max(80)).min(2).max(8),
  }),
  order: z.number().int().min(1).max(3),
  accent: z.enum(["lavender", "blush", "sage"]),
});

const DirectorShellSchema = z.object({
  slug: z.string().min(2).max(60).regex(SlugRe),
  name: z.string().min(3).max(80),
  lifespan: z.string().min(3).max(30),
  era: z.string().min(3).max(80),
  role: z.string().min(3).max(80),
  quote: z.string().min(10).max(500),
  why: z.string().min(200).max(1800),
  portrait: z.string().min(200).max(2400),
  signatureMoves: z.array(z.string().min(10).max(240)).min(5).max(7),
  films: z.array(FilmShellSchema).length(3),
});

const SYSTEM = `You are The Canon's curator — a cinema-literate taste-maker who adds the next essential director to a film-school syllabus. The syllabus already contains specific directors; you pick the NEXT one a serious film student should meet, and you write their portrait + 3 essential films, in the same editorial voice.

CRITICAL RULES:
- Pick a REAL director whose films are actually accessible to watch.
- Do NOT pick any director already in the existing canon (names provided).
- Write in the established editorial voice: sharp, specific, zero-filler, short declarative sentences, occasional sentence fragments, never listicle-y. No "one of the most," no "a visionary who," no "masterpiece."
- The GATE question for each film must test actual VIEWING, not plot summary. It must ask about a visual, audio, staging, or performance detail that Wikipedia would not mention but a viewer unmistakably catches — a specific gesture, color, object, sound, framing, prop. NEVER a trivia question.
- The RUBRIC must describe exactly what a correct answer must identify and which types of near-answers earn partial credit. Detail matters.
- The ACCEPTED_ANSWERS array is keyword hit-list for a fast-path keyword match — 2–6 short phrases (2-6 words each) that definitely indicate the viewer saw the right thing.
- The WHYWATCH is a 2–4 paragraph brief BEFORE watching: what to pay attention to, why this film is an earned unlock, never a plot summary, never spoils the gate's specific moment.
- SIGNATURE MOVES are 5–7 observable techniques (not philosophy — things a viewer can literally see or hear).
- Slugs are lowercase-hyphenated, URL-safe. Film slugs must be unique within the director.
- Accents rotate across films: lavender, blush, sage.
- Film years must be accurate to the nearest year.

Output the director's complete shell + 3 films. No markdown. No preamble.`;

export async function POST(req: Request) {
  const json = await req.json().catch(() => ({}));
  const parsed = RequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { existingSlugs, existingNames, order } = parsed.data;

  const existingBlock =
    existingNames.length === 0
      ? "No directors in the canon yet — pick the ideal opener (likely Hitchcock)."
      : existingNames.map((n, i) => `- ${n} (${existingSlugs[i] ?? "?"})`).join("\n");

  try {
    const { output } = await generateText({
      model: "anthropic/claude-sonnet-4.6",
      output: Output.object({ schema: DirectorShellSchema }),
      system: SYSTEM,
      prompt: `CANON SO FAR (do NOT reuse any of these directors):

${existingBlock}

This will be director #${order} in the canon. Pick the next essential director, write their portrait + 3 recommended films with full gates. Remember: the Gate question must be a VIEWER-ONLY detail, unguessable from Wikipedia.`,
      temperature: 0.7,
    });

    return NextResponse.json(output);
  } catch (err) {
    console.error("Director generation failed:", err);
    return NextResponse.json(
      { error: "The Canon's next door is stuck. Try again." },
      { status: 502 }
    );
  }
}
