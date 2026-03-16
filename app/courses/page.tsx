"use client";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";

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
              <span className="section-tag">Our Courses</span>
              <h2 className="section-title">Specialized <span className="gradient-text">Coaching Units</span></h2>
              <p className="section-desc">Comprehensive preparation modules tailored for every academic milestone.</p>
            </div>

            <div className="features-grid">
              {/* Course 1 - SSC (LARGE) */}
              <div className="feature-card animate-on-scroll course-card-new course-card-large">
                <div className="course-card-image">
                  <Image src="/ssc.jpg" alt="SSC Foundation Batch" fill className="object-cover" />
                </div>
                <div className="course-card-content">
                  <h3>SSC Foundation Batch</h3>
                  <p>Comprehensive preparation for all SSC exams including CGL, CHSL, MTS, and CPO.</p>
                  <div className="course-info-footer">
                    <p>Duration: <strong>1 Year 3 Months</strong> | Fees: <strong>₹10,000</strong></p>
                    <a href="/contact" className="btn-primary">Join Now</a>
                  </div>
                </div>
              </div>

              {/* Course 2 - BPSC (LARGE) */}
              <div className="feature-card animate-on-scroll course-card-new course-card-large">
                <div className="course-card-image">
                  <Image src="/bpsc.jpg" alt="BPSC (Pre + Mains)" fill className="object-cover" />
                </div>
                <div className="course-card-content">
                  <h3>BPSC (Pre + Mains)</h3>
                  <p>Dedicated coaching for Bihar Public Service Commission exams with focus on both Prelims and Mains.</p>
                  <div className="course-info-footer">
                    <p>Duration: <strong>1 Year 6 Months</strong> | Fees: <strong>₹12,000</strong></p>
                    <a href="/contact" className="btn-primary">Join Now</a>
                  </div>
                </div>
              </div>

              {/* Course 3 - Railway */}
              <div className="feature-card animate-on-scroll course-card-new course-card-large">
                <div className="course-card-image">
                  <Image src="/railway.jpg" alt="Railway Foundation Batch" fill className="object-cover" />
                </div>
                <div className="course-card-content">
                  <h3>Railway Foundation Batch</h3>
                  <p>Comprehensive preparation for all railway exams including Group D, NTPC, and ALP.</p>
                  <div className="course-info-footer">
                    <p>Duration: <strong>1 Year</strong> | Fees: <strong>₹8,000</strong></p>
                    <a href="/contact" className="btn-primary">Join Now</a>
                  </div>
                </div>
              </div>

              {/* Course 4 - Bihar Police */}
              <div className="feature-card animate-on-scroll course-card-new course-card-large">
                <div className="course-card-image">
                  <Image src="/biharPolice.jpg" alt="Bihar Police" fill className="object-cover" />
                </div>
                <div className="course-card-content">
                  <h3>Bihar Police</h3>
                  <p>Specialized batch for Bihar Police Constable and SI exam preparation.</p>
                  <div className="course-info-footer">
                    <p>Duration: <strong>6 Months</strong> | Fees: <strong>₹6,000</strong></p>
                    <a href="/contact" className="btn-primary">Join Now</a>
                  </div>
                </div>
              </div>

              {/* Course 5 - Banking */}
              <div className="feature-card animate-on-scroll course-card-new course-card-large">
                <div className="course-card-image">
                  <Image src="/banking.jpg" alt="Banking Foundation Batch" fill className="object-cover" />
                </div>
                <div className="course-card-content">
                  <h3>Banking Foundation Batch</h3>
                  <p>In-depth coaching for IBPS, SBI, and RRB PO/Clerk examinations.</p>
                  <div className="course-info-footer">
                    <p>Duration: <strong>1 Year</strong> | Fees: <strong>₹12,000</strong></p>
                    <a href="/contact" className="btn-primary">Join Now</a>
                  </div>
                </div>
              </div>

              {/* Course 6 - Reasoning */}
              <div className="feature-card animate-on-scroll course-card-new course-card-large">
                <div className="course-card-image">
                  <Image src="/reasoning_new.png" alt="Reasoning Special Batch" fill className="object-cover" />
                </div>
                <div className="course-card-content">
                  <h3>Reasoning Special Batch</h3>
                  <p>Master logical reasoning and analytical skills with our expert-led special batch.</p>
                  <div className="course-info-footer">
                    <p>Duration: <strong>6 Months</strong> | Fees: <strong>₹4,000</strong></p>
                    <a href="/contact" className="btn-primary">Join Now</a>
                  </div>
                </div>
              </div>

              {/* Course 7 - Bihar SI */}
              <div className="feature-card animate-on-scroll course-card-new course-card-large">
                <div className="course-card-image">
                  <Image src="/Bihar_SI.jpg" alt="Bihar SI" fill className="object-cover" />
                </div>
                <div className="course-card-content">
                  <h3>Bihar SI Special Batch</h3>
                  <p>Dedicated preparation for Bihar Sub-Inspector examinations with expert faculty.</p>
                  <div className="course-info-footer">
                    <p>Duration: <strong>1 Year</strong> | Fees: <strong>₹10,000</strong></p>
                    <a href="/contact" className="btn-primary">Join Now</a>
                  </div>
                </div>
              </div>

              {/* Course 8 - Defence */}
              <div className="feature-card animate-on-scroll course-card-new course-card-large">
                <div className="course-card-image" style={{ background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="feature-card-icon-styled" style={{ margin: 0, padding: 0 }}>
                    <svg viewBox="0 0 48 48" fill="none" style={{ width: '120px', height: '120px' }}><circle cx="16" cy="20" r="6" stroke="url(#p2)" strokeWidth="2" /><circle cx="32" cy="20" r="6" stroke="url(#p2)" strokeWidth="2" /><path d="M8 38C8 32 12 28 16 28C18 28 20 28 24 30C28 28 30 28 32 28C36 28 40 32 40 38" stroke="url(#p2)" strokeWidth="2" strokeLinecap="round" /><defs><linearGradient id="p2" x1="8" y1="14" x2="40" y2="38"><stop stopColor="#06b6d4" /><stop offset="1" stopColor="#6366f1" /></linearGradient></defs></svg>
                  </div>
                </div>
                <div className="course-card-content">
                  <h3>Defence Special Batch</h3>
                  <p>Aggressive training for NDA, CDS, Air Force, and Navy examinations.</p>
                  <div className="course-info-footer">
                    <p>Duration: <strong>6 Months</strong> | Fees: <strong>₹6,000</strong></p>
                    <a href="/contact" className="btn-primary">Join Now</a>
                  </div>
                </div>
              </div>

              {/* Course 9 - CTET / STET */}
              <div className="feature-card animate-on-scroll course-card-new course-card-large">
                <div className="course-card-image">
                  <Image src="/CTET_STET.jpg" alt="CTET / STET" fill className="object-cover" />
                </div>
                <div className="course-card-content">
                  <h3>CTET / STET Foundation</h3>
                  <p>Comprehensive teaching eligibility coaching for CTET, STET, and other state TETs.</p>
                  <div className="course-info-footer">
                    <p>Duration: <strong>6 Months</strong> | Fees: <strong>₹8,000</strong></p>
                    <a href="/contact" className="btn-primary">Join Now</a>
                  </div>
                </div>
              </div>

              {/* Course 10 - UGC NET */}
              <div className="feature-card animate-on-scroll course-card-new course-card-large">
                <div className="course-card-image">
                  <Image src="/UGC_NET.jpg" alt="UGC NET" fill className="object-cover" />
                </div>
                <div className="course-card-content">
                  <h3>UGC NET Preparation</h3>
                  <p>Advanced coaching for UGC NET Paper 1 and specialized subjects.</p>
                  <div className="course-info-footer">
                    <p>Duration: <strong>1 Year 6 Months</strong> | Fees: <strong>₹12,000</strong></p>
                    <a href="/contact" className="btn-primary">Join Now</a>
                  </div>
                </div>
              </div>

              {/* Course 11 - Crash Course */}
              <div className="feature-card animate-on-scroll course-card-new course-card-large">
                <div className="course-card-image">
                  <Image src="/CRASH_COURSE.jpg" alt="Target Batches / Crash Course" fill className="object-cover" />
                </div>
                <div className="course-card-content">
                  <h3>Target Batches / Crash Course</h3>
                  <p>Intensive, fast-tracked preparation modules for all major government exams.</p>
                  <div className="course-info-footer">
                    <p>Coverage: <strong>All Exams</strong> | Fees: <strong>₹6,000</strong></p>
                    <a href="/contact" className="btn-primary">Join Now</a>
                  </div>
                </div>
              </div>

              {/* Course 12 - General English */}
              <div className="feature-card animate-on-scroll course-card-new course-card-large">
                <div className="course-card-image">
                  <Image src="/English.jpg" alt="General English Special" fill className="object-cover" />
                </div>
                <div className="course-card-content">
                  <h3>General English Special</h3>
                  <p>Focus on grammar, vocabulary, and comprehension for all competitive examinations.</p>
                  <div className="course-info-footer">
                    <p>Duration: <strong>6 Months</strong> | Fees: <strong>₹4,000</strong></p>
                    <a href="/contact" className="btn-primary">Join Now</a>
                  </div>
                </div>
              </div>

              {/* Course 13 - Mock Test */}
              <div className="feature-card animate-on-scroll course-card-new course-card-large">
                <div className="course-card-image" style={{ background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="feature-card-icon-styled" style={{ margin: 0, padding: 0 }}>
                    <svg viewBox="0 0 48 48" fill="none" style={{ width: '120px', height: '120px' }}><circle cx="24" cy="24" r="20" stroke="url(#p1)" strokeWidth="2" /><path d="M18 24L22 28L30 20" stroke="url(#p1)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><defs><linearGradient id="p1" x1="4" y1="4" x2="44" y2="44"><stop stopColor="#6366f1" /><stop offset="1" stopColor="#a855f7" /></linearGradient></defs></svg>
                  </div>
                </div>
                <div className="course-card-content">
                  <h3>Mock Test Series</h3>
                  <p>Extensive practice with standard mock tests for all competitive government exams.</p>
                  <div className="course-info-footer">
                    <p>Coverage: <strong>All Exams</strong> | Fees: <strong>₹3,000</strong></p>
                    <a href="/contact" className="btn-primary">Join Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
      <Footer />
    </main>
  );
}