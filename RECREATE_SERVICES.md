# Recreating the Services Section

This guide provides the necessary code and structure to recreate the **Services Section** of the Ye' Etaba website. The section features a two-column layout with a custom interactive accordion.

## 1. HTML Structure

Add this section to your main layout (e.g., inside `index.html` or a main component wrapper).

```html
<section class="services-section" id="services">
    <div class="services-layout-grid">
        <!-- Left Column: Section Title -->
        <div class="services-left-col">
            <h2 class="services-title">What we<br>offer</h2>
        </div>

        <!-- Right Column: Intro and Accordion -->
        <div class="services-right-col">
            <p class="services-intro">
                We help organizations turn meaningful work into strong systems, 
                ethical practice, and impact that is credible, visible, and sustainable.
            </p>

            <div class="services-accordion">
                <!-- Service Item Example -->
                <div class="service-row">
                    <div class="service-trigger">
                        <span class="service-index">[ 01 ]</span>
                        <span class="service-name">Gender equality and social inclusion (GESI)</span>
                        <span class="service-chevron">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </span>
                    </div>
                    <div class="service-body">
                        <div class="service-content-inner">
                            <div class="service-info">
                                <h4 class="service-tag">Gender equality and social inclusion (GESI)</h4>
                                <p>We provide gender analysis, inclusion audits, and advisory support...</p>
                            </div>
                            <div class="service-image">
                                <img src="/assets/nature-services.png" alt="Service Nature">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Repeat for other items (02, 03, 04) -->
            </div>
        </div>
    </div>
</section>
```

---

## 2. CSS Styling (Vanilla CSS)

The following styles handle the layout and the smooth accordion transition using `grid-template-rows`.

```css
/* Container Layout */
.services-section {
  position: relative;
  background-color: #fff;
  padding: 120px 60px 180px 60px;
  overflow: hidden;
}

.services-layout-grid {
  display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  gap: 80px;
}

.services-title {
  font-family: 'Soliden-Bold', sans-serif;
  font-size: 6rem;
  color: #768e54;
  line-height: 1;
  text-transform: none;
}

.services-intro {
  font-size: 1.8rem;
  color: #768e54;
  line-height: 1.2;
  margin-bottom: 60px;
  font-weight: 500;
}

/* Accordion Logic */
.services-accordion {
  border-top: 1.5px solid #333;
}

.service-row {
  border-bottom: 1.5px solid #333;
  transition: all 0.5s cubic-bezier(0.33, 1, 0.68, 1);
  overflow: hidden;
  cursor: pointer;
}

/* Active State Transformation */
.service-row.active {
  background-color: #768e54;
  border-bottom-color: transparent;
  border-radius: 20px;
  margin: 10px 0;
  padding: 0 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.service-row.active .service-index,
.service-row.active .service-name,
.service-row.active .service-chevron {
  color: #f1eb60;
}

/* Smooth Accordion Body */
.service-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  overflow: hidden;
}

.service-row.active .service-body {
  grid-template-rows: 1fr;
}

.service-content-inner {
  padding: 10px 20px 60px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease 0.2s, transform 0.5s cubic-bezier(0.33, 1, 0.68, 1) 0.2s;
}

.service-row.active .service-content-inner {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 3. Interaction Logic (JavaScript)

This script manages the "active" state of the accordion rows, ensuring only one is open at a time.

```javascript
const accordionRows = document.querySelectorAll('.service-row');

accordionRows.forEach(row => {
    row.addEventListener('click', () => {
        // Close other rows
        accordionRows.forEach(r => {
            if (r !== row) r.classList.remove('active');
        });
        // Toggle current row
        row.classList.toggle('active');
    });
});
```

---

## 4. React Component Version (Recommended)

If you are using the Vite/React setup, you can implement it as a component:

```tsx
import React, { useState } from 'react';

const services = [
  {
    id: "01",
    name: "Gender equality and social inclusion (GESI)",
    desc: "We provide gender analysis, inclusion audits, and advisory support...",
    img: "/assets/nature-services.png"
  },
  // ... other services
];

export const ServicesSection = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="services-section" id="services">
      <div className="services-layout-grid">
        <div className="services-left-col">
          <h2 className="services-title">What we offer</h2>
        </div>
        <div className="services-right-col">
          <p className="services-intro">...</p>
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
                  {/* Chevron SVG */}
                </div>
                <div className="service-body">
                  <div className="service-content-inner">
                    <div className="service-info">
                       <h4 className="service-tag">{s.name}</h4>
                       <p>{s.desc}</p>
                    </div>
                    <div className="service-image">
                       <img src={s.img} alt={s.name} />
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
};
```
