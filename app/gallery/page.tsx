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
    { src: "/gallery-1.jpg", alt: "Modern Classroom Setting" },
    { src: "/gallery-2.jpg", alt: "Faculty Discussion Room" },
    { src: "/gallery-3.jpg", alt: "Main Learning Hall" },
    { src: "/gallery-4.jpg", alt: "Our Campus Building", position: "top" },
    { src: "/gallery-5.jpg", alt: "Campus Parking Area", position: "top" },
    { src: "/gallery-6.jpg", alt: "Smart Classroom Session", position: "top" },
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
                    style={{ objectPosition: img.position || 'center' }}
                  />
                  <div className="gallery-overlay">
                    <span>{img.alt}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Video Card */}
            <div className="gallery-card animate-on-scroll">
              <div className="gallery-img-wrapper">
                <video
                  src="/gallery_Video.mp4"
                  className="gallery-img"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onMouseEnter={(e) => {
                    const v = e.currentTarget;
                    v.muted = false;
                  }}
                  onMouseLeave={(e) => {
                    const v = e.currentTarget;
                    v.muted = true;
                  }}
                />
                <div className="gallery-overlay">
                  <span>🎬 Campus Tour</span>
                </div>
                <div className="video-play-badge">▶ VIDEO</div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      <style jsx>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
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
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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

        .video-play-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(99, 102, 241, 0.9);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 20px;
          backdrop-filter: blur(4px);
        }
      `}</style>
    </main>
  );
}
