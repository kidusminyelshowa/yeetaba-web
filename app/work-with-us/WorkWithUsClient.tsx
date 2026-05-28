"use client";

import { useState } from "react";
import { submitContactForm } from "./actions";
import "./WorkWithUs.css";

const services = [
  "Gender Equality & Social Inclusion (GESI)",
  "Safeguarding & Protection",
  "Research & Evidence Generation",
  "Communications, Advocacy & Brand",
  "Other / Inquiry",
];

export default function WorkWithUsClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!name.trim()) {
      setStatus({ type: "error", message: "Please enter your name." });
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    if (!service) {
      setStatus({ type: "error", message: "Please select a service." });
      return;
    }
    if (!message.trim()) {
      setStatus({ type: "error", message: "Please describe your project or message." });
      return;
    }

    setLoading(true);
    try {
      const response = await submitContactForm({
        name,
        email,
        organization,
        service,
        message,
      });

      if (response.success) {
        setStatus({ type: "success", message: "Thank you! Your message has been sent successfully. We will get back to you shortly." });
        setName("");
        setEmail("");
        setOrganization("");
        setService("");
        setMessage("");
      } else {
        setStatus({ type: "error", message: response.error || "Failed to submit form." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "A network error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="work-with-us-container">
      <div className="work-with-us-grid">
        
        {/* Info Column */}
        <div className="info-column">
          <h1 className="work-title">Work With Us</h1>
          <p className="work-intro">
            Ready to start a project? We support organizations to build robust systems, 
            clearer strategy, and better integration of safeguarding, ESG, and inclusion. 
            Tell us about your needs and we'll be in touch.
          </p>

          <div className="contact-details-list">
            <div className="contact-item">
              <span className="contact-item-label">General Inquiry</span>
              <a href="mailto:hello@yeetaba.co" className="contact-item-value">
                hello@yeetaba.co
              </a>
              <a href="mailto:yeetabaconsultancy@gmail.com" className="contact-item-value" style={{ marginTop: "2px", fontSize: "16px", opacity: 0.8 }}>
                yeetabaconsultancy@gmail.com
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-item-label">Call Us</span>
              <a href="tel:+251911760472" className="contact-item-value">
                +251 91 176 0472
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-item-label">Address</span>
              <span className="contact-item-value address">
                Tsehay Getachew Building, Office 016/101,<br />
                Addis Ababa, Ethiopia
              </span>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="form-card">
          <form onSubmit={handleSubmit} noValidate>
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name *</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="Your full name"
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address *</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="your.email@example.com"
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="organization" className="form-label">Organization / Company</label>
              <input
                type="text"
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="form-input"
                placeholder="Company or organization name"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <span className="form-label">How can we help you? *</span>
              <div className="service-pills-grid">
                {services.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setService(item)}
                    className={`service-pill-btn ${service === item ? "active" : ""}`}
                    disabled={loading}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Tell us about your project *</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="form-textarea"
                placeholder="Describe your goals, timeline, or any specific requirements..."
                disabled={loading}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner" />
                  <span>Submitting...</span>
                </>
              ) : (
                "Submit Inquiry"
              )}
            </button>

            {status && (
              <div className={`form-feedback ${status.type}`} role="alert">
                {status.message}
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
}
