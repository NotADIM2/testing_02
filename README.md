# Finders

A practice project: a small campus lost-and-found app. Someone hands in a found item,
and Finders narrows the lost reports down to the owner.

Built with React, TypeScript, Vite, Tailwind CSS and Motion.

## Run it

```bash
npm install      # only the first time
npm run dev      # open the http://localhost:5173 link it prints
```

Pages: `/` is the component playground, `/item` is a static item page.

## What's where

| Path | What it is |
|---|---|
| `src/index.css` | Colour tokens and fonts |
| `src/components/` | Small reusable pieces. `Dot` and `Section` are finished examples |
| `src/pages/` | Full screens |
| `src/data/fakeItem.ts` | Fake data for one found item |
| `src/App.tsx` | Header, navigation, and which URL shows which page |

## The loop for every exercise

```bash
git switch main
git pull                                  # get the latest main
git switch -c practice/<exercise-name>    # new branch
# ...build it, check it in the browser...
git add .
git commit -m "Short description of what you did"
git push -u origin practice/<exercise-name>
# On GitHub: open a Pull Request, then merge it
```

## Exercises

1. **Push to GitHub.** Get the project onto GitHub and make the repo private.

2. **ClaimNumber.** `src/components/ClaimNumber.tsx`: show a number like 381 as zero-padded
   digits in separate boxes: `0` `3` `8` `1`.
   Hint: `String(381).padStart(4, "0").split("")`. Add it to the playground.

3. **StepRail.** `src/components/StepRail.tsx`: a vertical row of dots joined by a line,
   one per clue. Props: `total: number`, `done: number`. Done steps use `<Dot active />`.

4. **Item page design.** Make `/item` look good. Create a `StatusBanner` component that takes
   `status` and shows the right words and colour (sun yellow with dark text for Returned,
   coral for No match, plain for the others).

5. **The match funnel (the big one).** `src/components/MatchFunnel.tsx`, using `matchesPerStep`.
   Show a grid of dots that fade out step by step (480 → 36 → 4 → 1) until one teal dot is left,
   then a yellow highlight sweeps across the status banner.
   Use Motion: `import { motion, useReducedMotion } from "motion/react"`.
   If reduced motion is on, show the final state with no animation.

6. **Practise a merge conflict on purpose.** Make two branches that change the same line of
   `ItemPage.tsx` differently, merge both, and resolve the conflict in VS Code.

7. **Loading, empty and error states.** Fake a 1-second load with `useState` + `useEffect` +
   `setTimeout`, and show a message while loading ("Checking lost reports…").

8. **Phone width.** Open DevTools (F12), toggle the device toolbar and fix anything that overflows at 375px.

9. **Deploy.** Import the GitHub repo on vercel.com. Open a PR and look for the preview link Vercel adds.
