"use client";

import { useEffect, useRef, useState } from "react";
import { RoyalSigil } from "@/components/sigil/RoyalSigil";
import { site } from "@/data/site";

const CLICKS_TO_OPEN = 3;
const RESET_AFTER = 3000;

/**
 * PLAN §16 — hidden secret.
 *
 * Pressing the sigil three times unlocks the KINGSLAYER note. It gates flavour
 * only: no project, skill or contact detail is reachable solely through it
 * (PLAN §16 forbids hiding essential portfolio information behind easter eggs).
 *
 * A real <button>, so Enter and Space work without extra key handling, and the
 * unlock is announced via aria-live rather than being purely visual.
 */
export function SigilSecret() {
  const [taps, setTaps] = useState(0);
  const [open, setOpen] = useState(false);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetRef.current) clearTimeout(resetRef.current);
    },
    [],
  );

  const onPress = () => {
    if (open) return;

    const next = taps + 1;
    if (next >= CLICKS_TO_OPEN) {
      setOpen(true);
      return;
    }

    setTaps(next);
    if (resetRef.current) clearTimeout(resetRef.current);
    resetRef.current = setTimeout(() => setTaps(0), RESET_AFTER);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={onPress}
        aria-label={
          open
            ? "Sigil of House Bloodthrone, seal broken"
            : "Sigil of House Bloodthrone"
        }
        className="cursor-pointer bg-transparent p-0 transition-transform duration-200 ease-[var(--ease-blade)] active:scale-95"
      >
        <RoyalSigil
          size="lg"
          className={open ? "[&_circle]:fill-blood-300" : undefined}
        />
      </button>

      <div aria-live="polite" className="flex flex-col items-center gap-2">
        {open ? (
          <>
            <span
              className="label-herald"
              style={{ color: "var(--color-blood-300)" }}
            >
              {site.secrets.achievement}
            </span>
            <p
              className="prose-throne text-center text-sm"
              style={{ color: "var(--color-steel-400)" }}
            >
              {site.secrets.message}
            </p>
          </>
        ) : (
          <span className="h-5" />
        )}
      </div>
    </div>
  );
}