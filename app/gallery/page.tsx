"use client";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";

export default function GalleryPage() {
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

  const galleryImages = [
    { src: "/gallery-1.jpg", alt: "Classroom Session 1" },
    { src: "/gallery-2.jpg", alt: "Classroom Session 2" },
    { src: "/gallery-3.jpg", alt: "Classroom Session 3" },
  ];

  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <section className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Our Campus</span>
            <h2 className="section-title">Life at <span className="gradient-text">World Touch Coaching</span></h2>
            <p className="section-desc">Take a look at our modern classrooms and vibrant learning environment designed for excellence.</p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="gallery-card animate-on-scroll">
                <div className="gallery-img-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="gallery-img"
                  />
                  <div className="gallery-overlay">
                    <span>{img.alt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />

      <style jsx>{`
        .gallery-grid {
          columns: 3 300px;
          column-gap: 24px;
          margin-top: 40px;
        }

        .gallery-card {
          break-inside: avoid;
          margin-bottom: 24px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent-indigo);
          box-shadow: var(--shadow-glow);
        }

        .gallery-img-wrapper {
          position: relative;
          width: 100%;
        }

        .gallery-img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-card:hover .gallery-img {
          transform: scale(1.05);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-overlay span {
          color: white;
          font-weight: 600;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
