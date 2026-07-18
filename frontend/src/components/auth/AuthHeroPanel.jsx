import { useRef, useEffect } from "react";
import { APP_NAME } from "../AppLogo";
import { AuthHeroPattern } from "./AuthHeroPattern";

const heroPanelClassName = [
  "group relative flex min-h-[min(320px,42vh)] shrink-0 flex-col overflow-hidden",
  "bg-[#E8E8ED] dark:bg-black",
  "md:w-[44%] md:max-w-xl md:border-r md:border-black/10 dark:md:border-white/10",
  "lg:w-[42%] lg:max-w-none",
].join(" ");

const heroImageClassName = [
  "h-auto max-h-[min(50vh,440px)] w-[min(95%,23rem)]",
  "animate-auth-float-y",
  "object-contain object-center select-none motion-reduce:animate-none",
  "sm:w-[min(92%,26rem)] md:max-h-[min(60vh,520px)] md:w-[min(92%,28rem)]",
].join(" ");

export function AuthHeroPanel() {
  const panelRef = useRef(null);
  const flapTimeoutRef = useRef(null);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (flapTimeoutRef.current) {
        clearTimeout(flapTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Determine movement direction relative to previous position
    let flip = -1;
    if (panelRef.current.lastX !== undefined) {
      if (x < panelRef.current.lastX - 1) {
        flip = -1; // Moving left, face left (scaleX(-1))
      } else if (x > panelRef.current.lastX + 1) {
        flip = 1;  // Moving right, face right (scaleX(1))
      } else {
        flip = panelRef.current.lastFlip || -1;
      }
    }
    panelRef.current.lastX = x;
    panelRef.current.lastFlip = flip;

    panelRef.current.style.setProperty("--mouse-x", `${x}px`);
    panelRef.current.style.setProperty("--mouse-y", `${y}px`);
    panelRef.current.style.setProperty("--butterfly-flip", `${flip}`);

    // Speed up wing flapping on mouse movement
    panelRef.current.style.setProperty("--flap-duration", "0.08s");

    if (flapTimeoutRef.current) {
      clearTimeout(flapTimeoutRef.current);
    }
    flapTimeoutRef.current = setTimeout(() => {
      if (panelRef.current) {
        // Slow down to gentle resting flap
        panelRef.current.style.setProperty("--flap-duration", "0.4s");
      }
    }, 400);
  };

  const handleMouseLeave = () => {
    if (flapTimeoutRef.current) {
      clearTimeout(flapTimeoutRef.current);
    }
    if (!panelRef.current) return;
    panelRef.current.style.setProperty("--mouse-x", "88%");
    panelRef.current.style.setProperty("--mouse-y", "85%");
    panelRef.current.style.setProperty("--butterfly-flip", "-1");
    panelRef.current.style.setProperty("--flap-duration", "0.4s");
    panelRef.current.lastFlip = -1;
  };

  return (
    <section
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={heroPanelClassName}
      style={{
        "--mouse-x": "88%",
        "--mouse-y": "85%",
        "--butterfly-flip": "-1",
        "--flap-duration": "0.4s",
      }}
    >
      <AuthHeroPattern />

      <div className="relative z-1 flex flex-1 flex-col px-6 pb-6 pt-8 md:px-8 md:pb-8 md:pt-10">
        <div className="text-center md:text-left">
          <p className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500 dark:text-[#636366]">
            Secure gateway
          </p>
          <h2 className="text-balance font-mono text-[1.15rem] font-semibold uppercase leading-snug tracking-[0.06em] text-zinc-900 dark:text-white sm:text-[1.25rem]">
            Open {APP_NAME}
          </h2>
          <p className="mx-auto mt-2.5 max-w-[22rem] text-pretty font-mono text-[11px] font-medium leading-relaxed tracking-wide text-zinc-600 dark:text-[#98989D] md:mx-0 md:max-w-none">
            Chats, photos, and reactions stay in sync—sign in on the right to continue.
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center py-6 md:py-4">
          <img
            src="/auth.png"
            alt=""
            width={640}
            height={640}
            className={heroImageClassName}
            draggable={false}
            decoding="async"
          />
        </div>

        <p className="text-center font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-[#636366] md:text-left">
          End-to-end session · Encrypted in transit
        </p>
      </div>
    </section>
  );
}
