"use client";

import { useEffect, useRef } from "react";

export default function HeroParallax({
  children,
}: {
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headline = section.querySelector(".hero-headline") as HTMLElement;
    const body = section.querySelector(".hero-body") as HTMLElement;
    const actions = section.querySelector(".hero-actions") as HTMLElement;
    const feature = section.querySelector(
      ".hero-project-feature"
    ) as HTMLElement;

    const elements = [
      { el: headline, speed: 0.35 },
      { el: body, speed: 0.25 },
      { el: actions, speed: 0.15 },
      { el: feature, speed: 0.35 },
    ];

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const sectionHeight = section.offsetHeight;

        if (scrollY <= sectionHeight) {
          elements.forEach(({ el, speed }) => {
            if (el) {
              const translateY = scrollY * speed;
              const opacity = 1 - scrollY / sectionHeight;
              el.style.transform = `translateY(-${translateY}px)`;
              el.style.opacity = `${Math.max(opacity, 0)}`;
            }
          });
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero-section" ref={sectionRef}>
      {children}
    </section>
  );
}
