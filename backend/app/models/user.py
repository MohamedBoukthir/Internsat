from pymongo import MongoClient
from dotenv import load_dotenv
import os
import bcrypt
from app.database import db

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