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
              <p>"World Touch Coaching helped me build strong fundamentals and improve my problem-solving skills. I secured AIR 542 in JEE Advanced."</p>
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


      </div>
      <Footer />
    </main>
  );
}