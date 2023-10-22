from flask import Blueprint, request, jsonify
from flask_cors import CORS
from ..models import db, User, People, Planets, Vehicles
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token

users = Blueprint('users', __name__)
CORS(users)

bcrypt = Bcrypt()

@users.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return jsonify({"message": f'All users accessed', "users": [user.serialize() for user in users]}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    
@users.route('/users/<int:user_id>/add_favorite', methods=['POST'])
def add_favorite_to_user(user_id):
    try:
        data = request.get_json(force=True)
        resource_type = data.get("type")
        resource_id = data.get("resource_id")

        user = User.query.get(user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        if resource_type == "people":
            resource = People.query.get(resource_id)
        elif resource_type == "planets":
            resource = Planets.query.get(resource_id)
        elif resource_type == "vehicles":
            resource = Vehicles.query.get(resource_id)
        else:
            return jsonify({"error": "Invalid resource type"}), 400

        if not resource:
            return jsonify({"error": "Resource not found"}), 404

        if resource_type == "people":
            user.fav_people.append(resource)
        elif resource_type == "planets":
            user.fav_planets.append(resource)
        elif resource_type == "vehicles":
            user.fav_vehicles.append(resource)

        db.session.commit()

        fav_people = [person.serialize() for person in user.fav_people]
        fav_planets = [planet.serialize() for planet in user.fav_planets]
        fav_vehicles = [vehicle.serialize() for vehicle in user.fav_vehicles]

        favorites = {
                "people": fav_people,
                "planets": fav_planets,
                "vehicles": fav_vehicles
            }

        return jsonify({"message": f"Added {resource_type} to favorites", "favorites": favorites}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@users.route('/signup', methods=['POST'])
def signup():
    data_user = request.get_json(force=True)
    email = data_user.get("email")
    username = data_user.get("username")
    password = data_user.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are needed"}), 400

    username_exists = User.query.filter_by(username=username).first()
    email_exists = User.query.filter_by(email=email).first()

    if email_exists is not None:
        return jsonify({"error": "Email is already taken"}), 400
    elif username_exists is not None:
        return jsonify({"error": "Username is already taken"}), 400

    codified_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, email=email, password=codified_password)
    db.session.add(new_user)
    db.session.commit()

    token = create_access_token(identity=new_user.id)

    fav_people = [person.serialize() for person in new_user.fav_people]
    fav_planets = [planet.serialize() for planet in new_user.fav_planets]
    fav_vehicles = [vehicle.serialize() for vehicle in new_user.fav_vehicles]

    favorites = {
        "people": fav_people,
        "planets": fav_planets,
        "vehicles": fav_vehicles
    }

    return jsonify({"message": "User successfully created", "username": new_user.username, "token": token, "user_id": new_user.id, "email": new_user.email, 
                    "favorites": favorites }), 201


@users.route('/login', methods=['POST'])
def login():
    data_login = request.get_json(force=True)
    email = data_login.get("email")
    password = data_login.get("password")

    user_to_login = User.query.filter_by(email=email).first()

    if not user_to_login:
        return jsonify({"error": "There is no account for that email"}), 400

    if not bcrypt.check_password_hash(user_to_login.password, password):
        return jsonify({"error": "Incorrect credentials, incorrect password or email"}), 400

    token = create_access_token(identity=user_to_login.id)

    fav_people = [person.serialize() for person in user_to_login.fav_people]
    fav_planets = [planet.serialize() for planet in user_to_login.fav_planets]
    fav_vehicles = [vehicle.serialize() for vehicle in user_to_login.fav_vehicles]

    favorites = {
        "people": fav_people,
        "planets": fav_planets,
        "vehicles": fav_vehicles
    }

    return jsonify({"message": "User successfully logged in", "username": user_to_login.username, "token": token, "user_id": user_to_login.id, "email": user_to_login.email,
                    "favorites": favorites}), 201


@users.route('/users/<int:user_id>/favorites', methods=['GET'])
def get_favorites(user_id):
    user = User.query.get(user_id)

    fav_people = [person.serialize() for person in user.fav_people]
    fav_planets = [planet.serialize() for planet in user.fav_planets]
    fav_vehicles = [vehicle.serialize() for vehicle in user.fav_vehicles]

    favorites = {
    "people": fav_people,
    "planets": fav_planets,
    "vehicles": fav_vehicles
}
    return jsonify({
        "message": "User successfully accessed",
        "favorites": favorites,
    }), 201


@users.route('/users/<int:user_id>/favorites', methods=['DELETE'])
def delete_favorite(user_id):
    data_delete = request.get_json(force=True)
    resource_type = data_delete.get("resource_type")
    favorite_id = data_delete.get("favorite_id")

    try:
        user = User.query.get(user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        
        found = False
        resources = getattr(user, f'fav_{resource_type}')
        for resource in resources:
            if resource.id == favorite_id:
                resources.remove(resource)
                found = True 
                break

        if not found:
            return jsonify({"error": "Favorite not found"}), 404

        db.session.commit()

        fav_people = [person.serialize() for person in user.fav_people]
        fav_planets = [planet.serialize() for planet in user.fav_planets]
        fav_vehicles = [vehicle.serialize() for vehicle in user.fav_vehicles]

        favorites = {
        "people": fav_people,
        "planets": fav_planets,
        "vehicles": fav_vehicles
}



        return jsonify({"message": f"Favorite deleted for user {user_id}", "favorites": favorites}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


