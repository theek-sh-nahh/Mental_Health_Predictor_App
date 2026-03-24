import pickle
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "model.pkl"
FEATURES_PATH = BASE_DIR / "model" / "features.pkl"

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

with open(FEATURES_PATH, "rb") as f:
    feature_columns = pickle.load(f)