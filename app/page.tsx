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
              Achieve Academic Excellence<br />
              <span className="gradient-text">with Expert Coaching</span>
            </h1>
            <p className="hero-subtitle animate-on-scroll">
              Join thousands of students preparing for competitive exams with structured learning, 
              experienced faculty, and personalized mentorship.
            </p>
            <div className="hero-ctas animate-on-scroll">
              <a href="#programs" className="btn-primary btn-lg">
                Enroll Now
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="#programs" className="btn-outline btn-lg">
                Explore Programs
              </a>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line"></div>
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
          
          <div className="hero-stats animate-on-scroll" style={{ background: 'var(--bg-secondary)', padding: '60px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
            <div className="stat">
              <span className="stat-value">5000</span><span className="stat-suffix">+</span>
              <span className="stat-label">Students Mentored</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">1200</span><span className="stat-suffix">+</span>
              <span className="stat-label">Selections</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">50</span><span className="stat-suffix">+</span>
              <span className="stat-label">Top Rankers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">10</span><span className="stat-suffix">+</span>
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
              <a href="#courses" className="btn-primary btn-lg">Enroll Now</a>
              <a href="#about" className="btn-ghost">Talk to a Counselor →</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
