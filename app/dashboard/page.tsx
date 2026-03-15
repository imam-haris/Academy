"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("notes");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("is_logged_in");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);

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
  }, [activeTab, selectedSubject]);

  const handleLogout = () => {
    localStorage.removeItem("is_logged_in");
    router.push("/login");
  };

  useEffect(() => {
    setSelectedSubject(null);
  }, [activeTab]);

  const subjects = [
    { id: "maths", name: "Mathematics", icon: "📐" },
    { id: "geography", name: "Geography", icon: "🌍" },
    { id: "history", name: "History", icon: "📜" },
    { id: "reasoning", name: "Reasoning", icon: "🧠" },
    { id: "english", name: "English", icon: "📚" },
    { id: "polity", name: "Polity", icon: "⚖️" },
    { id: "economy", name: "Economy", icon: "💰" },
    { id: "current-affairs", name: "Current Affairs", icon: "📰" },
  ];

  // Fetched data from Supabase
  const [notesForSubject, setNotesForSubject] = useState<any[]>([]);
  const [videosForSubject, setVideosForSubject] = useState<any[]>([]);
  const [chaptersForSubject, setChaptersForSubject] = useState<any[]>([]);
  const [noteCounts, setNoteCounts] = useState<Record<string, number>>({});
  const [videoCounts, setVideoCounts] = useState<Record<string, number>>({});
  const [loadingData, setLoadingData] = useState(false);

  // Fetch counts on mount
  useEffect(() => {
    const fetchCounts = async () => {
      const nCounts: Record<string, number> = {};
      const vCounts: Record<string, number> = {};
      for (const sub of subjects) {
        const { count: nc } = await supabase.from("notes").select("*", { count: "exact", head: true }).eq("subject", sub.id);
        nCounts[sub.id] = nc || 0;
        const { count: vc } = await supabase.from("videos").select("*", { count: "exact", head: true }).eq("subject", sub.id);
        vCounts[sub.id] = vc || 0;
      }
      setNoteCounts(nCounts);
      setVideoCounts(vCounts);
    };
    fetchCounts();
  }, []);

  // Fetch notes/videos when a subject is selected
  useEffect(() => {
    if (!selectedSubject) return;
    const fetchSubjectData = async () => {
      setLoadingData(true);
      
      // Fetch Chapters
      const { data: chapters } = await supabase.from("chapters").select("*").eq("subject", selectedSubject).order("created_at", { ascending: true });
      setChaptersForSubject(chapters || []);

      if (activeTab === "notes") {
        const { data } = await supabase.from("notes").select("*").eq("subject", selectedSubject).order("created_at", { ascending: false });
        setNotesForSubject(data || []);
      } else {
        const { data } = await supabase.from("videos").select("*").eq("subject", selectedSubject).order("created_at", { ascending: false });
        setVideosForSubject(data || []);
      }
      setLoadingData(false);
    };
    fetchSubjectData();
  }, [selectedSubject, activeTab]);

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
              <div className="notes-section">
                {!selectedSubject ? (
                  <div className="subjects-grid">
                    {subjects.map((sub, i) => (
                      <div 
                        key={i} 
                        className="subject-card animate-on-scroll"
                        onClick={() => setSelectedSubject(sub.id)}
                      >
                        <div className="subject-icon">{sub.icon}</div>
                        <h4>{sub.name}</h4>
                        <span>{noteCounts[sub.id] || 0} Notes</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="notes-list animate-on-scroll">
                    <div style={{ marginBottom: '20px' }}>
                      <button 
                        className="btn-text" 
                        onClick={() => setSelectedSubject(null)}
                      >
                        ← Back to Subjects
                      </button>
                    </div>
                    {loadingData ? (
                      <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>Loading...</p>
                    ) : notesForSubject.length === 0 ? (
                      <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No notes available yet for this subject.</p>
                    ) : (
                      <>
                        {/* Grouping by Chapters */}
                        {chaptersForSubject.map((chap) => {
                          const chapNotes = notesForSubject.filter(n => n.chapter_id === chap.id);
                          if (chapNotes.length === 0) return null;
                          return (
                            <div key={chap.id} className="chapter-group">
                              <h3 className="chapter-title">📂 {chap.name}</h3>
                              {chapNotes.map((note) => (
                                <div key={note.id} className="resource-item">
                                  <div className="resource-icon">PDF</div>
                                  <div className="resource-details">
                                    <h4>{note.title}</h4>
                                    <span>Added on {new Date(note.created_at).toLocaleDateString()} • {note.file_size || "N/A"} • by {note.uploaded_by}</span>
                                  </div>
                                  {note.file_url ? (
                                    <a href={note.file_url} target="_blank" rel="noopener noreferrer" className="download-btn">Download</a>
                                  ) : (
                                    <button className="download-btn" disabled>No File</button>
                                  )}
                                </div>
                              ))}
                            </div>
                          );
                        })}

                        {/* General Notes (no chapter) */}
                        {notesForSubject.filter(n => !n.chapter_id).length > 0 && (
                          <div className="chapter-group">
                            <h3 className="chapter-title">📑 General Resources</h3>
                            {notesForSubject.filter(n => !n.chapter_id).map((note) => (
                              <div key={note.id} className="resource-item">
                                <div className="resource-icon">PDF</div>
                                <div className="resource-details">
                                  <h4>{note.title}</h4>
                                  <span>Added on {new Date(note.created_at).toLocaleDateString()} • {note.file_size || "N/A"} • by {note.uploaded_by}</span>
                                </div>
                                {note.file_url ? (
                                  <a href={note.file_url} target="_blank" rel="noopener noreferrer" className="download-btn">Download</a>
                                ) : (
                                  <button className="download-btn" disabled>No File</button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="videos-section">
                {!selectedSubject ? (
                  <div className="subjects-grid">
                    {subjects.map((sub, i) => (
                      <div 
                        key={i} 
                        className="subject-card animate-on-scroll"
                        onClick={() => setSelectedSubject(sub.id)}
                      >
                        <div className="subject-icon">{sub.icon}</div>
                        <h4>{sub.name}</h4>
                        <span>{videoCounts[sub.id] || 0} Lectures</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="videos-list animate-on-scroll">
                    <div style={{ marginBottom: '20px' }}>
                      <button 
                        className="btn-text" 
                        onClick={() => setSelectedSubject(null)}
                      >
                        ← Back to Subjects
                      </button>
                    </div>
                    {loadingData ? (
                      <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>Loading...</p>
                    ) : videosForSubject.length === 0 ? (
                      <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No video lectures available yet for this subject.</p>
                    ) : (
                      <>
                        {/* Grouping by Chapters */}
                        {chaptersForSubject.map((chap) => {
                          const chapVideos = videosForSubject.filter(v => v.chapter_id === chap.id);
                          if (chapVideos.length === 0) return null;
                          return (
                            <div key={chap.id} className="chapter-group">
                              <h3 className="chapter-title">🎥 {chap.name}</h3>
                              {chapVideos.map((video) => (
                                <div key={video.id} className="resource-item">
                                  <div className="resource-icon video">▶</div>
                                  <div className="resource-details">
                                    <h4>{video.title}</h4>
                                    <span>{video.duration || "N/A"} • by {video.uploaded_by}</span>
                                  </div>
                                  {video.video_url ? (
                                    <a href={video.video_url} target="_blank" rel="noopener noreferrer" className="watch-btn">Watch Now</a>
                                  ) : (
                                    <button className="watch-btn" disabled>No Link</button>
                                  )}
                                </div>
                              ))}
                            </div>
                          );
                        })}

                        {/* General Videos (no chapter) */}
                        {videosForSubject.filter(v => !v.chapter_id).length > 0 && (
                          <div className="chapter-group">
                            <h3 className="chapter-title">📽️ General Lectures</h3>
                            {videosForSubject.filter(v => !v.chapter_id).map((video) => (
                              <div key={video.id} className="resource-item">
                                <div className="resource-icon video">▶</div>
                                <div className="resource-details">
                                  <h4>{video.title}</h4>
                                  <span>{video.duration || "N/A"} • by {video.uploaded_by}</span>
                                </div>
                                {video.video_url ? (
                                  <a href={video.video_url} target="_blank" rel="noopener noreferrer" className="watch-btn">Watch Now</a>
                                ) : (
                                  <button className="watch-btn" disabled>No Link</button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
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
          background: var(--bg-primary);
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
          color: var(--text-primary);
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
          background: rgba(99, 102, 241, 0.05);
          color: var(--accent-indigo);
        }

        .sidebar-nav button.active {
          background: var(--gradient-primary);
          color: white;
        }

        .logout-btn {
          margin-top: 40px;
          color: #dc2626 !important;
        }

        .logout-btn:hover {
          background: rgba(220, 38, 38, 0.05) !important;
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
          background: rgba(59, 130, 246, 0.1);
          color: var(--accent-blue);
          font-size: 1.2rem;
        }

        .resource-details h4 {
          font-size: 1.1rem;
          margin-bottom: 6px;
          color: var(--text-primary);
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
          border-color: var(--accent-blue);
          color: var(--accent-blue);
        }

        .download-btn:hover {
          background: var(--accent-indigo);
          color: white;
        }

        .watch-btn:hover {
          background: var(--accent-blue);
          color: white;
        }

        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 24px;
        }

        .subject-card {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 32px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }

        .subject-card:hover {
          background: #ffffff;
          border-color: var(--accent-indigo);
          transform: translateY(-4px);
          box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.15);
        }

        .subject-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .subject-card h4 {
          font-size: 1.25rem;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .subject-card span {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .btn-text:hover { color: white; }

        .chapter-group {
          margin-bottom: 40px;
        }

        .chapter-title {
          font-size: 1.4rem;
          color: var(--text-primary);
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 12px;
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
