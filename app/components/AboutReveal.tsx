"use client";

import { useEffect, useRef } from "react";

export default function AboutReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headline = section.querySelector(
      ".about-cards-headline"
    ) as HTMLElement;
    const cards = section.querySelectorAll(
      ".about-card"
    ) as NodeListOf<HTMLElement>;

    // Set initial hidden state
    if (headline) {
      headline.style.opacity = "0";
      headline.style.transform = "translateY(60px)";
    }
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(80px)";
    });

    let ticking = false;
    let hasRevealed = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const windowH = window.innerHeight;

        // --- ENTER ANIMATION ---
        // Trigger when section enters the viewport
        if (!hasRevealed && rect.top < windowH * 0.75) {
          hasRevealed = true;

          if (headline) {
            headline.style.transition =
              "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
            headline.style.opacity = "1";
            headline.style.transform = "translateY(0)";
          }

          cards.forEach((card, i) => {
            setTimeout(() => {
              card.style.transition =
                "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 200 + i * 150); // staggered delay
          });
        }

        // --- EXIT ANIMATION ---
        // When scrolling past, fade out and drift upward
        if (hasRevealed) {
          const sectionBottom = rect.bottom;
          const exitStart = windowH * 0.5; // start fading when bottom reaches mid-viewport

          if (sectionBottom < exitStart && sectionBottom > 0) {
            const progress = 1 - sectionBottom / exitStart;
            const opacity = Math.max(1 - progress * 1.2, 0);
            const drift = progress * 40;

            if (headline) {
              headline.style.transition = "none";
              headline.style.opacity = `${opacity}`;
              headline.style.transform = `translateY(-${drift}px)`;
            }

            cards.forEach((card, i) => {
              const cardDrift = drift + i * 8;
              card.style.transition = "none";
              card.style.opacity = `${opacity}`;
              card.style.transform = `translateY(-${cardDrift}px)`;
            });
          } else if (sectionBottom >= exitStart && rect.top < windowH * 0.75) {
            // Reset to fully visible when back in view
            if (headline) {
              headline.style.transition = "none";
              headline.style.opacity = "1";
              headline.style.transform = "translateY(0)";
            }
            cards.forEach((card) => {
              card.style.transition = "none";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            });
          }
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount in case we're already scrolled
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="about-cards-section" ref={sectionRef}>
      {children}
    </section>
  );
}
