"use client";

import { useEffect, useState } from "react";

/**
 * Resolves true only for devices that can actually carry the sword cursor:
 * a fine pointer (mouse/trackpad, not touch) with no reduced-motion request.
 * Anything else keeps the platform cursor and full focus rings.
 */
export function useBladePointer(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const sync = () => setEnabled(fine.matches && calm.matches);

    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  return enabled;
}
