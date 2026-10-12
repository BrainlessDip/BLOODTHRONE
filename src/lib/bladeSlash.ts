/**
 * A single sword slash. PLAN §17.
 *
 * Plays the asset in `public/` rather than synthesising: a real blade sample
 * carries the transient and metallic ring that a filtered noise burst only
 * approximates. The element is created once, preloaded on import so the first
 * strike is not gated on a network round trip, and reset to zero on every play
 * so rapid calls restart rather than layer.
 *
 * Sound is flavour: every failure path returns false without throwing, so a
 * blocked autoplay policy or a failed fetch can never cost the strike.
 */

const SLASH_SRC = "/slash.mp3";

/** Restrained by design — the slash sits under the animation, not on top. */
const VOLUME = 0.45;

let audio: HTMLAudioElement | null = null;

function getAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!audio) {
    const el = new Audio();
    // preload before src so the fetch starts as soon as the module evaluates.
    el.preload = "auto";
    el.src = SLASH_SRC;
    el.volume = VOLUME;
    audio = el;
  }
  return audio;
}

if (typeof window !== "undefined") getAudio();

/** Fire the slash. Returns whether playback was requested. */
export function playSlash(): boolean {
  const el = getAudio();
  if (!el) return false;

  try {
    el.currentTime = 0;
    const started = el.play();
    // Autoplay policies reject this promise; that is expected and non-fatal.
    if (started && typeof started.catch === "function") {
      started.catch(() => {});
    }
    return true;
  } catch {
    return false;
  }
}