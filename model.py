#classes that represent our database 

"""Models for PetPlanner app."""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Owner(db.Model):
    """An owner."""

    __tablename__ = "owners"

    owner_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)

    pet_owner = db.relationship("Pet_Owner", back_populates="owners")
    messages = db.relationship("Message", back_populates="owners")
    saved_settings = db.relationship("Saved_Setting", back_populates="owners")
    owner_events = db.relationship("Event", back_populates="owners")

    def __repr__(self):
        return f"<Owner owner_id={self.owner_id} fname={self.fname} lname={self.lname} email={self.email}>"


class Pet_Owner(db.Model):
    """A pet owner."""

    __tablename__ = "pet_owners"

    pet_owner_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("owners.owner_id"))
    pet_id = db.Column(db.Integer, db.ForeignKey("pets.pet_id"))

    pet_owner = db.relationship("Pet_Owner", back_populates="owners")
    messages = db.relationship("Message", back_populates="owners")

    def __repr__(self):
        return f"<Petowner_id={self.petowner_id} owner_id={self.owner_id} pet_id={self.pet_id}>"


class Pet(db.Model):
    """A pet."""

    __tablename__ = "pets"

    pet_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    energy_level = db.Column(db.String)
    age = db.Column(db.Integer)
    coat_type = db.Column(db.String)
    type = db.Column(db.String)
    age = db.Column(db.Integer)

    messages = db.relationship("Message", back_populates="owners")
    savedsettings = db.relationship("SavedSetting", back_populates="owners")
    events = db.relationship("Event", back_populates="owners")

    def __repr__(self):
        return f"<Owner owner_id={self.owner_id} fname={self.fname} lname={self.lname} email={self.email}>"


class Rating(db.Model):
    """A movie rating."""

    __tablename__ = "ratings"

    rating_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    score = db.Column(db.Integer)
    movie_id = db.Column(db.Integer, db.ForeignKey("movies.movie_id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    movie = db.relationship("Movie", back_populates="ratings")
    user = db.relationship("User", back_populates="ratings")

    def __repr__(self):
        return f"<Rating rating_id={self.rating_id} score={self.score}>"


def connect_to_db(flask_app, db_uri="postgresql:///ratings", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)
