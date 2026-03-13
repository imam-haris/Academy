"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          <Image src="/logo-nobg.png" alt="World Touch Coaching" width={120} height={120} className="logo-img" />
          <span>World Touch Coaching</span>
        </Link>

        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          {/* <li><Link href="/#director" onClick={() => setIsMobileMenuOpen(false)}>Director</Link></li> */}
          <li><Link href="/courses" onClick={() => setIsMobileMenuOpen(false)}>Courses</Link></li>
          <li><Link href="/success-stories" onClick={() => setIsMobileMenuOpen(false)}>Success Stories</Link></li>
          <li><Link href="/gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link></li>
          <li><Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
          <li><Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Student Login</Link></li>
        </ul>

        {/* <div className={`nav-actions ${isMobileMenuOpen ? "active" : ""}`}>
          <Link href="/courses" className="btn-primary btn-sm">Enroll Now</Link>
        </div> */}

        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
