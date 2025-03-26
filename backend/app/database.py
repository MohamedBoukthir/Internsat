from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# Configure MongoDB
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client.internsat