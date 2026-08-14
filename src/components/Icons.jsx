import { useId } from "react";

export const FigmaIcon = ({ className = "" }) => (
  <svg viewBox="0 0 16 24" className={className} aria-hidden="true">
    {/* Bottom-left: red */}
    <path fill="#F24E1E" d="M4 24c2.2 0 4-1.8 4-4v-4H4a4 4 0 0 0 0 8z" />
    {/* Middle-left: green */}
    <path fill="#0ACF83" d="M0 12c0-2.2 1.8-4 4-4h4v8H4a4 4 0 0 1-4-4z" />
    {/* Top-left: orange */}
    <path fill="#FF7262" d="M0 4a4 4 0 0 1 4-4h4v8H4a4 4 0 0 1-4-4z" />
    {/* Top-right: purple */}
    <path fill="#A259FF" d="M8 0h4a4 4 0 0 1 0 8H8V0z" />
    {/* Circle-right: blue */}
    <path fill="#1ABCFE" d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
  </svg>
);

export const HtmlIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#E34F26" aria-hidden="true">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
  </svg>
);

export const CssIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#1572B6" aria-hidden="true">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
  </svg>
);

export const BootstrapIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#7952B3" aria-hidden="true">
    <path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z" />
  </svg>
);

export const TailwindIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#06B6D4" aria-hidden="true">
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
  </svg>
);

export const VSCodeIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#007ACC" aria-hidden="true">
    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
  </svg>
);

const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.6,
  "aria-hidden": "true",
};

// AI Image Generation — image frame + sparkles
export const SparklesIcon = ({ className = "" }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#EC4899" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* Image frame */}
      <rect x="3" y="3" width="18" height="18" rx="2.5" stroke={`url(#${id}a)`} strokeWidth="1.6" />
      {/* Sun / circle in top-left */}
      <circle cx="8" cy="8.5" r="1.8" fill={`url(#${id}a)`} />
      {/* Mountain / landscape shape */}
      <path d="M3 16.5l4.5-5 3.5 4 2.5-2.5L21 21H3z" fill={`url(#${id}a)`} opacity="0.25" stroke={`url(#${id}a)`} strokeWidth="1.2" strokeLinejoin="round" />
      {/* Sparkle star top-right outside frame */}
      <path d="M20 1l.6 1.4L22 3l-1.4.6L20 5l-.6-1.4L18 3l1.4-.6z" fill={`url(#${id}a)`} />
    </svg>
  );
};

// AI Assisted UI Dev — code brackets + spark
export const AiDesignIcon = ({ className = "" }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      {/* Code bracket left */}
      <path d="M8 7L3 12l5 5" stroke={`url(#${id}b)`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Code bracket right */}
      <path d="M16 7l5 5-5 5" stroke={`url(#${id}b)`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Slash */}
      <path d="M13 4l-2 16" stroke={`url(#${id}b)`} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
      {/* Spark top-right */}
      <path d="M20 2l.4 1L22 4l-1.6.6L20 6l-.4-1L18 4l1.6-.6z" fill={`url(#${id}b)`} />
    </svg>
  );
};

// ── New tool icons ─────────────────────────────────────────────────────────

// Notion — dark page with N letterform
export const NotionIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect width="24" height="24" rx="3" fill="#191919" />
    <path d="M7 6.5h3.2L15.8 14V6.5H17.5v11h-3.2L8.7 10v7.5H7z" fill="white" />
  </svg>
);

// JavaScript — official logo (simple-icons path)
export const JsIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect width="24" height="24" fill="#F7DF1E" />
    <path
      d="m22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"
      fill="#323330"
    />
  </svg>
);

// Claude (Anthropic) — warm orange A-frame
export const ClaudeIcon = ({ className = "" }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={`${id}cl`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#D97757" />
          <stop offset="1" stopColor="#E8A07A" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill={`url(#${id}cl)`} opacity="0.12" />
      <circle cx="12" cy="12" r="10" stroke={`url(#${id}cl)`} strokeWidth="1.4" />
      <path
        d="M8.5 17L12 7.5L15.5 17M10 14h4"
        stroke={`url(#${id}cl)`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Stitch (Google AI) — Google-colored needle + thread
export const StitchIcon = ({ className = "" }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={`${id}st`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4285F4" />
          <stop offset="0.33" stopColor="#EA4335" />
          <stop offset="0.66" stopColor="#FBBC04" />
          <stop offset="1" stopColor="#34A853" />
        </linearGradient>
      </defs>
      <path d="M4 20L20 4" stroke={`url(#${id}st)`} strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="19.2" cy="4.8" rx="1.5" ry="0.9" transform="rotate(-45 19.2 4.8)" stroke={`url(#${id}st)`} strokeWidth="1.2" />
      <path d="M6 12Q8 10 10 12" stroke={`url(#${id}st)`} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 16Q12 14 14 16" stroke={`url(#${id}st)`} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
};

// Antigravity (AI coding assistant) — rocket with purple gradient
export const AntigravityIcon = ({ className = "" }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={`${id}ag`} x1="0" y1="0" x2="0.6" y2="1">
          <stop stopColor="#694DF9" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <path
        d="M12 3C14.5 3 17.5 6.5 17.5 11.5V16L12 18.5L6.5 16V11.5C6.5 6.5 9.5 3 12 3Z"
        fill={`url(#${id}ag)`}
        opacity="0.18"
        stroke={`url(#${id}ag)`}
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10" r="2" stroke={`url(#${id}ag)`} strokeWidth="1.5" />
      <path d="M6.5 14.5L4 18L6.5 17" stroke={`url(#${id}ag)`} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.5 14.5L20 18L17.5 17" stroke={`url(#${id}ag)`} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 18.5Q12 22 14 18.5" stroke={`url(#${id}ag)`} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

// Codex (OpenAI) — terminal prompt in OpenAI green
export const CodexIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
    <rect width="24" height="24" rx="3" fill="#10A37F" opacity="0.1" />
    <rect width="24" height="24" rx="3" stroke="#10A37F" strokeWidth="1.4" />
    <path
      d="M5 8.5l4.5 3.5L5 15.5M11.5 15.5H19"
      stroke="#10A37F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Opencode — open-source code brackets in blue-cyan
export const OpencodeIcon = ({ className = "" }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={`${id}oc`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <path d="M9 6L4 12l5 6" stroke={`url(#${id}oc)`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 6l5 6-5 6" stroke={`url(#${id}oc)`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.2" stroke={`url(#${id}oc)`} strokeWidth="1.5" />
    </svg>
  );
};

// Cursor (AI code editor) — arrow pointer in the Cursor teal palette
export const CursorIcon = ({ className = "" }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={`${id}cu`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#3DD2C2" />
          <stop offset="1" stopColor="#2266DC" />
        </linearGradient>
      </defs>
      <path
        d="M6 3.2c0-1 .8-1.6 1.6-1.1l13.6 7.6c.9.5.6 1.9-.4 2l-6.3.8 3.7 5.7c.5.8.2 1.8-.7 2.1l-1.7.6c-.8.3-1.7-.1-2.1-.9l-3.6-6.2-3.4 3.3c-.7.7-1.9.3-2.2-.6L5.6 4.2c-.2-.4 0-.7.4-1z"
        fill={`url(#${id}cu)`}
        opacity="0.2"
        stroke={`url(#${id}cu)`}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M6 3.2c0-1 .8-1.6 1.6-1.1l13.6 7.6c.9.5.6 1.9-.4 2l-6.3.8 3.7 5.7c.5.8.2 1.8-.7 2.1l-1.7.6c-.8.3-1.7-.1-2.1-.9l-3.6-6.2-3.4 3.3c-.7.7-1.9.3-2.2-.6L5.6 4.2c-.2-.4 0-.7.4-1z"
        fill={`url(#${id}cu)`}
        opacity="0.55"
      />
    </svg>
  );
};
