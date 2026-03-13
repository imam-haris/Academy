"use client";
import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem("admin_logged_in");
    if (admin) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    });
    document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: sbError } = await supabase
        .from("admins")
        .select("*")
        .eq("email", email.trim().toLowerCase())
        .eq("password", password.trim())
        .single();

      setLoading(false);

      if (sbError || !data) {
        setError("Invalid credentials. Only directors and faculty can access.");
        return;
      }

      localStorage.setItem("admin_logged_in", "true");
      localStorage.setItem("admin_name", data.name);
      localStorage.setItem("admin_role", data.role);
      router.push("/admin/dashboard");
    } catch {
      setLoading(false);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <main>
      <Navbar />
      <div className="admin-login-container">
        <div className="admin-login-box animate-on-scroll">
          <div className="admin-login-header">
            <span className="admin-tag">🔒 Admin Portal</span>
            <h2>Faculty & Director <span className="admin-gradient">Login</span></h2>
            <p>Upload notes and video lectures for students.</p>
          </div>

          {error && <div className="admin-auth-error">{error}</div>}

          <form onSubmit={handleLogin} className="admin-auth-form">
            <div className="admin-form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="admin-login-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login as Admin"}
            </button>
          </form>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .admin-login-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 20px 60px;
          background: radial-gradient(circle at top left, rgba(239, 68, 68, 0.06), transparent 50%);
        }

        .admin-login-box {
          width: 100%;
          max-width: 460px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 48px 40px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }

        .admin-login-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .admin-tag {
          display: inline-block;
          background: rgba(239, 68, 68, 0.12);
          color: #f87171;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .admin-login-header h2 {
          font-size: 1.8rem;
          color: white;
          margin-bottom: 10px;
        }

        .admin-gradient {
          background: linear-gradient(135deg, #ef4444, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .admin-login-header p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .admin-auth-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          margin-bottom: 24px;
          font-size: 0.9rem;
          text-align: center;
        }

        .admin-auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .admin-form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .admin-form-group label {
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .admin-form-group input {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: white;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s;
        }

        .admin-form-group input:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .admin-form-group input::placeholder {
          color: rgba(255,255,255,0.25);
        }

        .admin-login-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #ef4444, #f97316);
          border: none;
          border-radius: var(--radius-md);
          color: white;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 8px;
        }

        .admin-login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);
        }

        .admin-login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .admin-login-container {
            padding: 100px 16px 40px;
          }
          .admin-login-box {
            padding: 32px 24px;
          }
          .admin-login-header h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}
