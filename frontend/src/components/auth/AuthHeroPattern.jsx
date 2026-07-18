import { Butterfly } from "./Butterfly";

const gridStyle = (color) => ({
  backgroundImage: [
    `linear-gradient(${color} 1px, transparent 1px)`,
    `linear-gradient(90deg, ${color} 1px, transparent 1px)`,
  ].join(","),
  backgroundSize: "24px 24px",
});

const darkGridMask =
  "radial-gradient(ellipse 68% 58% at 50% 48%, #000 8%, #000 42%, transparent 78%)";

export function AuthHeroPattern() {
  return (
    <>
      {/* Chasing Butterfly element */}
      <div
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-500 ease-out z-10"
        style={{
          left: "var(--mouse-x)",
          top: "var(--mouse-y)",
        }}
      >
        <div
          className="relative transition-transform duration-300 ease-out"
          style={{
            transform: `scaleX(var(--butterfly-flip, -1))`,
          }}
        >
          <Butterfly className="size-9 drop-shadow-[0_2px_10px_rgba(236,72,153,0.5)]" />
        </div>

        {/* Speech Bubble
        <div className="absolute top-11 -right-3 rounded-lg bg-zinc-900/90 dark:bg-zinc-800/90 px-1.5 py-0.5 text-[9px] font-semibold text-white shadow-md backdrop-blur-xs transition-opacity duration-300">
          <span className="hidden group-hover:inline">hola!</span>
          <span className="inline group-hover:hidden">...</span>
        </div> */}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_90%_70%_at_50%_40%,rgba(0,122,255,0.2),transparent_62%)] dark:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-black via-transparent to-black opacity-70 dark:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-linear-to-b from-black/50 via-transparent to-black/90 dark:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 dark:hidden"
        style={gridStyle("rgba(0,0,0,0.11)")}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
        style={{
          ...gridStyle("rgba(255,255,255,0.07)"),
          WebkitMaskImage: darkGridMask,
          maskImage: darkGridMask,
        }}
      />
    </>
  );
}
