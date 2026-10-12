import type { SVGProps } from "react";

type SigilSize = "sm" | "md" | "lg" | "xl";

const SIZES: Record<SigilSize, number> = {
  sm: 28,
  md: 48,
  lg: 132,
  xl: 232,
};

/**
 * House BLOODTHRONE: a snapped crown atop a downward blade, in a heater shield.
 * Original heraldry — deliberately not a house sigil from any existing property.
 *
 * The forge reveal is pure CSS (`.sigil-forge` in globals.css), so the component
 * costs zero JS and zero hydration. Under prefers-reduced-motion the animation
 * collapses to the final state rather than being skipped, so the sigil is always
 * fully drawn.
 */
export function RoyalSigil({
  size = "md",
  className = "",
  ...rest
}: Omit<SVGProps<SVGSVGElement>, "width" | "height"> & { size?: SigilSize }) {
  return (
    <svg
      viewBox="0 0 200 240"
      width={SIZES[size]}
      height={Math.round(SIZES[size] * 1.2)}
      role="img"
      aria-label="Sigil of House Bloodthrone: a snapped crown above a downward blade"
      className={`sigil-forge ${className}`}
      fill="none"
      {...rest}
    >
      <g id="shield-field">
        <path
          d="M26 18H174V112C174 168 138 208 100 234C62 208 26 168 26 112Z"
          fill="var(--color-steel-900)"
          stroke="var(--color-steel-600)"
          strokeWidth="4"
        />
        <path
          d="M36 28H164V112C164 160 133 196 100 220C67 196 36 160 36 112Z"
          fill="var(--color-steel-1000)"
          stroke="var(--color-steel-700)"
          strokeWidth="2"
        />
      </g>

      <g id="broken-crown">
        <path
          d="M52 98V72L64 34L82 64L100 28L114 62L124 54L133 68L141 60L148 74V98Z"
          fill="var(--color-steel-850)"
          stroke="var(--color-steel-400)"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </g>

      <g id="blade">
        <path
          d="M78 98H122V166L100 214L78 166Z"
          fill="var(--color-steel-850)"
          stroke="var(--color-steel-300)"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </g>

      <g id="blood">
        <path
          d="M100 108V200"
          stroke="var(--color-blood-600)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="100" cy="104" r="8" fill="var(--color-blood-500)" />
      </g>
    </svg>
  );
}
