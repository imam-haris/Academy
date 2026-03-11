"use client";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Page() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });
    const animateElements = document.querySelectorAll(".animate-on-scroll");
    animateElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
      {/* ═══════════════════ PROGRAMS SECTION ═══════════════════ */}
      <section className="features" id="programs">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Our Programs</span>
            <h2 className="section-title">Specialized <span className="gradient-text">Coaching Units</span></h2>
            <p className="section-desc">Comprehensive preparation modules tailored for every academic milestone.</p>
          </div>

          <div className="features-grid">
            {/* Course 1 */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="url(#p1)" strokeWidth="2"/><path d="M18 24L22 28L30 20" stroke="url(#p1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="p1" x1="4" y1="4" x2="44" y2="44"><stop stopColor="#6366f1"/><stop offset="1" stopColor="#a855f7"/></linearGradient></defs></svg>
              </div>
              <h3>SSC Foundation Batch</h3>
              <p>Duration: <strong>1 Year 3 Months</strong><br/>Fees: <strong>₹10,000</strong></p>
              <a href="#contact" className="btn-primary btn-sm" style={{ marginTop: '16px', display: 'inline-flex' }}>Join Now</a>
            </div>

            {/* Course 2 */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><circle cx="16" cy="20" r="6" stroke="url(#p2)" strokeWidth="2"/><circle cx="32" cy="20" r="6" stroke="url(#p2)" strokeWidth="2"/><path d="M8 38C8 32 12 28 16 28C18 28 20 28 24 30C28 28 30 28 32 28C36 28 40 32 40 38" stroke="url(#p2)" strokeWidth="2" strokeLinecap="round"/><defs><linearGradient id="p2" x1="8" y1="14" x2="40" y2="38"><stop stopColor="#06b6d4"/><stop offset="1" stopColor="#6366f1"/></linearGradient></defs></svg>
              </div>
              <h3>Railway Foundation Batch</h3>
              <p>Duration: <strong>1 Year</strong><br/>Fees: <strong>₹8,000</strong></p>
              <a href="#contact" className="btn-primary btn-sm" style={{ marginTop: '16px', display: 'inline-flex' }}>Join Now</a>
            </div>

            {/* Course 3 */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><rect x="8" y="28" width="8" height="12" rx="2" fill="url(#p3)"/><rect x="20" y="18" width="8" height="22" rx="2" fill="url(#p3)"/><rect x="32" y="8" width="8" height="32" rx="2" fill="url(#p3)"/><defs><linearGradient id="p3" x1="8" y1="8" x2="40" y2="40"><stop stopColor="#f59e0b"/><stop offset="1" stopColor="#ef4444"/></linearGradient></defs></svg>
              </div>
              <h3>Banking Foundation Batch</h3>
              <p>Duration: <strong>1 Year</strong><br/>Fees: <strong>₹12,000</strong></p>
              <a href="#contact" className="btn-primary btn-sm" style={{ marginTop: '16px', display: 'inline-flex' }}>Join Now</a>
            </div>

            {/* Course 4 */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><path d="M24 4L40 12V22C40 32 33 40 24 44C15 40 8 32 8 22V12L24 4Z" stroke="url(#p4)" strokeWidth="2"/><path d="M18 24L22 28L30 20" stroke="url(#p4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="p4" x1="8" y1="4" x2="40" y2="44"><stop stopColor="#10b981"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs></svg>
              </div>
              <h3>BPSC (Pre + Mains)</h3>
              <p>Duration: <strong>1 Year 6 Months</strong><br/>Fees: <strong>₹12,000</strong></p>
              <a href="#contact" className="btn-primary btn-sm" style={{ marginTop: '16px', display: 'inline-flex' }}>Join Now</a>
            </div>

            {/* Course 5 */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><rect x="6" y="14" width="36" height="20" rx="4" stroke="url(#p5)" strokeWidth="2"/><circle cx="16" cy="24" r="3" fill="url(#p5)"/><circle cx="24" cy="24" r="3" fill="url(#p5)"/><circle cx="32" cy="24" r="3" fill="url(#p5)"/><defs><linearGradient id="p5" x1="6" y1="14" x2="42" y2="34"><stop stopColor="#8b5cf6"/><stop offset="1" stopColor="#ec4899"/></linearGradient></defs></svg>
              </div>
              <h3>Bihar SI</h3>
              <p>Duration: <strong>1 Year</strong><br/>Fees: <strong>₹10,000</strong></p>
              <a href="#contact" className="btn-primary btn-sm" style={{ marginTop: '16px', display: 'inline-flex' }}>Join Now</a>
            </div>

            {/* Course 6 */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="url(#p1)" strokeWidth="2"/><path d="M18 24L22 28L30 20" stroke="url(#p1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="p1" x1="4" y1="4" x2="44" y2="44"><stop stopColor="#6366f1"/><stop offset="1" stopColor="#a855f7"/></linearGradient></defs></svg>
              </div>
              <h3>Bihar Police</h3>
              <p>Duration: <strong>6 Months</strong><br/>Fees: <strong>₹6,000</strong></p>
              <a href="#contact" className="btn-primary btn-sm" style={{ marginTop: '16px', display: 'inline-flex' }}>Join Now</a>
            </div>

            {/* Course 7 */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><circle cx="16" cy="20" r="6" stroke="url(#p2)" strokeWidth="2"/><circle cx="32" cy="20" r="6" stroke="url(#p2)" strokeWidth="2"/><path d="M8 38C8 32 12 28 16 28C18 28 20 28 24 30C28 28 30 28 32 28C36 28 40 32 40 38" stroke="url(#p2)" strokeWidth="2" strokeLinecap="round"/><defs><linearGradient id="p2" x1="8" y1="14" x2="40" y2="38"><stop stopColor="#06b6d4"/><stop offset="1" stopColor="#6366f1"/></linearGradient></defs></svg>
              </div>
              <h3>Defence</h3>
              <p>Duration: <strong>6 Months</strong><br/>Fees: <strong>₹6,000</strong></p>
              <a href="#contact" className="btn-primary btn-sm" style={{ marginTop: '16px', display: 'inline-flex' }}>Join Now</a>
            </div>

            {/* Course 8 */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><rect x="8" y="28" width="8" height="12" rx="2" fill="url(#p3)"/><rect x="20" y="18" width="8" height="22" rx="2" fill="url(#p3)"/><rect x="32" y="8" width="8" height="32" rx="2" fill="url(#p3)"/><defs><linearGradient id="p3" x1="8" y1="8" x2="40" y2="40"><stop stopColor="#f59e0b"/><stop offset="1" stopColor="#ef4444"/></linearGradient></defs></svg>
              </div>
              <h3>CTET / STET</h3>
              <p>Duration: <strong>6 Months</strong><br/>Fees: <strong>₹8,000</strong></p>
              <a href="#contact" className="btn-primary btn-sm" style={{ marginTop: '16px', display: 'inline-flex' }}>Join Now</a>
            </div>

            {/* Course 9 */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><path d="M24 4L40 12V22C40 32 33 40 24 44C15 40 8 32 8 22V12L24 4Z" stroke="url(#p4)" strokeWidth="2"/><path d="M18 24L22 28L30 20" stroke="url(#p4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="p4" x1="8" y1="4" x2="40" y2="44"><stop stopColor="#10b981"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs></svg>
              </div>
              <h3>UGC NET</h3>
              <p>Duration: <strong>1 Year 6 Months</strong><br/>Fees: <strong>₹12,000</strong></p>
              <a href="#contact" className="btn-primary btn-sm" style={{ marginTop: '16px', display: 'inline-flex' }}>Join Now</a>
            </div>

            {/* Course 10 */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <svg viewBox="0 0 48 48" fill="none"><rect x="6" y="14" width="36" height="20" rx="4" stroke="url(#p5)" strokeWidth="2"/><circle cx="16" cy="24" r="3" fill="url(#p5)"/><circle cx="24" cy="24" r="3" fill="url(#p5)"/><circle cx="32" cy="24" r="3" fill="url(#p5)"/><defs><linearGradient id="p5" x1="6" y1="14" x2="42" y2="34"><stop stopColor="#8b5cf6"/><stop offset="1" stopColor="#ec4899"/></linearGradient></defs></svg>
              </div>
              <h3>Target Batches / Crash Course</h3>
              <p>Coverage: <strong>All Exams</strong><br/>Fees: <strong>₹6,000</strong></p>
              <a href="#contact" className="btn-primary btn-sm" style={{ marginTop: '16px', display: 'inline-flex' }}>Join Now</a>
            </div>

            {/* Course 11 */}
            <div className="feature-card animate-on-scroll" style={{ gridColumn: '1 / -1', maxWidth: '600px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
              <div className="feature-icon" style={{ margin: '0 auto 20px' }}>
                <svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="url(#p1)" strokeWidth="2"/><path d="M18 24L22 28L30 20" stroke="url(#p1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="p1" x1="4" y1="4" x2="44" y2="44"><stop stopColor="#6366f1"/><stop offset="1" stopColor="#a855f7"/></linearGradient></defs></svg>
              </div>
              <h3>Mock Test Series</h3>
              <p>Coverage: <strong>All Exams</strong><br/>Fees: <strong>₹3,000</strong></p>
              <a href="#contact" className="btn-primary btn-sm" style={{ marginTop: '16px', display: 'inline-flex' }}>Join Now</a>
            </div>
          </div>
        </div>
      </section>


      </div>
      <Footer />
    </main>
  );
}