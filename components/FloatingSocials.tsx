"use client";
import Image from "next/image";

export default function FloatingSocials() {
  return (
    <div className="floating-socials-container">
      {/* Floating Instagram */}
      <a
        href="https://www.instagram.com/worldtouchclasses?igsh=Z2dvNmFzejdnaXMx"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-instagram"
        aria-label="Follow on Instagram"
      >
        <div className="instagram-icon-wrapper">
          <Image src="/insta-logo_nobg.svg" alt="Instagram" width={24} height={24} style={{ borderRadius: '50%' }} />
        </div>
        <span className="social-label">Instagram</span>
      </a>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/919430655073"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <div className="whatsapp-icon-wrapper">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '28px', height: '28px' }}
          >
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.263c0-5.445 4.43-9.874 9.877-9.874 2.639 0 5.117 1.03 6.98 2.9a9.8 9.8 0 012.895 6.973c-.001 5.447-4.431 9.876-9.88 9.876m8.491-18.272A11.03 11.03 0 0012.048 0c-6.104 0-11.07 4.966-11.07 11.071 0 1.95.51 3.855 1.478 5.536L0 23.996l7.464-1.957a11.026 11.026 0 005.412 1.42h.005c6.104 0 11.069-4.966 11.074-11.072a11.01 11.01 0 00-3.351-7.818z"
              fill="currentColor"
            />
          </svg>
        </div>
        <span className="social-label">Chat now</span>
      </a>
    </div>
  );
}
