#any functions that have to do with your database 
"""CRUD operations."""


#user log in log out adding new user to database 
#adding a new pet 
#adding a new specialist 
#adding an event 
#updated pet info
#updating specialist info

from model import db, Owner, Pet_Owner, Pet, Pet_Specialist, Specialist, Pet_Events, Owner_Events, Event, Message, Saved_Setting, connect_to_db


def handle_login():
    """Log user into application."""

    owner_email = request.form['email']
    owner_password = request.form['password']

    # owner = Owner.query.filter_by(owner_email=owner_email).one()
    # if Owner.query.filter_by(owner.owner_password) == owner_password: 

    if password == ""
        session["current_user"] = email
        flash(f'Logged in as {email}')
        return redirect('/')

    else:
        flash('Wrong password!')
        return redirect('/login')

def create_user(email, owner_fname, owner_lname, password):
    """Create and return a new user."""

    user = Owner(email=email, owner_fname=owner_fname, owner_lname=owner_lname, password=password)

    return user


def get_users():
    """Return all users."""

    return Owner.query.all()


def get_owner_by_id(owner_id):
    """Return a user/owner by primary key (owner_id)."""

    return Owner.query.get(owner_id)


def get_owner_by_email(owner_email):
    """Return an owner by email."""

    return Owner.query.filter(Owner.owner_email == owner_email).first()


def create_pet(pet_fname, pet_lname, energy_level, age, coat_type, animal_type, weight):
    """Create and return a new pet."""

    pet = Pet(
        pet_fname=pet_fname,
        pet_lname=pet_lname,
        energy_level=energy_level,
        age=age,
        coat_type=coat_type,
        animal_type=animal_type,
        weight=weight
    )

    return pet

def update_pet(pet_fname, pet_lname, energy_level, age, coat_type, animal_type, weight):
    """Create and return a new pet."""

    pet = Pet(
        pet_fname=pet_fname,
        pet_lname=pet_lname,
        energy_level=energy_level,
        age=age,
        coat_type=coat_type,
        animal_type=animal_type,
        weight=weight
    )

    return pet


def get_pets():
    """Return all pets."""

    return Pet.query.all()


def get_pet_by_id(pet_id):
    """Return a pet by primary key (pet_id)."""

    return Pet.query.get(pet_id)


def create_specialist(specialist_fname, specialist_lname, street, street2, city, state, zip_code, role, specialist_email, phone, specialist_comment):
    """Create and return a new rating."""

    specialist = Specialist(
        specialist_fname=specialist_fname, 
        specialist_lname=specialist_lname, 
        street=street, 
        street2=street2, 
        city=city, 
        state=state, 
        zip_code=zip_code, 
        role=role, 
        specialist_email=specialist_email, 
        phone=phone, 
        specialist_comment=specialist_comment
    )

    return specialist


def update_specialist(specialist_fname, specialist_lname, street, street2, city, state, zip_code, role, specialist_email, phone, specialist_comment):
    """ Update a specialist given an owner has edited a specialist. """
    
    specialist = Specialist(
        specialist_fname=specialist_fname, 
        specialist_lname=specialist_lname, 
        street=street, 
        street2=street2, 
        city=city, 
        state=state, 
        zip_code=zip_code, 
        role=role, 
        specialist_email=specialist_email, 
        phone=phone, 
        specialist_comment=specialist_comment
    )

    return specialist


# def create_event(#insert parameters here):
#     """Create and return a new event."""

#     event = Event(#add columns here)

#     return event


# def update_event(#insert parameters here):
#     """ Update an event given that an owner edits an event. """
    
#     #add code here 


if __name__ == "__main__":
    from server import app

    connect_to_db(app)