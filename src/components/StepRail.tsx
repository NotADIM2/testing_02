import { Dot } from "./Dot";
type Props = { total: number; done: number };

export function StepRail({ total, done }: Props) {
  return (
    <div className="flex flex-col items-center">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex flex-col items-center">
          {i > 0 && <span className={`h-6 w-0.5 ${i < done ? "bg-teal" : "bg-stone"}`} />}
          <Dot size="sm" active={i < done} />
        </div>
      ))}
    </div>
  );
}