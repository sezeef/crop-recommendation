from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle as pkl

with open("model.pkl", "rb") as file:
    model = pkl.load(file)

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

def recommend(values):
    try:
        return model.predict([values])[0]
    except Exception as e:
        return None

@app.route('/api/recommend', methods=['POST'])
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
