type Props = { className?: string };

export function OrnamentDivider({ className = "" }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-4 ${className}`}
    >
      <span className="h-px w-16 sm:w-28" style={{ backgroundColor: "var(--color-steel-800)" }} />
      {/* PLAN §5: the sigil reused as a section marker. A static reduction of
          RoyalSigil — deliberately not the animated component, so five sections
          mounting together don't all run the forge reveal at once. */}
      <svg
        width="15"
        height="18"
        viewBox="0 0 20 24"
        fill="none"
        role="presentation"
        data-sigil-mark
      >
        <path
          d="M3 2H17V11C17 15.5 14 19 10 21.5C6 19 3 15.5 3 11Z"
          stroke="var(--color-steel-700)"
          strokeWidth="1.4"
        />
        <path
          d="M5 11L6 7L8 9.5L10 5L12 9L14 7L15 11Z"
          fill="var(--color-steel-800)"
          stroke="var(--color-steel-600)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 11H11.5V15L10 17.5L8.5 15Z"
          fill="var(--color-steel-800)"
          stroke="var(--color-steel-500)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d="M10 12V16" stroke="var(--color-blood-600)" strokeWidth="1.2" />
      </svg>
      <span className="h-px w-16 sm:w-28" style={{ backgroundColor: "var(--color-steel-800)" }} />
    </div>
  );
}

export function SectionHeading({
  label,
  heading,
  id,
}: {
  label: string;
  heading: string;
  id?: string;
}) {
  return (
    <header className="flex flex-col items-center gap-5 text-center">
      <p
        className="label-herald"
        style={{ color: "var(--color-blood-300)" }}
      >
        {label}
      </p>
      <h2
        id={id}
        className="text-h2 font-display uppercase text-steel-200"
      >
        {heading}
      </h2>
      <OrnamentDivider />
    </header>
  );
}
