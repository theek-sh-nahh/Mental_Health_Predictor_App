# 🌿 Solace — Mental Health Predictor App

A full-stack web application that predicts whether a tech employee is likely to seek mental health treatment, based on workplace and demographic factors.

> **Built on top of:** [Mental_Health_in_Tech_Analysis](https://github.com/theek-sh-nahh/Mental_Health_in_Tech_Analysis) — a comparative ML study using the OSMI Mental Health in Tech Survey dataset.

---

## 🔗 Project Context

This app is **Part 2** of a two-part project:

| Part | Repository | Description |
|------|-----------|-------------|
| 1️⃣ | [Mental_Health_in_Tech_Analysis](https://github.com/theek-sh-nahh/Mental_Health_in_Tech_Analysis) | ML analysis, model training, feature engineering |
| 2️⃣ | **This repo** | Full-stack web app serving predictions via REST API |

The machine learning model trained in Part 1 is exported and served here through a FastAPI backend, with a React frontend that makes predictions accessible to anyone.

---

## ✨ Features

- 🧠 **ML-powered predictions** — Logistic Regression model trained on OSMI survey data
- 📊 **Probability score** — Visual gauge showing likelihood of seeking treatment
- 🌿 **Cozy, accessible UI** — Warm design built for comfort on a sensitive topic
- ⚡ **Fast REST API** — FastAPI backend with automatic Swagger docs
- 📱 **Responsive** — Works on desktop and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, CSS |
| Backend | FastAPI, Uvicorn |
| ML Model | scikit-learn, pandas, NumPy |
| Packaging | pickle |

---

## 📁 Project Structure

```
Mental_Health_Predictor_App/
├── Backend/
│   ├── model/
│   │   ├── model.pkl          # Trained ML model
│   │   └── features.pkl       # Feature column names from training
│   ├── main.py                # FastAPI app and routes
│   ├── model_loader.py        # Loads model at startup
│   ├── predict.py             # Prediction logic
│   └── requirements.txt       # Python dependencies
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── PredictorForm.jsx   # Assessment form
    │   │   └── ResultCard.jsx      # Prediction result display
    │   ├── App.jsx                 # Main app with routing logic
    │   └── main.jsx                # React entry point
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Running Locally

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Clone the repository

```bash
git clone https://github.com/theek-sh-nahh/Mental_Health_Predictor_App.git
cd Mental_Health_Predictor_App
```

### 2. Start the Backend

```bash
cd Backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at `http://127.0.0.1:8000`
API docs available at `http://127.0.0.1:8000/docs`

### 3. Start the Frontend

Open a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 🔮 How It Works

1. User fills out 7 questions about their workplace and background
2. Frontend sends a POST request to `/predict` with the form data
3. Backend encodes the input using one-hot encoding, aligns it with training features
4. Model returns a probability score between 0 and 1
5. Frontend displays the result with a visual gauge and prediction label

### API Endpoint

```
POST /predict
```

**Request body:**
```json
{
  "age": 28,
  "gender": "Female",
  "family_history": "Yes",
  "benefits": "Yes",
  "remote_work": "No",
  "company_size": "26-100",
  "work_interfere": "Often"
}
```

**Response:**
```json
{
  "probability": 0.823,
  "prediction": "Likely to Seek Treatment"
}
```

---

## 📊 Model Details

The prediction model was selected from a comparative study in [Part 1](https://github.com/theek-sh-nahh/Mental_Health_in_Tech_Analysis). Key details:

- **Dataset:** OSMI Mental Health in Tech Survey
- **Algorithm:** Logistic Regression
- **Accuracy:** ~84%
- **Validation:** 5-Fold Cross-Validation
- **Top predictors:** Work interference, family history, workplace benefits

---

## ⚠️ Disclaimer

Solace is an informational tool built for portfolio and educational purposes. It is not a medical device and does not provide clinical diagnosis. Always consult a qualified mental health professional for personal guidance.

---

## 📄 License

MIT License — feel free to use, modify, and distribute.
