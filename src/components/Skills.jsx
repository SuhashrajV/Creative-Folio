import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading.jsx";
import {
  HtmlIcon,
  CssIcon,
  BootstrapIcon,
  TailwindIcon,
  JsIcon,
} from "./Icons.jsx";
import { registerReveals, prefersReducedMotion } from "../lib/motion.js";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    n: "01",
    title: "Requirement Gathering",
    detail:
      "Understanding stakeholder goals, user needs, platform constraints and project scope before touching any design tool.",
  },
  {
    n: "02",
    title: "UX Research",
    detail:
      "Competitor analysis, user flow mapping and benchmark studies to ground every design decision in real data.",
  },
  {
    n: "03",
    title: "Wireframe Design",
    detail:
      "Low fidelity wireframes in Figma to lock in layout, UX and user flows before adding any visual polish.",
  },
  {
    n: "04",
    title: "High-Fidelity Design",
    detail:
      "Pixel-perfect UI with a full design system — components, tokens, spacing rules and all interactive states.",
  },
  {
    n: "05",
    title: "AI-Assisted Dev Handoff",
    detail:
      "Designs converted to clean HTML, CSS and Tailwind using AI-assisted workflows — fast, accurate and production-ready.",
  },
];

const tools = [
  { src: "/assets/figma.svg", label: "Figma" },
  { src: "/Notion.svg", label: "Notion" },
  { src: "/Antigravity.svg", label: "Antigravity" },
  { src: "/Codex.svg", label: "Codex" },
  { src: "/open%20code.png", label: "Opencode" },
  { src: "/Claude.svg", label: "Claude" },
  { src: "/Gemini.svg", label: "Gemini" },
];

const techSkills = [
  { Icon: HtmlIcon, label: "HTML" },
  { Icon: CssIcon, label: "CSS" },
  { Icon: BootstrapIcon, label: "Bootstrap" },
  { Icon: TailwindIcon, label: "Tailwind" },
  { Icon: JsIcon, label: "JS" },
];

function ToolCard({ src, label }) {
  return (
    <div
      data-icon-card
      className="group flex w-full flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[1.5deg] hover:border-accent/40 hover:shadow-[0_14px_40px_-16px_rgba(155,140,242,0.35)]"
    >
      <img
        src={src}
        alt={label}
        draggable={false}
        className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
      />
      <p className="text-xs font-medium text-muted transition-colors group-hover:text-ink">
        {label}
      </p>
    </div>
  );
}

function IconCard({ Icon, label }) {
  return (
    <div
      data-icon-card
      className="group flex w-full flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[1.5deg] hover:border-accent/40 hover:shadow-[0_14px_40px_-16px_rgba(155,140,242,0.35)]"
    >
      <Icon className="h-12 w-12 transition-transform duration-300 group-hover:scale-110" />
      <p className="text-xs font-medium text-muted transition-colors group-hover:text-ink">
        {label}
      </p>
    </div>
  );
}

export default function Skills() {
  const rootRef = useRef(null);
  const descRefs = useRef([]);
  const prevExpanded = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(null);
  const expanded = hovered ?? open;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return () => {};

    const cleanupReveal = registerReveals(root);
    const reduced = prefersReducedMotion();

    // Journey connectors — each draws as you scroll through its step
    let cleanupConnectors = () => {};
    if (!reduced) {
      const triggers = [];
      root.querySelectorAll("[data-journey]").forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        triggers.push(
          ScrollTrigger.create({
            trigger: path.closest("[data-journey-step]"),
            start: "top 72%",
            end: "bottom 20%",
            scrub: 0.5,
            onUpdate: (self) =>
              gsap.set(path, {
                strokeDashoffset: length * (1 - self.progress),
              }),
          })
        );
      });
      cleanupConnectors = () => triggers.forEach((t) => t.kill());
    }

    // Tools / technical skill cards — staggered scroll reveal (scale + rise)
    let cleanupIcons = () => {};
    const iconCards = gsap.utils.toArray("[data-icon-card]", root);
    if (!reduced && iconCards.length) {
      const batch = ScrollTrigger.batch(iconCards, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 28, scale: 0.82 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              ease: "back.out(1.6)",
              stagger: 0.07,
              overwrite: "auto",
            }
          ),
      });
      cleanupIcons = () => batch.forEach((t) => t.kill());
    }

    return () => {
      cleanupReveal();
      cleanupConnectors();
      cleanupIcons();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root || root.contains(st.trigger)) st.kill();
      });
    };
  }, []);

  // Accordion: GSAP height (scrollHeight) + opacity/translateY tween
  useEffect(() => {
    const prev = prevExpanded.current;
    if (prev === expanded) return;
    const reduced = prefersReducedMotion();
    const closeEl = prev != null ? descRefs.current[prev] : null;
    const openEl = expanded != null ? descRefs.current[expanded] : null;

    if (closeEl) {
      if (reduced) {
        gsap.set(closeEl, { height: 0, opacity: 0, y: 0 });
      } else {
        gsap.set(closeEl, { height: closeEl.scrollHeight, opacity: 1, y: 0 });
        gsap.to(closeEl, { height: 0, opacity: 0, duration: 0.25, ease: "power2.inOut" });
      }
    }
    if (openEl) {
      if (reduced) {
        gsap.set(openEl, { height: "auto", opacity: 1, y: 0 });
      } else {
        gsap.set(openEl, { height: 0, opacity: 0, y: 10 });
        gsap.to(openEl, {
          height: openEl.scrollHeight,
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          onComplete: () => gsap.set(openEl, { height: "auto", y: 0 }),
        });
      }
    }
    prevExpanded.current = expanded;
  }, [expanded]);

  return (
    <section
      ref={rootRef}
      id="skills"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-8"
      onClick={(e) => {
        if (!e.target.closest("[data-step-button]")) setOpen(null);
      }}
    >
      <SectionHeading index="03" eyebrow="Process & Tools" title="How Do I Work" />

      {/* ── My Process · journey map ─────────────────────────────── */}
      <div data-reveal>
        <p className="mb-10 pt-4 text-xs font-semibold uppercase tracking-[0.28em] text-faint">
          My Process
        </p>

        <div className="relative">
          {processSteps.map((step, i) => {
            const isExpanded = expanded === i;
            return (
              <div
                key={step.n}
                data-journey-step
                className="group flex gap-6"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex w-12 flex-col items-center">
                  <span
                    className={`font-display text-2xl font-bold leading-none transition-colors duration-300 ${
                      isExpanded
                        ? "text-accent"
                        : "text-accent/60 group-hover:text-accent"
                    }`}
                  >
                    {step.n}
                  </span>
                  {i < processSteps.length - 1 && (
                    <svg
                      className="w-11 min-h-[64px] flex-1"
                      viewBox="0 0 44 100"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        data-journey
                        d="M22 0 L22 100"
                        stroke="#9b8cf2"
                        strokeOpacity="0.35"
                        strokeWidth="1.5"
                        strokeDasharray="5 5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>

                <div className="relative flex-1 pb-9">
                  <button
                    type="button"
                    data-step-button
                    aria-expanded={isExpanded}
                    onClick={() => {
                      setHovered(null);
                      setOpen((prev) => (prev === i ? null : i));
                    }}
                    className="relative z-10 block w-full cursor-pointer text-left"
                  >
                    <span
                      className={`process-heading ${
                        isExpanded ? "text-accent" : "text-ink"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>

                  <div
                    ref={(el) => {
                      descRefs.current[i] = el;
                    }}
                    className="overflow-hidden"
                    style={{ height: 0, opacity: 0 }}
                  >
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Tools I Use ──────────────────────────────────────────── */}
      <div className="mt-16">
        <p className="mb-6 pt-4 text-xs font-semibold uppercase tracking-[0.28em] text-faint">
          Tools I Use
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {tools.map(({ src, label }) => (
            <ToolCard key={label} src={src} label={label} />
          ))}
        </div>
      </div>

      {/* ── Technical Skills ─────────────────────────────────────── */}
      <div className="mt-14">
        <p className="mb-6 pt-4 text-xs font-semibold uppercase tracking-[0.28em] text-faint">
          Technical Skills
        </p>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-7">
          {techSkills.map(({ Icon, label }) => (
            <IconCard key={label} Icon={Icon} label={label} />
          ))}
        </div>
      </div>
    </section>
  );
}
