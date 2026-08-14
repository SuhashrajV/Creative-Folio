import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Prepare a path for a stroke-draw by normalising its dash values.
 */
export function prepPath(path) {
  if (!path) return 0;
  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
  return length;
}

/**
 * Scope the given node for `[data-draw]` paths and draw each once as it
 * enters the viewport. Returns the cleanup fn.
 */
export function registerDrawOnScroll(scope, { offset = "top 85%" } = {}) {
  if (!scope || prefersReducedMotion()) return () => {};

  const triggers = [];
  const paths = scope.querySelectorAll("[data-draw]");
  paths.forEach((path) => {
    const length = prepPath(path);
    const trigger = ScrollTrigger.create({
      trigger: path,
      start: offset,
      once: true,
      onEnter: () => {
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
        });
      },
    });
    triggers.push(trigger);
  });
  return () => {
    triggers.forEach((t) => t.kill());
  };
}

/**
 * Bind `[data-draw-hover]` paths to draw-in on hover, rewind on leave.
 */
export function registerDrawOnHover(scope) {
  if (!scope) return () => {};
  const pairs = [];
  const paths = scope.querySelectorAll("[data-draw-hover]");
  paths.forEach((path) => {
    prepPath(path);
    const wrap = path.closest("[data-hover-draw]") || path.parentElement;
    const draw = () =>
      gsap.to(path, { strokeDashoffset: 0, duration: 0.7, ease: "power3.out" });
    const rewind = () =>
      gsap.to(path, {
        strokeDashoffset: path._svLen ?? path.getTotalLength(),
        duration: 0.5,
        ease: "power2.in",
      });
    path._svLen = path.getTotalLength();
    wrap.addEventListener("mouseenter", draw);
    wrap.addEventListener("mouseleave", rewind);
    pairs.push([wrap, draw, rewind]);
  });
  return () => {
    pairs.forEach(([wrap, draw, rewind]) => {
      wrap.removeEventListener("mouseenter", draw);
      wrap.removeEventListener("mouseleave", rewind);
    });
  };
}

/**
 * Register one-shot fade + rise reveals for every `[data-reveal]` element
 * inside scope (staggered with the group delay).
 */
export function registerReveals(scope, { y = 28 } = {}) {
  if (!scope) return () => {};
  const targets = gsap.utils.toArray("[data-reveal]", scope);
  if (prefersReducedMotion()) {
    gsap.set(targets, { autoAlpha: 1, y: 0 });
    return () => {};
  }
  const st = ScrollTrigger.batch(targets, {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        { autoAlpha: 0, y },
        { autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.12 }
      ),
  });
  return () => st.forEach((t) => t.kill());
}
