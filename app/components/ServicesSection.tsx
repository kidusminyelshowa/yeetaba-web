"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export interface ServiceItem {
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
    img: "/Vision.jpeg"
  },
  {
    id: "02",
    name: "Safeguarding and Protection Systems",
    desc: "We design and strengthen safeguarding frameworks that protect individuals and communities. This includes policy development, risk assessments, reporting systems, and staff training. We also support organizations to develop and operationalize ESG frameworks. This includes risk identification, compliance alignment, governance structures, and responsible practices.",
    img: "/Care.jpeg"
  },
  {
    id: "03",
    name: "Research and Evidence Generation",
    desc: "We design and conduct qualitative and quantitative research to support decision-making, learning, and accountability. This includes assessments, evaluations, and evidence aligned with donor and regulatory expectations. We also support organizations to define direction, strengthen alignment, and improve operational effectiveness. Our work ensures strategies are practical and grounded in real contexts.",
    img: "/team.jpeg"
  },
  {
    id: "04",
    name: "Communications, Advocacy and Brand",
    desc: "We help organizations clearly articulate their identity and impact. This includes branding, storytelling, advocacy strategy, and stakeholder engagement. We also design and facilitate events that create meaningful engagement. Our approach ensures experiences are inclusive, well-structured, and impactful.",
    img: "/Collaboration.jpeg"
  }
];

interface ServicesSectionProps {
  initialServices?: ServiceItem[];
}

interface ServiceCardProps {
  service: ServiceItem;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  total: number;
}

function ServiceCard({
  service,
  i,
  progress,
  range,
  targetScale,
  total
}: ServiceCardProps) {
  // Parallax scale down as you scroll through subsequent cards
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="service-card-holder">
      <motion.div
        className={`service-card service-card--theme-${i % 4}`}
        style={{
          scale,
          top: `calc(150px + ${i * 20}px)`
        }}
      >
        <div className="service-card-inner">
          <div className="service-card-left">
            <span className="service-card-number">[{service.id}]</span>

            <h3 className="service-card-title">{service.name}</h3>

            <p className="service-card-desc">{service.desc}</p>
          </div>

          <div className="service-card-media">
            <div className="service-media-wrapper">
              {service.img ? (
                <Image
                  src={service.img}
                  alt={service.name}
                  fill
                  className="service-img"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="service-img-placeholder">
                  <span>Ye Etaba</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesSection({ initialServices }: ServicesSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [servicesList, setServicesList] = useState<ServiceItem[]>(
    initialServices && initialServices.length > 0 ? initialServices : fallbackServices
  );

  useEffect(() => {
    if (initialServices && initialServices.length > 0) {
      setServicesList(initialServices);
    }
  }, [initialServices]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="services-section" id="services">
      <div className="services-header-wrapper">
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

      <div className="services-stack">
        {servicesList.map((service, i) => {
          const targetScale = 1 - (servicesList.length - 1 - i) * 0.04;
          const start = i * (1 / servicesList.length);
          return (
            <ServiceCard
              key={service.id || i}
              service={service}
              i={i}
              progress={scrollYProgress}
              range={[start, 1]}
              targetScale={targetScale}
              total={servicesList.length}
            />
          );
        })}
      </div>
    </section>
  );
}
