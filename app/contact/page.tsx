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

            <div className="contact-grid">
              <div className="feature-card animate-on-scroll">
                <h3>Send us a Message</h3>
                <form className="contact-form">
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Your Email" />
                  </div>
                  <div className="form-group">
                    <select>
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
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Message" rows={4}></textarea>
                  </div>
                  <button type="button" className="btn-primary w-full">Submit</button>
                </form>
              </div>
              <div className="feature-card animate-on-scroll">
                <h3>Office Info</h3>
                <div className="contact-info-list">
                  <div className="info-item">
                    <strong className="info-label">Address</strong>
                    <p>Miscot lane 2nd floor sinha complex Near jubaa sahani park mithanpura muzaffarpur</p>
                  </div>
                  <div className="info-item">
                    <strong className="info-label">Phone</strong>
                    <p>+91 98765 43210</p>
                  </div>
                  <div className="info-item">
                    <strong className="info-label">Email</strong>
                    <p>admissions@worldtouchcoaching.com</p>
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