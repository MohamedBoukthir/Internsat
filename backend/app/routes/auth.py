from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.utils.face_recognition import get_face_embedding, compare_faces
from app.models.user import User
import bcrypt
import numpy as np
from cryptography.fernet import Fernet
import base64
import os


# Load encryption key from environment variable
encryption_key = os.getenv("ENCRYPTION_KEY")
if not encryption_key:
    raise ValueError("ENCRYPTION_KEY is not set in the environment variables.")
cipher = Fernet(encryption_key.encode('utf-8'))


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

    # Ensure the embedding is a NumPy array of consistent dtype
    face_embedding = np.array(face_embedding, dtype=np.float32)

    # Encrypt the face embedding
    face_embedding_bytes = face_embedding.tobytes()
    base64_encoded_embedding = base64.b64encode(face_embedding_bytes)
    encrypted_face_embedding = cipher.encrypt(base64_encoded_embedding)

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Create the user
    User.create_user(firstName, lastName, email, hashed_password, role, encrypted_face_embedding.decode('utf-8'))
    return jsonify({"message": "User registered successfully"}), 201

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    image = data.get('image')  # Base64-encoded face image

    # Find user by email
    user = User.find_user_by_email(email)
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    # Verify password
    if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({"error": "Invalid credentials"}), 401

    # Decrypt the stored face embedding
    encrypted_face_embedding = user['face_embedding'].encode('utf-8')
    base64_encoded_embedding = cipher.decrypt(encrypted_face_embedding)
    decrypted_face_embedding = np.frombuffer(base64.b64decode(base64_encoded_embedding), dtype=np.float32)

    # Generate live face embedding
    live_face_embedding = get_face_embedding(image)
    if live_face_embedding is None:
        return jsonify({"error": "Face embedding failed"}), 401

    # Ensure the live embedding is a NumPy array of consistent dtype
    live_face_embedding = np.array(live_face_embedding, dtype=np.float32)

    # Compare faces
    if not compare_faces(decrypted_face_embedding, live_face_embedding):
        return jsonify({"error": "Face recognition failed"}), 401

    # Create JWT token
    access_token = create_access_token(identity={
        "email": email,
        "role": user['role']
    })

    return jsonify({
        "access_token": access_token,
        "role": user['role']
    }), 200