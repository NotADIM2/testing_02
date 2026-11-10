// Fake data for one found item. You build pages against this first ("static"),
// then later swap in real data from a database.

export type Status = "returned" | "likely_match" | "no_match" | "needs_info";

export type FoundItem = {
  claimNumber: number;
  name: string;
  foundAt: string;
  foundTime: string;
  status: Status;
  ownerName: string;
  matchesPerStep: number[]; // drives the funnel: lost reports narrowing down to 1
  clues: { label: string; value: string }[];
  journey: { time: string; event: string }[];
};

export const fakeItem: FoundItem = {
  claimNumber: 381,
  name: "Blue steel water bottle",
  foundAt: "Library, 2nd floor",
  foundTime: "4:15 pm",
  status: "returned",
  ownerName: "Priya S.",
  matchesPerStep: [480, 36, 4, 1],
  clues: [
    { label: "Colour", value: "Blue" },
    { label: "Place", value: "Library" },
    { label: "Date", value: "Tuesday" },
  ],
  journey: [
    { time: "4:15 pm", event: "Found by a student, handed to the library desk" },
    { time: "5:00 pm", event: "Logged in Finders with a photo" },
    { time: "5:02 pm", event: "Matched to a lost report from Priya S." },
    { time: "Next day, 10:30 am", event: "Collected by owner" },
  ],
};
