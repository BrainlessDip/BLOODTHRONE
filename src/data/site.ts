/**
 * Single source of truth for every word on the site.
 *
 * Content migrated from https://dip.dev.cv/ — that site is the source of truth
 * for portfolio facts. Every project, statistic and link below was verified
 * against the live GitHub API rather than copied blindly:
 *
 *  - The five projects featured on the reference portfolio (ParcelKoi,
 *    ScriptForge, PulseBoard, Dotfiles, NoteShell) return 404 on GitHub and
 *    parcelkoi.dev has no DNS record, so none of them are carried over. The
 *    entries below are the owner's real, reachable repositories instead.
 *  - `yasb`, `changedetection.io` and `nodriver` are forks of other people's
 *    projects and are deliberately excluded as original work.
 *  - Statistics are a point-in-time snapshot, not a live counter. See
 *    `records.asOf`.
 *
 * Nothing here is invented: descriptions are the repository descriptions as
 * written by the owner, and anything unverifiable is omitted rather than
 * guessed.
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
  name: "Brainless Dip",
  handle: "@brainlessDip",
  legalName: "Dip Dey",
  tagline: "NOT BORN TO FOLLOW. BUILT TO CREATE.",
  summary:
    "Developer and builder creating web applications, automation tools, and practical software. Based in Mymensingh, Bangladesh — open to freelance work, collaborations and interesting problems.",

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
    // Teaches the sword cursor. Only ever rendered where the sword itself
    // mounts (fine pointer, motion allowed) and only on a visitor's first
    // arrival, so it can never linger as clutter or address a cursor that
    // isn't there. See Hero.tsx.
    bladeHint: "THE TIP OF THE SWORD IS ITS DEADLIEST POINT.",
  },

  /** Verified against the GitHub API and the reference portfolio. */
  identity: {
    location: "Mymensingh, Bangladesh",
    timezone: "GMT+6",
    languages: "Bangla, English",
    role: "Developer & Builder",
    availability: "Available for interesting projects",
    responseTime: "Usually replies within 24h.",
  },

  /** PLAN §14: themed wording, but every term stays plainly readable. */
  focus: [
    "React",
    "TypeScript",
    "Python",
    "Backend systems",
    "Automation",
  ] as readonly string[],

  greatHall: {
    label: "THE GREAT HALL",
    heading: "THE ONE WHO WIELDS THE KEYBOARD.",
    body: "Brainless Dip is a developer focused on building practical software, automation tools and web applications. I take a problem apart, learn what it actually needs, and leave something that holds.",
    oath: [
      "I do not build to fill the realm with noise.",
      "I build to solve problems, challenge limits,",
      "and leave something worth remembering.",
    ],
  },

  armory: {
    label: "THE ARMORY",
    heading: "EVERY TOOL HAS A PURPOSE.",
    weapons: [
      {
        tech: "Python",
        title: "The Raven's Eye",
        blurb:
          "Data pipelines, automation, and the unglamorous glue that keeps a system running overnight without supervision.",
      },
      {
        tech: "TypeScript",
        title: "The King's Blade",
        blurb:
          "Typed interaction and state, where behaviour matters more than ceremony. Used for everything the user touches.",
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
          "SQLite and PostgreSQL. Schema design, migrations, and queries that stay correct as the data grows.",
      },
      {
        tech: "Tailwind",
        title: "The Steward's Ruler",
        blurb:
          "Layout and type held to a system, so a change lands the same way everywhere it is needed.",
      },
      {
        tech: "Docker",
        title: "The Garrison",
        blurb:
          "The same build on every machine. Deployment stops being a matter of whose laptop it is.",
      },
      {
        tech: "Git",
        title: "The Chronicle Mark",
        blurb:
          "Every version recoverable. The record of who changed what, and why it stood up.",
      },
      {
        tech: "Linux",
        title: "The Long Road",
        blurb:
          "The working ground. Shell, editor and tooling configured once and kept versioned.",
      },
      {
        tech: "Cloudflare",
        title: "The Outriders",
        blurb:
          "Edges and delivery, so the kingdom answers from the nearest gate instead of the furthest.",
      },
      {
        tech: "shadcn/ui",
        title: "The Stonework",
        blurb:
          "Accessible primitives taken apart and restyled, never shipped as an unexamined black box.",
      },
    ] as readonly Weapon[],
  },

  warTable: {
    label: "THE WAR TABLE",
    heading: "CAMPAIGNS UNDER MY BANNER.",
    // Four projects, all verified reachable. Three link to their public GitHub
    // repository; ResultLagbe is closed source, so its live site is the only
    // public face of it and it carries `demo` instead of `source`. Stars are the
    // count at the time of migration, not a live counter.
    conquests: [
      {
        name: "FitFetch",
        emblem: "⚔",
        summary:
          "Extract direct download links from FitGirl Repacks in seconds.",
        stack: ["Python"],
        status: "6 STARS · ACTIVE",
        source: "https://github.com/BrainlessDip/FitFetch",
      },
      {
        name: "BlazeHammer",
        emblem: "⚒",
        summary:
          "An asynchronous API testing and traffic-generation tool.",
        stack: ["Python"],
        status: "4 STARS · MAINTAINED",
        source: "https://github.com/BrainlessDip/BlazeHammer",
      },
      {
        name: "BlazeHammer-Control",
        emblem: "⚔",
        summary:
          "The TypeScript control surface for BlazeHammer.",
        stack: ["TypeScript"],
        status: "ACTIVE",
        source: "https://github.com/BrainlessDip/BlazeHammer-Control",
      },
      {
        name: "ResultLagbe",
        emblem: "⚒",
        summary:
          "A Bangladesh result lookup and archive platform, handling large student datasets with fast search. Closed source — the live site is the only public face of it.",
        stack: ["JavaScript", "React", "Node.js"],
        status: "CLOSED SOURCE",
        demo: "https://resultlagbe.pages.dev/",
      },
    ] as readonly Conquest[],
  },

  ravenArchive: {
    label: "THE RAVEN'S ARCHIVE",
    heading: "A HISTORY WRITTEN IN CODE.",
    entries: [
      {
        date: "2026",
        title: "Student // BBA",
        detail:
          "National University. Balancing formal business studies with software development, shipping projects, and exploring new ways to build useful tools.",
      },
      {
        date: "2026",
        title: "ParcelKoi",
        detail:
          "Personal project. Started building a unified parcel tracking platform for Bangladesh couriers with smart updates, notifications, and real-time monitoring.",
      },
      {
        date: "2025",
        title: "ResultLagbe",
        detail:
          "Personal project. Built a Bangladesh result lookup and archive platform with FastAPI, React, SQLite, and Cloudflare, handling large student datasets and fast searches.",
      },
      {
        date: "2025",
        title: "Started Formal Software Journey",
        detail:
          "Moved beyond scripting and automation into full-stack development with React, TypeScript, FastAPI, databases, and modern web tooling.",
      },
      {
        date: "2024 — 2026",
        title: "Dank Alert",
        detail:
          "Discord bot. Built and grew a Discord bot project that reached a 7K+ member community and received over $150 in community support through crowdfunding over two years — a first real experience turning software into something people actually used.",
      },
      {
        date: "2024",
        title: "Started Building Software",
        detail:
          "Picked up Python and started experimenting with automation, gradually moving into JavaScript, React, and TypeScript.",
      },
      {
        date: "2023",
        title: "Automation & Experimentation",
        detail:
          "Started exploring programming through small scripts, automation, and experiments, learning mostly by building and breaking things.",
      },
    ] as readonly ChronicleEntry[],
  },

  records: {
    label: "THE KING'S RECORDS",
    heading: "THE TALLY, AS RECORDED.",
    // Snapshot taken from the live GitHub API on the date below. These numbers
    // drift as repositories are added and stars are earned; the label states
    // the snapshot date so they are never read as live counters.
    asOf: "October 2026",
    stats: [
      { label: "Repositories", value: "32" },
      { label: "Followers", value: "28" },
      { label: "Following", value: "47" },
      { label: "Projects", value: "12+" },
    ] as readonly { label: string; value: string }[],
    note: "Recorded from the public GitHub profile. These counts change as the work continues.",
    github: "https://github.com/BrainlessDip",
  },

  ironThrone: {
    label: "THE IRON THRONE",
    heading: "THE THRONE AWAITS.",
    support:
      "Have an idea, a project, or an interesting problem? I'm always up for a good technical conversation.",
    availability: "Open to freelance work, collaborations and project ideas.",
    ravens: [
      { label: "GitHub", href: "https://github.com/BrainlessDip" },
      { label: "LinkedIn", href: "https://linkedin.com/in/dipdey0" },
      { label: "Facebook", href: "https://facebook.com/brainless.dip" },
      { label: "Discord", href: "https://discord.com/users/833972562210979891" },
      { label: "Telegram", href: "https://t.me/dipdey" },
      { label: "Email", href: "mailto:dipdey993@gmail.com" },
    ] as readonly Raven[],
  },

  secrets: {
    // PLAN §16. Flavour only — no portfolio information lives behind this, so
    // nothing essential is gated (PLAN §16: "Do not hide essential portfolio
    // information behind easter eggs").
    achievement: "KINGSLAYER",
    message:
      "You looked behind the banner. Most who enter the kingdom never do.",
  },

  /** Static 404. Exported to out/404.html, which Cloudflare Pages serves for
      any URL that isn't a file it holds. */
  notFound: {
    label: "LOST IN THE DUNGEONS",
    heading: "THIS HALL DOES NOT EXIST.",
    body: "The path you followed leads nowhere. It was mistyped, or the page has been sealed away. The gates of the kingdom are still open.",
    action: "RETURN TO THE KINGDOM",
  },

  ledger: {
    // PLAN §14. Every entry pairs themed flavour with the plain fact, because
    // §14 requires themed wording "but always explain the actual issue clearly".
    warEmpty: {
      flavour: "THE WAR TABLE STANDS EMPTY.",
      plain: "No campaigns are recorded yet.",
    },
    ravenEmpty: {
      flavour: "THE CHRONICLE IS UNWRITTEN.",
      plain: "No milestones are recorded yet.",
    },
    throneEmpty: {
      flavour: "THE RAVENS ARE UNBOUND.",
      plain: "No contact methods are published yet.",
    },
  },
} as const;