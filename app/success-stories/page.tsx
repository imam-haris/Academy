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
              <p>"World Touch Coaching's foundation batch helped me clear my concepts thoroughly. The mock tests were exactly like the real exam. I secured AIR 42 in SSC CGL!"</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: 'var(--gradient-primary)' }}>AP</div>
                <div>
                  <strong>Amit Prasad</strong>
                  <span>SSC CGL Topper</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-stars">★★★★★</div>
              <p>"The BPSC Pre + Mains strategy provided by the expert mentors here made all the difference. The study material is arguably the best in the state."</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: 'var(--gradient-primary)' }}>SK</div>
                <div>
                  <strong>Sneha Kumari</strong>
                  <span>Selected in BPSC</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-stars">★★★★★</div>
              <p>"From struggling in Quantitative Aptitude to scoring 34/35 in IBPS PO Prelims, the banking faculty here completely transformed my preparation."</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: 'var(--gradient-primary)' }}>RM</div>
                <div>
                  <strong>Rahul Mishra</strong>
                  <span>Bank PO (SBI)</span>
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