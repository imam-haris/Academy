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
                    <option>SSC Preparation</option>
                    <option>Railway Preparation</option>
                    <option>BPSC Preparation</option>
                    <option>Bihar Police Preparation</option>
                    <option>Bihar SI Preparation</option>
                    <option>Defence Preparation</option>
                    <option>Banking Preparation</option>
                    <option>CTET/STET Preparation</option>
                    <option>UGC NET Preparation</option>
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
                    <p>Miscot lane 2nd floor sinha complex Near jubaa sahani park mithanpura muzaffarpur</p>
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


      </div>
      <Footer />
    </main>
  );
}