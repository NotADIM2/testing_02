import { Dot } from "../components/Dot";
import { Section } from "../components/Section";
import { ClaimNumber } from "../components/ClaimNumber";

// A page to see every component in every state. Add each new component here as you build it.

export function Playground() {
  return (
    <div>
      <h1 className="font-display text-5xl font-bold">Component playground</h1>
      <p className="mt-2">Every component, every state.</p>

      <Section title="Dot">
        <div className="flex items-center gap-3">
          <Dot />
          <Dot active />
          <Dot label="A" />
          <Dot label="B" active />
          <Dot size="sm" />
          <Dot size="sm" active />
        </div>
      </Section>

      <Section title="Colour tokens">
        <div className="flex flex-wrap gap-3">
          <span className="rounded bg-ink px-3 py-1 text-sand">ink</span>
          <span className="rounded bg-stone px-3 py-1 text-ink">stone</span>
          <span className="rounded bg-teal px-3 py-1 text-sand">teal</span>
          <span className="rounded bg-sun px-3 py-1 text-ink">sun</span>
          <span className="rounded bg-coral px-3 py-1 text-sand">coral</span>
        </div>
      </Section>

      <Section title="ClaimNumber (exercise 2)">
        <p className="text-ink/60">Not built yet. See README.md.</p>
      </Section>

      <Section title="StepRail (exercise 3)">
      <ClaimNumber value={381} />
      </Section>
    </div>
  );
}
