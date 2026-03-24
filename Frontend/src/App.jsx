import React from 'react'
import { useState, useRef } from 'react'
import PredictorForm from './components/PredictorForm.jsx'
import ResultCard from './components/ResultCard.jsx'
import './App.css'

const INFO_CARDS = [
  {
    icon: '🌿',
    title: 'Why it matters',
    body: 'Nearly 1 in 5 adults experiences a mental health condition each year, yet fewer than half ever seek treatment. Early awareness is the first step toward change.',
  },
  {
    icon: '🪴',
    title: 'Workplace and wellbeing',
    body: 'Work environment — from company culture to remote flexibility — deeply shapes mental health. Knowing the patterns helps both individuals and employers act proactively.',
  },
  {
    icon: '🛁',
    title: 'What this tool does',
    body: 'Using a machine learning model trained on real workplace survey data, Solace estimates the likelihood that someone with your background would seek mental health treatment.',
  },
  {
    icon: '🕯️',
    title: 'Your data, your insight',
    body: 'No data is stored or shared. This is purely a reflective tool — a gentle nudge to notice patterns and consider whether reaching out for support might be right for you.',
  },
]

export default function App() {
  const [view, setView] = useState('home')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const formRef = useRef(null)

  function goToForm() {
    setView('form')
    setError(null)
    setResult(null)
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)
  }

  function goHome() {
    setView('home')
    setResult(null)
    setError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(formData) {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error('Server error: ' + response.status)
      const data = await response.json()
      setResult(data)
      setView('result')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.message || 'Could not connect to the prediction server. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="tile-bg" aria-hidden="true" />

      <nav className="nav">
        <button className="nav-logo" onClick={goHome}>Solace</button>
        {view === 'home' && (
          <button className="nav-cta" onClick={goToForm}>Take Assessment</button>
        )}
      </nav>

      {view === 'home' && (
        <>
          <section className="hero">
            <div className="hero-inner">
              <span className="hero-eyebrow">Mental Health · Workplace · Insight</span>
              <h1 className="hero-title">
                A quiet corner<br />
                to check in with<br />
                <em>yourself.</em>
              </h1>
              <p className="hero-sub">
                Answer seven simple questions about your work life. Our model will
                estimate whether you are likely to seek mental health treatment and
                why that knowledge matters.
              </p>
              <button className="hero-btn" onClick={goToForm}>
                <span>Take the assessment</span>
                <span className="hero-btn-icon">↓</span>
              </button>
            </div>
            <div className="hero-deco" aria-hidden="true">
              <div className="deco-plant">🪴</div>
              <div className="deco-couch">🛋️</div>
              <div className="deco-building">🏢</div>
            </div>
          </section>

          <section className="info-strip">
            <p className="info-strip-text">
              Over <strong>970 million people</strong> worldwide live with a mental health disorder —
              yet stigma, unawareness, and workplace pressure keep most from seeking help.
            </p>
          </section>

          <section className="cards-section">
            <h2 className="section-title">Why this exists</h2>
            <div className="cards-grid">
              {INFO_CARDS.map((c, i) => (
                <div className="info-card" key={i} style={{ animationDelay: i * 80 + 'ms' }}>
                  <span className="info-card-icon">{c.icon}</span>
                  <h3 className="info-card-title">{c.title}</h3>
                  <p className="info-card-body">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="how-section">
            <div className="how-inner">
              <div className="how-text">
                <h2 className="section-title">How it works</h2>
                <ol className="how-list">
                  <li><span>01</span> Answer 7 questions about your age, gender, workplace benefits, and how mental health affects your work.</li>
                  <li><span>02</span> Our model — trained on the OSMI Mental Health in Tech Survey — processes your answers.</li>
                  <li><span>03</span> You receive a probability score and a clear prediction about treatment-seeking behaviour.</li>
                </ol>
              </div>
              <div className="how-cta-box">
                <p>Ready to see where you stand?</p>
                <button className="hero-btn" onClick={goToForm}>Begin assessment →</button>
              </div>
            </div>
          </section>
        </>
      )}

      {view === 'form' && (
        <section className="form-section" ref={formRef}>
          <div className="form-section-inner">
            <div className="form-intro">
              <button className="back-link" onClick={goHome}>← Back to home</button>
              <h2 className="form-section-title">Your Assessment</h2>
              <p className="form-section-sub">Take your time. There are no right or wrong answers.</p>
            </div>
            <PredictorForm onSubmit={handleSubmit} loading={loading} error={error} />
          </div>
        </section>
      )}

      {view === 'result' && result && (
        <section className="result-section">
          <div className="result-section-inner">
            <ResultCard result={result} onGoHome={goHome} onNewAssessment={goToForm} />
          </div>
        </section>
      )}

      <footer className="footer">
        <p>Solace is an informational tool, not a medical device. Always consult a qualified mental health professional.</p>
      </footer>
    </div>
  )
}
