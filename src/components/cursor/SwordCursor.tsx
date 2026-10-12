"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useBladePointer } from "@/hooks/useBladePointer";
import { onStrike } from "@/lib/swordStrike";

const TRAIL_MAX = 18;
const SPLATTER_COUNT = 7;
const SPLATTER_CAP = 48;
/** Seconds for the blade to cross a target edge to edge. */
const SWEEP = 0.22;
/** Drops thrown when a Sentence of Death lands. Restrained on purpose. */
const STRIKE_SPLATTER = 9;

/**
 * The bloodied sword. Desktop fine-pointer only (see useBladePointer).
 *
 * Two pieces: a lagging blade that tracks the pointer and tilts with its
 * velocity, and a short blood trail on a capped canvas. Both are
 * pointer-events:none, so nothing here can ever intercept a click.
 */
export function SwordCursor() {
  const armed = useBladePointer();
  const bladeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!armed) return;

    const blade = bladeRef.current;
    const canvas = canvasRef.current;
    if (!blade || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const setX = gsap.quickTo(blade, "x", { duration: 0.16, ease: "power2.out" });
    const setY = gsap.quickTo(blade, "y", { duration: 0.16, ease: "power2.out" });
    const setTilt = gsap.quickTo(blade, "rotation", {
      duration: 0.35,
      ease: "power3.out",
    });

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let dx = 0;
    let dy = 0;

    type Drop = { x: number; y: number; age: number };
    const drops: Drop[] = [];

    let striking = false;
    let revealed = false;
    /* While a strike is sweeping, the blade is driven by the timeline rather
       than the pointer. Late pointermove events would otherwise yank it back
       mid-slash, so following is suspended until the strike resolves. */
    let slashActive = false;

    const onOver = () => {
      striking = true;
      setTilt(-34);
    };
    const onOut = () => {
      striking = false;
      setTilt(0);
    };

    const onMove = (event: PointerEvent) => {
      if (slashActive) return;

      if (!revealed) {
        revealed = true;
        gsap.set(blade, { opacity: 1 });
      }

      setX(event.clientX);
      setY(event.clientY);

      dx = event.clientX - lastX;
      dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;

      if (Math.hypot(dx, dy) > 2 && drops.length < TRAIL_MAX) {
        drops.push({ x: event.clientX, y: event.clientY, age: 0 });
      }
      if (!striking) setTilt(gsap.utils.clamp(-16, 16, dx * 1.6));
    };

    const onDown = (event: PointerEvent) => {
      gsap.fromTo(
        blade,
        { scale: 0.86, rotation: "-=22" },
        { scale: 1, rotation: "+=22", duration: 0.32, ease: "power4.out" },
      );

      for (let i = 0; i < SPLATTER_COUNT && drops.length < SPLATTER_CAP; i += 1) {
        drops.push({
          x: event.clientX + (Math.random() - 0.5) * 20,
          y: event.clientY + (Math.random() - 0.5) * 20 + 20,
          age: 0,
        });
      }
    };

    const splatterAt = (x: number, y: number, count: number) => {
      for (let i = 0; i < count && drops.length < SPLATTER_CAP; i += 1) {
        drops.push({
          x: x + (Math.random() - 0.5) * 26,
          y: y + (Math.random() - 0.5) * 18 + 14,
          age: 0,
        });
      }
    };

    /* A requested execution. The blade enters past one edge of the target and
       exits past the other, tilting as it goes; the target is called back at the
       halfway frame so its own sever starts exactly when the steel lands. */
    const runStrike = ({
      target,
      onImpact,
    }: {
      target: { left: number; top: number; width: number; height: number };
      onImpact: () => void;
    }) => {
      const cx = target.left + target.width / 2;
      const cy = target.top + target.height / 2;
      const reach = Math.max(target.width, target.height) / 2 + 96;

      slashActive = true;
      striking = false;
      revealed = true;

      gsap
        .timeline({
          onComplete: () => {
            slashActive = false;
            gsap.set(blade, { x: lastX, y: lastY, rotation: 0 });
            setTilt(0);
          },
        })
        .set(blade, {
          opacity: 1,
          x: cx - reach,
          y: cy + reach * 0.42,
          rotation: -96,
          scale: 1.25,
        })
        .call(
          () => {
            onImpact();
            splatterAt(cx, cy, STRIKE_SPLATTER);
          },
          [],
          SWEEP / 2,
        )
        .to(
          blade,
          {
            x: cx + reach,
            y: cy - reach * 0.42,
            rotation: 96,
            scale: 1.25,
            duration: SWEEP,
            ease: "power2.in",
          },
          0,
        )
        .to(blade, { scale: 1, duration: 0.22, ease: "power2.out" });
    };

    const unsubscribe = onStrike(runStrike);

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = drops.length - 1; i >= 0; i -= 1) {
        const drop = drops[i];
        drop.age += 1;
        if (drop.age > TRAIL_MAX) {
          drops.splice(i, 1);
          continue;
        }
        const fade = 1 - drop.age / TRAIL_MAX;
        ctx.globalAlpha = fade * 0.5;
        ctx.fillStyle = "oklch(0.45 0.163 21)";
        ctx.beginPath();
        ctx.arc(
          drop.x * dpr,
          drop.y * dpr + 22 * dpr,
          (1.6 + (TRAIL_MAX - drop.age) * 0.12) * dpr,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);
    gsap.ticker.add(frame);

    return () => {
      gsap.ticker.remove(frame);
      unsubscribe();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
      window.removeEventListener("resize", resize);
      gsap.killTweensOf(blade);
    };
  }, [armed]);

  if (!armed) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] h-full w-full"
      />
      <div
        ref={bladeRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] opacity-0 will-change-transform"
      >
        <svg width="34" height="58" viewBox="0 0 34 58" fill="none">
          <path
            d="M17 0L20 14V38L17 46L14 38V14Z"
            fill="oklch(0.78 0.008 250)"
            stroke="oklch(0.95 0.005 250)"
            strokeWidth="1"
          />
          <path d="M17 6V40" stroke="oklch(0.47 0.168 21)" strokeWidth="2" />
          <path d="M9 40H25" stroke="oklch(0.64 0.009 250)" strokeWidth="2.5" />
          <path d="M17 46V54" stroke="oklch(0.52 0.01 250)" strokeWidth="3" />
          <circle cx="17" cy="56" r="2.5" fill="oklch(0.64 0.009 250)" />
        </svg>
      </div>
    </>
  );
}
