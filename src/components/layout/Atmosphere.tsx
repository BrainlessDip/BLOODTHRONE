/**
 * PLAN §13 background atmosphere.
 *
 * Deliberately near-invisible. PLAN §13 forbids visual clutter and constant
 * particles, so this is one static layer plus four embers, and the whole thing
 * is removed from the render tree under prefers-reduced-motion.
 */

export function RavenSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 100"
      aria-hidden="true"
      className={className}
      fill="var(--color-steel-1000)"
    >
      {/* Perched raven, angular in the engraved idiom rather than naturalistic */}
      <path d="M18 86h30l-4-6H22z" />
      <path d="M44 80c-10-6-14-20-8-32 5-10 16-16 28-15l16 2 12-9 4 4-9 10 2 6c3 4 3 9 0 13l-6 8-4 13h-6l1-11c-9 2-19 0-26-4l-4 11z" />
      <path d="M78 30l18 3-7 6-14-4z" />
      <circle cx="86" cy="38" r="1.6" fill="var(--color-steel-700)" />
      <path d="M30 84l-12 6 16-2z" />
    </svg>
  );
}

export function Embers({ count = 4 }: { count?: number }) {
  const motes = [
    { left: "22%", bottom: "18%", delay: "0s", duration: "5.5s" },
    { left: "48%", bottom: "12%", delay: "1.4s", duration: "6.8s" },
    { left: "71%", bottom: "22%", delay: "2.9s", duration: "6.1s" },
    { left: "88%", bottom: "15%", delay: "0.7s", duration: "7.4s" },
  ].slice(0, count);

  return (
    <>
      {motes.map((mote) => (
        <span
          key={mote.left}
          className="ember absolute h-px w-px"
          style={{
            left: mote.left,
            bottom: mote.bottom,
            animationDelay: mote.delay,
            animationDuration: mote.duration,
            backgroundColor: "var(--color-blood-500)",
          }}
        />
      ))}
    </>
  );
}