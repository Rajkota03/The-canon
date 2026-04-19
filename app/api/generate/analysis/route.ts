import { NextResponse } from "next/server";
import { generateText, Output } from "ai";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 60;

const RequestSchema = z.object({
  directorName: z.string().min(2).max(120),
  filmTitle: z.string().min(2).max(120),
  filmYear: z.number().int().min(1895).max(2030),
});

const AnalysisSchema = z.object({
  writing: z.string().min(240).max(1800),
  directing: z.string().min(240).max(1800),
  cinematography: z.string().min(240).max(1800),
  editing: z.string().min(240).max(1800),
  sound: z.string().min(240).max(1800),
  performance: z.string().min(240).max(1800),
  extras: z
    .array(
      z.object({
        label: z.string().min(3).max(40),
        note: z.string().min(10).max(400),
      })
    )
    .min(2)
    .max(4),
});

const SYSTEM = `You are The Canon's in-house critic. A student just unlocked a specific film and passed its Gate — meaning they've actually watched it. Now write the six craft sections + 2–3 "go deeper" extras, in the established editorial voice.

RULES:
- Short declarative sentences. No "one of the most," no "masterpiece," no "visionary," no "at its core," no "ultimately."
- Each craft section is 150–250 words. Specific scenes, specific collaborators when possible (cinematographer, editor, composer, lead performers). NEVER vague.
- Writing: structure, beat design, dialogue rules, what's withheld.
- Directing: blocking, staging choices, camera grammar unique to this film.
- Cinematography: DP name, lens choices, lighting design, color.
- Editing: editor name, cut rhythm, signature editorial decision(s).
- Sound: diegetic vs score, composer, one specific sound or musical choice.
- Performance: lead actors, their specific choices — gesture, vocal, micro-beat. Avoid "stunning performance."
- Extras: 2–3 items — "Watch next" (a related film), "Read" (a book/interview/essay), "Scene to rewatch" (a specific scene with a reason). Each label 2–4 words.

No markdown. No preamble. JSON only.`;

export async function POST(req: Request) {
  const json = await req.json().catch(() => ({}));
  const parsed = RequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { directorName, filmTitle, filmYear } = parsed.data;

  try {
    const { output } = await generateText({
      model: "anthropic/claude-sonnet-4.6",
      output: Output.object({ schema: AnalysisSchema }),
      system: SYSTEM,
      prompt: `DIRECTOR: ${directorName}\nFILM: ${filmTitle} (${filmYear})\n\nWrite the six-craft analysis + extras now.`,
      temperature: 0.65,
    });

    return NextResponse.json(output);
  } catch (err) {
    console.error("Analysis generation failed:", err);
    return NextResponse.json(
      { error: "Analysis temporarily unavailable." },
      { status: 502 }
    );
  }
}
