// One dot. This is the finished example: copy its pattern for the exercises.

type Props = {
  active?: boolean;   // teal fill
  label?: string;     // optional letter or digit inside, e.g. "A" or "4"
  size?: "sm" | "md";
};

const sizes = {
  sm: "h-4 w-4 text-[10px]",
  md: "h-7 w-7 text-sm",
};

export function Dot({ active = false, label, size = "md" }: Props) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border-2 font-bold
        ${sizes[size]}
        ${active ? "border-teal bg-teal text-sand" : "border-stone text-stone"}`}
    >
      {label}
    </span>
  );
}
