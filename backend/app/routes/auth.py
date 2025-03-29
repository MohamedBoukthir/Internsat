from flask import Blueprint, request, jsonify
from werkzeug.exceptions import Unauthorized
from flask_jwt_extended import create_access_token
from app.utils.face_recognition import get_face_embedding, compare_faces
from app.models.user import User
import bcrypt
import numpy as np
from datetime import datetime, timezone

revoked_tokens = set()

auth_bp = Blueprint('auth', __name__)

# Register route
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    firstName = data.get('firstName')
    lastName = data.get('lastName')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')
    image = data.get('image')  # Base64-encoded image from the frontend

    # Check if the email already exists
    existing_user = User.find_user_by_email(email)
    if existing_user:
        return jsonify({"error": "Email already exists"}), 400

    # Validate image data
    if not image:
        return jsonify({"error": "Image data is missing"}), 400

    # Generate face embedding
    face_embedding = get_face_embedding(image)
    if face_embedding is None:
        return jsonify({"error": "Failed to generate face embedding"}), 400

    # Check if the face embedding already exists
    existing_face_user = User.find_user_by_face_embedding(face_embedding.tolist())
    if existing_face_user:
        return jsonify({"error": "Face already registered"}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Create the user
    User.create_user(firstName, lastName, email, hashed_password, role, face_embedding.tolist())
    return jsonify({"message": "User registered successfully"}), 201

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    image = data.get('image')  # Base64-encoded face image

    print(f"Login request received for email: {email}")
    print(f"Image data length: {len(image) if image else 'None'}")

    # Find user by email
    user = User.find_user_by_email(email)
    if not user:
        print("Error: User not found")
        return jsonify({"error": "Invalid credentials"}), 401

    # Verify password
    if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        print("Error: Invalid password")
        return jsonify({"error": "Invalid credentials"}), 401

    # Generate live face embedding
    live_face_embedding = get_face_embedding(image)
    if live_face_embedding is None:
        print("Error: Failed to generate live face embedding")
        return jsonify({"error": "Face embedding failed"}), 401

    # Retrieve stored embedding
    stored_face_embedding = np.array(user['face_embedding'])
    if stored_face_embedding is None:
        print("Error: No stored embedding found")
        return jsonify({"error": "No stored embedding found"}), 401

    # Compare faces
    if not compare_faces(stored_face_embedding, live_face_embedding):
        print("Error: Face recognition failed")
        return jsonify({"error": "Face recognition failed"}), 401

    # Create JWT token
    access_token = create_access_token(identity={
        "email": email,
        "role": user['role']
    })

    print("Login successful")
    return jsonify({
        "access_token": access_token,
        "role": user['role']
    }), 200


