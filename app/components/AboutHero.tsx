"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const title = section.querySelector(".about-hero-title") as HTMLElement;
    const body = section.querySelector(".about-hero-body") as HTMLElement;
    const imageContainer = section.querySelector(".about-hero-image-wrapper") as HTMLElement;

    // Entrance animation on mount
    setTimeout(() => {
      if (title) {
        title.style.opacity = "1";
        title.style.transform = "translateY(0)";
      }
    }, 150);

    setTimeout(() => {
      if (body) {
        body.style.opacity = "1";
        body.style.transform = "translateY(0)";
      }
      if (imageContainer) {
        imageContainer.style.opacity = "1";
        imageContainer.style.transform = "translateY(0) scale(1)";
      }
    }, 300);

    // Scroll parallax animation
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const sectionHeight = section.offsetHeight;

        if (scrollY <= sectionHeight) {
          const progress = scrollY / sectionHeight;

          if (title) {
            title.style.transform = `translateY(${scrollY * 0.12}px)`;
          }
          if (body) {
            body.style.transform = `translateY(${scrollY * 0.08}px)`;
          }
          if (imageContainer) {
            imageContainer.style.transform = `translateY(-${scrollY * 0.15}px) scale(${1 + progress * 0.03})`;
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="about-hero-section" ref={sectionRef}>
      <div className="about-hero-grid">
        <div className="about-hero-text">
          <h1 className="about-hero-title">
            Systems built<br />to succeed.
          </h1>
          <div className="about-hero-body">
            <p>
              We partner with mission-driven organizations to align strategy, systems, and ethics, turning
              intent into lasting, sustainable practice.
            </p>
            <a href="/work-with-us" className="hero-btn primary about-hero-cta">
              <div className="hero-btn-text">Work with us</div>
              <div className="hero-btn-arrow">
                <Image src="/Arrow Thick.svg" width={35} height={35} alt="" />
              </div>
            </a>
          </div>
        </div>
        <div className="about-hero-visual">
          <div className="about-hero-image-wrapper">
            <Image
              src="/Collaboration.jpeg"
              alt="Professional strategic collaboration"
              fill
              priority
              className="about-hero-img"
            />
            <div className="about-hero-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
