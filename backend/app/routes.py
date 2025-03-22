from flask import Blueprint, jsonify

api = Blueprint('api', __name__)

@api.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Hello from Flask!"})