import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerReveals, prefersReducedMotion } from "../lib/motion.js";

gsap.registerPlugin(ScrollTrigger);

const headline = [
  { t: "Let's", cls: "text-ink", delay: 0 },
  { t: "build", cls: "text-ink", delay: 0 },
  { t: "something", cls: "text-ink", delay: 0 },
  { t: "meaningful", cls: "text-ink-dim font-semibold", delay: 0.45 },
  { t: "and", cls: "text-accent", delay: 0.75 },
  { t: "memorable", cls: "text-ink font-bold", delay: 1.05 },
  { t: ".", cls: "text-ink", delay: 0 },
];

const links = [
  {
    label: "Email",
    value: "suhashrajvkgs78@gmail.com",
    href: "mailto:suhashrajvkgs78@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "Suhash's LinkedIn",
    href: "https://www.linkedin.com/in/suhashrajvelusamy/",
  },
  {
    label: "Behance",
    value: "behance.net/suhashrajv",
    href: "https://www.behance.net/suhashrajv",
  },
];

export default function Contact() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return () => {};

    const cleanupReveal = registerReveals(root);

    if (!prefersReducedMotion()) {
      const words = gsap.utils.toArray("[data-contact-word]", root);
      gsap.fromTo(
        words,
        { yPercent: 130 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: (i) => parseFloat(words[i].dataset.contactDelay ?? "0.08"),
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            once: true,
          },
        }
      );
    }

    return () => {
      cleanupReveal();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root || root.contains(st.trigger)) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-32 text-center sm:px-8"
    >
      {/* faint drifting grid behind */}
      <div
        aria-hidden
        className="bg-drift-grid pointer-events-none absolute inset-0 -z-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative">
        <p
          data-reveal
          className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-accent"
        >
          05 / Contact
        </p>

        <h2 className="mx-auto max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          {headline.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-2 align-top">
              <span
                data-contact-word
                data-contact-delay={w.delay}
                className={`inline-block will-change-transform ${w.cls}`}
              >
                {w.t}
                {i < headline.length - 1 ? "\u00A0" : ""}
              </span>
            </span>
          ))}
        </h2>

        <p
          data-reveal
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Have a product, website or idea that needs a designer who can take it
          from sketch to shipped code? I'd love to hear about it.
        </p>

        <div className="mt-14 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-reveal
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="contact-card group relative flex flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-line bg-surface p-6"
            >
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-faint">
                {l.label}
              </span>
              <span className="flex items-center justify-between gap-4">
                <span className="block whitespace-nowrap truncate font-display text-base font-medium text-ink sm:text-lg">
                  {l.value}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-xl text-accent transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </span>
            </a>
          ))}
        </div>

        <p data-reveal className="mt-12 text-sm text-faint">
          Based in Coimbatore, Tamil Nadu · Usually replies within a day
        </p>
      </div>
    </section>
  );
}
