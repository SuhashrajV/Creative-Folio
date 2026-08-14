import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../lib/motion.js";
import LightRays from "./LightRays.jsx";

export default function Hero() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reduced = prefersReducedMotion();
    const els = [eyebrowRef.current, nameRef.current, roleRef.current];
    const ctas = gsap.utils.toArray("[data-hero-cta]", ctaRef.current);

    const play = () => {
      if (reduced) {
        gsap.set([els, ctas], { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.set(els, { autoAlpha: 0, y: 18 });
      gsap.set(ctas, { autoAlpha: 0, y: 14 });
      const tl = gsap.timeline();
      tl.to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" })
        .to(
          nameRef.current,
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
          ">=-0.1"
        )
        .to(
          roleRef.current,
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
          ">=-0.15"
        )
        .to(
          ctas,
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.1 },
          ">=-0.15"
        );
    };

    if (reduced) {
      play();
      return;
    }

    const onExitStart = () => {
      play();
      window.removeEventListener("sv:exit-start", onExitStart);
    };
    window.addEventListener("sv:exit-start", onExitStart);
    return () => window.removeEventListener("sv:exit-start", onExitStart);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-20"
    >
      {/* subtle breath of accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-44 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[160px]"
      />

      {/* light purple rays */}
      <div className="absolute inset-0 opacity-40">
        <LightRays
          raysOrigin="top-center"
          raysColor="#9b8cf2"
          raysSpeed={1.2}
          lightSpread={0.6}
          rayLength={1.1}
          fadeDistance={1.2}
          saturation={1.0}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.05}
          distortion={0.03}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-5 text-center sm:px-8">
        <p
          ref={eyebrowRef}
          className="text-[11px] font-medium uppercase tracking-[0.42em] text-faint"
        >
          Available for Freelance &amp; Full time
        </p>

        <h1
          ref={nameRef}
          className="mt-6 font-display text-[clamp(56px,12vw,140px)] font-bold leading-[0.95] tracking-tight text-ink"
        >
          Suhashraj <span className="text-accent">V</span>
        </h1>

        <p
          ref={roleRef}
          className="mt-6 font-display text-xl tracking-tight text-[#7d70c8] sm:text-3xl"
        >
          UI/UX &amp; Product Designer
        </p>

        <div ref={ctaRef} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            data-hero-cta
            className="group rounded-full bg-accent-btn px-8 py-3.5 text-sm font-semibold text-[#0a0a0c] transition-transform duration-300 hover:-translate-y-0.5"
          >
            View work
            <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="/assets/Suhashraj%20V%20Resume%20UiUX.pdf"
            data-hero-cta
            download
            className="group inline-flex items-center gap-2 rounded-full border border-line px-8 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Download resume
            <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
