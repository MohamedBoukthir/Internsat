from pymongo import MongoClient
from dotenv import load_dotenv
import os
import bcrypt

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client.internship_platform

class User:
    collection = db.users

    @staticmethod
    def create_user(first_name, last_name, email, password, role, face_embedding):
        user = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password,
            "role": role,
            "face_embedding": face_embedding
        }
        return User.collection.insert_one(user)

    @staticmethod
    def find_user_by_email(email):
        return User.collection.find_one({"email": email})