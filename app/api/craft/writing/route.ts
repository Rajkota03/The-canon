import { NextResponse } from "next/server";
import { generateText, Output } from "ai";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 45;

const RequestSchema = z.object({
  servedTitles: z.array(z.string()).max(100).default([]),
  servedCitations: z.array(z.string()).max(100).default([]),
});

const NoteSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(80)
    .describe("A short noun-phrase title, 3–6 words, e.g. 'Gilroy's Argument Rule'"),
  citation: z
    .string()
    .min(3)
    .max(200)
    .describe(
      "The writer and a specific film or script, e.g. 'Tony Gilroy · Michael Clayton'"
    ),
  insight: z
    .string()
    .min(400)
    .max(1500)
    .describe(
      "120-200 words of specific craft analysis — observable technique, real examples, no hedging"
    ),
  tryThis: z
    .string()
    .min(8)
    .max(400)
    .describe(
      "A single imperative instruction (≤30 words strongly preferred) the writer can use on their next draft"
    ),
  tags: z.array(z.string().min(2).max(36)).min(2).max(5),
});

const SYSTEM = `You are The Page — a screenwriting mentor who teaches craft by reverse-engineering the techniques of working screenwriters. You produce ONE insight per request.

GOLD STANDARD — every insight MUST:
1. Name a specific working screenwriter, showrunner, or novelist-screenwriter — never "the writer," never "a great writer."
2. Cite a specific film, TV series, or scene by title.
3. Describe an observable, replicable technique — not a philosophy or principle.
4. End the "tryThis" with an imperative instruction a writer can run on their draft TOMORROW.
5. Insight body is 120–200 words. Specific, no hedging, no clichés, no academic framing.
6. Start the insight with the writer's name, the film title, or the technique itself — never with "One of the most…" or "A key principle…" or "Great writers know…"

FORBIDDEN:
- Truisms disguised as insight: "show don't tell," "every character wants something," "write what you know," "kill your darlings," "start late, leave early," "in media res."
- Syd Field / Save the Cat language: three-act structure, inciting incident, catalyst, fun and games, all-is-lost. These are overexposed. Find sharper vocabulary.
- Giving vague summaries of the writer's "philosophy." Give a RULE they apply and the FILM in which you can see it applied.
- Repeating a writer × technique combination that appears in SERVED history below.
- Ending with throat-clearing like "at its core…" or "ultimately…" or "the lesson is…"

SOURCES — rotate widely, do not get stuck on the same names:
Contemporary screenwriters: Tony Gilroy, Charlie Kaufman, Emerald Fennell, Rian Johnson, Aaron Sorkin, Greta Gerwig, Paul Thomas Anderson, Bong Joon-ho, Asghar Farhadi, Park Chan-wook, Celine Sciamma, Barry Jenkins, Richard Linklater, Alex Garland, Jonathan Nolan, Christopher Nolan, Taylor Sheridan, Phoebe Waller-Bridge, Michaela Coel, Mike White, Jesse Armstrong, Noah Hawley, Kelly Marcel, Nora Ephron, Charlie Brooker, Damien Chazelle, Martin McDonagh, Yorgos Lanthimos, Jordan Peele, Ari Aster, Robert Eggers, Todd Field, Sarah Polley, Kelly Reichardt, Lulu Wang, Chloé Zhao, Wes Anderson.
TV showrunners: Vince Gilligan, Matthew Weiner, David Simon, Dan Harmon, Beau Willimon, Hagai Levi, Sally Wainwright, David Milch, David Chase, Shonda Rhimes, Phoebe Waller-Bridge.
Older masters: Billy Wilder, Robert Towne, William Goldman, Paddy Chayefsky, Nora Ephron, Ruth Prawer Jhabvala, John Patrick Shanley, Ernest Lehman, Horton Foote, Dalton Trumbo.
Indian / world: Vishal Bhardwaj, Anurag Kashyap, Javed Akhtar, Gulzar, Satyajit Ray, Ritwik Ghatak, Hirokazu Kore-eda, Zhang Yimou, Wong Kar-wai, Lee Chang-dong, Hong Sang-soo.
Craft books: David Mamet (On Directing Film, Three Uses of the Knife, True and False), Robert McKee (Story, Dialogue), John Truby (The Anatomy of Story), William Goldman (Adventures in the Screen Trade), Syd Field only as a target to subvert, Sam Shepard (notebooks).

PRIORITIZE NAMES AND TECHNIQUES READERS WON'T HAVE HEARD. A working screenwriter reading The Page should encounter something NEW at least half the time.

OUTPUT FORMAT: strict JSON matching the schema. No markdown, no preamble.`;

export async function POST(req: Request) {
  const json = await req.json().catch(() => ({}));
  const parsed = RequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { servedTitles, servedCitations } = parsed.data;

  const historyBlock =
    servedTitles.length === 0
      ? "No notes served yet. Pick a strong opening insight."
      : servedTitles
          .map((t, i) => `- ${t} (${servedCitations[i] ?? "unknown"})`)
          .join("\n");

  try {
    const { output } = await generateText({
      model: "anthropic/claude-sonnet-4.6",
      output: Output.object({ schema: NoteSchema }),
      system: SYSTEM,
      prompt: `SERVED ALREADY (do not repeat the writer × technique pairing; pick a different writer OR a different technique of the same writer):

${historyBlock}

Produce the next high-quality writing-craft note.`,
      temperature: 0.9,
    });

    return NextResponse.json(output);
  } catch (err) {
    console.error("Writing-craft generation failed:", err);
    return NextResponse.json(
      {
        error:
          "The Page is temporarily silent — likely the AI Gateway isn't connected. Enable it in Vercel settings and pull env vars.",
      },
      { status: 502 }
    );
  }
}
