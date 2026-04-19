import { NextResponse } from "next/server";
import { generateText, Output } from "ai";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 30;

const RequestSchema = z.object({
  directorName: z.string().min(2).max(120),
  filmTitle: z.string().min(2).max(120),
  filmYear: z.number().int().min(1895).max(2030),
  question: z.string().min(10).max(1000),
  rubric: z.string().min(30).max(2000),
  acceptedAnswers: z.array(z.string().min(2).max(80)).min(1).max(12),
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

  const {
    directorName,
    filmTitle,
    filmYear,
    question,
    rubric,
    acceptedAnswers,
    answer,
  } = parsed.data;

  // Fast path: keyword hit
  const normalized = answer.toLowerCase();
  const keywordHit = acceptedAnswers.some((kw) =>
    kw
      .toLowerCase()
      .split(/\s+/)
      .every((part) => normalized.includes(part))
  );

  if (keywordHit) {
    return NextResponse.json({
      passed: true,
      feedback:
        "You were there. The specific detail you named is the kind of thing only a viewer catches. The Gate opens.",
    });
  }

  try {
    const { output } = await generateText({
      model: "anthropic/claude-haiku-4.5",
      output: Output.object({ schema: VerdictSchema }),
      system:
        "You are The Gate — a cinema-literate gatekeeper. A film student is trying to prove they watched a specific film. You judge whether their answer reflects real viewing (pass) versus plot-summary skimming (fail). Be fair but strict. If they describe the specific visual/audio detail from the rubric, they pass. If they describe it only in generic terms that could come from Wikipedia, they fail. Feedback is ONE or TWO sentences, warm, specific, never condescending. When they pass, celebrate the detail they named. When they fail, nudge them back to the film without spoiling the answer.",
      prompt: `FILM: ${filmTitle} (${filmYear}) — directed by ${directorName}\n\nGATE QUESTION: ${question}\n\nRUBRIC FOR JUDGING: ${rubric}\n\nSTUDENT'S ANSWER:\n"""${answer}"""\n\nJudge whether this answer shows the student actually watched the film based on the rubric above. Respond with { passed, feedback }.`,
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
