"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime

import crud
import model
from model import Owner, Pet, Specialist, Event, Pet_Owner, Pet_Specialist
import server

os.system("dropdb pets")
os.system("createdb pets")

model.connect_to_db(server.app)
model.db.create_all()

test_user = Owner(
    owner_id=1, 
    owner_fname="Lucca",
    owner_lname="Test",
    owner_email="luccatest@gmail.com",
    password="Testpassword",
)

model.db.session.add(test_user)
model.db.session.commit()

pet = Pet(
    pet_id=1,
    species="dog",
    pet_fname="Feefee",
    pet_lname="Wang",
    age=6,
    weight="42",
    energy_level="medium",
    coat="short",
    emer_contact_fname="Emily",
    emer_contact_lname="Wang",
    emer_contact_phone="",
    emer_contact_email="test@testemailemer.com",
    insurance_company="Nationwide",
    insurance_policy_num="",
    pet_comment="I absolutely love this dog!",
)

pet.owners.append(test_user)

specialist = Specialist(
    specialist_id=1,
    role="Vet",
    specialist_fname="Carol",
    specialist_lname="Calista",
    specialist_email="calistaanimalhospital@gmail.com",
    specialist_phone="(575) 525-1000",
    street="1889 Calle de Ninos",
    street2="Calista",
    city="Las Cruces",
    state="NM",
    zip_code="88005",
    specialist_comment="I love this vet and the office!! Vet for Lily and Feefee",
)

pet.specialists.append(specialist)

model.db.session.add(pet)
model.db.session.commit()

# def seed_event():
#     event = Event(
#         todays_date=datetime.utcnow(), 
#     )