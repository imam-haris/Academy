"use client";

import { useEffect, useState } from "react";

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
      {/* ═══════════════════ NAVIGATION ═══════════════════ */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <a href="#" className="nav-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="url(#logo-grad)" strokeWidth="2" fill="none"/>
                <path d="M16 8L22 11.5V18.5L16 22L10 18.5V11.5L16 8Z" fill="url(#logo-grad)"/>
                <defs>
                  <linearGradient id="logo-grad" x1="4" y1="2" x2="28" y2="30">
                    <stop stopColor="#6366f1"/>
                    <stop offset="1" stopColor="#a855f7"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span>Nexus Academy</span>
          </a>

          <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
            <li><a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a></li>
            <li><a href="#programs" onClick={() => setIsMobileMenuOpen(false)}>Programs</a></li>
            <li><a href="#learning-method" onClick={() => setIsMobileMenuOpen(false)}>Learning Method</a></li>
            <li><a href="#courses" onClick={() => setIsMobileMenuOpen(false)}>Courses</a></li>
            <li><a href="#success-stories" onClick={() => setIsMobileMenuOpen(false)}>Success Stories</a></li>
          </ul>

          <div className={`nav-actions ${isMobileMenuOpen ? "active" : ""}`}>
            <a href="#" className="btn-ghost">Student Login</a>
            <a href="#courses" className="btn-primary btn-sm">Enroll Now</a>
          </div>

          <button 
            className="mobile-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

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
              <a href="#courses" className="btn-primary btn-lg">
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

      {/* ═══════════════════ LOGOS (Partner Institutions/Success Partners) ═══════════════════ */}
      <section className="logos-section">
        <div className="container">
          <p className="logos-label animate-on-scroll">Our students have secured ranks in</p>
          <div className="logos-marquee animate-on-scroll">
            <div className="logos-track">
              {['IIT Bombay', 'AIIMS Delhi', 'IIT Delhi', 'NLSIU', 'BITS Pilani', 'IIM Ahmedabad', 'IIT Madras', 'CMC Vellore'].map((uni, i) => (
                <div key={i} className="logo-item">{uni}</div>
              ))}
              {['IIT Bombay', 'AIIMS Delhi', 'IIT Delhi', 'NLSIU', 'BITS Pilani', 'IIM Ahmedabad', 'IIT Madras', 'CMC Vellore'].map((uni, i) => (
                <div key={i+"copy"} className="logo-item">{uni}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ ABOUT SECTION ═══════════════════ */}
      <section className="features" id="about" style={{ paddingBottom: '0' }}>
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">About Us</span>
            <h2 className="section-title">About <span className="gradient-text">Nexus Academy</span></h2>
            <p className="section-desc">
              Nexus Academy is a premier coaching institute dedicated to helping students achieve excellence in academics and competitive examinations. 
              Our mission is to provide structured guidance, experienced mentorship, and an environment where students can unlock their full potential.
            </p>
            <p className="section-desc" style={{ marginTop: '20px' }}>
              With expert faculty, well-designed study materials, and data-driven performance tracking, we prepare students for success in exams 
              like JEE, NEET, UPSC, and other competitive assessments.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROGRAMS SECTION ═══════════════════ */}
      <section className="features" id="programs">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Our Programs</span>
            <h2 className="section-title">Specialized <span className="gradient-text">Coaching Units</span></h2>
            <p className="section-desc">Comprehensive preparation modules tailored for every academic milestone.</p>
          </div>

          <div className="features-grid">
            {/* Program 1 */}
            <div className="feature-card feature-card-large animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="url(#p1)" strokeWidth="2"/><path d="M18 24L22 28L30 20" stroke="url(#p1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="p1" x1="4" y1="4" x2="44" y2="44"><stop stopColor="#6366f1"/><stop offset="1" stopColor="#a855f7"/></linearGradient></defs></svg>
              </div>
              <h3>Engineering Entrance Coaching</h3>
              <p>Comprehensive preparation for JEE Main and JEE Advanced with concept-focused learning and advanced problem solving.</p>
              <div className="feature-visual">
                <div className="code-preview">
                  <div className="code-header"><span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span></div>
                  <pre><code><span className="code-keyword">const</span> result = <span className="code-func">Nexus</span>.<span className="code-method">optimizeRank</span>({`\n  `}exam: <span className="code-string">'JEE_Advanced'</span>,{`\n  `}physics: <span className="code-bool">true</span>,{`\n  `}maths: <span className="code-bool">true</span>{`\n`});</code></pre>
                </div>
              </div>
            </div>

            {/* Program 2 */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><circle cx="16" cy="20" r="6" stroke="url(#p2)" strokeWidth="2"/><circle cx="32" cy="20" r="6" stroke="url(#p2)" strokeWidth="2"/><path d="M8 38C8 32 12 28 16 28C18 28 20 28 24 30C28 28 30 28 32 28C36 28 40 32 40 38" stroke="url(#p2)" strokeWidth="2" strokeLinecap="round"/><defs><linearGradient id="p2" x1="8" y1="14" x2="40" y2="38"><stop stopColor="#06b6d4"/><stop offset="1" stopColor="#6366f1"/></linearGradient></defs></svg>
              </div>
              <h3>Medical Entrance Coaching</h3>
              <p>Specialized coaching for NEET with experienced faculty, practice modules, and mock test analysis.</p>
            </div>

            {/* Program 3 */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><rect x="8" y="28" width="8" height="12" rx="2" fill="url(#p3)"/><rect x="20" y="18" width="8" height="22" rx="2" fill="url(#p3)"/><rect x="32" y="8" width="8" height="32" rx="2" fill="url(#p3)"/><defs><linearGradient id="p3" x1="8" y1="8" x2="40" y2="40"><stop stopColor="#f59e0b"/><stop offset="1" stopColor="#ef4444"/></linearGradient></defs></svg>
              </div>
              <h3>Foundation Courses</h3>
              <p>Strong academic foundation for students in classes 8-10 focusing on conceptual clarity and Olympiad preparation.</p>
            </div>

            {/* Program 4 */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><path d="M24 4L40 12V22C40 32 33 40 24 44C15 40 8 32 8 22V12L24 4Z" stroke="url(#p4)" strokeWidth="2"/><path d="M18 24L22 28L30 20" stroke="url(#p4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="p4" x1="8" y1="4" x2="40" y2="44"><stop stopColor="#10b981"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs></svg>
              </div>
              <h3>Crash Courses</h3>
              <p>Short-term intensive programs designed for revision and performance optimization before exams.</p>
            </div>

            {/* Program 5 (Extra slot from template) */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><rect x="6" y="14" width="36" height="20" rx="4" stroke="url(#p5)" strokeWidth="2"/><circle cx="16" cy="24" r="3" fill="url(#p5)"/><circle cx="24" cy="24" r="3" fill="url(#p5)"/><circle cx="32" cy="24" r="3" fill="url(#p5)"/><defs><linearGradient id="p5" x1="6" y1="14" x2="42" y2="34"><stop stopColor="#8b5cf6"/><stop offset="1" stopColor="#ec4899"/></linearGradient></defs></svg>
              </div>
              <h3>Online Live Classes</h3>
              <p>Interactive digital classrooms bringing the Nexus experience to the comfort of your home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ LEARNING METHOD SECTION ═══════════════════ */}
      <section className="how-it-works" id="learning-method">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Learning Method</span>
            <h2 className="section-title">Start Your Success Journey in <span className="gradient-text">3 Steps</span></h2>
            <p className="section-desc">A proven pedagogical approach to master complex subjects efficiently.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card animate-on-scroll">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Enroll in Your Program</h3>
                <p>Choose the course that matches your academic goals and start learning with expert faculty.</p>
              </div>
              <div className="step-line"></div>
            </div>
            <div className="step-card animate-on-scroll">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Structured Learning & Practice</h3>
                <p>Attend live classes, access study materials, and solve curated practice problems.</p>
              </div>
              <div className="step-line"></div>
            </div>
            <div className="step-card animate-on-scroll">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Mock Tests & Analysis</h3>
                <p>Track progress through regular tests and receive personalized feedback to improve.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ COURSES SECTION (Replace Pricing) ═══════════════════ */}
      <section className="pricing" id="courses">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Courses & Fees</span>
            <h2 className="section-title">Comprehensive <span className="gradient-text">Course Plans</span></h2>
            <p className="section-desc">Investment in knowledge that pays the best interest.</p>
          </div>

          <div className="pricing-grid">
            {/* NEET */}
            <div className="pricing-card animate-on-scroll">
              <div className="pricing-header">
                <h3>NEET Preparation</h3>
                <div className="price"><span className="price-amount">1 Year</span></div>
                <p>Expert-led medical entrance coaching.</p>
              </div>
              <ul className="pricing-features">
                <li><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8L7 11L12 5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> Expert biology faculty</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8L7 11L12 5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> Concept focused lectures</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8L7 11L12 5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> Mock exams and analysis</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8L7 11L12 5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> Revision modules</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8L7 11L12 5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> Mentorship</li>
              </ul>
              <a href="#" className="btn-outline btn-block">Enroll Now</a>
            </div>

            {/* JEE */}
            <div className="pricing-card pricing-card-featured animate-on-scroll">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>JEE Advanced</h3>
                <div className="price"><span className="price-amount">2 Years</span></div>
                <p>Ultimate program for Engineering aspirants.</p>
              </div>
              <ul className="pricing-features">
                <li><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8L7 11L12 5" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> Live interactive classes</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8L7 11L12 5" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> Study material and notes</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8L7 11L12 5" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> Weekly practice tests</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8L7 11L12 5" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> Doubt solving sessions</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8L7 11L12 5" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> Performance analytics</li>
              </ul>
              <a href="#" className="btn-primary btn-block">Enroll Now</a>
            </div>

            {/* Crash Course */}
            <div className="pricing-card animate-on-scroll">
              <div className="pricing-header">
                <h3>Crash Course</h3>
                <div className="price"><span className="price-amount">3 Months</span></div>
                <p>Fast-track revision for exam peaks.</p>
              </div>
              <ul className="pricing-features">
                <li><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8L7 11L12 5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> Intensive revision</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8L7 11L12 5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> PYQ practice</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8L7 11L12 5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> Mock test series</li>
                <li><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8L7 11L12 5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg> Strategy sessions</li>
              </ul>
              <a href="#" className="btn-outline btn-block">Join Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ RESULTS SECTION (New) ═══════════════════ */}
      <section className="features" id="results">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Achievements</span>
            <h2 className="section-title">Our <span className="gradient-text">Success Record</span></h2>
            <p className="section-desc">Consistency is the hallmark of Nexus Academy.</p>
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

      {/* ═══════════════════ FACULTY SECTION (New) ═══════════════════ */}
      <section className="features" id="faculty">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Expert Faculty</span>
            <h2 className="section-title">Meet Our <span className="gradient-text">Mentors</span></h2>
            <p className="section-desc">Learning from the best minds in the industry.</p>
          </div>

          <div className="features-grid">
            {[
              { name: "Dr. Ankit Sharma", sub: "Physics Faculty", exp: "12+ years experience preparing JEE aspirants.", color: "#6366f1" },
              { name: "Prof. Meera Iyer", sub: "Chemistry Faculty", exp: "10+ years experience, PhD in Organic Chemistry.", color: "#a855f7" },
              { name: "Dr. Rahul Verma", sub: "Biology Faculty", exp: "15+ years experience specializing in NEET Botany.", color: "#06b6d4" },
              { name: "Sanjay Gupta", sub: "Mathematics Faculty", exp: "8+ years experience, IIT Kanpur Alumnus.", color: "#ec4899" }
            ].map((prof, i) => (
              <div key={i} className="feature-card animate-on-scroll">
                <div className="testimonial-author">
                  <div className="author-avatar" style={{ background: prof.color, width: '64px', height: '64px', fontSize: '1.2rem' }}>
                    {prof.name.split(' ').map(n=>n[0]).join('').replace('.','')}
                  </div>
                  <div>
                    <strong style={{ fontSize: '1.2rem' }}>{prof.name}</strong>
                    <span style={{ color: 'var(--accent-indigo)', fontWeight: '600' }}>{prof.sub}</span>
                  </div>
                </div>
                <p style={{ marginTop: '20px' }}>{prof.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SUCCESS STORIES SECTION ═══════════════════ */}
      <section className="testimonials" id="success-stories">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Student Success</span>
            <h2 className="section-title">Success <span className="gradient-text">Stories</span></h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-stars">★★★★★</div>
              <p>"Nexus Academy helped me build strong fundamentals and improve my problem-solving skills. I secured AIR 542 in JEE Advanced."</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>AJ</div>
                <div>
                  <strong>Aryan Jain</strong>
                  <span>IIT Bombay Aspirant</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-stars">★★★★★</div>
              <p>"The mock tests and personalized mentoring were incredibly helpful. I scored 650+ in NEET and got into my dream college."</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)' }}>SN</div>
                <div>
                  <strong>Sanya Nair</strong>
                  <span>M.B.B.S Student</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-stars">★★★★★</div>
              <p>"The faculty support and structured preparation made all the difference in my boards and foundation exams."</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>RK</div>
                <div>
                  <strong>Rohan Kapoor</strong>
                  <span>Olympiad Winner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ SECTION (New) ═══════════════════ */}
      <section className="features" id="faq">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
          </div>

          <div className="features-grid">
            {[
              { q: "How do I enroll in a course?", a: "You can enroll directly through the website or visit our center for a counseling session." },
              { q: "Are classes available online?", a: "Yes, we offer both offline center-based classes and live interactive online sessions." },
              { q: "Do you provide study materials?", a: "Comprehensive study booklets, practice papers, and digital notes are provided for all courses." },
              { q: "Are mock tests included?", a: "Yes, regular weekly tests and full-length mock exams are an integral part of our programs." }
            ].map((item, i) => (
              <div key={i} className="feature-card animate-on-scroll">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card animate-on-scroll">
            <div className="cta-glow"></div>
            <h2>Ready to start your success journey?</h2>
            <p>Join Nexus Academy today and take the first step towards your academic goals.</p>
            <div className="cta-actions">
              <a href="#courses" className="btn-primary btn-lg">Enroll Now</a>
              <a href="#about" className="btn-ghost">Talk to a Counselor →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CONTACT SECTION (New) ═══════════════════ */}
      <section className="features" id="contact">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Contact Us</span>
            <h2 className="section-title">Get in <span className="gradient-text">Touch</span></h2>
          </div>

          <div className="features-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="feature-card animate-on-scroll">
              <h3>Send us a Message</h3>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
                <input type="text" placeholder="Your Name" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: 'var(--radius-sm)', color: 'white' }} />
                <input type="email" placeholder="Your Email" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: 'var(--radius-sm)', color: 'white' }} />
                <select style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: 'var(--radius-sm)', color: 'white' }}>
                  <option>JEE Preparation</option>
                  <option>NEET Preparation</option>
                  <option>Foundation</option>
                </select>
                <textarea placeholder="Message" rows={4} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: 'var(--radius-sm)', color: 'white' }}></textarea>
                <button type="button" className="btn-primary" style={{ justifyContent: 'center' }}>Submit</button>
              </form>
            </div>
            <div className="feature-card animate-on-scroll">
              <h3>Office Info</h3>
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <strong style={{ display: 'block', color: 'var(--accent-indigo)' }}>Address</strong>
                  <p>123 Education Lane, Knowledge Park, New Delhi, 110001</p>
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--accent-indigo)' }}>Phone</strong>
                  <p>+91 98765 43210</p>
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--accent-indigo)' }}>Email</strong>
                  <p>admissions@nexusacademy.edu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="nav-logo">
                <div className="logo-icon">
                  <svg viewBox="0 0 32 32" fill="none"><path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="url(#logo-grad2)" strokeWidth="2" fill="none"/><path d="M16 8L22 11.5V18.5L16 22L10 18.5V11.5L16 8Z" fill="url(#logo-grad2)"/><defs><linearGradient id="logo-grad2" x1="4" y1="2" x2="28" y2="30"><stop stopColor="#6366f1"/><stop offset="1" stopColor="#a855f7"/></linearGradient></defs></svg>
                </div>
                <span>Nexus Academy</span>
              </a>
              <p>Empowering Minds. Achieving Excellence. Shaping the toppers of tomorrow.</p>
            </div>
            <div className="footer-links">
              <h4>Programs</h4>
              <a href="#programs">JEE Coaching</a>
              <a href="#programs">NEET Coaching</a>
              <a href="#programs">Foundation</a>
              <a href="#results">Results</a>
            </div>
            <div className="footer-links">
              <h4>Resources</h4>
              <a href="#">Study Materials</a>
              <a href="#">Mock Tests</a>
              <a href="#">Exam Updates</a>
              <a href="#">Blog</a>
            </div>
            <div className="footer-links">
              <h4>Contact</h4>
              <a href="#contact">Find a Center</a>
              <a href="#contact">Call Us</a>
              <a href="#contact">Email Support</a>
              <a href="#">Careers</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Nexus Academy. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        /* Staggered animation delays for React iteration */
        .features-grid .animate-on-scroll:nth-child(n) { transition-delay: calc(0.1s * n); }
        .steps-grid .animate-on-scroll:nth-child(n) { transition-delay: calc(0.15s * n); }
        .pricing-grid .animate-on-scroll:nth-child(n) { transition-delay: calc(0.1s * n); }
        .testimonials-grid .animate-on-scroll:nth-child(n) { transition-delay: calc(0.1s * n); }
      `}</style>
    </main>
  );
}
