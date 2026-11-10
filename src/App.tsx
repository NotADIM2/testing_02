import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import { Playground } from "./pages/Playground";
import { ItemPage } from "./pages/ItemPage";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `font-display text-lg ${isActive ? "text-teal underline" : "text-ink"}`;

export default function App() {
  return (
    <BrowserRouter>
      <header className="flex items-baseline gap-6 border-b border-stone px-4 py-3 sm:px-8">
        <span className="font-display text-2xl font-bold">Finders</span>
        <nav className="flex gap-4">
          <NavLink to="/" end className={linkClass}>Playground</NavLink>
          <NavLink to="/item" className={linkClass}>Item</NavLink>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
        <Routes>
          <Route path="/" element={<Playground />} />
          <Route path="/item" element={<ItemPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
