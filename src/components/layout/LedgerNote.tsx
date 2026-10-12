type Props = {
  /** Themed line. PLAN §14 allows flavour here — never the only carrier of meaning. */
  flavour: string;
  /** The actual situation in plain words. PLAN §14 requires this always be present. */
  plain: string;
};

export function LedgerNote({ flavour, plain }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 self-center text-center">
      <span className="label-herald" style={{ color: "var(--color-blood-300)" }}>
        {flavour}
      </span>
      <p className="prose-throne max-w-md text-sm">{plain}</p>
    </div>
  );
}