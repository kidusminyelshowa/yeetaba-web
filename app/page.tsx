import Image from "next/image";
import HeroParallax from "./components/HeroParallax";
import AboutReveal from "./components/AboutReveal";
import ProblemPill from "./components/ProblemPill";
import AnimatedSwash from "./components/AnimatedSwash";
import ServicesSection from "./components/ServicesSection";
import HowParallax from "./components/HowParallax";
import "./Home.css";

const clientLogos = [
  { src: "/ELiDA Logo.svg", alt: "ELiDA" },
  { src: "/Setaweet.svg", alt: "Setaweet Movement" },
  { src: "/YWCA.svg", alt: "YWCA Ethiopia" },
  { src: "/Women Deliver.svg", alt: "Women Deliver" },
];

export default function Home() {
  return (
    <main>
      <HeroParallax>
        <div className="hero-content">
          <h1 className="hero-headline">
            We build strong systems<br />
            for meaningful work.
          </h1>
          <p className="hero-body">
            Working with organizations that are delivering important programs but need stronger systems,
            clearer strategy, and better integration of safeguarding, ESG, and inclusion.
          </p>
          <div className="hero-actions">
            <a href="/work-with-us" className="hero-btn primary">
              <div className="hero-btn-text">Let's work together</div>
              <div className="hero-btn-arrow">
                <Image src="/Arrow Thick.svg" width={35} height={35} alt="" />
              </div>
            </a>
            <a href="/projects" className="hero-btn secondary">
              <div className="hero-btn-text">See our work</div>
              <div className="hero-btn-arrow">
                <Image src="/Arrow Thick.svg" width={35} height={35} alt="" />
              </div>
            </a>
          </div>
        </div>

        <div className="hero-project-feature">
          <div className="feature-image">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
              alt="ELiDA Project"
              fill
              className="object-cover"
            />
          </div>
          <div className="feature-details">
            <h3 className="feature-title">ELiDA</h3>
            <p className="feature-desc">
              Not with generic frameworks or borrowed solutions, but by working alongside you to build systems, strategy, and practice that actually hold.
            </p>
          </div>
          <a href="/projects/project-one" className="feature-cta">
            <div className="feature-cta-text">Explore Project</div>
            <div className="feature-cta-arrow">
              <Image src="/Arrow Thick.svg" width={24} height={24} alt="" />
            </div>
          </a>
        </div>
      </HeroParallax>

      <AboutReveal>
        <div className="about-cards-container">
          <h2 className="about-cards-headline">Ye Etaba didn&apos;t begin as a business idea.</h2>

          <div className="about-cards-grid">
            <div className="about-card">
              <div className="about-card-content">
                <h3>It is rooted in what we <br /><span className="highlight">inherited.</span></h3>
              </div>
              <div className="about-card-image">
                <Image
                  src="/Inheritance.jpeg"
                  alt="Inheritance Illustration"
                  width={500}
                  height={400}
                  className="card-illustration"
                />
              </div>
            </div>

            <div className="about-card">
              <div className="about-card-content">
                <p>
                  Two sisters. A grandmother who showed us what it means to care for people. A mother who showed us how to lead.
                </p>
              </div>
              <div className="about-card-image">
                <Image
                  src="/Growth.jpeg"
                  alt="Growth Illustration"
                  width={500}
                  height={400}
                  className="card-illustration"
                />
              </div>
            </div>

            <div className="about-card last-card">
              <div className="about-card-content">
                <h3>That&apos;s still how we work.</h3>
              </div>
              <div className="about-card-footer">
                <a href="/about" className="hero-btn primary about-card-cta">
                  <div className="hero-btn-text">More About Us</div>
                  <div className="hero-btn-arrow">
                    <Image src="/Arrow Thick.svg" width={35} height={35} alt="" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </AboutReveal>

      <section className="problems-section editorial-section">
        <AnimatedSwash />
        <div className="editorial-grid">
          <div className="editorial-col-left">
            <h2 className="editorial-headline problem-headline">
              A LOT OF ORGANIZATIONS ARE DOING IMPORTANT WORK. NOT ALL OF THEM HAVE THE SYSTEMS TO SUSTAIN IT.
            </h2>

            <ProblemPill />

            <p className="problem-closing-alt">That&apos;s the gap we exist to close.</p>
          </div>

          <div className="editorial-col-right">
            <div className="problem-image-wrapper">
              <Image
                src="/team.jpeg"
                alt="Ye Etaba Team working"
                width={800}
                height={600}
                className="problem-image"
              />
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />

      <HowParallax>
        <div className="how-grid">
          <div className="how-illustration">
            <Image
              src="/more.png"
              alt="Building together"
              width={800}
              height={600}
              className="object-contain"
            />
          </div>

          <div className="how-content">
            <h2 className="how-headline">
              We don&apos;t stop at<br />recommendations.
            </h2>
            <p className="how-subtext">
              We work alongside organizations to build and embed solutions.
            </p>
          </div>
        </div>
      </HowParallax>

      <section className="projects-section editorial-section">
        <div className="editorial-grid">
          <div className="editorial-col-left">
            <h2 className="editorial-headline">
              Organizations we&apos;ve worked with.
            </h2>
          </div>

          <div className="editorial-col-right">
            <div className="client-strip" aria-label="Organizations we have worked with">
              <div className="client-logo-track">
                {clientLogos.concat(clientLogos).map((logo, index) => (
                  <div className="client-logo-item" key={`${logo.alt}-${index}`}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={130}
                      height={48}
                      className="client-logo-image"
                    />
                  </div>
                ))}
              </div>
            </div>
            <p className="client-context">
              Across civil society, development, and the social enterprise sector.
            </p>
            <a href="/projects" className="hero-btn primary projects-cta">
              <div className="hero-btn-text">View Our Work</div>
              <div className="hero-btn-arrow">
                <Image src="/Arrow Thick.svg" width={35} height={35} alt="" />
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="contact-cta-section editorial-section">
        <div className="editorial-grid">
          <div className="editorial-col-left">
            <h2 className="editorial-headline">
              Let&apos;s talk about what you&apos;re working on.
            </h2>
          </div>

          <div className="editorial-col-right">
            <div className="editorial-body">
              <p>Building something new. Fixing something that isn&apos;t working.</p>
              <p>Not sure where to start — that&apos;s fine too.</p>
            </div>
            <a href="/work-with-us" className="hero-btn primary contact-cta">
              <div className="hero-btn-text">Get in touch</div>
              <div className="hero-btn-arrow">
                <Image src="/Arrow Thick.svg" width={35} height={35} alt="" />
              </div>
            </a>
            <div className="contact-info-footer">
              <span className="contact-email">hello@yeetaba.co</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
