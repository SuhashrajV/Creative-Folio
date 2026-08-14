import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../lib/motion.js";

/**
 * 00 / INTRO SEQUENCE — full-screen stage.
 * Stroke draws purple, fill floods off-white, V keeps its accent.
 */
export default function Intro({ onDone }) {
  const stageRef = useRef(null);
  const innerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const nameStrokeRef = useRef(null);
  const nameFillRef = useRef(null);
  const lineRef = useRef(null);
  const roleRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const reduced = prefersReducedMotion();

    const buildTimeline = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          onDone();
        },
      });

      const exit = () => {
        window.dispatchEvent(new CustomEvent("sv:exit-start"));
      };

      if (reduced) {
        gsap.set([nameStrokeRef.current, nameFillRef.current], {
          clipPath: "inset(0% 0% 0% 0%)",
        });
        gsap.set(nameStrokeRef.current, { autoAlpha: 0 });
        gsap.set(lineRef.current, { scaleX: 1 });
        gsap.set([eyebrowRef.current, roleRef.current], { autoAlpha: 1, y: 0 });
        tl.to(stageRef.current, {
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.in",
          onStart: exit,
        });
        return tl;
      }

      gsap.set(innerRef.current, { autoAlpha: 1 });
      gsap.set(nameStrokeRef.current, { clipPath: `inset(0% 100% 0% 0%)` });
      gsap.set(nameFillRef.current, { clipPath: `inset(0% 100% 0% 0%)` });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set([eyebrowRef.current, roleRef.current], { autoAlpha: 0, y: 14 });

      tl.to(eyebrowRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      })
        // name draws stroke-first in purple (1.5s)
        .to(
          nameStrokeRef.current,
          {
            clipPath: `inset(0% 0% 0% 0%)`,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "+=0.15"
        )
        .to(
          lineRef.current,
          { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
          "<"
        )
        // fill floods off-white, overlapping the last 0.3s of the draw
        .to(
          nameFillRef.current,
          {
            clipPath: `inset(0% 0% 0% 0%)`,
            duration: 0.5,
            ease: "power2.inOut",
          },
          ">=-0.3"
        )
        .to(
          roleRef.current,
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          ">=-0.5"
        )
        // once the fill has flooded, melt the purple outline away
        .to(
          nameStrokeRef.current,
          { autoAlpha: 0, duration: 0.6, ease: "power1.inOut" },
          ">=-0.3"
        )
        // hold, then exit — fade + lift, hand off to the hero
        .to(
          stageRef.current,
          {
            y: -24,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onStart: exit,
          },
          "+=0.35"
        );

      return tl;
    };

    const tl = buildTimeline();
    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, [onDone]);

  return (
    <div
      ref={stageRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050506]"
      aria-hidden="true"
    >
      <div ref={innerRef} className="w-full px-6 text-center">
        <p
          ref={eyebrowRef}
          className="mb-8 text-[11px] font-medium uppercase tracking-[0.42em] text-faint"
        >
          Available for Freelance &amp; Full time
        </p>

        {/* Name — stroke layer draws purple first, fill floods over it */}
        <div className="relative mx-auto w-fit">
          <div
            ref={nameStrokeRef}
            className="absolute inset-0"
            style={{ clipPath: "inset(0% 100% 0% 0%)" }}
          >
            <h1
              className="text-outline font-display text-[clamp(60px,14vw,120px)] font-bold leading-none tracking-tight"
              style={{ color: "transparent", WebkitTextStroke: "1.5px #9b8cf2" }}
            >
              Suhashraj <span>V</span>
            </h1>
          </div>
          <div
            ref={nameFillRef}
            className="relative"
            style={{ clipPath: "inset(0% 100% 0% 0%)" }}
          >
            <h1 className="font-display text-[clamp(60px,14vw,120px)] font-bold leading-none tracking-tight text-[#f4f3f7]">
              Suhashraj <span className="text-[#9b8cf2]">V</span>
            </h1>
          </div>
        </div>

        {/* 120px progress line, fills in sync with the name draw */}
        <div className="mx-auto mt-7 h-px w-[120px] overflow-hidden bg-line">
          <div ref={lineRef} className="h-full w-full bg-accent" />
        </div>

        <p
          ref={roleRef}
          className="mt-7 text-xs uppercase tracking-[0.34em] text-[#7d70c8] sm:text-sm"
        >
          UI/UX &amp; Product Designer
        </p>
      </div>
    </div>
  );
}
