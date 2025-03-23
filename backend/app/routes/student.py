from flask import Blueprint, jsonify

student_bp = Blueprint('student', __name__)

@student_bp.route('/student/dashboard', methods=['GET'])
def student_dashboard():
    return jsonify({"message": "Welcome to the Student Dashboard!"})

