export function Butterfly({ className, style }) {
  return (
    <svg
      viewBox="0 0 36 36"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="butterflyWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" /> {/* rose-500 */}
          <stop offset="50%" stopColor="#d946ef" /> {/* fuchsia-500 */}
          <stop offset="100%" stopColor="#6366f1" /> {/* indigo-500 */}
        </linearGradient>
      </defs>
      
      {/* Left Wing Group */}
      <g className="animate-butterfly-left-wing" style={{ transformOrigin: "18px 18px" }}>
        {/* Main wing */}
        <path
          d="M18,17 C14,8 3,8 2,15 C1,22 10,23 17,19 C14,24 8,29 9,31 C11,33 16,28 18,20 Z"
          fill="url(#butterflyWingGrad)"
          opacity="0.95"
        />
        {/* Wing highlights / patterns */}
        <path
          d="M14,14 C12,10 6,10 5,14 C4,18 9,19 13,17 Z"
          fill="#ffffff"
          opacity="0.35"
        />
        <path
          d="M14,21 C12,23 9,25 9,26 C10,27 13,25 15,22 Z"
          fill="#ffffff"
          opacity="0.3"
        />
      </g>

      {/* Right Wing Group */}
      <g className="animate-butterfly-right-wing" style={{ transformOrigin: "18px 18px" }}>
        {/* Main wing */}
        <path
          d="M18,17 C22,8 33,8 34,15 C35,22 26,23 19,19 C22,24 28,29 27,31 C25,33 20,28 18,20 Z"
          fill="url(#butterflyWingGrad)"
          opacity="0.95"
        />
        {/* Wing highlights / patterns */}
        <path
          d="M22,14 C24,10 30,10 31,14 C32,18 27,19 23,17 Z"
          fill="#ffffff"
          opacity="0.35"
        />
        <path
          d="M22,21 C24,23 27,25 27,26 C26,27 23,25 21,22 Z"
          fill="#ffffff"
          opacity="0.3"
        />
      </g>

      {/* Body and Antennae */}
      <g className="fill-zinc-800 dark:fill-zinc-200">
        {/* Antennae */}
        <path d="M17.5,10 C16.5,7 13.5,7 12.5,8.5" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" fill="none" className="stroke-zinc-800 dark:stroke-zinc-300" />
        <path d="M18.5,10 C19.5,7 22.5,7 23.5,8.5" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" fill="none" className="stroke-zinc-800 dark:stroke-zinc-300" />
        {/* Body */}
        <rect x="17.25" y="10" width="1.5" height="15" rx="0.75" />
        {/* Head */}
        <circle cx="18" cy="9.25" r="1.25" />
      </g>
    </svg>
  );
}
