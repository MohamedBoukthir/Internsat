from flask import Blueprint, jsonify

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin/dashboard', methods=['GET'])
def admin_dashboard():
    return jsonify({"message": "Welcome to the Admin Dashboard!"})