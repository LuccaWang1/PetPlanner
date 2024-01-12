#classes that represent the database 

"""Models for PetPlanner app."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime

db = SQLAlchemy()


class Owner(db.Model): #an owner can assign another owner to their same pet without the other owner having to do anything <- this is separate from the function of an owner being able to message another owner 
    """An owner - a main table."""

    __tablename__ = "owners"

    owner_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    owner_fname = db.Column(db.String(25))
    owner_lname = db.Column(db.String(25))
    owner_email = db.Column(db.String(40), unique=True)
    password = db.Column(db.String(25))

    sent_messages = db.relationship("Message", back_populates="sent_message")
    received_messages = db.relationship("Message", back_populates="received_message")
    saved_settings = db.relationship("Saved_Setting", back_populates="owner")

    pets = db.relationship("Pet", back_populates="owners", secondary="pet_owners")
    events = db.relationship("Event", back_populates="owners", secondary="owner_events")

    def __repr__(self):
        return f"<Owner owner_id={self.owner_id} fname={self.owner_fname} lname={self.owner_lname} email={self.owner_email}>"

    #when owner adds or edits pet

class Pet_Owner(db.Model):
    """A pet owner - an associative table."""

    __tablename__ = "pet_owners"

    pet_owner_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("owners.owner_id"))
    pet_id = db.Column(db.Integer, db.ForeignKey("pets.pet_id"))

    def __repr__(self):
        return f"<Pet_owner_id={self.pet_owner_id} owner_id={self.owner_id} pet_id={self.pet_id}>"


class Pet(db.Model):
    """A pet - a main table."""

    __tablename__ = "pets"

    pet_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    pet_fname = db.Column(db.String(25))
    pet_lname = db.Column(db.String(25))
    energy_level = db.Column(db.String(6)) #dropdown: high, medium, low
    age = db.Column(db.Integer)
    coat_type = db.Column(db.String(5)) #dropdown: long, short
    animal_type = db.Column(db.String(3)) #bc "dog" or "cat"
    weight = db.Column(db.Integer) #bc ex: 14.02 = 5 characters

    owners = db.relationship("Owner", back_populates="pets", secondary="pet_owners")
    specialists = db.relationship("Specialist", back_populates="pets", secondary="pet_specialists")
    events = db.relationship("Event", back_populates="pets", secondary="pet_events")

    def __repr__(self):
        return f"<Pet pet_id={self.pet_id} pet_fname={self.pet_fname} pet_lname={self.pet_lname}>"


class Pet_Specialist(db.Model):
    """A pet specialist - an associative table."""

    __tablename__ = "pet_specialists"

    pet_specialist_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey("pets.pet_id"))
    specialist_id = db.Column(db.Integer, db.ForeignKey("specialists.specialist_id"))

    def __repr__(self):
        return f"<Pet_specialist_id={self.pet_specialist_id} pet_id={self.pet_id} specialist_id={self.specialist_id}>"


class Specialist(db.Model):
    """A pet specialist, like a groomer or vet - main table."""

    __tablename__ = "specialists"

    specialist_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    specialist_fname = db.Column(db.String(25))
    specialist_lname = db.Column(db.String(25))
    
    street = db.Column(db.String(40))
    street2 = db.Column(db.String(40))
    city = db.Column(db.String(40))
    state = db.Column(db.String(3))
    zip_code = db.Column(db.String(10))
    role = db.Column(db.String(15)) #dropdown select menu: vet, groomer, doctor, emergency vet, pharmacy
    specialist_email = db.Column(db.String(40))
    phone = db.Column(db.String(13))
    specialist_comment = db.Column(db.Text)

    pets = db.relationship("Pet", back_populates="specialists", secondary="pet_specialists")

    def __repr__(self):
        return f"<Specialist specialist_id={self.specialist_id} specialist_fname={self.specialist_fname} specialist_lname={self.specialist_lname}>"


class Pet_Events(db.Model):
    """A pet event - associative table."""

    __tablename__ = "pet_events"

    pet_event_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey("pets.pet_id"))
    event_id = db.Column(db.Integer, db.ForeignKey("events.event_id"))

    def __repr__(self):
        return f"<Pet_event_id={self.pet_event_id} pet_id={self.pet_id} event_id={self.event_id}>"
    

class Owner_Events(db.Model):
    """A owner event - associative table."""

    __tablename__ = "owner_events"

    owner_event_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("owners.owner_id"))
    event_id = db.Column(db.Integer, db.ForeignKey("events.event_id"))

    def __repr__(self):
        return f"<Pet_event_id={self.pet_event_id} pet_id={self.pet_id} event_id={self.event_id}>"


class Event(db.Model):
    """An event - main table."""

    __tablename__ = "events"

    event_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    todays_date = db.Column(db.DateTime) #watch this, might rename to date_created? 
    title = db.Column(db.String(40))
    event_comment = db.Column(db.Text)
    location = db.Column(db.String(40))
    start = db.Column(db.DateTime)
    end = db.Column(db.DateTime)
    timeZone = db.Column(db.String)
    #notification = db.Column(db.String) #yes or no - two buttons or dropdown menu #might need to add a column for the timing of the notification? 

    owners = db.relationship("Owner", back_populates="events", secondary="owner_events")
    pets = db.relationship("Pet", back_populates="events", secondary="pet_events")

    def __repr__(self):
        return f"<Specialist specialist_id={self.specialist_id} specialist_fname={self.specialist_fname} specialist_lname={self.specialist_lname}>"


class Message(db.Model):
    """A message - main table."""

    __tablename__ = "messages"

    message_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("owners.owner_id"))
    receiver_id = db.Column(db.Integer, db.ForeignKey("owners.owner_id"))
    pet_id = db.Column(db.Integer, db.ForeignKey("pets.pet_id")) #dropdown menu of their pets 
    message_comment = db.Column(db.Text)
    date_sent = db.Column(db.DateTime)

    sent_message = db.relationship("Owner", back_populates="sent_messages")
    received_message = db.relationship("Owner", back_populates="received_messages")

    def __repr__(self):
        return f"<Message message_id={self.message_id} sender owner_id={self.owner_id} receiver owner_id={self.owner_id}>"


class Saved_Setting(db.Model): #for walking, feeding, medication that would reoccur through time based on the pet's needs and owner care they can provide 
    """A saved setting for events - main table."""

    __tablename__ = "saved_settings"

    saved_setting_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    title = db.Column(db.String(40))
    comment = db.Column(db.Text)
    location = db.Column(db.String(40))
    timeZone = db.Column(db.String)
    rrule_freq = db.Column(db.String)
    rrule_until = db.Column(db.String)
    rrule_byday = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey("owners.owner_id"))
    #notification = db.Column(db.String, db.ForeignKey("events.notification")) #double checking this 

    owner = db.relationship("Owner", back_populates="saved_settings")

    def __repr__(self):
        return f"<Saved setting saved_setting_id={self.saved_setting_id} title={self.title} owner_id={self.owner_id}>"
    

def connect_to_db(flask_app, db_uri="postgresql:///pets", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    connect_to_db(app)