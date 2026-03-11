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


      </div>
      <Footer />
    </main>
  );
}