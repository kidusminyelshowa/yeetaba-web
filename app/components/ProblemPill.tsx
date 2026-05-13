"use client";

import { useState, useEffect } from "react";

const PAIRS = [
  { strong: "Strong programs", weak: "Weak systems." },
  { strong: "Real impact", weak: "Fragmented communication." },
  { strong: "Committed teams", weak: "Unclear strategy." },
];

export default function ProblemPill() {
  const [index, setIndex] = useState(0);
  const [isStrongTransitioning, setIsStrongTransitioning] = useState(false);
  const [isWeakTransitioning, setIsWeakTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Start blurring Strong
      setIsStrongTransitioning(true);
      
      // 2. Start blurring Weak after 200ms
      setTimeout(() => {
        setIsWeakTransitioning(true);
      }, 200);

      // 3. Swap text and start un-blurring Strong
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % PAIRS.length);
        setIsStrongTransitioning(false);
      }, 700); // 500ms blur + 200ms padding

      // 4. Start un-blurring Weak after another 200ms
      setTimeout(() => {
        setIsWeakTransitioning(false);
      }, 900); // 700ms + 200ms delay
      
    }, 5000); // Slightly longer cycle for the staggered effect

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="problem-pill-container">
      <div className="problem-pill">
        <div className={`pill-part strong ${isStrongTransitioning ? "fade-out" : "fade-in"}`}>
          {PAIRS[index].strong}
        </div>
        <div className="pill-notch"></div>
        <div className={`pill-part weak ${isWeakTransitioning ? "fade-out" : "fade-in"}`}>
          {PAIRS[index].weak}
        </div>
      </div>
    </div>
  );
}
