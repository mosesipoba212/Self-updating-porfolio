"use client"
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react"

export default function Home() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showHero, setShowHero] = useState(true)
  const [showDevZone, setShowDevZone] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/github-projects")
      const projectsData = await res.json()
      setProjects(projectsData || [])
      setLoading(false)
    } catch (err) {
      console.error("Error fetching projects:", err)
      setProjects([]) // Set empty array on error
      setError(null) // Don't show error to user
      setLoading(false)
    }
  }

  const scrollToSection = (id) => {
    setShowHero(false)
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        })
      }
    }, 100)
  }

  const refreshAPIs = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
  }

  // Dev zone toggle 
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault()
        setShowDevZone(!showDevZone)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showDevZone])

  // Tech stack data 
  const technologies = [
    {
      category: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "React (learning)", "TypeScript (learning)", "UI/UX basics"],
    },
    {
      category: "Backend",
      skills: ["Java", "Kotlin", "Python", "Flask", "Node.js (beginner)", "SQL / Databases"],
    },
    {
      category: "Mobile Development",
      skills: ["Android Studio", "Kotlin", "Java", "Native Android Apps"],
    },
    {
      category: "Tools & Methods",
      skills: ["Git & GitHub", "VS Code", "Android Studio", "Linux Command Line", "CI/CD (Vercel)", "Agile teamwork"],
    },
    {
      category: "Soft Skills",
      skills: ["Leadership", "Collaboration", "Problem Solving", "Communication", "Project Ownership"],
    },
  ]

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "white", fontSize: "1.25rem" }}>Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#ef4444", fontSize: "1.25rem" }}>Error: {error}</div>
      </div>
    )
  }

  return (
    <div>
      {/* DEV ZONE */}
      {showDevZone && (
        <div className="dev-zone">
          <div className="dev-zone-content">
            <h3>🔧 Dev Zone</h3>
            <p>Press Ctrl+Shift+D to toggle this panel</p>
            <div className="dev-actions">
              <button className="btn btn-primary" onClick={refreshAPIs} disabled={refreshing}>
                {refreshing ? "Refreshing..." : "🔄 Refresh APIs"}
              </button>
              <div className="dev-stats">
                <p>Projects: {projects.length}</p>
                <p>Last Updated: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO OVERLAY */}
      {showHero && (
        <div className="hero-overlay">
          <div className="hero-card">
            <div className="hero-emoji">👨‍💻</div>
            <h1 className="hero-title">Moses Ipoba</h1>
            <p className="hero-description">
              I am a Computer Science undergraduate at the University of West London, passionate about full-stack development, mobile apps, and software engineering. I enjoy solving real-world problems through clean, scalable code and learning new technologies through personal projects and hackathons. I'm continuously improving my skills while building systems that are efficient, user-centric, and technically sound.
            </p>
            <div className="hero-icons">
              <a href="https://github.com/mosesipoba212" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-outline btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </button>
              </a>
              <a href="https://www.linkedin.com/in/moses-ipoba-b252a7337/" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-outline btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </a>
              <a href="mailto:mosesipoba212@gmail.com">
                <button className="btn btn-outline btn-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z" />
                  </svg>
                </button>
              </a>
            </div>
            <div className="hero-contact">
              <div className="hero-contact-item">
                <span>📞</span>
                <span>+44 7535 287863</span>
              </div>
              <div className="hero-contact-item">
                <span>✉️</span>
                <span>mosesipoba212@gmail.com</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => setShowHero(false)}>
              Find out more
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      {!showHero && (
        <>
          <header className="header">
            <div className="header-container">
              <nav className="nav">
                <button className="btn btn-ghost" onClick={() => scrollToSection("about")}>
                  About
                </button>
                <button className="btn btn-ghost" onClick={() => scrollToSection("education")}>
                  Education
                </button>
                <button className="btn btn-ghost" onClick={() => scrollToSection("experience")}>
                  Experience
                </button>
                <button className="btn btn-ghost" onClick={() => scrollToSection("projects")}>
                  Projects
                </button>
                <button className="btn btn-ghost" onClick={() => scrollToSection("skills")}>
                  Skills
                </button>
                <button className="btn btn-ghost" onClick={() => scrollToSection("contact")}>
                  Contact
                </button>
              </nav>
              <div className="nav-right">
                <a href="/Moses_Ipoba__CV.pdf" download="Moses_Ipoba__CV.pdf" className="btn btn-outline">
                  Resume
                </a>
              </div>
            </div>
          </header>

          <main>
            {/* ABOUT SECTION  */}
            <section id="about" className="about-section">
              <div className="about-content">
                <h1 className="about-title">Full Stack Developer</h1>
                <p className="about-subtitle">
                  Building digital experiences with modern technologies. Computer Science student passionate about
                  creating elegant solutions to complex problems through clean, scalable code.
                </p>
                <div className="about-icons">
                  <a href="https://github.com/mosesipoba212" target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-outline btn-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </button>
                  </a>
                  <a href="https://www.linkedin.com/in/moses-ipoba-b252a7337/" target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-outline btn-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </button>
                  </a>
                  <a href="mailto:mosesipoba212@gmail.com">
                    <button className="btn btn-outline btn-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z" />
                      </svg>
                    </button>
                  </a>
                </div>
              </div>
            </section>

            {/* PROJECTS SECTION  */}
            <section id="projects" className="section">
              <h2 className="section-title">Projects</h2>
              <div className="grid grid-cols-1 grid-md-2 grid-lg-3">
                {projects.map((project) => (
                  <div key={project.id} className="project-card">
                    <div className="project-image">💻</div>
                    <div className="card-content">
                      <h3
                        className="card-title"
                        style={{ color: "white", fontSize: "1.25rem", marginBottom: "0.5rem" }}
                      >
                        {project.name}
                      </h3>
                      <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)", marginBottom: "1rem" }}>
                        {project.description || "No description provided."}
                      </p>
                      <div className="project-tags">
                        {project.language && <span className="project-tag">{project.language}</span>}
                        <span className="project-tag">GitHub</span>
                        <span className="project-tag">Open Source</span>
                      </div>
                    </div>
                    <div className="card-footer">
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        View on GitHub
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* TECH STACK SECTION */}
            <section id="skills" className="section">
              <h2 className="section-title">Tech Stack</h2>
              <div className="tech-stack-grid">
                {technologies.map((tech) => (
                  <div key={tech.category} className="tech-category">
                    <h3 className="tech-category-title">{tech.category}</h3>
                    <div className="tech-skills">
                      {tech.skills.map((skill) => (
                        <span key={skill} className="tech-skill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION SECTION */}
            <section id="education" className="section">
              <h2 className="section-title">Education</h2>
              <div className="grid grid-cols-1 grid-md-2 grid-lg-3">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">University of West London</h3>
                  </div>
                  <div className="card-content">
                    <p style={{ fontWeight: "500", marginBottom: "0.5rem", color: "white" }}>
                      BSc (Hons) Computer Science — Predicted First Class (1:1)
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)", marginBottom: "0.5rem" }}>
                      Currently Studying; Expected Graduation: 2027
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)", marginBottom: "0.5rem" }}>
                      <strong>Key Modules:</strong> Artificial Intelligence, Mobile & Web App Development, Databases, Theory of Computation
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)" }}>
                      <strong>Activities:</strong> Course Representative, Student Leadership Programme, Computing Society Member, Hackathon Participation
                    </p>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Edmonton County School</h3>
                  </div>
                  <div className="card-content">
                    <p style={{ fontWeight: "500", marginBottom: "0.5rem", color: "white" }}>
                      A-Levels / BTEC Equivalent
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)", marginBottom: "0.5rem" }}>
                      Graduated: 2024
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)" }}>
                      <strong>Subjects:</strong> IT, Mathematics, Computer Science
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* EXPERIENCE SECTION */}
            <section id="experience" className="section">
              <h2 className="section-title">Work Experience</h2>
              <div className="grid grid-cols-1 grid-md-2">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Sales Associate — TK Maxx</h3>
                  </div>
                  <div className="card-content">
                    <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.9)", marginBottom: "0.5rem", fontWeight: "500" }}>
                      Nov 2024 – Present
                    </p>
                    <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                      Delivered exceptional customer experience and handled POS operations in a fast-paced retail environment. 
                      Developed teamwork, communication, and problem-solving skills through daily customer interactions and 
                      collaborative work with team members.
                    </p>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">UK Tech Internship Programme — Bright Network</h3>
                  </div>
                  <div className="card-content">
                    <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.9)", marginBottom: "0.5rem", fontWeight: "500" }}>
                      Jul 2025 – Aug 2025
                    </p>
                    <p style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                      Completed 20+ hours of intensive software engineering and cybersecurity training. 
                      Developed efficiency-focused algorithms and collaborated with peers using agile methodologies 
                      to deliver high-quality technical solutions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="section">
              <h2 className="section-title">Get in Touch</h2>
              <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
                <div className="card-content" style={{ paddingTop: "1.5rem" }}>
                  <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.8)", marginBottom: "1rem" }}>
                    If you would like to get in touch, feel free to reach out via email or connect with me on{" "}
                    <a
                      href="https://www.linkedin.com/in/moses-ipoba-b252a7337/"
                      target="_blank"
                      className="contact-link"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                    .
                  </p>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <div className="contact-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="hsl(var(--primary))">
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z" />
                      </svg>
                      <a href="mailto:mosesipoba212@gmail.com" className="contact-link">
                        mosesipoba212@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="hsl(var(--primary))">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>+44 7535 287863</span>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="footer">
            <div className="footer-container">
              <p className="footer-text">© 2025 Moses Ipoba. All rights reserved.</p>
              <nav className="footer-nav">
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
                <a href="#" className="footer-link">
                  Privacy
                </a>
              </nav>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}
