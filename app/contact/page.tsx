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
                <form
                  action="https://formspree.io/f/xaqpdyjq"
                  method="POST"
                  className="contact-form">

                  <div className="form-group">
                    <input type="text" name="name" placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Your Email" required />
                  </div>
                  <div className="form-group">
                    <input type="tel" name="phone" placeholder="Phone Number" required />
                  </div>
                  <div className="form-group">
                    <select name="course">
                      <option value="SSC">SSC Preparation</option>
                      <option value="Railway">Railway Preparation</option>
                      <option value="BPSC">BPSC Preparation</option>
                      <option value="Bihar Police">Bihar Police Preparation</option>
                      <option value="Bihar SI">Bihar SI Preparation</option>
                      <option value="Defence">Defence Preparation</option>
                      <option value="Banking">Banking Preparation</option>
                      <option value="CTET/STET">CTET/STET Preparation</option>
                      <option value="UGC NET">UGC NET Preparation</option>
                      <option value="Science">Science (Phy/Chem/Bio)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="Message" rows={4} required></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full">Send Message</button>
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
                    <p>+91 9430655073</p>
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