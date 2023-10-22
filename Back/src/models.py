from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "favorite_people": [person.serialize() for person in self.fav_people],
            "favorite_planets": [planet.serialize() for planet in self.fav_planets],
            "favorite_vehicles": [vehicle.serialize() for vehicle in self.fav_vehicles],
            # Do not serialize the password; it's a security breach
        }


class People(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    gender = db.Column(db.String(250), nullable=True)
    hair_color = db.Column(db.String(250), nullable=False)
    eye_color = db.Column(db.String(250), nullable=False)

    users = db.relationship('User', secondary='favorite_people',
                            lazy='subquery', backref=db.backref('fav_people', lazy=True))

    def __repr__(self):
        return '<People %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "gender": self.gender,
            "hair_color": self.hair_color,
            "eye_color": self.eye_color
        }


class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    population = db.Column(db.String(80), nullable=False)
    terrain = db.Column(db.String(80), nullable=False)

    user_fav = db.relationship('User', secondary='favorite_planets',
                               lazy='subquery', backref='fav_planets')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "population": self.population,
            "terrain": self.terrain,
        }


class Vehicles(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(250), unique=True, nullable=False)
    passengers = db.Column(db.String(80), nullable=False)
    class_model = db.Column(db.String(250), nullable=False)

    user_fav = db.relationship('User', secondary='favorite_vehicles',
                               lazy='subquery', backref='fav_vehicles')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "passengers": self.passengers,
            "class_model": self.class_model
        }


favorite_people = db.Table('favorite_people', 
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('people_id', db.Integer, db.ForeignKey('people.id'))
    )

favorite_planets = db.Table('favorite_planets',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('planet_id', db.Integer, db.ForeignKey('planets.id'))
    )

favorite_vehicles = db.Table('favorite_vehicles',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('vehicle_id', db.Integer, db.ForeignKey('vehicles.id'))
    )
