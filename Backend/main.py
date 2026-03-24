from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from predict import predict_output

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    age: int
    gender: str
    family_history: str
    benefits: str
    remote_work: str
    company_size: str
    work_interfere: str

@app.get("/")
def home():
    return {"message": "Mental Health Prediction API"}

@app.post("/predict")
def predict(data: UserInput):
    payload = data.model_dump() if hasattr(data, "model_dump") else data.dict()
    result = predict_output(payload)
    return result