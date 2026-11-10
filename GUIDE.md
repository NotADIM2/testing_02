# Finders: self-study guide

Everything you need to finish the practice on your own, without help.
All the code here has been type-checked. Type it yourself instead of copy-pasting, so it sticks.

**Done so far:** step 1 (GitHub), step 2 (ClaimNumber, PR #3), step 3 (StepRail, PR #4).
**Next:** step 4.

---

## 0. Every time you sit down

1. Open the project: `cd C:\Users\Adarsh\finders-practice` then `code .`
2. In VS Code, open a terminal (**Ctrl + `**) and click **+** to open a second one.
3. **Terminal 1:** `npm run dev`, then Ctrl+click the `localhost:5173` link. Leave it running.
4. **Terminal 2:** Git commands go here.

---

## 1. The Git loop (do this for every step)

```
git switch main                         # go to the official version
git pull                                # download the latest from GitHub
git switch -c practice/<name>           # make your own branch for this task

# ...write code, save, check the browser...

git add .                               # pick all changed files
git commit -m "What you did"            # save a checkpoint
git push -u origin practice/<name>      # upload your branch
```

Then on **github.com/NotADIM2/testing_02**:
**Compare & pull request** → **Create pull request** → look at **Files changed** →
**Merge pull request** → **Confirm** → **Delete branch**.

Then back in the terminal:
```
git switch main
git pull
```

| Word | Meaning |
|---|---|
| branch | your own copy to work on without breaking `main` |
| commit | a saved checkpoint |
| push / pull | upload to / download from GitHub |
| Pull Request (PR) | asking to merge your branch into `main` |
| merge conflict | two changes to the same line; you pick which to keep |

---

## 2. Step 4: the item page (about 1 hour)

**Figma is optional here.** Treat this picture as your design. If you want to practise Figma later, see section 9.

```
┌────────────────────────────────────────────────────────────┐
│ Blue steel water bottle                    [0][3][8][1]    │  ← title, ClaimNumber
│ Found at Library, 2nd floor, 4:15 pm                       │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Returned to owner                    (yellow)          │ │  ← StatusBanner
│ └────────────────────────────────────────────────────────┘ │
│ Lost reports that could match      │ Clues used            │
│ 480 → 36 → 4 → 1                   │  ● Colour: Blue       │  ← StepRail + clues
│                                    │  ● Place: Library     │
│                                    │  ● Date: Tuesday      │
│ Journey                                                    │
│ 4:15 pm     Found by a student, handed to the library desk │
└────────────────────────────────────────────────────────────┘
```

### 4.1 Branch
```
git switch main
git pull
git switch -c practice/item-page
```

### 4.2 Create `src/components/StatusBanner.tsx`
```tsx
import type { Status } from "../data/fakeItem";

// Each status gets its own words and colours
const looks: Record<Status, { text: string; className: string }> = {
  returned: { text: "Returned to owner", className: "bg-sun text-ink" },
  likely_match: { text: "Likely match. Check ID before handing over", className: "border-2 border-teal text-teal" },
  no_match: { text: "No match yet", className: "bg-coral text-sand" },
  needs_info: { text: "Need a clearer photo", className: "border-2 border-stone" },
};

export function StatusBanner({ status }: { status: Status }) {
  const look = looks[status];
  return (
    <div className={`rounded px-4 py-3 font-display text-2xl font-bold ${look.className}`}>
      {look.text}
    </div>
  );
}
```

### 4.3 Replace everything in `src/pages/ItemPage.tsx`
```tsx
import { Section } from "../components/Section";
import { ClaimNumber } from "../components/ClaimNumber";
import { StepRail } from "../components/StepRail";
import { StatusBanner } from "../components/StatusBanner";
import { fakeItem } from "../data/fakeItem";

export function ItemPage() {
  const item = fakeItem;

  return (
    <div>
      {/* TOP ROW: title + details on the left, claim number on the right */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold">{item.name}</h1>
          <p className="mt-1 text-ink/70">Found at {item.foundAt}, {item.foundTime}</p>
        </div>
        <ClaimNumber value={item.claimNumber} />
      </div>

      {/* YELLOW BANNER */}
      <div className="mt-6">
        <StatusBanner status={item.status} />
      </div>

      {/* TWO COLUMNS: left twice as wide. On phones they stack */}
      <div className="mt-6 grid gap-x-10 md:grid-cols-[2fr_1fr]">
        <Section title="Lost reports that could match">
          <p>{item.matchesPerStep.join(" → ")}</p>
        </Section>

        <Section title="Clues used">
          <div className="flex gap-4">
            <StepRail total={item.clues.length} done={item.clues.length} />
            <ul className="space-y-6">
              {item.clues.map((c) => (
                <li key={c.label} className="flex h-4 items-center">
                  <span className="font-bold">{c.label}:</span>&nbsp;{c.value}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </div>

      {/* JOURNEY: time on the left, event on the right */}
      <Section title="Journey">
        <ul className="space-y-2">
          {item.journey.map((e) => (
            <li key={e.time} className="grid grid-cols-[9rem_1fr] gap-4">
              <span className="font-bold">{e.time}</span>
              <span>{e.event}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
```

| Class | What it does |
|---|---|
| `flex justify-between` | items in a row, pushed to opposite ends |
| `grid md:grid-cols-[2fr_1fr]` | two columns (2:1) on screens wider than a tablet; stacked on phones |
| `space-y-6` | gap between list items; matches the StepRail spacing so dots line up with clues |
| `text-ink/70` | ink colour at 70% opacity (greyer) |

### 4.4 Test all four statuses
In `src/data/fakeItem.ts`, change `status: "returned"` to `"likely_match"`, then `"no_match"`, then `"needs_info"`.
Save each time and look. **Change it back to `"returned"`.**

### 4.5 Save it: the Git loop from section 1
```
git add .
git commit -m "Build item page layout with StatusBanner"
git push -u origin practice/item-page
```
Then PR → merge → `git switch main` → `git pull`.

---

## 3. Step 5: the match funnel (about 1.5 hours)

Branch: `practice/match-funnel`

### 5.1 Create `src/components/MatchFunnel.tsx`
```tsx
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Dot } from "./Dot";

const GRID = 40; // dots on screen

// 480 reports can't all fit, so scale the count down to at most 40 dots
function dotsFor(matches: number, first: number) {
  if (matches <= 1) return 1;
  return Math.max(2, Math.round(GRID * Math.sqrt(matches / first)));
}

export function MatchFunnel({ steps }: { steps: number[] }) {
  const reduce = useReducedMotion();          // true if animations are turned off in Windows
  const [step, setStep] = useState(0);        // which step of [480, 36, 4, 1] we're on
  const current = reduce ? steps.length - 1 : step;

  useEffect(() => {                           // every 0.9 s, go to the next step
    if (reduce || step >= steps.length - 1) return;
    const timer = setTimeout(() => setStep(step + 1), 900);
    return () => clearTimeout(timer);
  }, [step, steps.length, reduce]);

  const visible = dotsFor(steps[current], steps[0]);

  return (
    <div>
      <p className="font-display text-3xl font-bold">{steps[current]} lost reports</p>
      <div className="mt-3 grid w-fit grid-cols-10 gap-2">
        {Array.from({ length: GRID }, (_, i) => (
          <motion.span
            key={i}
            animate={{ opacity: i < visible ? 1 : 0.1, scale: i < visible ? 1 : 0.6 }}
            transition={{ duration: 0.4 }}
          >
            <Dot size="sm" active={visible === 1 && i === 0} />
          </motion.span>
        ))}
      </div>
      <button className="mt-4 text-teal underline" onClick={() => setStep(0)}>
        Replay
      </button>
    </div>
  );
}
```

### 5.2 Use it in `ItemPage.tsx`
Add at the top: `import { MatchFunnel } from "../components/MatchFunnel";`
Replace `<p>{item.matchesPerStep.join(" → ")}</p>` with `<MatchFunnel steps={item.matchesPerStep} />`

### 5.3 Understand the three ideas
- **`useState`**: a value that redraws the component when it changes (`step`).
- **`useEffect`**: code that runs after drawing. Here it starts a timer that moves to the next step.
- **`motion.span` + `animate`**: you describe the end state, Motion animates to it smoothly.

### 5.4 Experiment
1. Change `900` to `500` and `1500`. Which feels best?
2. Windows Settings → Accessibility → Visual effects → **Animation effects** off. The funnel should jump straight to 1. Turn it back on.
3. Bonus: make the StatusBanner appear only when the funnel finishes. Hint:
   `<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>`

Then the Git loop.

---

## 4. Step 6: a merge conflict on purpose (20 min)

```
git switch main
git pull
git switch -c practice/title-a
```
In `ItemPage.tsx` change `{item.name}` inside the `<h1>` to `Found: {item.name}`. Save.
```
git commit -am "Title version A"
git switch main
git switch -c practice/title-b
```
Change the **same** `<h1>` to `{item.name} is waiting for its owner`. Save.
```
git commit -am "Title version B"
git switch main
git merge practice/title-a        # works
git merge practice/title-b        # CONFLICT
```
Open `ItemPage.tsx`. VS Code shows **Accept Current Change | Accept Incoming Change | Accept Both**.
Click one (or edit by hand). Make sure no `<<<<<<<`, `=======`, `>>>>>>>` lines are left. Then:
```
git add .
git commit -m "Resolve title conflict"
git push
git branch -d practice/title-a practice/title-b
```

---

## 5. Step 7: loading, empty and error states (30 min)

Branch: `practice/states`. This is the **full** `ItemPage.tsx` after steps 4, 5 and 7, so you can compare yours against it:

```tsx
import { useEffect, useState } from "react";
import { Section } from "../components/Section";
import { ClaimNumber } from "../components/ClaimNumber";
import { StepRail } from "../components/StepRail";
import { StatusBanner } from "../components/StatusBanner";
import { MatchFunnel } from "../components/MatchFunnel";
import { fakeItem } from "../data/fakeItem";

export function ItemPage() {
  const item = fakeItem;
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  // Pretend the database takes 1 second
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // LOADING STATE
  if (loading) {
    return <p className="font-display text-2xl">Checking lost reports…</p>;
  }

  // ERROR STATE
  if (failed) {
    return (
      <div className="rounded border-2 border-coral p-4">
        <p className="font-bold text-coral">Couldn't load this item.</p>
        <button className="mt-2 text-teal underline" onClick={() => setFailed(false)}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-4xl">{item.name}</h1>
          <p className="mt-1 text-ink/70">Found at {item.foundAt}, {item.foundTime}</p>
        </div>
        <ClaimNumber value={item.claimNumber} />
      </div>

      <div className="mt-6">
        <StatusBanner status={item.status} />
      </div>

      <div className="mt-6 grid gap-x-10 md:grid-cols-[2fr_1fr]">
        <Section title="Lost reports that could match">
          <MatchFunnel steps={item.matchesPerStep} />
        </Section>

        <Section title="Clues used">
          <div className="flex gap-4">
            <StepRail total={item.clues.length} done={item.clues.length} />
            <ul className="space-y-6">
              {item.clues.map((c) => (
                <li key={c.label} className="flex h-4 items-center">
                  <span className="font-bold">{c.label}:</span>&nbsp;{c.value}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </div>

      <Section title="Journey">
        {/* EMPTY STATE */}
        {item.journey.length === 0 ? (
          <p className="text-ink/60">Nothing logged yet.</p>
        ) : (
          <ul className="space-y-2">
            {item.journey.map((e) => (
              <li key={e.time} className="grid grid-cols-[7rem_1fr] gap-4 sm:grid-cols-[9rem_1fr]">
                <span className="font-bold">{e.time}</span>
                <span>{e.event}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Temporary button to test the error state */}
      <button className="mt-8 text-sm text-ink/60 underline" onClick={() => setFailed(true)}>
        Pretend loading failed (testing only)
      </button>
    </div>
  );
}
```

**Rule to remember:** all `useState` / `useEffect` lines must come **before** any `if (...) return`.
React needs them to run in the same order every time.

Test: reload `/item` and you see "Checking lost reports…" for 1 second. Click the testing button and you see the error.
Empty `journey: []` in `fakeItem.ts` and you see "Nothing logged yet." (put it back afterwards).

Then the Git loop.

---

## 6. Step 8: phone width (20 min)

Branch: `practice/mobile`
1. In the browser: **F12**, then **Ctrl + Shift + M**, then pick **iPhone SE** (375px).
2. Look for text cut off or the page scrolling sideways.
3. Fixes: `text-2xl sm:text-4xl` (small on phones, big on wider screens), `flex-col sm:flex-row`, `flex-wrap`.
   `sm:` = 640px and wider, `md:` = 768px and wider.
4. Check the Playground page too. Then the Git loop.

---

## 7. Step 9: deploy on Vercel (20 min)

1. **vercel.com** → **Sign up** → **Continue with GitHub** (NotADIM2).
2. **Add New → Project** → find `testing_02` → **Import** → it detects Vite → **Deploy**.
3. You get a live link. Open it on your phone too.
4. **Bug you'll hit:** open `/item` on the live site and press refresh, and you get a 404.
   Fix: branch `practice/vercel-fix`, create `vercel.json` in the project root (next to `package.json`):
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
   ```
   Push and open a PR. **Vercel posts a preview link on the PR.** Check the fix there, then merge.
   The live site updates by itself.

---

## 8. When something goes wrong

| You see | Do this |
|---|---|
| Red error in the browser or terminal mentioning a file and line | Open that file at that line. Usually a typo, a missing `}` or `)`, or a missing import |
| `Cannot find module '../components/X'` | File name or path is wrong. Check the spelling and capital letters |
| `X is not defined` / `Cannot find name 'X'` | You forgot the `import` line at the top |
| Page is blank | Press F12 → **Console** tab and read the red error |
| `Port 5173 is in use` | Another `npm run dev` is running. Close the other terminal, or use the new port it shows |
| `git push` says **rejected** / **fetch first** | `git pull`, then `git push` again |
| `error: Your local changes would be overwritten` when switching branch | `git stash`, then switch, then `git stash pop` |
| You wrote code on `main` by mistake (not committed yet) | `git switch -c practice/<name>`. Your changes move to the new branch |
| PR says **This branch has conflicts** | Locally: `git switch <your-branch>`, `git pull origin main`, fix conflicts in VS Code, `git add .`, `git commit`, `git push` |
| `git commit` opens a strange editor | You forgot `-m "message"`. Type `:wq` and press Enter (Vim), or close the tab (VS Code) |
| Lost or confused | `git status` tells you which branch you're on and what changed |

---

## 9. Figma basics (optional, when you have time)

Figma is for **deciding the layout before you code**. A paper sketch does the same job when you're short on time.

| Key | Tool |
|---|---|
| F | Frame (a page). Pick **Desktop** in the right panel |
| T | Text |
| R | Rectangle |
| O | Ellipse (hold **Shift** for a perfect circle) |
| L | Line (hold **Shift** to keep it straight) |
| Shift + A | Auto layout: lines things up evenly, like `flex` in CSS |
| Ctrl + G | Group |
| Ctrl + D | Duplicate |
| Ctrl + Alt + K | Make component (reusable piece) |

Right panel: **Fill** = background colour, **Stroke** = border, **Text** = font, size, weight.
Our colours: sand `F7F3EC`, ink `1F1D1A`, stone `A8A29E`, teal `0F766E`, sun `F2C14E`, coral `E4572E`.
Fonts: Space Grotesk (headings), Inter (body).

Learn: search YouTube for **"Figma tutorial for beginners auto layout components"** (about 1 hour).

---

## 10. React in one table

| Thing | Example | Meaning |
|---|---|---|
| Component | `function Dot() { return <span/> }` | A reusable piece of UI |
| Props | `<Dot active />` | Inputs to a component |
| State | `const [step, setStep] = useState(0)` | A value that redraws the UI when changed |
| Effect | `useEffect(() => {...}, [step])` | Run code after drawing, e.g. timers or loading data |
| List | `items.map(x => <li key={x.id}>…</li>)` | One element per item. `key` must be unique |
| Condition | `{a ? <X/> : <Y/>}` or `{a && <X/>}` | Show something only sometimes |
| Import | `import { Dot } from "./Dot"` | Use a component from another file |
