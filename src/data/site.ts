/**
 * Single source of truth for every word on the site.
 *
 * PLAN §8 and §9 forbid inventing projects, clients, awards or employment
 * history. Everything below that is not already supplied in STACK.MD is a
 * marked placeholder for the owner to replace before launch.
 */

export type Weapon = {
  readonly tech: string;
  readonly title: string;
  readonly blurb: string;
};

export type Conquest = {
  readonly name: string;
  readonly emblem: string;
  readonly summary: string;
  readonly stack: readonly string[];
  readonly status: string;
  readonly demo?: string;
  readonly source?: string;
};

export type ChronicleEntry = {
  readonly date: string;
  readonly title: string;
  readonly detail: string;
};

export type Raven = {
  readonly label: string;
  readonly href: string;
};

export const site = {
  // TODO(owner): replace with the real name or handle.
  name: "Dip",
  tagline: "NOT BORN TO FOLLOW. BUILT TO CREATE.",
  summary:
    "Developer and builder. I take a problem apart, learn what it actually needs, and leave something that holds.",

  opening: {
    label: "PRIVATE REALM",
    lines: ["THE REALM IS AWAKE.", "THE GATES ARE OPENING."],
  },

  hero: {
    actions: [
      { label: "ENTER THE KINGDOM", href: "#great-hall", primary: true },
      { label: "VIEW MY CONQUESTS", href: "#war-table", primary: false },
    ],
    scrollHint: "SCROLL",
  },

  greatHall: {
    label: "THE GREAT HALL",
    heading: "THE ONE WHO WIELDS THE KEYBOARD.",
    // TODO(owner): replace with the real introduction.
    body: "I build software the way a siege works: quiet, patient, and aimed at exactly one wall. I write code that holds when the rest of it is burning, and I would rather ship one thing properly than a hundred things quietly.",
    oath: [
      "I do not build to fill the realm with noise.",
      "I build to solve problems, challenge limits,",
      "and leave something worth remembering.",
    ],
  },

  armory: {
    label: "THE ARMORY",
    heading: "EVERY TOOL HAS A PURPOSE.",
    // Tech list and titles come from STACK.MD §7 / PLAN §7.
    // Blurbs are written to describe real capability, not proficiency scores.
    // TODO(owner): correct any weapon title or blurb that misrepresents experience.
    weapons: [
      {
        tech: "Python",
        title: "The Raven's Eye",
        blurb:
          "Data pipelines, automation, and the unglamorous glue that keeps a system running overnight without supervision.",
      },
      {
        tech: "JavaScript",
        title: "The King's Blade",
        blurb:
          "The first weapon drawn. Used where behaviour matters more than ceremony — interaction, state, and everything the user touches.",
      },
      {
        tech: "React",
        title: "The Architect's Shield",
        blurb:
          "Composition and state that survive contact with real requirements. Built to be changed, not admired.",
      },
      {
        tech: "Node.js",
        title: "The Warhorse",
        blurb:
          "Carries the load between client and crown. APIs, auth boundaries, and services that stay up when traffic spikes.",
      },
      {
        tech: "FastAPI",
        title: "The Iron Gate",
        blurb:
          "Typed, documented endpoints that answer fast and refuse bad input at the threshold.",
      },
      {
        tech: "SQL",
        title: "The Royal Archives",
        blurb:
          "The memory of the realm. Schema design, migrations, and queries that stay correct as the data grows.",
      },
    ] as readonly Weapon[],
  },

  warTable: {
    label: "THE WAR TABLE",
    heading: "CAMPAIGNS UNDER MY BANNER.",
    // TODO(owner): add real projects. PLAN §8 forbids inventing them.
    conquests: [] as readonly Conquest[],
  },

  ravenArchive: {
    label: "THE RAVEN'S ARCHIVE",
    heading: "A HISTORY WRITTEN IN CODE.",
    // TODO(owner): add real milestones. PLAN §9 forbids inventing employment,
    // clients, awards or accomplishments.
    entries: [] as readonly ChronicleEntry[],
  },

  ironThrone: {
    label: "THE IRON THRONE",
    heading: "THE THRONE AWAITS.",
    support: "Every great alliance begins with a conversation.",
    // TODO(owner): add real contact links. PLAN §10 requires real methods only.
    ravens: [] as readonly Raven[],
  },

  secrets: {
    // PLAN §16. Flavour only — no portfolio information lives behind this, so
    // nothing essential is gated (PLAN §16: "Do not hide essential portfolio
    // information behind easter eggs").
    achievement: "KINGSLAYER",
    message:
      "You looked behind the banner. Most who enter the kingdom never do.",
  },

  ledger: {
    // PLAN §14. Every entry pairs themed flavour with the plain fact, because
    // §14 requires themed wording "but always explain the actual issue clearly".
    warEmpty: {
      flavour: "THE WAR TABLE STANDS EMPTY.",
      plain: "No campaigns are recorded yet. Add them to warTable.conquests.",
    },
    ravenEmpty: {
      flavour: "THE CHRONICLE IS UNWRITTEN.",
      plain: "No milestones are recorded yet. Add them to ravenArchive.entries.",
    },
    throneEmpty: {
      flavour: "THE RAVENS ARE UNBOUND.",
      plain: "No contact methods are published yet. Add them to ironThrone.ravens.",
    },
  },
} as const;
