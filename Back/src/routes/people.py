from flask import Blueprint, request, jsonify
from flask_cors import CORS 
from ..models import db, People


people =Blueprint('people', __name__)
CORS(people)

@people.route('/people', methods=['GET'])
def get_people():
    try:
        people = People.query.all()
        return jsonify({"message": f'All people accessed', "people": [person.serialize() for person in people]}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500