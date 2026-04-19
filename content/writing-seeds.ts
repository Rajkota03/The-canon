export type WritingSeed = {
  title: string;
  citation: string;
  insight: string;
  tryThis: string;
  tags: string[];
};

export const writingSeeds: WritingSeed[] = [
  {
    title: "Gilroy's Argument Rule",
    citation: "Tony Gilroy · Michael Clayton, Andor",
    insight:
      "Tony Gilroy says every scene is a trial with a winner. Before writing, decide: who wins, and what position prevails? If both characters leave unchanged, you haven't written a scene — you've written a conversation. In Michael Clayton, every Clayton/Karen Crowder encounter has a clear winner. The restaurant scene: Karen wins (composed, offering comfort). The final confrontation: Clayton wins (flips the trap, reveals the wire). Even small scenes — the car, the office — follow this shape. Gilroy's rule, delivered at the WGA panel: \"Dialogue is the sound of two people trying to win.\" The opposite of a scene is not silence. It is equilibrium.",
    tryThis:
      "Before your next scene, write one sentence: who wins, and what position prevails? If you can't answer, cut the scene.",
    tags: ["dialogue", "structure", "scene-design"],
  },
  {
    title: "Kaufman's Unanswerable Question",
    citation: "Charlie Kaufman · Being John Malkovich, Adaptation, Synecdoche New York",
    insight:
      "Charlie Kaufman starts every script with a question he cannot answer — not a premise, a question. Being John Malkovich: what would it feel like to be someone else? Adaptation: can I write about my inability to write? Synecdoche, New York: can a man capture his own life before it ends? The unanswerability is the engine. Premises burn out in act one — once we see 'a man can enter John Malkovich's head,' the premise is resolved. Questions you can't answer power a full script because every scene is another attempt. Where Syd Field says state your theme in one line, Kaufman says: state the question you are terrified you can't answer. Then spend 110 pages failing to answer it.",
    tryThis:
      "Write your script's question. If you can answer it, it's too small. Keep asking \"but why does that matter\" until you hit a wall.",
    tags: ["premise", "theme", "philosophy"],
  },
  {
    title: "Coens' Interrupted Speech",
    citation: "Joel & Ethan Coen · Fargo, No Country for Old Men, Burn After Reading",
    insight:
      "The Coens' rule for dialogue: never let a character finish a thought. They interrupt themselves, get interrupted, lose the thread. Read any Coen script — almost no complete sentences. \"Yeah, the thing is, I've been... no, what I'm saying is...\" In Fargo, Jerry Lundegaard never completes a lie — he trails off, restarts, rephrases. In Burn After Reading, nobody completes a plan; plans collapse mid-sentence. Real speech is broken. Literary speech is complete. This is what separates written-sounding dialogue from lived-in dialogue. Watch the exception: when a Coen character DOES finish a complete sentence (Anton Chigurh, The Dude mid-bowling), they read as either inhuman or serenely separate from the chaos around them.",
    tryThis:
      "Take your last dialogue scene. Break every third sentence in two — the character interrupts themselves. You'll hear it immediately.",
    tags: ["dialogue", "realism", "voice"],
  },
  {
    title: "Fennell's Reverse Casting",
    citation: "Emerald Fennell · Promising Young Woman, Saltburn",
    insight:
      "Emerald Fennell writes villains by casting them as the genre's usual hero. In Promising Young Woman, the predator is the Nice Guy (Chris Lowell, sitcom warmth); the complicit friends are the rom-com leads. Her rule, from a BAFTA lecture: \"Write the monster as the person everyone in the movie would vouch for at a dinner party.\" This inverts the thriller's moral economy — the danger isn't visible because it looks like kindness. Saltburn applies the same logic to class: the rich are not written as cruel, they're written as open. Fennell never casts menace. She casts charm, and the audience does the horror work themselves — which is why her films feel complicit rather than sermonizing.",
    tryThis:
      "Look at your antagonist. Are they visibly the bad guy? Rewrite them as the person your protagonist's mother would trust most.",
    tags: ["character", "antagonist", "tone"],
  },
  {
    title: "Mamet's Three Questions",
    citation: "David Mamet · Glengarry Glen Ross, On Directing Film",
    insight:
      "David Mamet writes every scene by answering three questions in order: (1) Who wants what from whom? (2) What happens if they don't get it? (3) Why now? If you can't answer all three, cut the scene. In Glengarry Glen Ross, every scene passes this test brutally. Levene wants leads from Williamson. If he doesn't get them, his daughter's surgery is unpaid. Why now? Because the contest ends tonight. Each scene is compressed stakes under compressed time. Mamet's line, from On Directing Film: \"A scene without stakes is a conversation. A scene without urgency is a memo. Write neither.\" The three questions are a rubric you can apply in thirty seconds — which is exactly why most writers don't.",
    tryThis:
      "Pin \"Who wants what? What if no? Why now?\" above your desk. Answer all three before typing your next scene.",
    tags: ["scene-design", "stakes", "structure"],
  },
];
