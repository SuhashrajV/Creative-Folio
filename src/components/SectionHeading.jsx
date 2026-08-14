import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../lib/motion.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section label slides in from the left, thin purple underline draws
 * beneath it; the headline reveals word-by-word with a mask wipe.
 */
export default function SectionHeading({ index, eyebrow, title }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const label = root.querySelector("[data-sh-label]");
    const line = root.querySelector("[data-sh-line]");
    const words = gsap.utils.toArray("[data-sh-word]", root);

    gsap.fromTo(
      label,
      { autoAlpha: 0, x: -28 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 88%", once: true },
      }
    );

    gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.9,
        ease: "power2.inOut",
        scrollTrigger: { trigger: root, start: "top 88%", once: true },
      }
    );

    gsap.fromTo(
      words,
      { yPercent: 120 },
      {
        yPercent: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      }
    );
  }, []);

  return (
    <div ref={rootRef} className="mb-14">
      <p
        data-sh-label
        className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
      >
        {index} / {eyebrow}
      </p>
      <div data-sh-line className="mt-3 h-px w-16 origin-left bg-accent" />
      <h2 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-6xl">
        {title.split(" ").map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-top pb-1">
            <span data-sh-word className="inline-block will-change-transform">
              {word}
              {i < title.split(" ").length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
