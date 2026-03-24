import React from 'react'
import { useState } from 'react'
import './PredictorForm.css'

const FIELDS = [
  { key: 'age', label: 'How old are you?', type: 'number', placeholder: 'e.g. 28', min: 18, max: 80 },
  { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
  { key: 'family_history', label: 'Does anyone in your family have a history of mental illness?', type: 'select', options: ['Yes', 'No'] },
  { key: 'benefits', label: 'Does your employer provide mental health benefits?', type: 'select', options: ['Yes', 'No', "Don't know"] },
  { key: 'remote_work', label: 'Do you work remotely (outside of an office) at least 50% of the time?', type: 'select', options: ['Yes', 'No'] },
  { key: 'company_size', label: 'How many employees does your company have?', type: 'select', options: ['1-5', '6-25', '26-100', '100-500', '500-1000', 'More than 1000'] },
  { key: 'work_interfere', label: 'If you have a mental health condition, how often does it interfere with your work?', type: 'select', options: ['Never', 'Rarely', 'Sometimes', 'Often'] },
]

const DEFAULT_FORM = { age: '', gender: '', family_history: '', benefits: '', remote_work: '', company_size: '', work_interfere: '' }

export default function PredictorForm({ onSubmit, loading, error }) {
  const [form, setForm] = useState(DEFAULT_FORM)

  function handleChange(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function isValid() {
    return FIELDS.every(f => {
      const val = form[f.key]
      if (f.type === 'number') return val !== '' && !isNaN(Number(val)) && Number(val) >= f.min && Number(val) <= f.max
      return val !== ''
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!isValid()) return
    onSubmit({ ...form, age: parseInt(form.age) })
  }

  const completedCount = FIELDS.filter(f => form[f.key] !== '').length
  const progress = (completedCount / FIELDS.length) * 100

  return (
    <div className="form-wrapper">
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-label">
        <span>{completedCount} of {FIELDS.length} answered</span>
        {completedCount === FIELDS.length && <span className="ready-badge">Ready ✓</span>}
      </div>

      <form className="form" onSubmit={handleSubmit} noValidate>
        {FIELDS.map((field, i) => (
          <div key={field.key} className={`field ${form[field.key] !== '' ? 'field--filled' : ''}`} style={{ animationDelay: `${i * 55}ms` }}>
            <label className="field-label" htmlFor={field.key}>
              <span className="field-number">{String(i + 1).padStart(2, '0')}</span>
              {field.label}
            </label>

            {field.type === 'number' ? (
              <input
                id={field.key}
                className="field-input"
                type="number"
                min={field.min}
                max={field.max}
                placeholder={field.placeholder}
                value={form[field.key]}
                onChange={e => handleChange(field.key, e.target.value)}
              />
            ) : (
              <div className="select-group">
                {field.options.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    className={`option-btn ${form[field.key] === opt ? 'option-btn--selected' : ''}`}
                    onClick={() => handleChange(field.key, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {error && (
          <div className="error-box">
            <span>⚠</span> {error}
          </div>
        )}

        <button type="submit" className={`submit-btn ${loading ? 'submit-btn--loading' : ''}`} disabled={!isValid() || loading}>
          {loading ? (
            <><span className="spinner" /> Analyzing your responses…</>
          ) : (
            <>See my results <span className="btn-arrow">→</span></>
          )}
        </button>
      </form>
    </div>
  )
}
