import Image from 'next/image';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-wordmark">
              <Image
                src="/ye-etaba-logo-wordmark.svg"
                alt="Ye Etaba Wordmark"
                width={600}
                height={120}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <p className="footer-tagline">For organizations doing meaningful work.</p>
          </div>

          <div className="footer-nav">
            <div className="footer-nav-group">
              <span className="footer-nav-label">Navigation</span>
              <div className="footer-nav-links">
                <a href="/">Home</a>
                <a href="/about">About</a>

                <a href="/projects">Work</a>
                <a href="/contact">Contact</a>
              </div>
            </div>

            <div className="footer-nav-group">
              <span className="footer-nav-label">Contact</span>
              <div className="footer-nav-links">
                <span className="footer-info-item">Tsehay Getachew Building, Office 016/101, Addis Ababa, Ethiopia</span>
                <a href="tel:+251911760472" className="footer-info-item">+251 91 176 0472</a>
                <a href="mailto:hello@yeetaba.co" className="footer-info-item">hello@yeetaba.co</a>
                <a href="https://www.yeetaba.co" target="_blank" className="footer-info-item">www.yeetaba.co</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2026 Ye&apos;Etaba Consultancy. All rights reserved.
          </div>

          <div className="footer-socials">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">LinkedIn</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
