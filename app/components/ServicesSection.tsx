"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

interface ServiceItem {
  id: string;
  name: string;
  desc: string;
  img?: string;
}

const fallbackServices: ServiceItem[] = [
  {
    id: "01",
    name: "Gender Equality and Social Inclusion (GESI)",
    desc: "We provide gender analysis, inclusion audits, and advisory support to ensure programs and systems are equitable and responsive. Our work helps organizations translate inclusion into measurable outcomes. We also provide technical support for nutrition and public health programs, with a focus on behavior change and community-centered approaches.",
    img: "/GESI.jpeg"
  },
  {
    id: "02",
    name: "Safeguarding and Protection Systems",
    desc: "We design and strengthen safeguarding frameworks that protect individuals and communities. This includes policy development, risk assessments, reporting systems, and staff training. We also support organizations to develop and operationalize ESG frameworks. This includes risk identification, compliance alignment, governance structures, and responsible practices.",
    img: "/Safeguarding.jpeg"
  },
  {
    id: "03",
    name: "Research and Evidence Generation",
    desc: "We design and conduct qualitative and quantitative research to support decision-making, learning, and accountability. This includes assessments, evaluations, and evidence aligned with donor and regulatory expectations. We also support organizations to define direction, strengthen alignment, and improve operational effectiveness. Our work ensures strategies are practical and grounded in real contexts.",
    img: "/Research.jpeg"
  },
  {
    id: "04",
    name: "Communications, Advocacy and Brand",
    desc: "We help organizations clearly articulate their identity and impact. This includes branding, storytelling, advocacy strategy, and stakeholder engagement. We also design and facilitate events that create meaningful engagement. Our approach ensures experiences are inclusive, well-structured, and impactful.",
    img: "/Communications.jpeg"
  }
];

interface ServiceItem {
  id: string;
  name: string;
  desc: string;
  img?: string;
}

interface ServicesSectionProps {
  initialServices?: ServiceItem[];
}

export default function ServicesSection({ initialServices }: ServicesSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [servicesList, setServicesList] = useState<ServiceItem[]>(
    initialServices && initialServices.length > 0 ? initialServices : fallbackServices
  );
  const [scrollDistance, setScrollDistance] = useState(0);
  const [progress, setProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(800);

  useEffect(() => {
    if (initialServices && initialServices.length > 0) {
      setServicesList(initialServices);
    }
  }, [initialServices]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateMeasurements = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distance = trackWidth - viewportWidth;
        setScrollDistance(distance > 0 ? distance : 0);
      }
      setViewportHeight(window.innerHeight);
    };

    // Use ResizeObserver to track layout changes and solve dynamic hydration offsets
    const resizeObserver = new ResizeObserver(() => {
      updateMeasurements();
    });

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    updateMeasurements();
    
    // Multiple timers to handle delayed fonts and images loading
    const timer1 = setTimeout(updateMeasurements, 100);
    const timer2 = setTimeout(updateMeasurements, 400);
    const timer3 = setTimeout(updateMeasurements, 1000);

    const handleScroll = () => {
      if (targetRef.current && trackRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const topOfSection = rect.top + window.scrollY;
        const currentScroll = window.scrollY;

        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distance = trackWidth - viewportWidth;

        if (distance <= 0) {
          setProgress(0);
          return;
        }

        const start = topOfSection;
        const end = topOfSection + distance;

        if (currentScroll < start) {
          setProgress(0);
        } else if (currentScroll > end) {
          setProgress(1);
        } else {
          setProgress((currentScroll - start) / distance);
        }
      }
    };

    window.addEventListener("resize", updateMeasurements);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Run initial alignment
    handleScroll();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMeasurements);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [servicesList]);

  return (
    <section
      ref={targetRef}
      className="services-scroll-container"
      id="services"
      style={{
        height: scrollDistance ? `${scrollDistance + viewportHeight}px` : "200vh"
      }}
    >
      <div className="services-sticky-wrapper">
        <div className="services-header-content">
          <div className="services-header-grid">
            <div className="services-header-left">
              <h2 className="services-title">What we do</h2>
            </div>
            <div className="services-header-right">
              <p className="services-intro">
                We help organizations turn meaningful work into strong systems,
                ethical practice, and impact that is credible, visible, and sustainable.
              </p>
            </div>
          </div>
        </div>

        <div className="services-track-container">
          <div
            ref={trackRef}
            className="services-cards-track"
            style={{
              transform: `translate3d(${-progress * scrollDistance}px, 0px, 0px)`,
              transition: "transform 0.05s linear"
            }}
          >
            {servicesList.map((s) => (
              <div key={s.id} className="service-card-open">
                <div className="service-card-header">
                  <span className="service-card-index">[{s.id}]</span>
                  <h3 className="service-card-title">{s.name}</h3>
                </div>
                <div className="service-card-body">
                  <div className="service-card-info">
                    <p>{s.desc}</p>
                  </div>
                  <div className="service-card-image">
                    <div className="service-img-wrapper">
                      {s.img ? (
                        <Image
                          src={s.img}
                          alt={s.name}
                          fill
                          className="object-cover rounded-2xl"
                        />
                      ) : (
                        <div
                          className="service-img-placeholder"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "20px"
                          }}
                        >
                          <span style={{ color: "#fff", opacity: 0.5, fontSize: "0.8rem" }}>
                            Image coming soon
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}





