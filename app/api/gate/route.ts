import { NextResponse } from "next/server";
import { generateText, Output } from "ai";
import { z } from "zod";
import { getFilm } from "@/content/canon";

export const runtime = "nodejs";

const RequestSchema = z.object({
  directorSlug: z.string().min(1),
  filmSlug: z.string().min(1),
  answer: z.string().min(1).max(2000),
});

const VerdictSchema = z.object({
  passed: z.boolean(),
  feedback: z.string(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = RequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { passed: false, feedback: "Invalid submission." },
      { status: 400 }
    );
  }

  const { directorSlug, filmSlug, answer } = parsed.data;
  const found = getFilm(directorSlug, filmSlug);
  if (!found) {
    return NextResponse.json(
      { passed: false, feedback: "We couldn't find that film in the Canon." },
      { status: 404 }
    );
  }

  const { film } = found;

  // Fast path: if the answer clearly contains any of the accepted keywords,
  // grant it without spending a model call.
  const normalized = answer.toLowerCase();
  const keywordHit = film.gate.acceptedAnswers.some((kw) =>
    kw.split(/\s+/).every((part) => normalized.includes(part))
  );

  if (keywordHit) {
    return NextResponse.json({
      passed: true,
      feedback:
        "You were there. The specific detail you named is the kind of thing only a viewer catches. The Gate opens.",
    });
  }

  // LLM rubric judging
  try {
    const { output } = await generateText({
      model: "anthropic/claude-haiku-4.5",
      output: Output.object({ schema: VerdictSchema }),
      system:
        "You are The Gate — a cinema-literate gatekeeper. A film student is trying to prove they watched a specific film. You judge whether their answer reflects real viewing (pass) versus plot-summary skimming (fail). Be fair but strict. If they describe the specific visual/audio detail from the rubric, they pass. If they describe it only in generic terms that could come from Wikipedia, they fail. Feedback is ONE or TWO sentences, warm, specific, never condescending. When they pass, celebrate the detail they named. When they fail, nudge them back to the film without spoiling the answer.",
      prompt: `FILM: ${film.title} (${film.year})\n\nGATE QUESTION: ${film.gate.question}\n\nRUBRIC FOR JUDGING: ${film.gate.rubric}\n\nSTUDENT'S ANSWER:\n"""${answer}"""\n\nJudge whether this answer shows the student actually watched the film based on the rubric above. Respond with { passed, feedback }.`,
    });

    return NextResponse.json(output);
  } catch (err) {
    console.error("Gate judge failed:", err);
    return NextResponse.json(
      {
        passed: false,
        feedback:
          "The Gate couldn't judge your answer just now. Try again in a moment.",
      },
      { status: 502 }
    );
  }
}
