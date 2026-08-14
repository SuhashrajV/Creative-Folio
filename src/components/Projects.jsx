import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading.jsx";
import {
  registerReveals,
  registerDrawOnHover,
  prefersReducedMotion,
} from "../lib/motion.js";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    index: "01",
    title: "TimeChat",
    subtitle: "Super App Design",
    blurb:
      "A modular super-app experience covering chat, calls, to-dos and settings — designed from research to interactive prototypes.",
    points: [
      "Designed modular UI across Home, Chats & Calls, To-do lists, Settings.",
      "Delivered full-screen flows and interactive prototypes.",
      "Benchmarked UX patterns via competitor analysis (Uranus, WeChat, Telegram, Zoho Cliq)",
    ],
    tags: ["Super App", "Design System"],
    icon: "chat",
  },
  {
    index: "02",
    title: "Approval Desk",
    subtitle: "Enterprise Governance",
    blurb:
      "A governance/approvals platform, designed with AI-prompt-driven Figma workflows to move fast without losing detail.",
    points: [
      "Designed Governance, Approval and Settings modules in Figma with no-code AI workflows.",
      "Ran UX research to match enterprise mental models and flows.",
      "Delivered a theme-aligned, scalable design system.",
    ],
    tags: ["Enterprise", "Web App"],
    icon: "check",
  },
  {
    index: "03",
    title: "SCM Silks",
    subtitle: "E-Commerce Website",
    blurb:
      "A complete e-commerce redesign for a heritage silk brand — researched against the biggest players in Indian fashion retail.",
    points: [
      "Conducted competitive analysis (Pothys, Ajio, Myntra, RmKV) for research direction.",
      "Designed Wishlist, Luxury Points, Gift Card, Referral and Loyalty pages.",
      "Co-designed gift card visuals, custom icons, imagery and font selection.",
    ],
    tags: ["E-commerce", "Web Design", "UX Research"],
    icon: "bag",
  },
];

const catIcons = {
  chat: { viewBox: "0 0 24 24", d: "M12 3.5C7 3.5 3 6.9 3 11c0 1.9.9 3.7 2.3 5L4.3 20l4-1.6c1.1.4 2.4.6 3.7.6 5 0 9-3.4 9-7.5s-4-7.5-9-7.5z" },
  check: { viewBox: "0 0 24 24", d: "M3 12.5 L8 17.5 L21 5.5" },
  bag: { viewBox: "0 0 24 24", d: "M6 8h12l-1 12.5H7L6 8z M9 8V6a3 3 0 0 1 6 0v2" },
};

function ProjectCard({ p, index }) {
  const cardRef = useRef(null);
  const ghostRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const ghost = ghostRef.current;
    if (!card || prefersReducedMotion()) return () => {};

    const fine = window.matchMedia("(pointer: fine)").matches;

    let cleanTilt = () => {};
    if (fine) {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: px * 7,
          rotateX: -py * 7,
          transformPerspective: 900,
          duration: 0.4,
          ease: "power2.out",
        });
      };
      const onLeave = () =>
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.55)",
        });
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanTilt = () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    }

    let cleanGhost = () => {};
    if (ghost) {
      const st = ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) =>
          gsap.set(ghost, { y: self.progress * -70 }),
      });
      cleanGhost = () => st.kill();
    }

    return () => {
      cleanTilt();
      cleanGhost();
    };
  }, []);

  const icon = catIcons[p.icon];

  return (
    <article data-reveal className="relative">
      {/* oversized ghost index */}
      <span
        ref={ghostRef}
        aria-hidden
        className="pointer-events-none absolute -top-14 left-0 z-0 select-none font-display text-[clamp(96px,20vw,190px)] font-bold leading-none tracking-tighter text-line"
        style={{ color: "rgba(155,140,242,0.06)" }}
      >
        {p.index}
      </span>

      <div
        ref={cardRef}
        className="group relative z-10 flex flex-col gap-8 rounded-2xl border border-line bg-surface p-6 will-change-transform transition-colors duration-300 hover:border-accent/40 sm:p-10 lg:flex-row lg:gap-14"
      >
        <div className="lg:w-64 lg:shrink-0">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
            {p.subtitle}
          </p>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {p.title}
          </h3>

          {/* category tag with drawn icon */}
          <span
            data-hover-draw
            className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-1.5 font-mono text-xs text-faint transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent"
          >
            <svg
              viewBox={icon.viewBox}
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path data-draw-hover d={icon.d} />
            </svg>
            {p.subtitle.split(" ").slice(0, 2).join(" ")}
          </span>
        </div>

        <div className="flex-1">
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            {p.blurb}
          </p>
          <ul className="mt-6 space-y-3">
            {p.points.map((pt) => (
              <li key={pt} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70"
                />
                <span className="flex-1">{pt}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {p.tags.map((t) => (
              <span
                key={t}
                data-project-pill
                className="rounded-full border border-line px-3.5 py-1.5 text-xs text-faint transition-colors duration-300 group-hover:border-accent/30 group-hover:text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return () => {};

    const cleanupReveal = registerReveals(root);
    const cleanupHoverDraw = registerDrawOnHover(root);

    // tag pills bounce in
    const pills = gsap.utils.toArray("[data-project-pill]", root);
    let cleanupPills = () => {};
    if (pills.length && !prefersReducedMotion()) {
      const st = ScrollTrigger.batch(pills, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 12, scale: 0.9 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: "back.out(1.7)",
            }
          ),
      });
      cleanupPills = () => st.forEach((t) => t.kill());
    } else {
      gsap.set(pills, { autoAlpha: 1 });
    }

    return () => {
      cleanupReveal();
      cleanupHoverDraw();
      cleanupPills();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root || root.contains(st.trigger)) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="projects"
      className="scroll-mt-24 border-t border-line bg-tint py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="04" eyebrow="Projects" title="Selected work." />
          <a
            href="https://www.behance.net/suhashrajv"
            target="_blank"
            rel="noreferrer"
            className="group mb-14 inline-flex items-center gap-2 rounded-full border border-accent/40 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-accent transition-colors duration-300 hover:bg-accent hover:text-[#0a0a0c]"
          >
            More on Behance
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="space-y-20">
          {projects.map((p, i) => (
            <ProjectCard key={p.index} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
