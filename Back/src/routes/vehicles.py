from flask import Blueprint, request, jsonify
from flask_cors import CORS 
from ..models import db, Vehicles


vehicles =Blueprint('vehicles', __name__)
CORS(vehicles)

@vehicles.route('/vehicles', methods=['GET'])
def get_vehicles():
    try:
        vehicles = Vehicles.query.all()
        return jsonify({"message": f'All vehicles accessed', "vehicles": [vehicle.serialize() for vehicle in vehicles]}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500