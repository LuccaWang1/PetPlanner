"""Models for PetPlanner app."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Owner(db.Model): 
    """An owner - a main table."""

    __tablename__ = "owners"

    owner_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    owner_fname = db.Column(db.String(25), nullable=False)
    owner_lname = db.Column(db.String(25), nullable=False)
    owner_email = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(25), nullable=False)

    sent_messages = db.relationship("Message", foreign_keys="Message.sender_id", back_populates="receiver")
    received_messages = db.relationship("Message", foreign_keys="Message.receiver_id", back_populates="sender")

    saved_settings = db.relationship("Saved_Setting", back_populates="owner")

    pets = db.relationship("Pet", back_populates="owners", secondary="pet_owners")
    events = db.relationship("Event", back_populates="owners", secondary="owner_events")

    def __repr__(self):
        return f'<Owner id={self.owner_id} email={self.owner_email}>'


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
    species = db.Column(db.String(3), nullable=False) #bc "dog" or "cat"
    pet_fname = db.Column(db.String(25), nullable=False)
    pet_lname = db.Column(db.String(25))
    birthday = db.Column(db.Integer)
    age = db.Column(db.Integer)
    weight = db.Column(db.Integer) #bc ex: 14.02 = 5 characters #frontend: make sure to specify lbs. as weight measurement on field
    energy_level = db.Column(db.String(6)) #dropdown: high, medium, low
    coat = db.Column(db.String(5)) #dropdown: long, short
    emer_contact_fname = db.Column(db.String(25))
    emer_contact_lname = db.Column(db.String(25))
    emer_contact_phone = db.Column(db.String(25))
    emer_contact_email = db.Column(db.String(25))
    insurance_company = db.Column(db.Text)
    insurance_policy_num = db.Column(db.Text)
    pet_comment = db.Column(db.Text)

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
    role = db.Column(db.String(15), nullable=False) #dropdown select menu: vet, groomer, doctor, emergency vet, pharmacy
    specialist_fname = db.Column(db.String(25))
    specialist_lname = db.Column(db.String(25), nullable=False)
    specialist_email = db.Column(db.String(40))
    specialist_phone = db.Column(db.String(14))
    street = db.Column(db.String(40))
    street2 = db.Column(db.String(40))
    city = db.Column(db.String(40))
    state = db.Column(db.String(3))
    zip_code = db.Column(db.String(10))
    specialist_comment = db.Column(db.Text)

    pets = db.relationship("Pet", back_populates="specialists", secondary="pet_specialists")

    def __repr__(self):
        return f"<Specialist specialist_id={self.specialist_id} role={self.role} specialist_lname={self.specialist_lname}>"


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
    title = db.Column(db.String(40), nullable=False)
    event_comment = db.Column(db.Text)
    location = db.Column(db.String(40))
    start = db.Column(db.DateTime, nullable=False)
    end = db.Column(db.DateTime, nullable=False)
    timeZone = db.Column(db.String, nullable=False)
    #notification = db.Column(db.String) #yes or no - two buttons or dropdown menu #might need to add a column for the timing of the notification? 

    owners = db.relationship("Owner", back_populates="events", secondary="owner_events")
    pets = db.relationship("Pet", back_populates="events", secondary="pet_events")

    def __repr__(self):
        return f"<Specialist specialist_id={self.specialist_id} specialist_fname={self.specialist_fname} specialist_lname={self.specialist_lname}>"


class Message(db.Model):
    """A message - main table."""

    __tablename__ = "messages"

    message_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("owners.owner_id"), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey("owners.owner_id"), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey("pets.pet_id"), nullable=False) #dropdown menu of their pets 
    message_comment = db.Column(db.Text, nullable=False)
    date_sent = db.Column(db.DateTime, nullable=False)

    sender = db.relationship("Owner", foreign_keys="Message.sender_id", back_populates="sent_messages") #how to get the Message.sender_id object b/c of foreign_keys
    receiver = db.relationship("Owner", foreign_keys="Message.receiver_id", back_populates="received_messages")

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