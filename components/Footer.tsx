import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="nav-logo">
              <Image src="/logo_new.png" alt="World Touch Coaching" width={200} height={190} className="logo-img" style={{ borderRadius: '50%' }} />
              <span>World Touch Coaching</span>
            </Link>
            <p>Empowering Minds. Achieving Excellence. Shaping the toppers of tomorrow.</p>
          </div>
          <div className="footer-links">
            <h4>Courses</h4>
            <Link href="/courses">SSC Coaching</Link>
            <Link href="/courses">Railway Coaching</Link>
            <Link href="/courses">Banking Coaching</Link>
          </div>
          <div className="footer-links">
            <h4>Resources</h4>
            <Link href="/success-stories">Success Stories</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/faq">FAQ</Link>
            <a href="#">Mock Tests</a>
          </div>
          <div className="footer-links">
            <h4>Contact</h4>
            <Link href="/contact">Find a Center</Link>
            <a href="https://wa.me/918862994666" target="_blank" rel="noopener noreferrer">📱 WhatsApp Director</a>
            <a href="https://www.instagram.com/worldtouchclasses?igsh=Z2dvNmFzejdnaXMx" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Image src="/insta-logo2.png" alt="Instagram" width={22} height={22} style={{ borderRadius: '50%' }} />
              Instagram
            </a>
            <Link href="/contact">Message Us</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 World Touch Coaching. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
            <Link href="/admin/login">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
