'use client';

import { useState } from 'react';
import Image from 'next/image';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className={`navbar-overlay ${isOpen ? 'is-open' : ''}`} 
        onClick={() => setIsOpen(false)}
      />
      <nav className={`navbar-container ${isOpen ? 'is-open' : ''}`}>
      <div className="navbar-header">
        <div 
          className="navbar-menu-button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          role="button"
          tabIndex={0}
        >
          <div className="navbar-hamburger">
            <span></span>
            <span></span>
          </div>
          <span className="close-text">Close</span>
        </div>
        
        <div className="navbar-logos">
          <div className="navbar-logo-icon">
            <Image 
              src="/ye-etaba-logo-icon.svg" 
              alt="Ye Etaba Icon" 
              width={60} 
              height={40}
              priority
            />
          </div>

          <div className="navbar-logo-wordmark">
            <Image 
              src="/ye-etaba-logo-wordmark.svg" 
              alt="Ye Etaba Wordmark" 
              width={100} 
              height={20}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="navbar-content">
          <div className="menu-divider"></div>
          <a href="/" className="menu-item" onClick={() => setIsOpen(false)}>
            <span>Home</span>
            <Image src="/Arrow Thin.svg" width={40} height={40} className="menu-arrow" alt="" />
          </a>
          
          <div className="menu-divider"></div>
          <a href="/about" className="menu-item" onClick={() => setIsOpen(false)}>
            <span>About us</span>
            <Image src="/Arrow Thin.svg" width={40} height={40} className="menu-arrow" alt="" />
          </a>
          
          <div className="menu-divider"></div>
          <a href="/services" className="menu-item" onClick={() => setIsOpen(false)}>
            <span>Services</span>
            <Image src="/Arrow Thin.svg" width={40} height={40} className="menu-arrow" alt="" />
          </a>
          
          <div className="menu-divider"></div>
          <a href="/projects" className="menu-item" onClick={() => setIsOpen(false)}>
            <span>Projects</span>
            <Image src="/Arrow Thin.svg" width={40} height={40} className="menu-arrow" alt="" />
          </a>
        </div>
      )}
    </nav>
    </>
  );
}
