"use client";

import React, { useState } from "react";
import Image from "next/image";

const services = [
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

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="services-section" id="services">
      <div className="services-layout-grid">
        <div className="services-left-col">
          <h2 className="services-title">What we do</h2>
        </div>
        <div className="services-right-col">
          <p className="services-intro">
            We help organizations turn meaningful work into strong systems,
            ethical practice, and impact that is credible, visible, and sustainable.
          </p>
          <div className="services-accordion">
            {services.map((s) => (
              <div
                key={s.id}
                className={`service-row ${activeId === s.id ? 'active' : ''}`}
                onClick={() => setActiveId(activeId === s.id ? null : s.id)}
              >
                <div className="service-trigger">
                  <span className="service-index">[{s.id}]</span>
                  <span className="service-name">{s.name}</span>
                  <span className="service-chevron">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
                <div className="service-body">
                  <div className="service-content-inner">
                    <div className="service-info">
                      <p>{s.desc}</p>
                    </div>
                    <div className="service-image">
                      <div className="service-img-wrapper">
                        {/* We will need to ensure these images exist or use the generated ones */}
                        <div className="service-img-placeholder" style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px' }}>
                          <span style={{ color: '#fff', opacity: 0.5, fontSize: '0.8rem' }}>Image coming soon</span>
                        </div>
                      </div>
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
