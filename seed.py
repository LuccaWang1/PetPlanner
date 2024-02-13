"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime

import crud
from model import Owner, Pet, Specialist, Event, Pet_Owner, Pet_Specialist, connect_to_db, db
import server

os.system("dropdb pets")
os.system("createdb pets")

connect_to_db(server.app)
db.create_all()

test_user = Owner(
    owner_fname="Lucca",
    owner_lname="Test",
    owner_email="luccatest@gmail.com",
    password="Testpassword",
)

db.session.add(test_user)
db.session.commit()

pet1 = Pet(
    imgUrl="/static/images/Seed_Pets/1petplanner-dog-mix-Feefee.jpeg",
    species="dog",
    pet_fname="Feefee",
    pet_lname="Wang",
    breed="Mutt/Mix",
    birthday="2017-09-26",
    age=6,
    weight=42,
    energy_level="Medium",
    coat="Short",
    emer_contact_fname="Emily",
    emer_contact_lname="Wang",
    emer_contact_phone="",
    emer_contact_email="test@testemailemer.com",
    insurance_company="Nationwide",
    insurance_policy_num="JYE896",
    pet_comment="Loves tennis balls",
)

pet2 = Pet(
    imgUrl="/static/images/Seed_Pets/2petplanner-turtle-Tilly-ben-collins.jpeg",
    species="turtle",
    pet_fname="Tilly",
    pet_lname="",
    breed="",
    birthday="2021-08-04",
    age=2,
    weight=4,
    energy_level="Low",
    coat="",
    emer_contact_fname="Emily",
    emer_contact_lname="Wang",
    emer_contact_phone="",
    emer_contact_email="test@testemailemer.com",
    insurance_company="Nationwide",
    insurance_policy_num="YUI843",
    pet_comment="Loves lettuce",
)

pet3 = Pet(
    imgUrl="/static/images/Seed_Pets/3petplanner-bird-sultan.jpg",
    species="bird",
    pet_fname="AJAX",
    pet_lname="",
    breed="",
    birthday="2019-05-25",
    age=4,
    weight=2,
    energy_level="High",
    coat="",
    emer_contact_fname="Emily",
    emer_contact_lname="Wang",
    emer_contact_phone="",
    emer_contact_email="test@testemailemer.com",
    insurance_company="Nationwide",
    insurance_policy_num="ZAE385",
    pet_comment="A real copy cat",
)

pet4 = Pet(
    imgUrl="/static/images/Seed_Pets/4petplanner-cat-amercian-short-hair-Lily.jpg",
    species="cat",
    pet_fname="Lily",
    pet_lname="Wang",
    breed="American Shorthair",
    birthday="2014-04-01",
    age=9,
    weight=14,
    energy_level="Medium",
    coat="Short",
    emer_contact_fname="Emily",
    emer_contact_lname="Wang",
    emer_contact_phone="",
    emer_contact_email="test@testemailemer.com",
    insurance_company="Nationwide",
    insurance_policy_num="UTW968",
    pet_comment="Loves to gaze (and sometimes catch) birds",
)

pet5 = Pet(
    imgUrl="/static/images/Seed_Pets/5petplanner-dog-Beau.jpeg",
    species="dog",
    pet_fname="Beau",
    pet_lname="Wang",
    breed="Mix/Mutt",
    birthday="2022-04-01",
    age=1,
    weight=40,
    energy_level="High",
    coat="Short",
    emer_contact_fname="Lucca",
    emer_contact_lname="Wang",
    emer_contact_phone="",
    emer_contact_email="test@testemailemer.com",
    insurance_company="Nationwide",
    insurance_policy_num="WEM411",
    pet_comment="LOVES playing",
)

pet6 = Pet(
    imgUrl="/static/images/Seed_Pets/6petplanner-dog-dalmation-Perdita.jpeg",
    species="dog",
    pet_fname="Perdita",
    pet_lname="",
    breed="Dalmation",
    birthday="2022-01-01",
    age=3,
    weight=60,
    energy_level="High",
    coat="Short",
    emer_contact_fname="Emily",
    emer_contact_lname="Wang",
    emer_contact_phone="",
    emer_contact_email="test@testemailemer.com",
    insurance_company="Nationwide",
    insurance_policy_num="POI234",
    pet_comment="Movie fan, especially watching 101 Dalmations",
)

pet7 = Pet(
    imgUrl="/static/images/Seed_Pets/7petplanner-dog-frenchie-Fetch.jpeg",
    species="dog",
    pet_fname="Fetch",
    pet_lname="",
    breed="French Bulldog",
    birthday="2024-02-02",
    age=1,
    weight=2,
    energy_level="High",
    coat="Short",
    emer_contact_fname="Emily",
    emer_contact_lname="Wang",
    emer_contact_phone="",
    emer_contact_email="test@testemailemer.com",
    insurance_company="Nationwide",
    insurance_policy_num="BAB024",
    pet_comment="Bottle feeding, next vet appt. on Feb. 24!",
)

pet8 = Pet(
    imgUrl="/static/images/Seed_Pets/8petplanner-dog-mix-Bentley",
    species="dog",
    pet_fname="Bentley",
    pet_lname="",
    breed="Mix/Mutt",
    birthday="2015-06-28",
    age=8,
    weight=20,
    energy_level="Medium",
    coat="Medium",
    emer_contact_fname="Emily",
    emer_contact_lname="Wang",
    emer_contact_phone="",
    emer_contact_email="test@testemailemer.com",
    insurance_company="Nationwide",
    insurance_policy_num="NMU575",
    pet_comment="Will lick your face, has stinky breath - ask vet about this next time!",
)

pet9 = Pet(
    imgUrl="/static/images/Seed_Pets/9petplanner-dog-papillon-Piper.jpeg",
    species="dog",
    pet_fname="Piper",
    pet_lname="",
    breed="Papillon",
    birthday="2020-05-01",
    age=3,
    weight=18,
    energy_level="High",
    coat="Long",
    emer_contact_fname="April",
    emer_contact_lname="Dean",
    emer_contact_phone="",
    emer_contact_email="test@testemailemer.com",
    insurance_company="Nationwide",
    insurance_policy_num="GAU789",
    pet_comment="Excitable but gentle player with kids",
)

pet10 = Pet(
    imgUrl="/static/images/Seed_Pets/10petplanner-dog-bichon-frise-Fluffy.jpeg",
    species="dog",
    pet_fname="Fluffy",
    pet_lname="",
    breed="Bichon Frise",
    birthday="2020-10-31",
    age=3,
    weight=15,
    energy_level="Medium",
    coat="Medium",
    emer_contact_fname="Stuart",
    emer_contact_lname="Large",
    emer_contact_phone="",
    emer_contact_email="test@testemailemer.com",
    insurance_company="Nationwide",
    insurance_policy_num="NMU576",
    pet_comment="Perfect to bring to the farmer's market to socialize",
)

pet11 = Pet(
    imgUrl="/static/images/Seed_Pets/11petplanner-dog-saint-bernard-Puppy.jpeg",
    species="dog",
    pet_fname="Buddy",
    pet_lname="",
    breed="Saint Bernard",
    birthday="2023-12-25",
    age=1,
    weight=32,
    energy_level="Medium",
    coat="Medium",
    emer_contact_fname="Stuart",
    emer_contact_lname="Large",
    emer_contact_phone="",
    emer_contact_email="test@testemailemer.com",
    insurance_company="Nationwide",
    insurance_policy_num="NMU577",
    pet_comment="Still growing - next vet appt. on March 5!",
)

pet1.owners.append(test_user)
pet2.owners.append(test_user)
db.session.add(pet1)
db.session.add(pet2)
db.session.commit()

pet3.owners.append(test_user)
pet4.owners.append(test_user)
db.session.add(pet3)
db.session.add(pet4)
db.session.commit()

pet5.owners.append(test_user)
pet6.owners.append(test_user)
db.session.add(pet5)
db.session.add(pet6)
db.session.commit()

pet7.owners.append(test_user)
db.session.add(pet7)
db.session.commit()

# pet8.owners.append(test_user)
# db.session.add(pet8)
# db.session.commit()

# pet9.owners.append(test_user)
# pet10.owners.append(test_user)
# db.session.add(pet9)
# db.session.add(pet10)
# db.session.commit()

# pet11.owners.append(test_user)
# db.session.add(pet11)
# db.session.commit()

event1 = Event(
    title="Feefee's nail trim",
    location="PetCo",
    start_date="2024-02-02",
    start_time="12:30:00", #2018-09-01T00:00:00-05:00, YYYY-MM-DDTHH:mm:ss.sssZ
    end_date="2024-02-02",
    end_time="01:30:00",
    allDay=False,
    description="",
)

event2 = Event(
    title="Vacation: Feefee boarded",
    location="Camp Calista",
    start_date="2024-02-25",
    start_time="12:30:00", #2018-09-01T00:00:00-05:00, YYYY-MM-DDTHH:mm:ss.sssZ
    end_date="2024-02-29",
    end_time="01:30:00",
    allDay=False,
    description="",
)

event3 = Event(
    title="Birthday party w/ Achilles and Meryl Lou",
    location="Houston",
    start_date="2024-02-24",
    start_time="12:30:00", #2018-09-01T00:00:00-05:00, YYYY-MM-DDTHH:mm:ss.sssZ
    end_date="2024-02-24",
    end_time="05:00:00",
    allDay=False,
    description="",
)

event4 = Event(
    title="Playdate Beau and Stormy",
    location="Dog Park",
    start_date="2024-02-03",
    start_time="02:30:00", #2018-09-01T00:00:00-05:00, YYYY-MM-DDTHH:mm:ss.sssZ
    end_date="2024-02-03",
    end_time="04:00:00",
    allDay=False,
    description="",
)

event5 = Event(
    title="Lily nail trim at home",
    location="Home",
    start_date="2024-02-06",
    start_time="10:30:00", #2018-09-01T00:00:00-05:00, YYYY-MM-DDTHH:mm:ss.sssZ
    end_date="2024-02-06",
    end_time="10:45:00",
    allDay=False,
    description="",
)

event1.owners.append(test_user)
event1.pets.append(pet1)
event1.pets.append(pet2)
event2.owners.append(test_user)
event2.pets.append(pet1)
event2.pets.append(pet2)
event3.owners.append(test_user)
event3.pets.append(pet1)
event3.pets.append(pet2)
event4.owners.append(test_user)
event5.owners.append(test_user)
db.session.add(event1)
db.session.add(event2)
db.session.add(event3)
db.session.add(event4)
db.session.add(event5)
db.session.commit()

# specialist = Specialist(
#     role="Vet",
#     specialist_fname="Carol",
#     specialist_lname="Calista",
#     specialist_email="calistaanimalhospital@gmail.com",
#     specialist_phone="(575) 525-1000",
#     street="1889 Calle de Ninos",
#     street2="Calista",
#     city="Las Cruces",
#     state="NM",
#     zip_code="88005",
#     specialist_comment="I love this vet and the office!! Vet for Lily and Feefee",
# )

# pet.specialists.append(specialist)