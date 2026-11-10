import type { ReactNode } from "react";

// A region of the page with a heading and a divider line above it.

type Props = {
  title: string;
  children: ReactNode;
};

export function Section({ title, children }: Props) {
  return (
    <section className="border-t border-stone py-6">
      <h2 className="mb-4 font-display text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}
