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
    owner_fname="Lucca",
    owner_lname="Test",
    owner_email="luccatest@gmail.com",
    password="Testpassword",
)

model.db.session.add(test_user)
model.db.session.commit()

pet = Pet(
    imgUrl="",
    species="dog",
    pet_fname="Feefee",
    pet_lname="Wang",
    breed="Mutt/Mix",
    birthday="2017-09-26",
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

event = Event(
    title="Feefee's nail trim",
    location="PetCo",
    start_date="2024-02-07",
    start_time="12:30:00", #2018-09-01T00:00:00-05:00, YYYY-MM-DDTHH:mm:ss.sssZ
    end_date="2024-02-07",
    end_time="12:30:00",
    allDay=False,
    description="",
)

event.owners.append(test_user)
event.pets.append(pet)

specialist = Specialist(
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




#     [
#       {
#         title: "Lily turns 10!",
#         start: '2024-02-14'
#       },
#       {
#         title: 'Feefee staying in Calista boarding',
#         start: '2024-02-01',
#         end: '2024-02-03'
#       },
#       {
#         groupId: 'Daily Morning Walk',
#         title: 'Repeating Event',
#         start: '2024-02-07T08:30:00'
#       },
#       {
#         groupId: 'Daily Evening Walk',
#         title: 'Repeating Event',
#         start: '2024-02-07T17:30:00'
#       },
#       {
#         title: "Lily's vet appt.",
#         start: '2024-02-19T10:30:00',
#         end: '2024-02-19T11:15:00'
#       },
#       {
#         title: 'Feefee Lunch Walk',
#         start: '2024-02-08T12:00:00'
#       },
#       {
#         title: 'Feefee play date with Beau',
#         start: '2024-02-24T14:30:00'
#       },
#       {
#         title: "Achilles' Birthday Party",
#         location: "Meryl Lou's home",
#         start: '2023-11-13T07:00:00'
#       },
#     ]
#   });