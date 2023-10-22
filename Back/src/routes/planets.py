from flask import Blueprint, request, jsonify
from flask_cors import CORS 
from ..models import db, Planets


planets =Blueprint('planets', __name__)
CORS(planets)

@planets.route('/planets', methods=['GET'])
def get_planets():
    try:
        planets = Planets.query.all()
        return jsonify({"message": f'All planets accessed', "planets": [planet.serialize() for planet in planets]}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500