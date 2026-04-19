export type CraftAnalysis = {
  writing: string;
  directing: string;
  cinematography: string;
  editing: string;
  sound: string;
  performance: string;
};

export type Film = {
  slug: string;
  title: string;
  year: number;
  runtime: string;
  whereToWatch: string;
  tagline: string;
  whyWatch: string;
  gate: {
    question: string;
    hint: string;
    rubric: string;
    acceptedAnswers: string[];
  };
  analysis: CraftAnalysis;
  extras: { label: string; note: string }[];
  order: number;
  accent: "lavender" | "blush" | "sage";
};

export type Director = {
  slug: string;
  name: string;
  lifespan: string;
  era: string;
  role: string;
  quote: string;
  why: string;
  signatureMoves: string[];
  portrait: string;
  films: Film[];
  order: number;
};

export const directors: Director[] = [
  {
    slug: "hitchcock",
    name: "Alfred Hitchcock",
    lifespan: "1899 – 1980",
    era: "Silent era through 1976",
    role: "The architect of suspense",
    quote: "There is no terror in the bang, only in the anticipation of it.",
    why: "Hitchcock invented the grammar of visual suspense. Every thriller you've seen stole from him. More importantly — he taught cinema how to use the camera as the storyteller instead of the dialogue. He shows you what the characters cannot see. He lets you know about the bomb under the table. He makes you complicit, every single time.",
    signatureMoves: [
      "POV as a moral weapon — when you look through a character's eyes, you become them",
      "The MacGuffin — the plot device no one remembers because the story isn't really about it",
      "Suspense over surprise — the audience always knows more than the characters",
      "Geometric blocking — characters arranged like chess pieces in space",
      "The set-piece — every film is built around one or two scenes you will never forget",
      "Ordinary man, wrong place, cool blonde",
    ],
    portrait:
      "He was a London fruit-and-veg merchant's son who watched people through his bedroom window and taught himself to direct by studying silent film intertitles. He called actors 'cattle' and meant it — because he believed the frame, the cut, and the music should do the acting. Fifty-three films across six decades. Every modern thriller, horror, or psychological drama runs on his code. Start here. He will teach you that cinema is a visual medium before it is anything else.",
    order: 1,
    films: [
      {
        slug: "rear-window",
        title: "Rear Window",
        year: 1954,
        runtime: "1h 52m",
        whereToWatch: "Peacock, Apple TV, Amazon (rent)",
        tagline: "A film about watching films.",
        whyWatch:
          "This is the purest POV experiment in cinema. Jeffries in his wheelchair is you in your seat — immobile, voyeuristic, stitching together a story from what you can glimpse across a courtyard. Every craft decision locks you into his apartment, and by the end you realize Hitchcock has made you an accomplice. Don't read about it. Don't watch a trailer. Go in clean. Watch how long it takes before the camera even leaves Jeff's room — and notice what you're doing with your eyes when it doesn't.",
        gate: {
          question:
            "When Lisa Fremont first appears in Jeff's apartment, she introduces herself in a very specific theatrical way — she says her three names while doing a very specific thing. What does she do, and what three names does she speak?",
          hint: "It involves light, and it happens the very first time we see her full face.",
          rubric:
            "A correct answer must mention BOTH (a) that she turns on / switches on three lamps (or lights) one by one, AND (b) that she says her name one word per lamp — the names being Lisa, Carol, Fremont (in that order, spoken as she lights each lamp). Partial credit if the viewer mentions the three-lamps-three-names ritual without remembering the exact names. Reject answers that only describe her appearance, her kiss, or her being elegant — those are Wikipedia-level. The specific lamp-lighting ritual is something ONLY a viewer catches.",
          acceptedAnswers: [
            "lisa carol fremont lamps",
            "three lamps",
            "turns on three lamps",
            "lights three lamps",
          ],
        },
        analysis: {
          writing:
            "John Michael Hayes' screenplay runs on a single iron rule: we only know what Jeff knows. Thorwald is introduced as a distant abstraction — a shape moving behind a window — and is converted into a close, concrete threat only when Jeff (and therefore we) gathers enough fragments to make him real. Lisa arrives as an obstacle (wrong world, wrong wardrobe, wrong rhythm) and earns her place by the final act by physically crossing into Thorwald's apartment — the screenplay's true climax is not the confrontation but the moment she becomes a subject of Jeff's voyeurism rather than just a visitor to it.",
          directing:
            "The camera does not leave Jeff's apartment. It cannot. When Jeff sleeps, the film sleeps — and we miss a crucial piece of evidence, exactly as he does. Hitchcock's blocking is stage-direction precise: every courtyard window is its own miniature proscenium, and he trusts you to glance, reconstruct, and suspect. The whole film is a thesis statement: cinema is not about what happens, it is about what is shown and when.",
          cinematography:
            "Robert Burks shoots the courtyard as a giant dollhouse. Each window has its own lens language — the dancer is framed wide and flat, the newlyweds are shot through curtains, Thorwald is compressed with long lenses that flatten and stalk. Lighting shifts with Jeff's moral certainty: early scenes are sunlit and domestic, later scenes push toward harsh key lights and black courtyard shadows as his suspicion hardens into obsession.",
          editing:
            "This is the Kuleshov effect weaponized. The same Jeff-reaction shot means one thing intercut with the dancer's legs, a completely different thing intercut with Thorwald washing a knife. Hitchcock teaches you that meaning is made in the cut, not the performance. Watch Stewart's face: he is barely doing anything. The edit is doing the acting.",
          sound:
            "There is no non-diegetic score. Every sound you hear — the songwriter's piano across the courtyard, the radio jingle, the scream — comes from inside the world. The final confrontation plays out with no music at all, only Thorwald's breathing and the pop of Jeff's flashbulbs. The absence of score is the score.",
          performance:
            "James Stewart plays pure observer — his entire performance is built in his eyes, because his body is immobilized. Grace Kelly performs seduction as blocking: she literally lights up the apartment (see the gate question) and moves through Jeff's space like she's introducing him to a world he refuses to enter. Thelma Ritter is our sanity check — the one character allowed to speak plainly about what everyone else is coyly dancing around.",
        },
        extras: [
          {
            label: "Watch next",
            note: "Vertigo (1958) — for the dark mirror of Jeff's looking",
          },
          {
            label: "Listen to",
            note: "Hitchcock/Truffaut (the book, or the documentary) — Truffaut's chapter on Rear Window is a masterclass on its own",
          },
          {
            label: "Scene to rewatch",
            note: "The first three minutes — a camera move that tells you the entire backstory without a single line of dialogue",
          },
        ],
        order: 1,
        accent: "lavender",
      },
      {
        slug: "vertigo",
        title: "Vertigo",
        year: 1958,
        runtime: "2h 8m",
        whereToWatch: "Peacock, Apple TV, Amazon (rent)",
        tagline: "The darkest film ever made about obsession as creation.",
        whyWatch:
          "This is Hitchcock's confession. A man tries to recreate a dead woman from a living one — which is exactly what Hitchcock himself did, film after film, blonde after blonde. Watch it as a thriller if you want. But pay attention to the middle hour, which is really the film: a man slowly, patiently, humiliatingly reshaping a woman into a ghost. Bernard Herrmann's score is the best ever written. The dolly-zoom was invented here. And the film breaks its contract with you at the halfway mark in a way that has been copied for sixty years and never equaled.",
        gate: {
          question:
            "Near the end of the film, Scottie has finished transforming Judy — hair, clothes, shoes, everything. She emerges from the hotel bathroom fully changed. As she walks toward him, she is bathed in one specific, unnatural color of light, coming from outside the window. What color, and what is its source in the scene?",
          hint: "It is the most famous lighting choice in the film. You will not miss it.",
          rubric:
            "A correct answer must identify the color as GREEN (or a very specific green — emerald, neon green, ghostly green all acceptable) AND identify its source as the green neon sign / neon hotel sign outside the window (names like 'Empire Hotel sign' are a bonus but not required). Partial credit for just naming the green. Reject answers that say white, blue, red, or that describe her outfit instead of the light. The green-neon-bathroom-emergence is the cinematic signature of the film.",
          acceptedAnswers: ["green", "green neon", "neon green", "hotel sign"],
        },
        analysis: {
          writing:
            "Samuel Taylor and Alec Coppel take Boileau-Narcejac's novel and strip it to a single obsession: can you remake a person? The script's boldest move is the midpoint reveal — we learn the truth about Judy a full forty minutes before Scottie does. From that point on, we are no longer watching a thriller. We are watching a man torture a woman into a ghost, and we know it, and we cannot stop watching.",
          directing:
            "Hitchcock directs the second half as a slow, deliberate humiliation filmed like a love story. Shot after shot, Judy is framed against Scottie's gaze the way Madeleine was framed in the first half. The repetition is not lazy — it is the point. Love as compulsion. Direction as ritual.",
          cinematography:
            "Robert Burks again. The color design is operatic: Madeleine is lavender and ash, Judy is ochre and forest green, the transformation scene is entirely green neon. The dolly-zoom (invented for this film) is used sparingly — you only notice it twice, and each time it is Scottie's vertigo weaponized into pure cinematic sensation. Watch the stairwell shots.",
          editing:
            "George Tomasini's cutting slows down at exactly the moments where a lesser film would speed up. The makeover scenes are held long. The kiss, when the transformation is complete, is held long. The editing trusts you to squirm.",
          sound:
            "Bernard Herrmann's score is the film's secret narrator. The main theme is a rising-and-falling spiral — literally the shape of the vertigo effect, in music. Listen for the 'Madeleine' motif: it is romantic, it is mournful, it is a descending chromatic trap. The score tells you Scottie is doomed before the plot does.",
          performance:
            "James Stewart is unrecognizable here — the affable everyman of Rear Window, twisted into something desperate and ugly. Kim Novak plays two characters in the same body and makes you believe they are different women until the moment you have to accept they are not. Her performance is the most misunderstood in classic Hollywood: she is not playing 'cold blonde,' she is playing a woman in love with a man who only wants her as a corpse.",
        },
        extras: [
          {
            label: "Watch next",
            note: "Chris Marker's 'La Jetée' (1962) — a 28-minute homage that deepens Vertigo",
          },
          {
            label: "Scene to rewatch",
            note: "The green-neon emergence — and then immediately, the 360° kiss that follows",
          },
          {
            label: "Read",
            note: "Robin Wood's chapter on Vertigo in 'Hitchcock's Films Revisited' — the single best piece of writing on this film",
          },
        ],
        order: 2,
        accent: "blush",
      },
      {
        slug: "psycho",
        title: "Psycho",
        year: 1960,
        runtime: "1h 49m",
        whereToWatch: "Peacock, Apple TV, Amazon (rent)",
        tagline: "The night cinema broke its own rules.",
        whyWatch:
          "In 1960, no serious filmmaker killed the lead star in the first act. No serious filmmaker made the audience root for the murderer in the second. No serious filmmaker shot a horror film on a TV budget in black and white as a dare. Hitchcock did all three in one movie and the world has not recovered. Watch it for: Bernard Herrmann's strings, the shower scene (which is not actually as graphic as you remember — pay close attention), and Anthony Perkins giving one of the ten greatest performances in film history. Go in knowing as little as possible, even if the twist has been spoiled for you by sixty years of culture.",
        gate: {
          question:
            "After Marion is killed in the shower, Norman meticulously cleans up and puts everything into the trunk of her car. But there's one crucial piece of evidence — something Marion had brought with her from Phoenix — that he almost misses, and when he finally throws it into the car without checking what it is, the audience gasps because we know what's inside it. What is that object, and what is wrapped inside it?",
          hint: "Marion had taken something from her office in Phoenix. She wrapped it in an everyday item to hide it.",
          rubric:
            "A correct answer must identify the object as a NEWSPAPER (folded/wrapped newspaper) and the contents as the $40,000 (cash / money / the stolen money). Either element on its own earns partial credit. The resonance is that Norman treats the newspaper as trash, not realizing it contains the film's original MacGuffin — a brilliant bit of Hitchcockian misdirection that rewards viewers specifically. Reject answers about the shower curtain, the knife, or the car itself.",
          acceptedAnswers: [
            "newspaper",
            "money in newspaper",
            "40000 in newspaper",
            "cash wrapped in newspaper",
          ],
        },
        analysis: {
          writing:
            "Joseph Stefano's screenplay is a magic trick in two acts. Act one: a first-rate 1950s crime film about a woman running with stolen money — every scene points forward to her destination. Act two: that film is violently aborted and we are handed a horror story with a new protagonist, the killer himself. The genius is that the money — the entire engine of act one — is never recovered. Hitchcock and Stefano trained the audience to care about a MacGuffin and then literally threw it in a swamp. Lesson: plot is a distraction; character obsession is the story.",
          directing:
            "Hitchcock shot the film in 30 days on a TV-production budget with his 'Alfred Hitchcock Presents' television crew, deliberately using cheap black-and-white to make the shower blood readable (red would have been censored). The direction is clinical: the Bates Motel is blocked like a stage, the house on the hill is blocked like a haunted painting, and the cuts between Marion and Norman in the parlor scene are done as mirrored portraits — two trapped people, two taxidermied lives.",
          cinematography:
            "John L. Russell shoots the whole film in tight, constricting frames — doorways, windows, mirrors, the shower curtain. Watch for mirrors: Norman is almost always reflected, doubled, cut in half. The famous overhead shot of the staircase descent breaks the entire visual language of the film on purpose — it's the moment we have to stop identifying with any character and become pure observer.",
          editing:
            "George Tomasini cut the shower scene — 78 camera setups, 52 cuts, 45 seconds. Study it frame by frame. You never once see the knife touch Marion's body. The violence is entirely constructed in your head by the editing rhythm. It is the greatest demonstration of the Kuleshov effect in sound cinema.",
          sound:
            "Hitchcock originally wanted no music for the shower scene. Bernard Herrmann submitted the strings-only score anyway, and Hitchcock doubled his fee. The shrieking violin stabs are inseparable from the image now — but the real genius is the rest of the score, which uses the same all-strings palette to make the entire film feel skinless, nerve-exposed, unable to hide.",
          performance:
            "Anthony Perkins as Norman Bates is the reason this film is not just a horror movie. Every mannerism — the stammer, the candy corn, the hand-wringing, the smile that arrives a half-second too late — was his invention. Janet Leigh's Marion is also underrated: she plays a woman whose entire body language shifts the moment she steals the money, and again when she decides to return it. She is killed the moment she decides to be good.",
        },
        extras: [
          {
            label: "Watch next",
            note: "The Birds (1963) — Hitchcock's other 'pure sensation' film, about nature going feral for no given reason",
          },
          {
            label: "Scene to rewatch",
            note: "The parlor scene between Marion and Norman — no score, no cuts away, just two people sitting across from each other in the last ten minutes of her life",
          },
          {
            label: "Read",
            note: "Stephen Rebello, 'Alfred Hitchcock and the Making of Psycho' — the production story is as wild as the film",
          },
        ],
        order: 3,
        accent: "sage",
      },
    ],
  },
];

export function getDirector(slug: string): Director | undefined {
  return directors.find((d) => d.slug === slug);
}

export function getFilm(
  directorSlug: string,
  filmSlug: string
): { director: Director; film: Film } | undefined {
  const director = getDirector(directorSlug);
  if (!director) return undefined;
  const film = director.films.find((f) => f.slug === filmSlug);
  if (!film) return undefined;
  return { director, film };
}
