"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { playSlash } from "@/lib/bladeSlash";
import { requestStrike } from "@/lib/swordStrike";

type Props = {
  href: string;
  children: string;
  className?: string;
  /**
   * The severed halves own every painted pixel — background, border and text —
   * so the anchor itself stays transparent. That is why the palette arrives as
   * values rather than Tailwind classes: a `!bg-*` class would repaint the
   * anchor and leave an intact button behind the falling halves.
   */
  skin?: { bg?: string; border?: string; fg?: string };
};

/** A CTA's life. `dead` is terminal and is never left. */
type Phase = "idle" | "executing" | "dead";

const BLOOD = {
  bg: "var(--color-blood-700)",
  border: "var(--color-blood-500)",
  fg: "var(--color-steel-100)",
} as const;

/** Half the label's baseline offset; enough to read as severed, not silly. */
const SPLIT = 9;
const TILT = 2.2;

/**
 * SENTENCE OF DEATH — PLAN §3.
 *
 * The whole button is drawn twice and clipped into complementary halves, so
 * background, border and text separate as one object rather than the text
 * alone. The copies are aria-hidden; the visible label carries the accessible
 * name. A strike is delegated to the sword cursor, which calls back at the frame
 * the blade lands — that callback is the only thing that starts the sever, so
 * sound, cut and separation can never drift apart.
 *
 * Once cut, the button is dead for the lifetime of the page: no re-entry to
 * `idle`, no hover replay, no second navigation. `prefers-reduced-motion` skips
 * the swing entirely and navigates at once — the animation is flavour, never the
 * mechanism (DESIGN.md §8).
 */
export function SentenceOfDeath({ href, children, className = "", skin }: Props) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");

  const rootRef = useRef<HTMLAnchorElement>(null);
  const upperRef = useRef<HTMLSpanElement>(null);
  const lowerRef = useRef<HTMLSpanElement>(null);
  const cutRef = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | undefined>(undefined);
  const phaseRef = useRef<Phase>("idle");

  const dead = phase === "dead";
  /* One flag for every post-click state, so the anchor stops taking pointer
     input the instant execution begins rather than only once it finishes. */
  const locked = phase !== "idle";

  const palette = skin ? { ...BLOOD, ...skin } : BLOOD;

  // DESIGN.md §6: revert on unmount so a strike interrupted by a route change
  // cannot keep tweening detached nodes.
  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
      timelineRef.current = undefined;
    };
  }, []);

  const go = useCallback(() => {
    if (href.startsWith("#")) {
      document
        .querySelector(href)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (/^https?:\/\//i.test(href)) {
      window.location.assign(href);
      return;
    }
    router.push(href);
  }, [href, router]);

  const execute = () => {
    // Ref-guarded as well as state-guarded: two activations inside one frame
    // would both read the stale "idle" state and both start a timeline.
    if (phaseRef.current !== "idle") return;

    const root = rootRef.current;
    const upper = upperRef.current;
    const lower = lowerRef.current;
    const cut = cutRef.current;
    const live = liveRef.current;

    if (!root || !upper || !lower || !cut || !live) return;

    phaseRef.current = "executing";
    setPhase("executing");

    // Reduced motion: no swing, no sound, no sever — go straight through.
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      phaseRef.current = "dead";
      setPhase("dead");
      go();
      return;
    }

    const sever = () => {
      /* The anchor repaints the whole button, so once the halves part it would show
         through the widening gap as an intact copy. Clearing only its background
         and border retires that copy without touching the halves: hiding the
         anchor outright would set `visibility`, which the halves inherit.
         The label is faded with plain opacity so it stays in the accessibility
         tree and the anchor keeps its name. */
      gsap.set(root, { backgroundColor: "rgba(0,0,0,0)", borderColor: "rgba(0,0,0,0)" });
      gsap.set(live, { opacity: 0 });

      timelineRef.current = gsap
        .timeline({
          onComplete: () => {
            timelineRef.current = undefined;
            phaseRef.current = "dead";
            setPhase("dead");
            go();
          },
        })
        .fromTo(
          cut,
          { scaleX: 0, opacity: 1 },
          { scaleX: 1, duration: 0.08, ease: "none" },
          0,
        )
        .to(
          [upper, lower],
          {
            y: (i) => (i === 0 ? -SPLIT : SPLIT),
            rotation: (i) => (i === 0 ? -TILT : TILT),
            duration: 0.2,
            ease: "power4.in",
          },
          0,
        )
        /* Cut line retracts to nothing, then is hidden outright. An eased fade
           would be the one soft edge on an otherwise hard bisect. */
        .set(cut, { opacity: 0 }, 0.1);
    };

    const rect = root.getBoundingClientRect();

    // No sword mounted (coarse pointer, or reduced motion already handled
    // above) would strand `sever`, so fall back to running it directly.
    const handled = requestStrike({
      target: {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      },
      onImpact: () => {
        // Sound rides the blade, not the click. playSlash swallows its own
        // failure, so a blocked AudioContext cannot cost us the strike.
        playSlash();
        sever();
      },
    });

    if (!handled) sever();
  };

  /* Pointer: the handler lives on the anchor only, so the clipped halves, the
     cut line and the label all bubble up to it and there is no second entry
     point to double-fire. Modified clicks fall through to the browser. */
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    execute();
  };

  /* Keyboard: Enter already activates a link and lands in onClick. Space does
     not — natively it scrolls the page — so it is handled here, with preventDefault
     for that scroll and `repeat` ignored so holding the key cannot re-fire. */
  const onKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key !== " " && event.key !== "Spacebar") return;
    event.preventDefault();
    if (event.repeat) return;
    execute();
  };

  const halfStyle = {
    backgroundColor: palette.bg,
    border: `1px solid ${palette.border}`,
    color: palette.fg,
  };

  return (
    <a
      ref={rootRef}
      href={href}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={dead ? -1 : undefined}
      aria-disabled={dead ? true : undefined}
      style={{ ...halfStyle }}
      className={`relative inline-flex items-center justify-center px-8 py-4 font-display text-sm uppercase tracking-[0.28em] transition-colors duration-200 ${
        locked ? "pointer-events-none" : ""
      } ${className}`}
    >
      {/* One clipped copy per half. `-inset-px` pulls each copy over the
          anchor's border box — matching the padding, the border and the
          centred label exactly — so the three layers are pixel-identical until
          the strike and the button reads as a single untouched object. */}
      <span
        ref={upperRef}
        style={{ ...halfStyle, clipPath: "inset(0 0 50% 0)", inset: "-1px" }}
        aria-hidden="true"
        className="pointer-events-none absolute flex items-center justify-center px-8 py-4"
      >
        {children}
      </span>

      <span
        ref={lowerRef}
        style={{ ...halfStyle, clipPath: "inset(50% 0 0 0)", inset: "-1px" }}
        aria-hidden="true"
        className="pointer-events-none absolute flex items-center justify-center px-8 py-4"
      >
        {children}
      </span>

      <span
        ref={cutRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 block h-px w-full origin-center scale-x-0"
        style={{ backgroundColor: "var(--color-blood-100)" }}
      />

      {/* Live copy. Sits above both halves, carries the accessible name, and is
          retired the instant the cut opens so no intact text sits behind. */}
      <span ref={liveRef} className="relative">
        {children}
      </span>
    </a>
  );
}