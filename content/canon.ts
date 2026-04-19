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
  requires?: string;
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
  {
    slug: "kubrick",
    name: "Stanley Kubrick",
    lifespan: "1928 – 1999",
    era: "1953 – 1999",
    role: "The obsessive",
    quote:
      "A film is — or should be — more like music than like fiction. It should be a progression of moods and feelings.",
    why: "Kubrick is the one who taught cinema to be serious again — not heavy, but *ambitious*. He made every film a total work: the script, the music, the lens, the performance, the room, the wallpaper, the one-point symmetrical composition. He did a hundred takes not because he couldn't see the answer, but because he wanted the actor to stop acting. Every Kubrick film is a genre hijacked and transformed — horror, war, sci-fi, costume drama — into something private, cold, and permanent.",
    signatureMoves: [
      "One-point perspective — the corridor, the hallway, the centerline",
      "Slow reverse zoom — the world pulling away from a face",
      "Zero sentimentality — never tells you how to feel, the music tells you",
      "Music as narrative device — classical or pop in deadly-serious counterpoint",
      "Hundred-take coverage — wearing the performance down to the real one",
      "Genre as vessel — never just a horror film, never just a war film",
    ],
    portrait:
      "He was a Bronx chess player who wandered into photography, then into film, and never left. He moved to England and never moved again. He made only thirteen features in forty-six years and every one bent its genre. Polite crews hated him. The ones who stayed called it the best work of their lives. He is the bridge between classical Hollywood craftsmanship and the modern auteur — the last director who still believed a single frame could be a thesis statement, and the first who had the technology to prove it.",
    order: 2,
    requires: "hitchcock",
    films: [
      {
        slug: "2001",
        title: "2001: A Space Odyssey",
        year: 1968,
        runtime: "2h 29m",
        whereToWatch: "Max, Apple TV, Amazon (rent)",
        tagline: "The film that made cinema ambitious again.",
        whyWatch:
          "You will want to quit this one forty minutes in. Don't. Kubrick is training you — training the speed at which you read a frame, the patience you'll need for the back half, the faith that every slow second is earning something. The most famous match cut in cinema happens at minute twenty. The most famous sequence in cinema history happens at minute ninety. Between them are forty minutes of space silence that most people never experience at scale. Watch it in one sitting. On the biggest screen you can. With headphones if you must. This is the film every sci-fi film since has been imitating badly.",
        gate: {
          question:
            "In the Dawn of Man sequence, an early hominid throws a bone weapon triumphantly into the air. The bone spins in slow motion against the sky and Kubrick cuts — the film's most famous cut — to what exact image? Be specific about what is shown in the next shot.",
          hint: "The cut jumps four million years in one frame. The new object is long, white, drifting in space.",
          rubric:
            "A correct answer must identify the next shot as an ORBITING SATELLITE (or 'bone-shaped satellite' or 'spacecraft orbiting Earth'). Extra credit if the viewer notes the shape of the satellite mirrors the bone (both long, white, weapons — Kubrick's implicit thesis that weapons are humanity's first and only invention). Partial credit for just 'a spaceship' or 'something in space.' Reject answers that say 'a monkey' or 'the monolith' or 'HAL' — these come from plot summary, not actual viewing of the cut.",
          acceptedAnswers: [
            "satellite",
            "orbiting satellite",
            "bone shaped satellite",
            "spacecraft in orbit",
            "weapon satellite",
          ],
        },
        analysis: {
          writing:
            "Arthur C. Clarke and Kubrick co-wrote the script and the novel at the same time, feeding drafts back and forth. The script's radical choice: almost no dialogue for the first 25 minutes and the last 25 minutes. The middle hour is procedural. The writing trusts the image so completely that when HAL 9000 is 'killed,' the scene gets the only extended monologue in the film — and it is *HAL's*, not a human's. The thesis: humans have stopped speaking meaningfully; the machine is the last one with a confession.",
          directing:
            "Kubrick directs in four distinct chapters, each with a different visual language: pre-history (earth tones, natural light), corporate space (white plastic, symmetrical), Jupiter mission (sterile cold blue, HAL's red eye), Star Gate (pure abstraction). Each chapter teaches you a new grammar, then abandons it. The film is a demonstration of how much visual information a human can absorb without a narrator.",
          cinematography:
            "Geoffrey Unsworth shoots with front-projection for the Dawn of Man — a technique Kubrick invented specifically for this film because rear-projection wasn't real enough. The centrifuge scenes use a 30-ton rotating set. The Star Gate sequence is shot with slit-scan photography, also invented for this film. Kubrick is the only director in history who will invent a new camera technique rather than use an existing one approximately.",
          editing:
            "The film's rhythm is *breathing*, not cutting. Shots are held two, three, five times longer than you expect. The average shot length is around 12 seconds — triple the modern blockbuster. Watch the pod-bay-door sequence: Kubrick will hold on HAL's red eye for 40 seconds of a real-time conversation. The editing IS the suspense, because you cannot look away and nothing is cutting you away.",
          sound:
            "There is no original score. Kubrick hired Alex North to write one, then dropped it entirely and used classical pieces he had been using as temp tracks. The Blue Danube Waltz over a space docking sequence is the film's most daring joke — everyone else would score space with soaring orchestras. Kubrick scores it with a waltz. Meaning: space travel is already mundane. The terror is what comes AFTER mundane.",
          performance:
            "Keir Dullea and Gary Lockwood were cast for their flatness. Kubrick rehearsed them out of acting. The most emotional performance in the film is HAL's — Douglas Rain's voice, recorded in one session, never on set. Kubrick's directive to Rain: 'Imagine you are a hotel concierge who knows the guest is about to die.' The emotionless intelligence that ends up being the only character who fears death is the thesis of the entire film.",
        },
        extras: [
          {
            label: "Watch next",
            note: "Solaris (Tarkovsky, 1972) — the Soviet response to 2001, the inverse argument",
          },
          {
            label: "Read",
            note: "Michel Chion, 'Kubrick's Cinema Odyssey' — the best single book on 2001",
          },
          {
            label: "Scene to rewatch",
            note: "The Dawn of Man into satellite match cut — watch it five times in a row",
          },
        ],
        order: 1,
        accent: "lavender",
      },
      {
        slug: "the-shining",
        title: "The Shining",
        year: 1980,
        runtime: "2h 26m",
        whereToWatch: "Max, Apple TV, Amazon (rent)",
        tagline: "A haunted house that is also a mind.",
        whyWatch:
          "Forget that it's a horror film. Watch it as architecture. The Overlook Hotel is not a setting — it's the real protagonist, and Kubrick uses the Steadicam (then brand new) to make you walk its hallways the way its residents do. Every frame is a trap. Carpets have patterns that change between shots. Rooms exist in floor plans that can't physically exist. Kubrick's rule was that the hotel itself should be wrong, and you should feel it before you can articulate it. Stephen King hated this adaptation because Kubrick refused to write a ghost story. He wrote a film about a family that is already broken walking into a building that finishes the job.",
        gate: {
          question:
            "During the film, Wendy discovers what Jack has actually been typing on his novel for weeks. She pulls out a single sheet and then flips through hundreds more. Every page is filled with what — and in what form?",
          hint: "It's one sentence. It's the same sentence. But the presentation changes from page to page.",
          rubric:
            "A correct answer must include BOTH (a) the exact (or very close) sentence 'All work and no play makes Jack a dull boy' AND (b) the observation that it is REPEATED (hundreds of pages / every page / thousands of times / filling every sheet). Partial credit for just the sentence, or just noting that it's repeated without the sentence. Extra credit for noting that the FORMATTING varies (centered, indented, typos, justified into columns). Reject answers that just describe 'a weird novel' — the specific sentence and the repetition are the two viewer-only details.",
          acceptedAnswers: [
            "all work and no play",
            "all work and no play makes jack a dull boy",
            "dull boy",
            "same sentence repeated",
          ],
        },
        analysis: {
          writing:
            "Kubrick and Diane Johnson rewrote King's novel as a film about a man who was already broken before he arrived. Jack Torrance in the book is a recovering alcoholic being worked on by malevolent spirits. Jack in the film is already the monster; the hotel just gives him permission. Every King scare sequence was either cut or reframed. The script's hardest choice: the Room 237 scene is never explained. King wrote an explanation. Kubrick refused to film it.",
          directing:
            "Kubrick uses the Steadicam — invented three years earlier by Garrett Brown — to treat the hotel as a continuous space that cannot be mapped. Watch Danny on his trike: we glide behind him through corridors that couldn't possibly connect. Watch the camera pass a doorway and reveal a room that wasn't there before. The cinematic grammar is: the hotel is lying to you, and the camera is its accomplice.",
          cinematography:
            "John Alcott shoots in high-key fluorescent lighting — the opposite of horror's default. Bright, flat, institutional. The Overlook looks like a hospital, a mall, a parking garage. Kubrick's thesis: true horror is not in shadow but in the *cheap ballroom lighting* of American leisure. The red bathroom, the gold ballroom, the blue bedroom — each set is color-coded to flatten you.",
          editing:
            "Ray Lovejoy cuts with deliberate impossibility. The famous shot of Jack typing, then cutting to Wendy approaching — there's a geographic error built into every cut. Things don't line up. You notice it unconsciously. This IS the film's point: the hotel cannot be a continuous space because time isn't continuous inside it. 'You've always been the caretaker, Mr. Torrance.'",
          sound:
            "Kubrick uses Penderecki, Ligeti, Bartók — 20th-century concert-hall music most audiences had never heard. The score is atonal, dissonant, modernist. Horror films of the era used traditional orchestral scares. Kubrick uses the sound of *the avant-garde* — music that already sounded like madness to 1980 audiences — to score a haunted hotel. The music is telling you: this is not a ghost story. This is the 20th century looking back at you.",
          performance:
            "Kubrick ran Shelley Duvall through 127 takes of the staircase scene. She was genuinely traumatized. Critics who see cruelty should watch the result: Wendy's terror is real, not performed, which is what Kubrick wanted and what makes the film permanent. Jack Nicholson is famously 'too big' — but the biggness is the point. He's playing a man desperately trying to be a writer, a father, a husband, and failing at all three. The cartoon villain face appears only after he's been released into it. Scatman Crothers' Dick Hallorann is the film's moral center precisely because he has no arc — he is good, he arrives, he dies.",
        },
        extras: [
          {
            label: "Watch next",
            note: "Room 237 (2012) — a documentary of fan theories about the film, itself a teaching object",
          },
          {
            label: "Read",
            note: "The Making of The Shining (Vivian Kubrick's on-set documentary) — 35 minutes, on YouTube, the best behind-the-scenes doc ever made",
          },
          {
            label: "Scene to rewatch",
            note: "Danny's trike ride through the hallways — note the carpet pattern changing",
          },
        ],
        order: 2,
        accent: "blush",
      },
      {
        slug: "dr-strangelove",
        title: "Dr. Strangelove",
        year: 1964,
        runtime: "1h 35m",
        whereToWatch: "Max, Apple TV, Amazon (rent)",
        tagline: "The funniest film ever made about the end of the world.",
        whyWatch:
          "Kubrick started writing this as a serious thriller about nuclear brinkmanship and realized halfway through that the only truthful version was a comedy. The plot is: a rogue US general starts World War III, and the bureaucracy of preventing it is too funny to survive. Every frame is a joke. Every joke is a documentary. Peter Sellers plays three roles. George C. Scott gives the greatest physical comedy performance in any war film. Slim Pickens rides a nuclear bomb down to the ground screaming like a rodeo cowboy. And all of it is shot in immaculate black-and-white wide-angle, as if it were Paths of Glory. The form is the joke: Kubrick filmed a Stanley Kubrick war film, and it turns out to be a sketch comedy.",
        gate: {
          question:
            "At the climax of the film, the failsafe has failed and one American B-52 is about to drop a nuclear bomb. The bomb bay opens — but the release mechanism is jammed. Major Kong (Slim Pickens) manually climbs onto the bomb to fix it. When the bomb finally releases and falls toward Russia, what is Kong physically DOING on top of it, and what is he wearing on his head?",
          hint: "He is having the time of his life. It's the most American image in the film.",
          rubric:
            "A correct answer must include BOTH (a) that Kong is RIDING the bomb like a cowboy / rodeo rider / straddling it / whooping as it falls AND (b) that he is wearing a COWBOY HAT (or Stetson / ten-gallon hat). Partial credit for just one element. Reject answers that only describe 'he falls with the bomb' — the cowboy ride + hat + whooping is unmistakable viewer-only detail. This is arguably the most famous image in the entire film.",
          acceptedAnswers: [
            "riding the bomb",
            "cowboy hat",
            "stetson",
            "rodeo",
            "straddling the bomb",
            "whooping on the bomb",
          ],
        },
        analysis: {
          writing:
            "Terry Southern, Peter George, and Kubrick wrote a script in which every name is a sex joke (Jack D. Ripper, Buck Turgidson, Merkin Muffley, Dr. Strangelove) and every bureaucratic scene is filmed in stone seriousness. The thesis is that the rational language of the Cold War IS obscenity if you listen closely. The script never winks — every character believes they are in a drama. The humor comes entirely from the audience recognizing the absurdity the characters are trapped inside.",
          directing:
            "Kubrick directs three simultaneous movies and lets them crash into each other: the B-52 scenes (documentary procedural), the War Room (Kafka geometric), the General Ripper scenes (noir claustrophobia). Each set has its own lens, light, and performance style. The editing between them creates the film's deepest joke: these three worlds are trying to communicate and failing at every level.",
          cinematography:
            "Gilbert Taylor shoots in hard black-and-white with extreme wide-angle lenses in the War Room — making the huge table and tiny men look absurdly off-scale. Kubrick had Ken Adam design the War Room as a half-black ceiling with hidden lighting; the set became one of the most famous production designs in film history. Spielberg later said it was the greatest set ever built.",
          editing:
            "Anthony Harvey cuts like a comedy writer — beat, beat, beat, payoff. The famous pie fight ending was cut from the film because Kubrick felt a slapstick battle would undercut the final nuclear montage. The decision to end on the mushroom cloud montage scored to 'We'll Meet Again' — a decision made in the editing room, not in the script — is one of the greatest editorial choices in film history.",
          sound:
            "Laurie Johnson's score is military march — stately, heroic, patriotic. Over a nuclear apocalypse. The film's final-sequence choice of Vera Lynn's 'We'll Meet Again' — a WWII lullaby about reunion — played over footage of every nuclear test in history is the single most devastating sound-to-image mismatch ever achieved. You laugh, then you stop laughing, then you realize you've been laughing for 93 minutes at the exact thing the film is about.",
          performance:
            "Peter Sellers plays Mandrake, Muffley, and Strangelove — three wildly different men, three wildly different vocal and physical registers, in the same film with the same director. He was supposed to play Major Kong too (the bomb-riding cowboy) but broke his ankle; Slim Pickens took the role and improvised most of the cowboy bravado. George C. Scott is a miracle: Kubrick asked him to do 'too big' takes as a joke, then used those takes in the final cut without telling him. Scott was furious. He was also giving one of the ten greatest comedic performances in film history.",
        },
        extras: [
          {
            label: "Watch next",
            note: "Fail Safe (1964) — the serious nuclear thriller released the same year, doing what Dr. Strangelove refused to",
          },
          {
            label: "Read",
            note: "Terry Southern, 'Strangelove Outtake: Notes from the War Room' — the comic writer's production diary",
          },
          {
            label: "Scene to rewatch",
            note: "Muffley's phone call to the Soviet Premier — Sellers holding one end of a conversation like a sketch actor",
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
