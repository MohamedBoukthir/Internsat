from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.utils.face_recognition import capture_face, get_face_embedding, compare_faces
from app.models.user import User
import bcrypt
import numpy as np

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    # Check if user already exists
    if User.find_user_by_email(email):
        return jsonify({"error": "User already exists"}), 400

    # Capture face from webcam
    print("Please look at the camera for face capture...")
    face_image = capture_face()

    # Generate face embedding
    face_embedding = get_face_embedding(face_image)

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Create the user
    User.create_user(first_name, last_name, email, hashed_password, role, face_embedding.tolist())
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Find user by email
    user = User.find_user_by_email(email)
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({"error": "Invalid credentials"}), 401

    # Capture live face from webcam
    print("Please look at the camera for face verification...")
    live_face_image = capture_face()

    # Generate live face embedding
    live_face_embedding = get_face_embedding(live_face_image)

    # Compare face embeddings
    if not compare_faces(np.array(user['face_embedding']), live_face_embedding):
        return jsonify({"error": "Face recognition failed"}), 401

    # Generate JWT token
    access_token = create_access_token(identity={"email": email, "role": user['role']})
    return jsonify({"access_token": access_token}), 200