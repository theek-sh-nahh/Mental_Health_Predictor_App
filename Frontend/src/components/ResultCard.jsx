import React from 'react'
import './ResultCard.css'

export default function ResultCard({ result, onGoHome, onNewAssessment }) {
  const { probability, prediction } = result
  const isLikely = probability > 0.5
  const percentage = Math.round(probability * 100)

  const radius = 64
  const circumference = Math.PI * radius
  const fillLength = probability * circumference
  const gap = circumference - fillLength

  return (
    <div className={`result-card ${isLikely ? 'result-card--likely' : 'result-card--unlikely'}`}>

      <div className="result-header">
        <span className="result-eyebrow">Your Result</span>
      </div>

      {/* Gauge */}
      <div className="gauge-wrap">
        <svg className="gauge-svg" viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
          <path d="M 16 80 A 64 64 0 0 1 144 80" fill="none" stroke="var(--surface-2)" strokeWidth="10" strokeLinecap="round" />
          <path
            d="M 16 80 A 64 64 0 0 1 144 80"
            fill="none"
            stroke={isLikely ? '#c0796a' : 'var(--accent)'}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${fillLength} ${gap + 0.1}`}
            strokeDashoffset="0"
            className="gauge-fill"
          />
        </svg>
        <div className="gauge-center">
          <span className="gauge-pct">{percentage}%</span>
          <span className="gauge-lbl">probability</span>
        </div>
      </div>

      {/* Verdict */}
      <div className="verdict">
        <h2 className={`verdict-title ${isLikely ? 'verdict--likely' : 'verdict--unlikely'}`}>
          {prediction}
        </h2>
        <p className="verdict-desc">
          {isLikely
            ? "Your responses suggest a higher likelihood of seeking professional mental health support. That's a sign of self-awareness — reaching out takes courage."
            : "Your responses suggest a lower likelihood of seeking treatment at this stage. If you ever feel the need, support is always available."}
        </p>
      </div>

      {/* Confidence bar */}
      <div className="conf-section">
        <div className="conf-labels">
          <span>Unlikely</span>
          <span className="conf-value">{percentage}% confidence</span>
          <span>Likely</span>
        </div>
        <div className="conf-track">
          <div
            className="conf-fill"
            style={{
              width: `${percentage}%`,
              background: isLikely
                ? 'linear-gradient(90deg, var(--warm-light), #c0796a)'
                : 'linear-gradient(90deg, var(--accent-light), var(--accent))',
            }}
          />
          <div className="conf-marker" style={{ left: `${percentage}%` }} />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="result-note">
        <span>🌿</span>
        This is a statistical prediction, not a clinical diagnosis. Please speak with a mental health professional for personal guidance.
      </div>

      {/* Action buttons */}
      <div className="result-actions">
        <button className="action-btn action-btn--secondary" onClick={onGoHome}>
          ← Back to home
        </button>
        <button className="action-btn action-btn--primary" onClick={onNewAssessment}>
          New assessment
        </button>
      </div>
    </div>
  )
}
