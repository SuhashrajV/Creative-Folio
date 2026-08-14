import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
      <nav
        className={`nav-pill flex h-14 w-full max-w-5xl items-center justify-between rounded-full border px-5 sm:px-6 ${
          scrolled ? "is-frost" : "border-transparent"
        }`}
      >
        <a href="#top" className="font-display text-base font-bold tracking-tight text-ink">
          Suhashraj<span className="text-accent"> V</span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm text-muted transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="breathe-glow hidden rounded-full bg-accent-btn px-5 py-2 text-sm font-semibold text-[#0a0a0c] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Let's talk
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute left-4 right-4 top-[72px] overflow-hidden rounded-2xl border border-line bg-[#101014]/95 shadow-xl backdrop-blur-xl md:hidden">
          <ul className="space-y-1 px-3 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-base text-muted transition-colors hover:bg-elevated hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-accent-btn px-4 py-3 text-center text-base font-semibold text-[#0a0a0c]"
              >
                Let's talk
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
