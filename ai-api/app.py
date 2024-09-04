import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import numpy as np
import pickle as pkl

with open("model.pkl", "rb") as file:
    model = pkl.load(file)

app_url = os.getenv("APP_URL", "http://localhost:3000")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": app_url}})

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["120 per hour"]
)

def recommend(values):
    try:
        return model.predict([values])[0]
    except Exception as e:
        return None

@app.route('/api/recommend', methods=['POST'])
@limiter.limit("120 per hour")
def recommend_api():
    try:
        data = request.get_json()

        if 'values' not in data or len(data['values']) != 7:
            return jsonify({"error": "Invalid input. Please provide an array of 7 float64 values."}), 400

        values = np.array(data['values'], dtype=np.float64)

        recommendation = recommend(values)

        return jsonify({"recommendation": int(recommendation)}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
