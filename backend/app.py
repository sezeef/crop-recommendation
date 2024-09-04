import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import numpy as np
import pickle as pkl
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from vercel_wsgi import make_app

# Load the model
model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
with open(model_path, "rb") as file:
    model = pkl.load(file)

# Get the app URL from environment variables, with a default for development
app_url = os.getenv("NEXT_PUBLIC_APP_URL", "*")  # Localhost for local dev

# Initialize Flask app
app = Flask(__name__)

# Set up CORS
CORS(app, resources={r"/*": {"origins": app_url}})

# Set up rate limiting
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["120 per hour"]
)

# Function to perform recommendation
def recommend(values):
    try:
        return model.predict([values])[0]
    except Exception as e:
        return None

# API route for recommendations
@app.route('/api/recommend', methods=['POST'])
@limiter.limit("120 per hour")
def recommend_api():
    try:
        data = request.get_json()

        if 'values' not in data or len(data['values']) != 7:
            return jsonify({"error": "Invalid input. Please provide an array of 7 float64 values."}), 400

        values = np.array(data['values'], dtype=np.float64)
        recommendation = recommend(values)

        if recommendation is None:
            return jsonify({"error": "Model prediction failed."}), 500

        return jsonify({"recommendation": int(recommendation)}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# For Vercel: wrap the app with Vercel WSGI middleware
if os.getenv("VERCEL_ENV") == "production":
    app = DispatcherMiddleware(app, {
        '/api': app
    })
    app = make_app(app)

# Run the app locally
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
