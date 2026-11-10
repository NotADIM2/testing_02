type Props = { value: number; digits?: number };

export function ClaimNumber({ value, digits = 4 }: Props) {
  const chars = String(value).padStart(digits, "0").split("");  // 381 → ["0","3","8","1"]
  return (
    <span className="inline-flex gap-1">
      {chars.map((d, i) => (
        <span key={i} className="flex h-10 w-8 items-center justify-center rounded border-2 border-stone font-display text-xl font-bold">
          {d}
        </span>
      ))}
    </span>
  );
}