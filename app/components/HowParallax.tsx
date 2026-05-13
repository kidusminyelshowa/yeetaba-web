"use client";

import { useEffect, useRef } from "react";

export default function HowParallax({
  children,
}: {
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const illustration = section.querySelector(".how-illustration") as HTMLElement;
    const headline = section.querySelector(".how-headline") as HTMLElement;
    const highlight = section.querySelector(".how-highlight") as HTMLElement;
    const subtexts = section.querySelectorAll(".how-subtext");

    // Staggered speeds for parallax effect
    const elements = [
      { el: illustration, speed: 0.12 },
      { el: headline, speed: 0.18 },
      { el: subtexts[0] as HTMLElement, speed: 0.22 },
      { el: highlight, speed: 0.28 },
      { el: subtexts[1] as HTMLElement, speed: 0.32 },
    ];

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Only animate if section is in viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
          // Calculate distance from center of viewport
          const scrollDistance = rect.top - (viewportHeight * 0.2);

          elements.forEach(({ el, speed }) => {
            if (el) {
              const translateY = scrollDistance * speed;
              el.style.transform = `translateY(${translateY}px)`;
            }
          });
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial call to set positions
    onScroll();
    
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="how-section" ref={sectionRef}>
      {children}
    </section>
  );
}
