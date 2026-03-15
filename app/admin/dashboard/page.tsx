"use client";
import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

const SUBJECTS = ["maths", "geography", "history", "reasoning", "english", "polity", "economy", "current-affairs"];

interface Chapter {
  id: number;
  name: string;
  subject: string;
  created_at: string;
}

interface Note {
  id: number;
  title: string;
  subject: string;
  chapter_id?: number | null;
  file_url: string;
  file_size: string;
  uploaded_by: string;
  created_at: string;
}

interface Video {
  id: number;
  title: string;
  subject: string;
  chapter_id?: number | null;
  video_url: string;
  duration: string;
  uploaded_by: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("upload-notes");
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const router = useRouter();

  // Notes form states
  const [noteTitle, setNoteTitle] = useState("");
  const [noteSubject, setNoteSubject] = useState("maths");
  const [noteChapterId, setNoteChapterId] = useState<string>("");
  const [noteFileUrl, setNoteFileUrl] = useState("");
  const [noteFileSize, setNoteFileSize] = useState("");
  const [noteFile, setNoteFile] = useState<File | null>(null);

  // Video form states
  const [videoTitle, setVideoTitle] = useState("");
  const [videoSubject, setVideoSubject] = useState("maths");
  const [videoChapterId, setVideoChapterId] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // Chapter form states
  const [newChapterName, setNewChapterName] = useState("");
  const [newChapterSubject, setNewChapterSubject] = useState("maths");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  // Existing content lists
  const [notesList, setNotesList] = useState<Note[]>([]);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const [chaptersList, setChaptersList] = useState<Chapter[]>([]);

  useEffect(() => {
    const admin = localStorage.getItem("admin_logged_in");
    if (!admin) {
      router.push("/admin/login");
      return;
    }
    setAdminName(localStorage.getItem("admin_name") || "Admin");
    setAdminRole(localStorage.getItem("admin_role") || "faculty");
  }, []);

  useEffect(() => {
    if (activeTab === "manage-notes") fetchNotes();
    if (activeTab === "manage-videos") fetchVideos();
    if (activeTab === "manage-chapters" || activeTab === "upload-notes" || activeTab === "upload-videos") fetchChapters();
  }, [activeTab]);

  const fetchChapters = async () => {
    const { data } = await supabase
      .from("chapters")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setChaptersList(data);
  };

  const fetchNotes = async () => {
    const { data } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setNotesList(data);
  };

  const fetchVideos = async () => {
    const { data } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setVideosList(data);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleUploadNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle || !noteSubject) {
      setError("Title and Subject are required.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");

    let fileUrl = noteFileUrl;
    let fileSize = noteFileSize;

    // Upload file to Supabase Storage if a file was selected
    if (noteFile) {
      setUploadProgress("Uploading file...");
      const fileExt = noteFile.name.split(".").pop();
      const fileName = `${noteSubject}/${Date.now()}_${noteFile.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("notes")
        .upload(fileName, noteFile);

      if (uploadError) {
        setLoading(false);
        setUploadProgress("");
        setError("File upload failed: " + uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage.from("notes").getPublicUrl(fileName);
      fileUrl = urlData.publicUrl;
      fileSize = formatFileSize(noteFile.size);
      setUploadProgress("");
    }

    const { error: sbError } = await supabase.from("notes").insert({
      title: noteTitle,
      subject: noteSubject,
      chapter_id: noteChapterId ? parseInt(noteChapterId) : null,
      file_url: fileUrl || null,
      file_size: fileSize || null,
      uploaded_by: adminName,
    });

    setLoading(false);
    if (sbError) {
      setError("Failed to upload note. " + sbError.message);
    } else {
      setMessage("Note uploaded successfully!");
      setNoteTitle("");
      setNoteFileUrl("");
      setNoteFileSize("");
      setNoteFile(null);
    }
  };

  const handleUploadVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle || !videoSubject) {
      setError("Title and Subject are required.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");

    let vUrl = videoUrl;

    // Upload file to Supabase Storage if a file was selected
    if (videoFile) {
      setUploadProgress("Uploading video...");
      const fileName = `${videoSubject}/${Date.now()}_${videoFile.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("videos")
        .upload(fileName, videoFile);

      if (uploadError) {
        setLoading(false);
        setUploadProgress("");
        setError("Video upload failed: " + uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage.from("videos").getPublicUrl(fileName);
      vUrl = urlData.publicUrl;
      setUploadProgress("");
    }

    const { error: sbError } = await supabase.from("videos").insert({
      title: videoTitle,
      subject: videoSubject,
      chapter_id: videoChapterId ? parseInt(videoChapterId) : null,
      video_url: vUrl || null,
      duration: videoDuration || null,
      uploaded_by: adminName,
    });

    setLoading(false);
    if (sbError) {
      setError("Failed to upload video. " + sbError.message);
    } else {
      setMessage("Video lecture uploaded successfully!");
      setVideoTitle("");
      setVideoUrl("");
      setVideoDuration("");
      setVideoFile(null);
    }
  };

  const handleDeleteNote = async (id: number) => {
    await supabase.from("notes").delete().eq("id", id);
    fetchNotes();
  };

  const handleDeleteVideo = async (id: number) => {
    await supabase.from("videos").delete().eq("id", id);
    fetchVideos();
  };

  const handleAddChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterName) {
      setError("Chapter name is required.");
      return;
    }
    setLoading(true);
    const { error: sbError } = await supabase.from("chapters").insert({
      name: newChapterName,
      subject: newChapterSubject
    });
    setLoading(false);
    if (sbError) setError(sbError.message);
    else {
      setMessage("Chapter created successfully!");
      setNewChapterName("");
      fetchChapters();
    }
  };

  const handleDeleteChapter = async (id: number) => {
    const { error: sbError } = await supabase.from("chapters").delete().eq("id", id);
    if (sbError) setError("Cannot delete chapter. It might have linked notes/videos.");
    else fetchChapters();
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("admin_name");
    localStorage.removeItem("admin_role");
    router.push("/admin/login");
  };

  return (
    <main>
      <Navbar />
      <div className="admin-container">
        <aside className="admin-sidebar">
          <div className="admin-profile">
            <div className="admin-avatar">{adminName.charAt(0)}</div>
            <h4>{adminName}</h4>
            <span className="admin-role-badge">{adminRole}</span>
          </div>
          <nav className="admin-nav">
            <button className={activeTab === "upload-notes" ? "active" : ""} onClick={() => { setActiveTab("upload-notes"); setMessage(""); setError(""); }}>
              📝 Upload Notes
            </button>
            <button className={activeTab === "upload-videos" ? "active" : ""} onClick={() => { setActiveTab("upload-videos"); setMessage(""); setError(""); }}>
              🎬 Upload Videos
            </button>
            <button className={activeTab === "manage-notes" ? "active" : ""} onClick={() => { setActiveTab("manage-notes"); setMessage(""); setError(""); }}>
              📋 Manage Notes
            </button>
            <button className={activeTab === "manage-videos" ? "active" : ""} onClick={() => { setActiveTab("manage-videos"); setMessage(""); setError(""); }}>
              📺 Manage Videos
            </button>
            <button className={activeTab === "manage-chapters" ? "active" : ""} onClick={() => { setActiveTab("manage-chapters"); setMessage(""); setError(""); }}>
              📁 Manage Chapters
            </button>
            <button onClick={handleLogout} className="admin-logout-btn">
              🚪 Logout
            </button>
          </nav>
        </aside>

        <section className="admin-content">
          <header className="admin-header">
            <h2>Admin Panel — <span className="gradient-text">{adminName}</span></h2>
            <p>Upload educational content for students across all subjects.</p>
          </header>

          {message && <div className="admin-success">{message}</div>}
          {error && <div className="admin-error">{error}</div>}

          {/* ===== UPLOAD NOTES ===== */}
          {activeTab === "upload-notes" && (
            <form onSubmit={handleUploadNote} className="admin-form">
              <h3>Upload Study Notes</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Title *</label>
                  <input type="text" placeholder="e.g. Number System Part 3" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select value={noteSubject} onChange={(e) => { setNoteSubject(e.target.value); setNoteChapterId(""); }}>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Chapter (Optional)</label>
                  <select value={noteChapterId} onChange={(e) => setNoteChapterId(e.target.value)}>
                    <option value="">-- Select Chapter --</option>
                    {chaptersList.filter(c => c.subject === noteSubject).map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="upload-section">
                <label>Upload from Device</label>
                <div className="file-drop-zone" onClick={() => document.getElementById("noteFileInput")?.click()}>
                  <input id="noteFileInput" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.png" hidden onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) { setNoteFile(f); setNoteFileSize(formatFileSize(f.size)); }
                  }} />
                  {noteFile ? (
                    <div className="file-selected">
                      <span className="file-icon">📄</span>
                      <div>
                        <p className="file-name">{noteFile.name}</p>
                        <p className="file-size-text">{formatFileSize(noteFile.size)}</p>
                      </div>
                      <button type="button" className="file-remove" onClick={(ev) => { ev.stopPropagation(); setNoteFile(null); setNoteFileSize(""); }}>✕</button>
                    </div>
                  ) : (
                    <div className="file-placeholder">
                      <span className="upload-icon">📁</span>
                      <p>Click to select a file</p>
                      <span className="file-hint">PDF, DOC, PPT, Images (Max 50MB)</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="or-divider">OR paste a link</div>

              <div className="form-grid">
                <div className="form-group">
                  <label>File URL (Google Drive / Dropbox)</label>
                  <input type="text" placeholder="https://drive.google.com/..." value={noteFileUrl} onChange={(e) => setNoteFileUrl(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>File Size</label>
                  <input type="text" placeholder="e.g. 2.4 MB" value={noteFileSize} onChange={(e) => setNoteFileSize(e.target.value)} />
                </div>
              </div>

              {uploadProgress && <p className="upload-progress">{uploadProgress}</p>}
              <button className="btn-primary" type="submit" disabled={loading}>
                <span>{loading ? "Uploading..." : "Upload Note"}</span>
              </button>
            </form>
          )}

          {/* ===== UPLOAD VIDEOS ===== */}
          {activeTab === "upload-videos" && (
            <form onSubmit={handleUploadVideo} className="admin-form">
              <h3>Upload Video Lecture</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Title *</label>
                  <input type="text" placeholder="e.g. Algebra Shortcut Tricks" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select value={videoSubject} onChange={(e) => { setVideoSubject(e.target.value); setVideoChapterId(""); }}>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Chapter (Optional)</label>
                  <select value={videoChapterId} onChange={(e) => setVideoChapterId(e.target.value)}>
                    <option value="">-- Select Chapter --</option>
                    {chaptersList.filter(c => c.subject === videoSubject).map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="upload-section">
                <label>Upload from Device</label>
                <div className="file-drop-zone" onClick={() => document.getElementById("videoFileInput")?.click()}>
                  <input id="videoFileInput" type="file" accept="video/*,.mp4,.avi,.mkv,.mov,.webm" hidden onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setVideoFile(f);
                  }} />
                  {videoFile ? (
                    <div className="file-selected">
                      <span className="file-icon">🎬</span>
                      <div>
                        <p className="file-name">{videoFile.name}</p>
                        <p className="file-size-text">{formatFileSize(videoFile.size)}</p>
                      </div>
                      <button type="button" className="file-remove" onClick={(ev) => { ev.stopPropagation(); setVideoFile(null); }}>✕</button>
                    </div>
                  ) : (
                    <div className="file-placeholder">
                      <span className="upload-icon">🎥</span>
                      <p>Click to select a video</p>
                      <span className="file-hint">MP4, AVI, MKV, MOV (Max 50MB)</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="or-divider">OR paste a link</div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Video URL (YouTube / Drive link)</label>
                  <input type="text" placeholder="https://youtube.com/..." value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input type="text" placeholder="e.g. 45:00" value={videoDuration} onChange={(e) => setVideoDuration(e.target.value)} />
                </div>
              </div>

              {uploadProgress && <p className="upload-progress">{uploadProgress}</p>}
              <button className="btn-primary" type="submit" disabled={loading}>
                <span>{loading ? "Uploading..." : "Upload Video"}</span>
              </button>
            </form>
          )}

          {/* ===== MANAGE NOTES ===== */}
          {activeTab === "manage-notes" && (
            <div className="manage-section">
              <h3>All Uploaded Notes ({notesList.length})</h3>
              {notesList.length === 0 ? (
                <p className="empty-msg">No notes uploaded yet.</p>
              ) : (
                notesList.map((note) => (
                  <div key={note.id} className="manage-item">
                    <div className="manage-icon">PDF</div>
                    <div className="manage-details">
                      <h4>{note.title}</h4>
                      <span>{note.subject.charAt(0).toUpperCase() + note.subject.slice(1)} • {note.file_size || "N/A"} • by {note.uploaded_by}</span>
                    </div>
                    <button className="delete-btn" onClick={() => handleDeleteNote(note.id)}>Delete</button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ===== MANAGE VIDEOS ===== */}
          {activeTab === "manage-videos" && (
            <div className="manage-section">
              <h3>All Uploaded Videos ({videosList.length})</h3>
              {videosList.length === 0 ? (
                <p className="empty-msg">No videos uploaded yet.</p>
              ) : (
                videosList.map((video) => (
                  <div key={video.id} className="manage-item">
                    <div className="manage-icon video-icon">▶</div>
                    <div className="manage-details">
                      <h4>{video.title}</h4>
                      <span>{video.subject.charAt(0).toUpperCase() + video.subject.slice(1)} • {video.duration || "N/A"} • by {video.uploaded_by}</span>
                    </div>
                    <button className="delete-btn" onClick={() => handleDeleteVideo(video.id)}>Delete</button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ===== MANAGE CHAPTERS ===== */}
          {activeTab === "manage-chapters" && (
            <div className="manage-section">
              <form onSubmit={handleAddChapter} className="admin-form mb-8" style={{ marginBottom: "30px" }}>
                <h3>Create New Chapter</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Chapter Name *</label>
                    <input type="text" placeholder="e.g. Chapter 1: Introduction" value={newChapterName} onChange={(e) => setNewChapterName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <select value={newChapterSubject} onChange={(e) => setNewChapterSubject(e.target.value)}>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </div>
                </div>
                <button className="btn-primary" type="submit" disabled={loading}>
                  <span>{loading ? "Creating..." : "Create Chapter"}</span>
                </button>
              </form>

              <h3>All Chapters ({chaptersList.length})</h3>
              {chaptersList.length === 0 ? (
                <p className="empty-msg">No chapters created yet.</p>
              ) : (
                chaptersList.map((chap) => (
                  <div key={chap.id} className="manage-item">
                    <div className="manage-icon">📁</div>
                    <div className="manage-details">
                      <h4>{chap.name}</h4>
                      <span>{chap.subject.charAt(0).toUpperCase() + chap.subject.slice(1)}</span>
                    </div>
                    <button className="delete-btn" onClick={() => handleDeleteChapter(chap.id)}>Delete</button>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>
      <Footer />

      <style jsx>{`
        .admin-container {
          display: grid;
          grid-template_columns: 300px 1fr;
          min-height: 100vh;
          padding-top: 80px;
          background: var(--bg-primary);
        }
        .admin-sidebar {
          background: var(--bg-card);
          border-right: 1px solid var(--border-color);
          padding: 40px 20px;
        }
        .admin-profile {
          text-align: center;
          margin-bottom: 40px;
        }
        .admin-avatar {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #ef4444, #f97316);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin: 0 auto 16px;
        }
        .admin-profile h4 {
          color: var(--text-primary);
          font-size: 1.1rem;
          margin-bottom: 8px;
        }
        .admin-role-badge {
          background: rgba(99, 102, 241, 0.1);
          color: var(--accent-indigo);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .admin-nav button {
          text-align: left;
          padding: 14px 20px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          border-radius: var(--radius-md);
          cursor: pointer;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s;
        }
        .admin-nav button:hover {
          background: rgba(99, 102, 241, 0.05);
          color: var(--accent-indigo);
        }
        .admin-nav button.active {
          background: var(--gradient-primary);
          color: white;
        }
        .admin-logout-btn {
          margin-top: 30px;
          color: #dc2626 !important;
        }
        .admin-logout-btn:hover {
          background: rgba(220, 38, 38, 0.05) !important;
        }
        .admin-content {
          padding: 50px;
          max-width: 900px;
        }
        .admin-header {
          margin-bottom: 40px;
        }
        .admin-header h2 {
          font-size: 2rem;
          margin-bottom: 8px;
          color: var(--text-primary);
        }
        .admin-header p {
          color: var(--text-muted);
        }
        .admin-success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
          padding: 14px 20px;
          border-radius: var(--radius-md);
          margin-bottom: 24px;
          font-weight: 500;
        }
        .admin-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          padding: 14px 20px;
          border-radius: var(--radius-md);
          margin-bottom: 24px;
          font-weight: 500;
        }
        .admin-form {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 40px;
        }
        .admin-form h3 {
          color: var(--text-primary);
          font-size: 1.4rem;
          margin-bottom: 28px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 28px;
        }
        .admin-form .form-group label {
          display: block;
          color: var(--text-muted);
          margin-bottom: 8px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .admin-form .form-group input,
        .admin-form .form-group select {
          width: 100%;
          padding: 12px 16px;
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.3s;
        }
        .admin-form .form-group input:focus,
        .admin-form .form-group select:focus {
          border-color: var(--accent-indigo);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        .admin-form .form-group select {
          cursor: pointer;
        }
        .admin-form .form-group select option {
          background: #1a1a1a;
          color: white;
        }
        .manage-section h3 {
          color: var(--text-primary);
          font-size: 1.3rem;
          margin-bottom: 24px;
        }
        .manage-item {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 20px 24px;
          border-radius: var(--radius-lg);
          margin-bottom: 16px;
          transition: all 0.3s;
        }
        .manage-item:hover {
          border-color: var(--accent-indigo);
          box-shadow: var(--shadow-card);
        }
        .manage-icon {
          width: 48px;
          height: 48px;
          background: rgba(99, 102, 241, 0.1);
          color: var(--accent-indigo);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.75rem;
          margin-right: 20px;
          flex-shrink: 0;
        }
        .video-icon {
          background: rgba(236, 72, 153, 0.1);
          color: #ec4899;
          font-size: 1.1rem;
        }
        .manage-details {
          flex: 1;
        }
        .manage-details h4 {
          color: var(--text-primary);
          font-size: 1rem;
          margin-bottom: 4px;
        }
        .manage-details span {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .delete-btn {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.3s;
          flex-shrink: 0;
        }
        .delete-btn:hover {
          background: #ef4444;
          color: white;
        }
        .empty-msg {
          color: var(--text-muted);
          text-align: center;
          padding: 60px 20px;
          font-size: 1.1rem;
        }
        .upload-section {
          margin-bottom: 24px;
        }
        .upload-section > label {
          display: block;
          color: var(--text-muted);
          margin-bottom: 10px;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .file-drop-zone {
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-lg);
          padding: 32px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          background: rgba(255,255,255,0.02);
        }
        .file-drop-zone:hover {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.03);
        }
        .file-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .upload-icon {
          font-size: 2.5rem;
        }
        .file-placeholder p {
          color: var(--text-primary);
          font-weight: 500;
        }
        .file-hint {
          color: var(--text-muted);
          font-size: 0.8rem;
        }
        .file-selected {
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
        }
        .file-icon {
          font-size: 2rem;
        }
        .file-name {
          color: var(--text-primary);
          font-weight: 500;
          font-size: 0.95rem;
        }
        .file-size-text {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .file-remove {
          margin-left: auto;
          background: rgba(239, 68, 68, 0.1);
          border: none;
          color: #ef4444;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
        .file-remove:hover {
          background: #ef4444;
          color: white;
        }
        .or-divider {
          text-align: center;
          color: var(--text-muted);
          font-size: 0.85rem;
          margin: 20px 0;
          position: relative;
        }
        .or-divider::before, .or-divider::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 38%;
          height: 1px;
          background: var(--border-color);
        }
        .or-divider::before { left: 0; }
        .or-divider::after { right: 0; }
        .upload-progress {
          color: #f97316;
          font-size: 0.9rem;
          margin-bottom: 16px;
          text-align: center;
          font-weight: 500;
        }
        @media (max-width: 768px) {
          .admin-container {
            display: block;
            padding-top: 60px;
            overflow-x: hidden;
            width: 100%;
          }
          .admin-sidebar {
            border-right: none;
            border-bottom: 1px solid var(--border-color);
            padding: 10px 12px;
            position: sticky;
            top: 60px;
            z-index: 100;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
          }
          .admin-profile {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
          }
          .admin-avatar {
            width: 32px;
            height: 32px;
            font-size: 0.8rem;
          }
          .admin-profile h4 {
            font-size: 0.9rem;
          }
          .admin-role-badge {
            font-size: 0.6rem;
            padding: 2px 6px;
          }
          .admin-nav {
            flex-direction: row;
            overflow-x: auto;
            gap: 6px;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
          }
          .admin-nav::-webkit-scrollbar {
            display: none;
          }
          .admin-nav button {
            padding: 7px 12px;
            font-size: 0.75rem;
          }
          .admin-logout-btn {
            padding: 7px 10px !important;
            margin-left: auto;
          }
          .admin-content {
            padding: 16px 10px;
            width: 100%;
          }
          .admin-header {
            margin-bottom: 20px;
            text-align: center;
          }
          .admin-header h2 {
            font-size: 1.3rem;
          }
          .admin-header p {
            font-size: 0.8rem;
          }
          .admin-form {
            padding: 18px 12px;
            border-radius: var(--radius-md);
          }
          .admin-form h3 {
            font-size: 1.1rem;
            margin-bottom: 20px;
          }
          .form-grid {
            gap: 12px;
            margin-bottom: 20px;
          }
          .file-drop-zone {
            padding: 15px 10px;
          }
          .file-selected {
            flex-direction: column;
            align-items: flex-start;
          }
          .file-remove {
            position: absolute;
            top: 10px;
            right: 10px;
          }
          .or-divider {
            margin: 15px 0;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </main>
  );
}
