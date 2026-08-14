import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading.jsx";
import BlurHighlight from "./BlurHighlight.jsx";
import { registerReveals, prefersReducedMotion } from "../lib/motion.js";

gsap.registerPlugin(ScrollTrigger);

const BLOB_A =
  "M50 4 C79 4 96 25 96 50 C96 75 77 96 50 96 C23 96 4 75 4 50 C4 25 21 4 50 4 Z";
const BLOB_B =
  "M50 10 C82 2 95 30 92 56 C89 82 68 98 46 93 C24 88 2 72 6 44 C9 20 28 14 50 10 Z";

export default function About() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return () => {};

    const cleanupReveal = registerReveals(root);
    const reduced = prefersReducedMotion();

    const blob = root.querySelector("[data-blob]");
    const badge = root.querySelector("[data-rating]");

    if (blob && !reduced) {
      gsap.to(blob, {
        attr: { d: BLOB_B },
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.fromTo(
        blob,
        { y: 60 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }

    if (badge) {
      if (reduced) {
        gsap.set(badge, { autoAlpha: 1, scale: 1 });
      } else {
        gsap.set(badge, { autoAlpha: 0, scale: 0.5 });
        ScrollTrigger.create({
          trigger: root,
          start: "top 45%",
          once: true,
          onEnter: () =>
            gsap.to(badge, {
              autoAlpha: 1,
              scale: 1,
              duration: 0.9,
              delay: 0.35,
              ease: "back.out(1.8)",
            }),
        });
      }
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
      id="about"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-28 sm:px-8"
    >
      <SectionHeading
        index="01"
        eyebrow="About me"
        title="Designer by craft, builder by mindset."
      />

      <div className="grid items-center gap-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="space-y-6 text-base leading-relaxed text-muted sm:text-lg">
            <BlurHighlight
              highlightedBits={[
                "pixel-perfect interfaces",
                "full design process",
              ]}
              viewportOptions={{ once: true, amount: 0.4 }}
            >
              I'm a{" "}
              <span className="font-semibold text-ink">
                UI/UX &amp; Product Designer
              </span>{" "}
              based in Coimbatore — I specialize in crafting pixel-perfect
              interfaces that don't just look great, but actually work. From
              research to final handoff, I own the full design process.
            </BlurHighlight>
            <BlurHighlight
              highlightedBits={[
                "design-to-code loop",
                "clean, responsive HTML, CSS & Tailwind",
              ]}
              viewportOptions={{ once: true, amount: 0.4 }}
            >
              My edge is the{" "}
              <span className="font-semibold text-ink">
                design-to-code loop
              </span>{" "}
              — I wireframe and prototype in Figma, then convert designs into
              clean, responsive HTML, CSS &amp; Tailwind. Fast delivery, without
              losing craft.
            </BlurHighlight>
          </div>
        </div>

        <div className="relative lg:col-span-2">
          {/* morphing blob behind the photo */}
          <svg
            className="pointer-events-none absolute -inset-8 -z-0 h-[115%] w-[115%]"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              data-blob
              d={BLOB_A}
              fill="rgba(155,140,242,0.08)"
              stroke="rgba(155,140,242,0.25)"
              strokeWidth="0.6"
            />
          </svg>

          <div data-reveal className="relative z-10">
            <div className="overflow-hidden rounded-2xl border border-line">
              <img
                src="/assets/suhash_color.jpeg"
                alt="Suhashraj V"
                className="h-full w-full object-cover object-top"
                style={{ maxHeight: "460px" }}
              />
            </div>
          </div>

          {/* Work Experience badge */}
          <div
            data-rating
            className="absolute -bottom-6 left-6 z-20 flex items-center gap-4 rounded-2xl border border-line bg-[#101014]/90 px-5 py-4 backdrop-blur-md"
            style={{ visibility: "hidden" }}
          >
            <span className="font-display text-3xl font-bold text-accent">
              1.7
            </span>
            <div className="h-9 w-px bg-line" />
            <span className="max-w-[7.5rem] text-xs leading-snug text-muted">
              Years of Work Experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
