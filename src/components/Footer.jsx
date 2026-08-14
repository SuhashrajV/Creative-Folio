import { useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function Footer() {
  const topRef = useRef(null);

  const scrollTop = (e) => {
    e.preventDefault();
    gsap.to(window, {
      scrollTo: 0,
      duration: 1.1,
      ease: "power3.inOut",
    });
  };

  return (
    <footer className="border-t border-line bg-tint">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-14 text-center sm:px-8">
        <p className="font-display text-lg font-bold tracking-tight text-ink">
          Suhashraj V
          <span className="text-accent"> — </span>
          <span className="text-muted">UI/UX &amp; Product Designer, Coimbatore, Tamil Nadu</span>
        </p>

        <div className="flex flex-col items-center gap-3 text-sm text-faint sm:flex-row sm:gap-4">
          <span>© 2026 Suhashraj V. All rights reserved.</span>
          <span className="hidden text-line sm:block">·</span>
          <span>Designed in Figma. Built with HTML &amp; Tailwind CSS.</span>
          <span className="hidden text-line sm:block">·</span>
          <a
            href="#top"
            ref={topRef}
            onClick={scrollTop}
            className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
          >
            Back to top
            <span
              aria-hidden
              className="inline-block text-accent transition-transform duration-300 group-hover:-translate-y-1"
            >
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
