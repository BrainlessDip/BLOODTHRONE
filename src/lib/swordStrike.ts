/**
 * Strike bus — lets a Sentence of Death hand a target rect to the sword cursor
 * and be called back at the exact frame the blade crosses it.
 *
 * A plain module singleton rather than context or props: the cursor is mounted
 * once in `page.tsx` while strikes originate in buttons nested arbitrarily deep,
 * so threading a callback down would mean touching both trees for no gain.
 */

export type StrikeTarget = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type StrikeRequest = {
  /** Viewport rect of the thing being severed — the cursor is `fixed`. */
  target: StrikeTarget;
  /** Fired mid-sweep, when the blade is over the target. */
  onImpact: () => void;
};

type StrikeHandler = (request: StrikeRequest) => void;

let handler: StrikeHandler | null = null;

/** Subscribe the sword. Returns an unsubscribe for the effect cleanup. */
export function onStrike(next: StrikeHandler): () => void {
  handler = next;
  return () => {
    if (handler === next) handler = null;
  };
}

/**
 * Ask the sword to cut `target`. Returns false when no sword is mounted —
 * coarse pointers and reduced motion — so the caller can fall back to running
 * its own timeline rather than waiting forever on an `onImpact` that never lands.
 */
export function requestStrike(request: StrikeRequest): boolean {
  if (!handler) return false;
  handler(request);
  return true;
}