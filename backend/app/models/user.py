from pymongo import MongoClient
from dotenv import load_dotenv
import os
from app.database import db
import numpy as np

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client.internsat

class User:
    @staticmethod
    def find_user_by_email(email):
        """
        Find a user by email.
        Args:
            email (str): The email to search for.
        Returns:
            dict: User data if found, None otherwise.
        """
        user = db.users.find_one({"email": email})  # Replace with your database query
        return user

    @staticmethod
    def create_user(firstName, lastName, email, hashed_password, role, face_embedding):
        """
        Create a new user in the database.
        """
        db.users.insert_one({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": hashed_password,
            "role": role,
            "face_embedding": face_embedding
        })

    @staticmethod
    def find_user_by_face_embedding(face_embedding, threshold=0.6):
        """
        Check if a face embedding already exists in the database.
        Args:
            face_embedding (list): The face embedding to check.
            threshold (float): The similarity threshold for matching embeddings.
        Returns:
            dict: User data if a match is found, None otherwise.
        """
        users = db.users.find()  # Retrieve all users
        for user in users:
            stored_embedding = np.array(user['face_embedding'])
            distance = np.linalg.norm(stored_embedding - np.array(face_embedding))
            print(f"Comparing embeddings: Distance = {distance}")  # Debugging line
            if distance < threshold:
                return user  # Return the user if a match is found
        return None