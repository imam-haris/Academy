"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";

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
      {/* ═══════════════════ MAIN BANNER ═══════════════════ */}
      <section className="hero-banner">
        <div className="container banner-grid">
          <div className="banner-content">
            <div className="banner-logo-wrap">
              <Image src="/logo_new.png" alt="World Touch Official Logo" width={190} height={170} className="banner-logo-img" style={{ borderRadius: '50%' }} />
            </div>
            <h1 className="banner-title">WORLD TOUCH</h1>
            <h2 className="banner-subtitle">Coaching Institute</h2>

            <div className="exam-tags-banner">
              <span>SSC</span> <span>BANK</span> <span>RAILWAY</span> <span>BPSC</span> <span>DAROGA</span> <span>BPSC TEACHER</span>
            </div>

            <ul className="banner-features-new">
              <li><span className="feature-dot"></span> Complete Preparation for Government Exams</li>
              <li><span className="feature-dot"></span> Expert Faculty</li>
              <li><span className="feature-dot"></span> Concept + Trick Based Teaching</li>
              <li><span className="feature-dot"></span> Daily Practice Questions</li>
              <li><span className="feature-dot"></span> Weekly Mock Test</li>
            </ul>

            <div className="banner-footer-info">
              <p>📍 Mithanpura, Muzaffarpur, Bihar</p>
              <p>📞 +91-9430655073</p>
            </div>

            <div className="banner-actions">
              <a href="/contact" className="btn-gold">Join Now</a>
            </div>
          </div>

          <div className="banner-director-wrap">
            <Image
              src="/director_new3.jpg"
              alt="Director - World Touch Coaching"
              width={480}
              height={500}
              className="director-pfp-main"
              priority
            />
          </div>
        </div>

        <div className="banner-decoration-new">
          <div className="gold-flow-lines"></div>
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

      {/* ═══════════════ POPULAR COURSES MARQUEE ═══════════════ */}
      <section className="popular-courses-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag" style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1' }}>Trending Units</span>
            <h2 className="section-title">Our <span className="gradient-text">Popular Courses</span></h2>
            <p className="section-desc">Join the most sought-after programs with proven results and expert guidance.</p>
          </div>
        </div>

        <div className="popular-courses-roll">
          <div className="popular-courses-track">
            {/* Duplicating cards for seamless infinite scroll */}
            {[1, 2].map((i) => (
              <div key={i} style={{ display: 'flex', gap: '30px' }}>
                <Link href="/contact" className="mini-course-card">
                  <div className="mini-card-image">
                    <Image src="/ssc.jpg" alt="SSC Course" fill className="object-cover" />
                  </div>
                  <div className="mini-card-body">
                    <h4>SSC Foundation</h4>
                    <span className="mini-card-btn">Enroll Now →</span>
                  </div>
                </Link>

                <Link href="/contact" className="mini-course-card">
                  <div className="mini-card-image">
                    <Image src="/railway.jpg" alt="Railway Course" fill className="object-cover" />
                  </div>
                  <div className="mini-card-body">
                    <h4>Railway Batch</h4>
                    <span className="mini-card-btn">Enroll Now →</span>
                  </div>
                </Link>

                <Link href="/contact" className="mini-course-card">
                  <div className="mini-card-image">
                    <Image src="/bpsc.jpg" alt="BPSC Course" fill className="object-cover" />
                  </div>
                  <div className="mini-card-body">
                    <h4>BPSC (Pre + Mains)</h4>
                    <span className="mini-card-btn">Enroll Now →</span>
                  </div>
                </Link>

                <Link href="/contact" className="mini-course-card">
                  <div className="mini-card-image">
                    <Image src="/biharPolice.jpg" alt="Bihar Police Course" fill className="object-cover" />
                  </div>
                  <div className="mini-card-body">
                    <h4>Bihar Police Special</h4>
                    <span className="mini-card-btn">Enroll Now →</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="more-courses-link-wrap animate-on-scroll">
            <Link href="/courses" className="btn-more-features">
              Explore More Courses
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </div>
      </section>

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
                <li>✓ Maths, Reasoning, History, Polity &amp; more</li>
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
                  src="/director_new3.jpg"
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
