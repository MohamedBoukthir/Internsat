from flask import Blueprint, jsonify

hr_bp = Blueprint('hr', __name__)

@hr_bp.route('/hr/dashboard', methods=['GET'])
def hr_dashboard():
    return jsonify({"message": "Welcome to the HR Dashboard!"})