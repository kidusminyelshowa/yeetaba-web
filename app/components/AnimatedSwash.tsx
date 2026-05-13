"use client";

import { useEffect, useRef } from "react";

export default function AnimatedSwash() {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    // Get the length of the path
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = `${length}`;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const windowH = window.innerHeight;
        
        // Calculate progress: 0 when top enters, 1 when bottom leaves
        const totalHeight = windowH + rect.height;
        const currentPos = windowH - rect.top;
        const progress = Math.max(0, Math.min(1, currentPos / totalHeight));

        // Draw the path even more aggressively to ensure the full exit is visible
        const drawProgress = Math.max(0, Math.min(1, progress * 1.6)); 
        path.style.strokeDashoffset = `${length * (1 - drawProgress)}`;
        
        // Subtle parallax movement
        path.style.transform = `translateX(${(progress - 0.5) * 120}px)`;

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="swash-container" ref={containerRef}>
      <svg
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="swash-svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ overflow: "visible" }}
      >
        <path
          ref={pathRef}
          d="M-200,450 C100,350 400,100 700,300 C1000,500 500,900 300,600 C100,300 1000,0 2200,300"
          stroke="var(--brand-primary)"
          strokeWidth="140"
          strokeLinecap="round"
          style={{ opacity: 0.12, transition: "stroke-dashoffset 0.1s ease-out" }}
        />
      </svg>
    </div>
  );
}
