from app import app, db
from Back.src.models import User, Planets, People, Vehicles
import random
from flask_bcrypt import Bcrypt 

def create_initial_data():
    with app.app_context():
        bcrypt = Bcrypt()
        dummy_password = bcrypt.generate_password_hash("test").decode('utf-8')


        user1 = User(email="user1@example.com", username="user1", password=dummy_password)
        user2 = User(email="user2@example.com", username="user2", password=dummy_password)
        user3 = User(email="user3@example.com", username="user3", password=dummy_password)
        
        db.session.add_all([user1, user2, user3])
        db.session.commit()


        Luke = People(name="Luke Skywalker", gender="male", hair_color="blond", eye_color="blue")
        C3PO = People(name="C-3PO", gender="n/a", hair_color="n/a", eye_color="yellow")
        R2D2 = People(name="R2-D2", gender="n/a", hair_color="n/a", eye_color="red")
        Vader = People(name="Darth Vader", gender="male", hair_color="none", eye_color="yellow")
        Leia = People(name="Leia Organa", gender="female", hair_color="brown", eye_color="brown")
        Owen = People(name="Owen Lars", gender="male", hair_color="brown, grey", eye_color="blue")
        Beru = People(name="Beru Whitesun lars", gender="female", hair_color="brown", eye_color="blue")
        R5 = People(name="R5-D4", gender="n/a", hair_color="n/a", eye_color="red")
        Biggs = People(name="Biggs Darklighter", gender="male", hair_color="black", eye_color="brown")
        Obiwan = People(name = "Obi-Wan Kenobi", gender="male", hair_color="black", eye_color="brown")

        db.session.add_all([Luke, C3PO, R2D2, Vader, Leia, Owen, Beru, R5, Biggs, Obiwan])
        db.session.commit()


        Tatooine = Planets(name="Tatooine", population="200000", terrain="desert" )
        Alderaan = Planets(name="Alderaan", population="2000000000", terrain="grasslands, mountains" )
        Yavin = Planets(name="Yavin IV", population="1000", terrain="jungle, rainforests" )
        Hoth = Planets(name="Hoth", population="unknown", terrain="tundra, ice caves, mountain ranges" )
        Dagobah = Planets(name="Dagobah", population="unknown", terrain="swamp, jungles" )
        Bespin = Planets(name="Bespin", population="6000000", terrain="gas giant" )
        Endor = Planets(name="Endor", population="30000000", terrain="forests, mountains, lakes" )
        Naboo = Planets(name="Naboo", population="4500000000", terrain="grassy hills, swamps, forests, mountains" )
        Coruscant = Planets(name="Coruscant", population="1000000000000", terrain="cityscape, mountains" )
        Kamino = Planets(name="Kamino", population="1000000000", terrain="ocean" )

        db.session.add_all([Tatooine, Alderaan, Yavin, Hoth, Dagobah, Bespin, Endor, Naboo, Coruscant, Kamino])
        db.session.commit()



        CR90 = Vehicles(name="CR90 corvette", passengers="600", class_model="corvette")
        Destroyer = Vehicles(name="Star Destroyer", passengers="n/a", class_model="Star Destroyer")
        Sentinel= Vehicles(name="Sentinel-class landing craft", passengers="75", class_model="landing craft")
        Death= Vehicles(name="Death Star", passengers="843342", class_model="Deep Space Mobile Battlestation")
        Millennium = Vehicles(name="Millennium Falcon", passengers="6", class_model="Light freighter")
        Y = Vehicles(name="Y-wing", passengers="0", class_model="assault starfighter")
        X = Vehicles(name="X-wing", passengers="0", class_model="Starfighter")
        TIE = Vehicles(name="TIE Advanced x1", passengers="0", class_model="Starfighter")
        Executor = Vehicles(name="Executor", passengers="38000", class_model="Star dreadnought")
        Rebel = Vehicles(name="Rebel transport", passengers="90", class_model="Medium transport")

        db.session.add_all([CR90, Destroyer, Sentinel, Death, Millennium, Y, X, TIE, Executor, Rebel])
        db.session.commit()


if __name__ == "__main__":
    create_initial_data()



