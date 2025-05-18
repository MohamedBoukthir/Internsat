from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .database import db 
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Configure JWT
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
    jwt = JWTManager(app)

    # Import and register Blueprints
    from .routes.auth import auth_bp
    from .routes.student import student_bp
    from .routes.hr import hr_bp
    from .routes.admin import admin_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(student_bp)
    app.register_blueprint(hr_bp)
    app.register_blueprint(admin_bp)

    return app