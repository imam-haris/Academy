"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

type AuthStep = "mode-select" | "mobile-entry" | "show-creds" | "id-login";

export default function LoginPage() {
  const [step, setStep] = useState<AuthStep>("mode-select");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [loginId, setLoginId] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("is_logged_in");
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleVerifyStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === "" || mobile.length < 10) {
      setError("Please enter a valid name and mobile number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("phone_number", mobile.trim())
        .ilike("name", `%${name.trim()}%`)
        .single();   // expect one row

      if (error || !data) {
        setLoading(false);
        setError("No matching record found.");
        return;
      }

      /* ------------------------------
         CASE 1: Credentials already exist
      -------------------------------*/
      if (data.student_id && data.password) {

        localStorage.setItem("stu_id", data.student_id);
        localStorage.setItem("stu_pass", data.password);
        localStorage.setItem("is_logged_in", "true");

        router.push("/dashboard");
        return;
      }

      /* ------------------------------
         CASE 2: Credentials do NOT exist
         Generate + store
      -------------------------------*/

      const generatedId =
        "STU" + Math.floor(100000 + Math.random() * 900000);

      const generatedPass =
        Math.random().toString(36).slice(-8).toUpperCase();

      const { error: updateError } = await supabase
        .from("users")
        .update({
          student_id: generatedId,
          password: generatedPass,
        })
        .eq("id", data.id);

      if (updateError) {
        setLoading(false);
        setError("Failed to generate credentials.");
        return;
      }

      setStudentId(generatedId);
      setPassword(generatedPass);

      localStorage.setItem("stu_id", generatedId);
      localStorage.setItem("stu_pass", generatedPass);

      setStep("show-creds");
      setLoading(false);

    } catch (err) {
      setLoading(false);
      setError("Unexpected error occurred.");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginId || !loginPass) {
      setError("Please enter Student ID and Password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("student_id", loginId.trim())
        .eq("password", loginPass.trim())
        .single();

      setLoading(false);

      if (error || !data) {
        setError("Invalid Student ID or Password.");
        return;
      }

      // store session indicator
      localStorage.setItem("is_logged_in", "true");
      localStorage.setItem("stu_id", data.student_id);

      router.push("/dashboard");

    } catch (err) {
      setLoading(false);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <main>
      <Navbar />
      <div className="login-container">
        <div className="login-box animate-on-scroll">
          <div className="login-header">
            <span className="section-tag">Student Portal</span>
            <h2>{step === "id-login" ? "Welcome Back" : "Join Academy"}</h2>
            <p>Access your notes and video lectures in one place.</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          {step === "mode-select" && (
            <div className="auth-modes">
              <button type="button" className="btn-primary w-full" onClick={() => setStep("mobile-entry")}>
                <span>Create Account (Verify Details)</span>
              </button>
              <div className="auth-divider">OR</div>
              <button type="button" className="btn-ghost w-full" onClick={() => setStep("id-login")}>
                <span>Login with ID & Password</span>
              </button>
            </div>
          )}

          {step === "mobile-entry" && (
            <form onSubmit={handleVerifyStudent} className="auth-form">
              <div className="form-group mb-4">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your registered name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  placeholder="Enter 10 digit mobile no."
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  maxLength={10}
                />
              </div>
              <div className="flex flex-col justify-between items-center mt-4">
                <button className="btn-primary w-full" type="submit" disabled={loading}>
                  <span>{loading ? "Verifying..." : "Verify & Generate ID"}</span>
                </button>
                <button type="button" className="btn-text w-full mt-3" onClick={() => setStep("mode-select")} disabled={loading}>
                  <span>← Back</span>
                </button>
              </div>
            </form>
          )}

          {step === "show-creds" && (
            <div className="creds-result">
              <div className="creds-banner">Success! Account Created.</div>
              <p>Please save these credentials for future logins:</p>
              <div className="creds-card">
                <div className="cred-row">
                  <span>Student ID:</span>
                  <strong>{studentId}</strong>
                </div>
                <div className="cred-row">
                  <span>Password:</span>
                  <strong>{password}</strong>
                </div>
              </div>
              <button type="button" className="btn-primary w-full mt-6" onClick={() => {
                localStorage.setItem("is_logged_in", "true");
                router.push("/dashboard");
              }}>
                <span>Go to Dashboard</span>
              </button>
            </div>
          )}

          {step === "id-login" && (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label>Student ID</label>
                <input
                  type="text"
                  placeholder="STUXXXXXX"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                />
              </div>
              <button className="btn-primary w-full mt-6" type="submit"><span>Login</span></button>
              <button type="button" className="btn-text w-full mt-2" onClick={() => setStep("mode-select")}><span>← Other Options</span></button>
            </form>
          )}
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .login-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 20px;
          background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent 40%);
        }

        .login-box {
          width: 100%;
          max-width: 450px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 40px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-header h2 {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .login-header p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .auth-modes {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .auth-divider {
          text-align: center;
          color: var(--text-muted);
          font-size: 0.8rem;
          position: relative;
        }

        .auth-divider::before, .auth-divider::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 40%;
          height: 1px;
          background: var(--border-color);
        }

        .auth-divider::before { left: 0; }
        .auth-divider::after { right: 0; }

        .auth-form {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .form-group input {
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--border-color);
          padding: 14px;
          border-radius: var(--radius-md);
          color: white;
          outline: none;
          transition: border-color 0.3s;
        }

        .form-group input:focus {
          border-color: var(--accent-indigo);
        }

        .auth-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          padding: 12px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          margin-bottom: 20px;
          text-align: center;
        }

        .creds-result {
          text-align: center;
        }

        .creds-banner {
          background: var(--accent-green, #10b981);
          color: white;
          padding: 8px;
          border-radius: 4px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .creds-card {
          background: rgba(255,255,255,0.05);
          border: 1px dashed var(--border-color);
          padding: 24px;
          border-radius: var(--radius-md);
          margin-top: 16px;
          text-align: left;
        }

        .cred-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .cred-row:last-child { margin-bottom: 0; }

        .cred-row span { color: var(--text-muted); }

        .cred-row strong {
          color: var(--accent-indigo);
          font-family: monospace;
          font-size: 1.1rem;
        }

        .btn-text {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.9rem;
          cursor: pointer;
        }

        .btn-text:hover { color: white; }

        .mt-4 { margin-top: 1rem; }
        .mt-6 { margin-top: 1.5rem; }
      `}</style>
    </main>
  );
}
