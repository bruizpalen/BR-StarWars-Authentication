import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from Back.src.models import db, User, People, Vehicles, Planets
from flask_jwt_extended import JWTManager
from Back.src.routes.users import users
from Back.src.routes.people import people
from Back.src.routes.vehicles import vehicles
from Back.src.routes.planets import planets


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

db.init_app(app)
with app.app_context():
    db.create_all()

MIGRATE = Migrate(app, db, compare_type=True)

CORS(app)

app.register_blueprint(users)
app.register_blueprint(planets)
app.register_blueprint(people)
app.register_blueprint(vehicles)

@app.route('/')
def index():
    return "Hola!"

if __name__ == '__main__':
    app.run(debug=True, port=6969)
