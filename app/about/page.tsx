import Image from "next/image";
import AboutHero from "../components/AboutHero";
import "../Home.css";
import "./About.css";

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Dynamic Animated Hero Section */}
      <AboutHero />

      {/* Redesigned Story Section: Editorial / Magazine Layout */}
      <section className="about-story-section">
        <div className="about-story-container">
          <div className="about-story-header">
            <h2 className="about-story-main-title">Inspired by Heritage, Driven by Purpose</h2>
          </div>

          {/* Part 1: The Inheritance */}
          <div className="about-story-row">
            <div className="about-story-content-box">
              <h3>Rooted in Care</h3>
              <p>
                Ye Etaba did not start with standard consulting models or templates. It started with a family legacy.
                We were raised by a grandmother who showed us the absolute depth of caring for others and building
                for their well-being, and a mother who demonstrated what it takes to lead communities with strength
                and grace.
              </p>
              <div className="story-quote-card">
                <p>“Care is not just a soft word; it is the absolute foundation of any system that works for people.”</p>
              </div>
            </div>
            <div className="about-story-image-box">
              <Image
                src="/Care.jpeg"
                alt="Inheritance and family inspiration"
                fill
                priority
                className="story-img"
              />
            </div>
          </div>

          {/* Part 2: The Action */}
          <div className="about-story-row reverse">
            <div className="about-story-image-box">
              <Image
                src="/Vision.jpeg"
                alt="Growth and team action"
                fill
                className="story-img"
              />
            </div>
            <div className="about-story-content-box">
              <h3>A Vision Carried Forward</h3>
              <p>
                As two sisters, we recognized that the values of care and leadership must be backed by professional discipline,
                clear systems, and strategic clarity. Too many organizations are doing incredible, life-changing work, yet they
                remain vulnerable because of fragmented communication, fragile strategy, and gaps in safety or compliance.
              </p>
              <p>
                We established Ye Etaba to bridge that gap; translating the inheritance of care into actionable systems,
                ethics, and lasting capability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Core Philosophy */}
      <section className="about-philosophy-section">
        <div className="about-philosophy-container">
          <div className="about-philosophy-header">
            <h2 className="about-philosophy-headline">Our Core Philosophy</h2>
            <p className="about-philosophy-desc">
              Three pillars that guide every client relationship, every policy design, and every system we build.
            </p>
          </div>
          <div className="about-philosophy-grid">
            <div className="philosophy-card">
              <span className="philosophy-num">01</span>
              <h3>Uncompromised Care</h3>
              <p>
                We treat our clients and the communities they serve with the utmost respect. We design systems that
                actively protect, respect, and validate every individual.
              </p>
            </div>
            <div className="philosophy-card">
              <span className="philosophy-num">02</span>
              <h3>Real Accountability</h3>
              <p>
                Ethics, safeguarding, and ESG are not marketing checkboxes. We embed accountability deep into the
                daily operational practices of every organization we partner with.
              </p>
            </div>
            <div className="philosophy-card">
              <span className="philosophy-num">03</span>
              <h3>Implementation Discipline</h3>
              <p>
                A strategy is only as good as its execution. We don&apos;t just deliver reports; we roll up our sleeves
                to co-build and operationalize strategies that last.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Section: How We Work (Staggered Layout) */}
      <section className="about-principles-section">
        <div className="editorial-grid">
          <div className="editorial-col-left">
            <h2 className="about-page-headline">How we work</h2>
          </div>
          <div className="editorial-col-right">
            <p className="about-philosophy-desc" style={{ color: "#4a4a4a" }}>
              Our hands-on methodology focuses on practical integration and active capacity transfer.
            </p>
          </div>
        </div>
        <div className="about-principles-grid">
          <article className="about-principle-item">
            <span className="principle-index">01</span>
            <div>
              <h3>We co-build, not prescribe.</h3>
              <p>
                We work directly with your team, honoring your context and working within your real constraints so solutions actually take root.
              </p>
            </div>
          </article>
          <article className="about-principle-item">
            <span className="principle-index">02</span>
            <div>
              <h3>We hold ethics at the center.</h3>
              <p>
                Safeguarding, gender equality, and responsible practices are designed into your systems from day one, not treated as side tasks.
              </p>
            </div>
          </article>
          <article className="about-principle-item">
            <span className="principle-index">03</span>
            <div>
              <h3>We transfer capacity intentionally.</h3>
              <p>
                We stay close enough to support and embed the work, but we deliberately prepare your team to own and scale it independently.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Redesigned Section: Who We Best Serve (Card Panels) */}
      <section className="about-fit-section">
        <div className="editorial-grid">
          <div className="editorial-col-left">
            <h2 className="about-page-headline">Who we best serve</h2>
          </div>
          <div className="editorial-col-right">
            <p className="about-philosophy-desc" style={{ color: "#4a4a4a" }}>
              We partner with organizations ready to build trust, scale responsibly, and translate their mission into credible results.
            </p>
          </div>
        </div>
        <div className="about-fit-grid">
          <div className="about-fit-card">
            <div className="about-fit-icon">
              <span className="about-fit-icon-symbol"></span>
            </div>
            <div className="about-fit-info">
              <h3>Civil Society & CSOs</h3>
              <p>
                Organizations looking to scale their programs while maintaining robust internal standards of inclusion and safeguarding.
              </p>
            </div>
          </div>
          <div className="about-fit-card">
            <div className="about-fit-icon">
              <span className="about-fit-icon-symbol"></span>
            </div>
            <div className="about-fit-info">
              <h3>Social Enterprises</h3>
              <p>
                Mission-driven business teams seeking to operationalize ESG, build governance, and meet international investor and partner standards.
              </p>
            </div>
          </div>
          <div className="about-fit-card">
            <div className="about-fit-icon">
              <span className="about-fit-icon-symbol"></span>
            </div>
            <div className="about-fit-info">
              <h3>Development Partners</h3>
              <p>
                Agencies navigating complex compliance rules around gender, ESG, GESI, and evidence-based reporting.
              </p>
            </div>
          </div>
          <div className="about-fit-card">
            <div className="about-fit-icon">
              <span className="about-fit-icon-symbol"></span>
            </div>
            <div className="about-fit-info">
              <h3>Forward-Thinking Leaders</h3>
              <p>
                Executives and founders who value a pragmatic, hands-on partner over standard high-level slide decks and theoretical advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Founders & Leadership */}
      <section className="about-founders-section">
        <div className="about-founders-container">
          <div className="about-founders-header">
            <h2 className="about-founders-title">Leadership & Advisors</h2>
            <p className="about-founders-desc">
              Combining complementary expertise in systems design, safeguarding, digital transformation, and organizational strategy.
            </p>
          </div>
          <div className="founders-profiles">
            <div className="founder-profile-card">
              <div className="founder-image-wrapper">
                <Image
                  src="/Kidist.png"
                  alt="Kidist Gemechu"
                  fill
                  className="founder-img"
                />
              </div>
              <div className="founder-profile-info">
                <span className="founder-role">Co-Founder & Director</span>
                <h3>Kidist Gemechu</h3>
                <p>
                  Specializes in strategy development, organization alignment, GESI implementation, and stakeholder advocacy. Committed to building human-centric structures.
                </p>
                <div className="founder-specialties">
                  <span className="founder-tag">GESI</span>
                  <span className="founder-tag">Strategy</span>
                  <span className="founder-tag">Advocacy</span>
                </div>
              </div>
            </div>

            <div className="founder-profile-card">
              <div className="founder-image-wrapper">
                <Image
                  src="/Meti.jpg"
                  alt="Meti Gemechu"
                  fill
                  className="founder-img"
                />
              </div>
              <div className="founder-profile-info">
                <span className="founder-role">Co-Founder & Director</span>
                <p>
                  Focuses on safeguarding, ESG frameworks, research design, compliance management, and training. Focused on turning ethical policies into practical daily work.
                </p>
                <div className="founder-specialties">
                  <span className="founder-tag">Safeguarding</span>
                  <span className="founder-tag">ESG</span>
                  <span className="founder-tag">Research</span>
                </div>
              </div>
            </div>

            <div className="founder-profile-card">
              <div className="founder-image-wrapper">
                <Image
                  src="/Mekdes.JPG"
                  alt="Mekdes Mintesnot Abayneh"
                  fill
                  className="founder-img"
                />
              </div>
              <div className="founder-profile-info">
                <span className="founder-role">Strategic Advisor</span>
                <h3>Mekdes Mintesnot Abayneh</h3>
                <p>
                  Specializes in ICT strategy, digital transformation, business process automation, and information security leadership. Committed to driving sustainable, high-impact technology and organizational change.
                </p>
                <div className="founder-specialties">
                  <span className="founder-tag">ICT Strategy</span>
                  <span className="founder-tag">Digital Transformation</span>
                  <span className="founder-tag">Automation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="editorial-section contact-cta-section about-closing-section">
        <div className="editorial-grid">
          <div className="editorial-col-left">
            <h2 className="editorial-headline">Let&apos;s talk about what you&apos;re working on.</h2>
          </div>
          <div className="editorial-col-right">
            <div className="editorial-body">
              <p>
                We can start with a focused conversation about your priorities, constraints,
                and where support would create immediate value.
              </p>
            </div>
            <a href="/work-with-us" className="hero-btn primary contact-cta">
              <div className="hero-btn-text">Get in Touch</div>
              <div className="hero-btn-arrow">
                <Image src="/Arrow Thick.svg" width={35} height={35} alt="" />
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
