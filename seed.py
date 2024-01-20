"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime

import crud
import model
from model import Owner, Pet, Specialist, Event
import server

os.system("dropdb pets")
os.system("createdb pets")

model.connect_to_db(server.app)
model.db.create_all()

test_user = Owner(
    owner_fname="Lucca",
    owner_lname="Test",
    owner_email="LuccaTest@gmail.com",
    password="Testpassword",
)

model.db.session.add(test_user) #could do add all and do list of users 
model.db.session.commit()


pet = Pet(
    pet_fname="Feefee",
    pet_lname="Wang",
    energy_level="medium",
    age=6,
    coat_type="short",
    animal_type="dog",
    weight="42",
    pet_comment="I absolutely love this dog!",
    insurance="Nationwide"
)

pet.owners.append(test_user)

model.db.session.add(pet)
model.db.session.commit()

specialist = Specialist(
    specialist_fname="Carol",
    specialist_lname="Calista",
    street="1889 Calle de Ninos",
    street2="Calista",
    city="Las Cruces",
    state="NM",
    zip_code="88005",
    role="vet",
    specialist_email="calistaanimalhospital@gmail.com",
    phone="(575) 525-1000",
    specialist_comment="I love this vet and the office!! Vet for Lily and Feefee",
)

model.db.session.add(specialist)
model.db.session.commit()

# def seed_event():
#     event = Event(
#         todays_date=datetime.utcnow(), 
#     )