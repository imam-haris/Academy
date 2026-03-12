"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("notes");
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("is_logged_in");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

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
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem("is_logged_in");
    router.push("/login");
  };

  const notes = [
    { title: "Mathematics: Number System Part 1", date: "2026-03-10", size: "2.4 MB" },
    { title: "General Studies: Indian Modern History", date: "2026-03-09", size: "1.8 MB" },
    { title: "Reasoning: Coding-Decoding Advanced", date: "2026-03-08", size: "1.5 MB" },
    { title: "Mathematics: Time and Work Part 2", date: "2026-03-07", size: "3.1 MB" },
  ];

  const videos = [
    { title: "Live Session: SSC CGL 2026 Strategy", teacher: "Director Sir", duration: "45:00" },
    { title: "Daily GS: Current Affairs March 12", teacher: "Faculty GS", duration: "30:00" },
    { title: "Maths Special: Shortcut Tricks for Algebra", teacher: "Director Sir", duration: "55:00" },
    { title: "English: Tense and Voice Masterclass", teacher: "Faculty English", duration: "40:00" },
  ];

  return (
    <main>
      <Navbar />
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <h3>Student Dashboard</h3>
          </div>
          <nav className="sidebar-nav">
            <button 
              className={activeTab === "notes" ? "active" : ""} 
              onClick={() => setActiveTab("notes")}
            >
              Study Notes
            </button>
            <button 
              className={activeTab === "videos" ? "active" : ""} 
              onClick={() => setActiveTab("videos")}
            >
              Video Lectures
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </nav>
        </aside>

        <section className="dashboard-content">
          <header className="content-header">
            <h2>Welcome, <span className="gradient-text">Future Officer!</span></h2>
            <p>Your path to excellence starts here. Access your learning resources below.</p>
          </header>

          <div className="resources-grid">
            {activeTab === "notes" ? (
              <div className="notes-list">
                {notes.map((note, i) => (
                  <div key={i} className="resource-item animate-on-scroll">
                    <div className="resource-icon">PDF</div>
                    <div className="resource-details">
                      <h4>{note.title}</h4>
                      <span>Added on {note.date} • {note.size}</span>
                    </div>
                    <button className="download-btn">Download</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="videos-list">
                {videos.map((video, i) => (
                  <div key={i} className="resource-item animate-on-scroll">
                    <div className="resource-icon video">▶</div>
                    <div className="resource-details">
                      <h4>{video.title}</h4>
                      <span>By {video.teacher} • {video.duration}</span>
                    </div>
                    <button className="watch-btn">Watch Now</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />

      <style jsx>{`
        .dashboard-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          min-height: 100vh;
          padding-top: 80px;
          background: #050505;
        }

        .dashboard-sidebar {
          background: var(--bg-card);
          border-right: 1px solid var(--border-color);
          padding: 40px 20px;
        }

        .sidebar-header {
          margin-bottom: 40px;
          padding: 0 20px;
        }

        .sidebar-header h3 {
          font-size: 1.2rem;
          color: white;
          border-left: 3px solid var(--accent-indigo);
          padding-left: 12px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sidebar-nav button {
          text-align: left;
          padding: 14px 20px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          border-radius: var(--radius-md);
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .sidebar-nav button:hover {
          background: rgba(255,255,255,0.05);
          color: white;
        }

        .sidebar-nav button.active {
          background: var(--accent-indigo);
          color: white;
        }

        .logout-btn {
          margin-top: 40px;
          color: #ef4444 !important;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1) !important;
        }

        .dashboard-content {
          padding: 60px;
          max-width: 1000px;
        }

        .content-header {
          margin-bottom: 48px;
        }

        .content-header h2 {
          font-size: 2.5rem;
          margin-bottom: 12px;
        }

        .resource-item {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 24px;
          border-radius: var(--radius-lg);
          margin-bottom: 20px;
          transition: all 0.3s;
        }

        .resource-item:hover {
          border-color: var(--accent-indigo);
          transform: translateX(8px);
        }

        .resource-icon {
          width: 50px;
          height: 50px;
          background: rgba(99, 102, 241, 0.1);
          color: var(--accent-indigo);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.8rem;
          margin-right: 24px;
        }

        .resource-icon.video {
          background: rgba(236, 72, 153, 0.1);
          color: #ec4899;
          font-size: 1.2rem;
        }

        .resource-details h4 {
          font-size: 1.1rem;
          margin-bottom: 6px;
          color: white;
        }

        .resource-details span {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .download-btn, .watch-btn {
          margin-left: auto;
          background: transparent;
          border: 1px solid var(--accent-indigo);
          color: var(--accent-indigo);
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }

        .watch-btn {
          border-color: #ec4899;
          color: #ec4899;
        }

        .download-btn:hover {
          background: var(--accent-indigo);
          color: white;
        }

        .watch-btn:hover {
          background: #ec4899;
          color: white;
        }

        @media (max-width: 768px) {
          .dashboard-container {
            grid-template-columns: 1fr;
          }
          .dashboard-sidebar {
            border-right: none;
            border-bottom: 1px solid var(--border-color);
            padding: 20px;
          }
          .sidebar-header {
            display: none;
          }
          .sidebar-nav {
            flex-direction: row;
            overflow-x: auto;
            gap: 12px;
            padding-bottom: 4px;
          }
          .sidebar-nav button {
            white-space: nowrap;
            padding: 10px 16px;
          }
          .logout-btn {
            margin-top: 0;
            margin-left: auto;
          }
          .dashboard-content {
            padding: 30px 20px;
          }
          .resource-item {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
          .resource-icon {
            margin-right: 0;
            margin-bottom: 16px;
          }
          .download-btn, .watch-btn {
            margin-left: 0;
            margin-top: 16px;
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
