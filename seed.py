"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime

import crud
import model
import server

os.system("dropdb pets")
os.system("createdb pets")

model.connect_to_db(server.app)
model.db.create_all()

# test_owner = [
#     owner_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
#     owner_fname = db.Column(db.String(25))
#     owner_lname = db.Column(db.String(25))
#     owner_email = db.Column(db.String(40), unique=True)
#     password = db.Column(db.String(25))

#     messages = db.relationship("Message", back_populates="owners")
#     saved_settings = db.relationship("Saved_Setting", back_populates="owners")

#     pets = db.relationship("Pet", back_populates="owners", secondary="pet_owners")
#     events = db.relationship("Event", back_populates="owners", secondary="owner_events")
# ]