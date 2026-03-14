"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Navbar Scroll Effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll(".animate-on-scroll");
    animateElements.forEach(el => observer.observe(el));

    // Stats Counter Animation (Simulated for this transformation)
    // In a real app, we might use a library or more complex logic,
    // but we'll stick to the original feel.

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <Navbar />
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="hero" id="hero">
        <div className="hero-inner">
          {/* Text Content */}
          <div className="hero-content">
            <div className="hero-badge animate-on-scroll">
              <span className="badge-dot"></span>
              Empowering Minds. Achieving Excellence.
            </div>
            <h1 className="hero-title animate-on-scroll">
              World Touch <br />
              <span className="gradient-text">Coaching</span>
            </h1>
            <p className="hero-subtitle animate-on-scroll">
              <strong>Premium Training for SSC, Railway, BPSC, Bihar Police, Banking, CTET/STET & UGC NET.</strong><br />
              Miscot lane, 2nd floor, Sinha complex, Near Jubba Sahni Park, Mithanpura, Muzaffarpur.<br />
              <span style={{ display: 'block', marginTop: '15px', fontStyle: 'italic', color: 'var(--accent-indigo)' }}>
                "A beacon of excellence where aspirations meet structured guidance and proven results."
              </span>
            </p>
            <div className="hero-ctas animate-on-scroll">
              <a href="/courses" className="btn-primary btn-lg">
                Enroll Now
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <a href="/courses" className="btn-outline btn-lg">
                Explore Courses
              </a>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line"></div>
        </div>
      </section>



      {/* ═══════════════════ ANNOUNCEMENT MARQUEE STRIP ═══════════════════ */}
      <div className="announcement-strip">
        <div className="announcement-marquee-wrap">
          <div className="announcement-marquee">
            <span>🎯 Target Batch / Crash Course for All Exams &nbsp;@&nbsp;<strong>₹6,000</strong></span>
            <span className="sep">•</span>
            <span>📝 Mock Test Series for All Exams &nbsp;@&nbsp;<strong>₹3,000</strong></span>
            <span className="sep">•</span>
            <span>📖 Pick Any Subject Notes &nbsp;@&nbsp;<strong>₹99</strong></span>
            <span className="sep">•</span>
            <span>🎯 Target Batch / Crash Course for All Exams &nbsp;@&nbsp;<strong>₹6,000</strong></span>
            <span className="sep">•</span>
            <span>📝 Mock Test Series for All Exams &nbsp;@&nbsp;<strong>₹3,000</strong></span>
            <span className="sep">•</span>
            <span>📖 Pick Any Subject Notes &nbsp;@&nbsp;<strong>₹99</strong></span>
          </div>
        </div>
      </div>

      {/* ═══════════════ SPECIAL OFFERS ═══════════════ */}
      <section className="offers-section" id="offers">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag" style={{ background: 'rgba(234,88,12,0.08)', borderColor: 'rgba(234,88,12,0.25)', color: '#ea580c' }}>Not Enrolled Yet?</span>
            <h2 className="section-title">Special Offers for <span className="gradient-text">Every Aspirant</span></h2>
            <p className="section-desc">You don{"'"}t need to join a full batch to benefit from World Touch Coaching. Pick exactly what you need.</p>
          </div>

          <div className="offers-grid">
            <div className="offer-card animate-on-scroll">
              <div className="offer-icon-wrap"><span className="offer-icon">🎯</span></div>
              <div className="offer-badge" style={{ background: '#6366f1' }}>Most Popular</div>
              <h3>Target Batch / Crash Course</h3>
              <p>Intensive, fast-tracked preparation for all government exams — SSC, Railway, BPSC, Banking &amp; more.</p>
              <div className="offer-price">
                <span className="offer-amount">₹6,000</span>
                <span className="offer-period">/ Full Course</span>
              </div>
              <ul className="offer-features">
                <li>✓ Covers all major govt. exams</li>
                <li>✓ Expert faculty guidance</li>
                <li>✓ Practice sheets included</li>
                <li>✓ Doubt clearing sessions</li>
              </ul>
              <a href="/contact" className="btn-primary btn-block">Enquire Now</a>
            </div>

            <div className="offer-card animate-on-scroll">
              <div className="offer-icon-wrap" style={{ background: 'rgba(59,130,246,0.08)' }}><span className="offer-icon">📝</span></div>
              <h3>Mock Test Series</h3>
              <p>Sharpen your speed and accuracy with full-length mock tests designed exactly like the real exams.</p>
              <div className="offer-price">
                <span className="offer-amount">₹3,000</span>
                <span className="offer-period">/ Full Series</span>
              </div>
              <ul className="offer-features">
                <li>✓ All competitive exams covered</li>
                <li>✓ Detailed performance analysis</li>
                <li>✓ Timer-based practice</li>
                <li>✓ Rank benchmarking</li>
              </ul>
              <a href="/contact" className="btn-primary btn-block" style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}>Enquire Now</a>
            </div>

            <div className="offer-card animate-on-scroll">
              <div className="offer-icon-wrap" style={{ background: 'rgba(16,185,129,0.08)' }}><span className="offer-icon">📖</span></div>
              <div className="offer-badge" style={{ background: '#10b981' }}>Best Value</div>
              <h3>Subject-Wise Notes</h3>
              <p>Handcrafted, exam-focused notes for individual subjects. Perfect for self-study students.</p>
              <div className="offer-price">
                <span className="offer-amount">₹99</span>
                <span className="offer-period">/ per subject</span>
              </div>
              <ul className="offer-features">
                <li>✓ Maths, History, Polity &amp; more</li>
                <li>✓ Concise &amp; exam-ready</li>
                <li>✓ Instant digital delivery</li>
                <li>✓ Printed copy available</li>
              </ul>
              <a href="/contact" className="btn-primary btn-block" style={{ background: 'linear-gradient(135deg,#10b981,#3b82f6)' }}>Get Notes</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ABOUT SECTION ═══════════════════ */}
      <section className="features" id="about" style={{ paddingBottom: '0' }}>
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">About Us</span>
            <h2 className="section-title">About <span className="gradient-text">World Touch Coaching</span></h2>
            <p className="section-desc">
              World Touch Coaching is a premier coaching institute specializing in government exam preparation — SSC, Railway, BPSC, Bihar Police, Bihar SI, Defence, Banking, CTET/STET, and UGC NET.
              Our mission is to provide structured guidance, experienced mentorship, and an environment where students can unlock their full potential.
            </p>
            <p className="section-desc" style={{ marginTop: '20px' }}>
              With expert faculty, well-designed study materials, and rigorous mock test series, we prepare students for success across all major
              government competitive exams with proven strategies and personalized attention.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ RESULTS SECTION (New) ═══════════════════ */}
      <section className="features" id="results">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Achievements</span>
            <h2 className="section-title">Our <span className="gradient-text">Success Record</span></h2>
            <p className="section-desc">Consistency is the hallmark of World Touch Coaching.</p>
          </div>

          <div className="stats-grid-container animate-on-scroll">
            <div className="stat-card">
              <div className="stat-number">
                <span className="stat-value">5000</span><span className="stat-suffix">+</span>
              </div>
              <span className="stat-label">Students Mentored</span>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                <span className="stat-value">1200</span><span className="stat-suffix">+</span>
              </div>
              <span className="stat-label">Selections</span>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                <span className="stat-value">50</span><span className="stat-suffix">+</span>
              </div>
              <span className="stat-label">Top Rankers</span>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                <span className="stat-value">10</span><span className="stat-suffix">+</span>
              </div>
              <span className="stat-label">Years Excellence</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ DIRECTOR SECTION ═══════════════════ */}
      <section className="features" id="director">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Leadership</span>
            <h2 className="section-title">Meet Our <span className="gradient-text">Director</span></h2>
            <p className="section-desc">Guiding the next generation of toppers with expertise and vision.</p>
          </div>

          <div className="director-card-container animate-on-scroll">
            <div className="director-card">
              <div className="director-image-wrapper">
                <Image
                  src="/director.jpg"
                  alt="Director - World Touch Coaching"
                  width={400}
                  height={500}
                  className="director-image"
                />
              </div>
              <div className="director-info">
                <div className="director-badge">Director</div>
                <h3>13 Years of Excellence</h3>
                <p className="director-specialty">Expert in <strong>Maths & GS</strong></p>
                <div className="director-quote">
                  "Our mission is to empower every student with the right tools, knowledge, and confidence to crack government exams and secure their future."
                </div>
                <div className="director-stats">
                  <div className="dir-stat">
                    <span>13+</span>
                    <small>Years Exp.</small>
                  </div>
                  <div className="dir-stat-divider"></div>
                  <div className="dir-stat">
                    <span>5000+</span>
                    <small>Students</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card animate-on-scroll">
            <div className="cta-glow"></div>
            <h2>Ready to start your success journey?</h2>
            <p>Join World Touch Coaching today and take the first step towards your academic goals.</p>
            <div className="cta-actions">
              <a href="/courses" className="btn-primary btn-lg">Enroll Now</a>
              <a href="/contact" className="btn-ghost">Talk to a Counselor →</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
