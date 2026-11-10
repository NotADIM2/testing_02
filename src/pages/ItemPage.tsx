import { Section } from "../components/Section";
import { fakeItem } from "../data/fakeItem";

// Static item page with fake data. Deliberately plain: making it look good is exercise 4.

export function ItemPage() {
  const item = fakeItem;

  return (
    <div>
      <h1 className="font-display text-4xl font-bold">
        {item.name}, found at {item.foundAt}, {item.foundTime}
      </h1>

      <Section title="Status">
        {/* Exercise 4: replace with a <StatusBanner status={item.status} /> component */}
        <p>
          Returned to {item.ownerName}. Claim number {item.claimNumber}.
        </p>
      </Section>

      <Section title="Lost reports that could match">
        {/* Exercise 5: the match funnel goes here */}
        <p>{item.matchesPerStep.join(" → ")}</p>
      </Section>

      <Section title="Clues used">
        <ul className="space-y-2">
          {item.clues.map((c) => (
            <li key={c.label}>
              <span className="font-bold">{c.label}:</span> {c.value}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Journey">
        <ul className="space-y-1">
          {item.journey.map((e) => (
            <li key={e.time}>
              <span className="font-bold">{e.time}</span> {e.event}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
