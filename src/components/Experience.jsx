import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading.jsx";
import { registerReveals, registerDrawOnScroll, prefersReducedMotion } from "../lib/motion.js";

gsap.registerPlugin(ScrollTrigger);

const role = "Junior Designer";
const company = "Lingaasys Technology";
const location = "Coimbatore, Tamil Nadu";
const period = "Jan 2025 - Present";

const bullets = [
  "Designing and shipping products end-to-end — from research and PRDs to pixel-perfect UI and front-end code conversion.",
  "Authored PRDs bridging Information Architecture, User Stories and development handoff specs, collaborated with stakeholders and backend teams to define requirements.",
  "Converted designs to functional, responsive code using HTML, CSS, Bootstrap 5 & Tailwind CSS.",
];

export default function Experience() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return () => {};

    const cleanupReveal = registerReveals(root);
    const cleanupDraw = registerDrawOnScroll(root);

    if (!prefersReducedMotion()) {
      const rail = root.querySelector("[data-timeline]");
      const dot = root.querySelector("[data-timeline-dot]");
      if (rail && dot) {
        const length = rail.getTotalLength();
        gsap.set(rail, { strokeDasharray: length, strokeDashoffset: length });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "bottom 55%",
            scrub: true,
          },
        });
        tl.to(rail, { strokeDashoffset: 0, ease: "none" }, 0).to(
          dot,
          { attr: { fill: "#9b8cf2" }, ease: "none" },
          0
        );
      }
    }

    return () => {
      cleanupReveal();
      cleanupDraw();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root || root.contains(st.trigger)) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="experience"
      className="scroll-mt-24 border-t border-line bg-tint py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Work experience"
          title="Where I've been building."
        />

        <div className="relative pl-12 sm:pl-16">
          {/* Vertical SVG timeline rail — draws on scroll, dot fills purple */}
          <svg
            className="absolute left-1 top-2 h-[calc(100%-1rem)] w-6"
            viewBox="0 0 24 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              data-timeline
              x1="12"
              y1="2"
              x2="12"
              y2="98"
              stroke="#2a2a34"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle
              data-timeline-dot
              cx="12"
              cy="2"
              r="5"
              fill="transparent"
              stroke="#9b8cf2"
              strokeWidth="2"
            />
          </svg>

          <article
            data-reveal
            className="rounded-2xl border border-line bg-surface p-6 sm:p-10"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                {role}
                <span className="text-accent"> · {company}</span>
              </h3>
              <span className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-faint">
                {period}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">{location}</p>

            <ul className="mt-8 space-y-5">
              {bullets.map((b) => (
                <li key={b} data-reveal className="flex items-start gap-4">
                  <svg
                    viewBox="0 0 16 16"
                    className="mt-1 h-4 w-4 shrink-0"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      data-draw
                      d="M2.5 8.5 L6 12 L13.5 4"
                      stroke="#9b8cf2"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm leading-relaxed text-muted">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
