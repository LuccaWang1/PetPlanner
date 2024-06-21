"""CRUD operations."""

from model import Owner, Pet, Specialist, connect_to_db

def create_user(owner_fname, owner_lname, email, password):
    """Create and return a new user."""

    user = Owner(owner_fname=owner_fname, owner_lname=owner_lname, email=email, password=password)

    return user


def get_owner_by_id(owner_id):
    """Return a user/owner by primary key (owner_id)."""

    return Owner.query.get(owner_id)


def get_owner_by_email(owner_email):
    """Return an owner by email."""

    return Owner.query.get(owner_email).first()


def create_pet(imgUrl, species, pet_fname, pet_lname, birthday, energy_level, age, breed, weight, coat_type, emer_contact_fname, emer_contact_lname, emer_contact_phone, emer_contact_email, insurance_company, insurance_policy_num):
    """Create and return a new pet."""

    pet = Pet(
        imgUrl=imgUrl,
        species=species,
        pet_fname=pet_fname,
        pet_lname=pet_lname,
        birthday=birthday,
        age=age,
        breed=breed,
        weight=weight,
        energy_level=energy_level,
        coat_type=coat_type,
        emer_contact_fname=emer_contact_fname,
        emer_contact_lname=emer_contact_lname,
        emer_contact_phone=emer_contact_phone,
        emer_contact_email=emer_contact_email,
        insurance_company=insurance_company,
        insurance_policy_num=insurance_policy_num,
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


if __name__ == "__main__":
    from server import app

    connect_to_db(app)