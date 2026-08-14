import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "../lib/motion.js";

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const fromTransform = (dir) =>
  dir === "left"
    ? "translateX(-110%)"
    : dir === "right"
      ? "translateX(110%)"
      : dir === "top"
        ? "translateY(-110%)"
        : "translateY(110%)";

/**
 * Blur Highlight (React Bits Pro equivalent).
 *
 * The wrapped paragraph blurs in (blur → sharp, dim → full) when it enters
 * the viewport, and the given phrases auto-highlight with a directional
 * color wipe. Colour-weight only — no background pill, no underline.
 *
 * `children` may be plain text or JSX (inline <strong> / <span> etc.) —
 * highlighting is applied to matching text nodes while other elements are
 * preserved.
 */
export default function BlurHighlight({
  children,
  highlightedBits = [],
  highlightColor = "#9b8cf2",
  highlightClassName = "",
  blurAmount = 8,
  inactiveOpacity = 0.3,
  blurDelay = 0,
  blurDuration = 0.8,
  highlightDelay = 0.4,
  highlightDuration = 1,
  highlightDirection = "left",
  viewportOptions = { once: false, amount: 0.5 },
  className = "",
}) {
  const rootRef = useRef(null);
  const wipeRefs = useRef([]);
  const [inView, setInView] = useState(false);

  const reduced = prefersReducedMotion();

  const highlightSet = useMemo(() => new Set(highlightedBits), [highlightedBits]);
  const pattern = useMemo(() => {
    if (!highlightedBits.length) return null;
    return new RegExp(`(${highlightedBits.map(escapeRegExp).join("|")})`, "g");
  }, [highlightedBits]);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return () => {};
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (viewportOptions.once) io.disconnect();
        } else if (!viewportOptions.once) {
          setInView(false);
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: Math.min(viewportOptions.amount ?? 0.5, 1),
      }
    );
    io.observe(root);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, viewportOptions.once, viewportOptions.amount]);

  useEffect(() => {
    if (reduced || !rootRef.current) return;
    const root = rootRef.current;
    if (!inView) {
      gsap.to(root, {
        filter: `blur(${blurAmount}px)`,
        opacity: inactiveOpacity,
        duration: 0.4,
        ease: "power2.out",
      });
      return;
    }
    gsap.to(root, {
      filter: "blur(0px)",
      opacity: 1,
      duration: blurDuration,
      delay: blurDelay,
      ease: "power2.out",
    });
    wipeRefs.current.filter(Boolean).forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        transform: "translate(0, 0)",
        duration: highlightDuration,
        delay: highlightDelay + i * 0.12,
        ease: "power3.out",
      });
    });
  }, [inView, reduced, blurAmount, inactiveOpacity, blurDelay, blurDuration, highlightDelay, highlightDuration]);

  // Build the rendered children, splitting string text nodes on the
  // highlight phrases so inline JSX (strong/spans) survives untouched.
  let wipeIndex = 0;
  const renderNodes = (nodes) =>
    Children.map(nodes, (node, idx) => {
      if (typeof node === "string" || typeof node === "number") {
        if (!pattern) return node;
        const parts = String(node).split(pattern).filter(Boolean);
        return parts.map((text, j) => {
          if (highlightSet.has(text)) {
            return (
              <span
                key={`${idx}-${j}`}
                className={`relative inline-block ${highlightClassName}`}
                style={{ color: highlightColor }}
              >
                <span className="inline-block overflow-hidden align-bottom">
                  <span
                    ref={(el) => {
                      if (el) wipeRefs.current[wipeIndex] = el;
                      wipeIndex += 1;
                    }}
                    className="inline-block will-change-transform"
                    style={{
                      transform: reduced ? "translate(0, 0)" : fromTransform(highlightDirection),
                    }}
                  >
                    {text}
                  </span>
                </span>
              </span>
            );
          }
          return <span key={`${idx}-${j}`}>{text}</span>;
        });
      }
      if (isValidElement(node) && node.props && node.props.children != null) {
        return cloneElement(node, { key: idx, children: renderNodes(node.props.children) });
      }
      return node;
    });

  return (
    <p
      ref={rootRef}
      className={className}
      style={
        reduced
          ? undefined
          : {
              filter: `blur(${blurAmount}px)`,
              opacity: inactiveOpacity,
            }
      }
    >
      {renderNodes(children)}
    </p>
  );
}
