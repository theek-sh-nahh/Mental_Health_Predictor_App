import pandas as pd
from model_loader import model, feature_columns

def predict_output(data: dict):
    # Convert input to DataFrame
    df = pd.DataFrame([data])

    # Apply one-hot encoding
    df_encoded = pd.get_dummies(df)

    # Align with training features
    df_encoded = df_encoded.reindex(columns=feature_columns, fill_value=0)

    # Predict probability
    prob = model.predict_proba(df_encoded)[0][1]

    prediction = "Likely to Seek Treatment" if prob > 0.5 else "Unlikely to Seek Treatment"

    return {
        "probability": round(prob, 3),
        "prediction": prediction
    }