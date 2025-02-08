"""Server for PetPlanner web app."""

# Standard Library Imports
import os
from urllib.parse import urlparse

# Third-Party Imports
from flask import Flask, render_template, request, flash, session, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from jinja2 import StrictUndefined
import cloudinary
from passlib.hash import argon2
from dotenv import load_dotenv

# Local Imports
import crud
from animal_breeds import breed_data
from model import connect_to_db, db, Owner, Pet, Specialist, Event, Pet_Owner

# Load environment variables
load_dotenv()

cloudinary.config(
    cloudinary_url = os.environ.get("CLOUDINARY_URL")
)

app = Flask(__name__)
app.secret_key = os.environ["KEY"]
app.jinja_env.undefined = StrictUndefined

db = SQLAlchemy(app)
db_uri = os.environ.get("DATABASE_URL", "postgresql://localhost/pets")


@app.route("/", methods=['POST', 'GET'])
def homepage():
    """Render the homepage.html template."""

    return render_template("homepage.html")


@app.route("/login", methods=["GET"])
def login():
    """Render login.html template."""

    if 'owner_email' in session: #you're already logged in
        flash("Great news: You're already logged in")
        return redirect("/dashboard")

    return render_template("login.html")


def is_valid_login(form_data):
    """Checking if login is valid by checking email and password from user inputs to db."""

    if form_data.get('email') is None:
        return False

    if form_data.get('password') is None:
        return False

    return True


@app.route("/login-handler", methods=["POST"])
def loginhandler():
    """Handle login request with a POST request, and store the login information in a session."""

    if not is_valid_login(request.form): #if False
        flash("Please enter your email and a password")
        return redirect("/login")

    owner_email = request.form.get('email')
    owner_email = owner_email.lower()
    password = request.form.get('password')

    user = Owner.query.filter_by(owner_email=owner_email).first()

    if user: #check in db, log in
        #verifying pw is correct with previously hashed pw in the db using argon2 verify method
        if argon2.verify(password, user.hashed):
            session['owner_id'] = user.owner_id
            session['owner_email'] = owner_email
            session['owner_fname'] = user.owner_fname
            session['owner_lname'] = user.owner_lname

            return redirect("/dashboard")

        else: #check in db, if user in db but pw is incorrect
            flash('Oops! Incorrect password - please try again or reset your password')
            return redirect("/login")

    else:
        flash("Please check your email address, and try again -"
              "or, if you don't already have an account, please create one.")
        return redirect("/login")


@app.route('/logout', methods=['GET'])
def logout():
    """Log the user out by clearing the session."""

    session.clear() # Clear the session data

    return redirect("/")


@app.route("/create-account")
def create_account():
    """Render the create_account.html webpage."""

    if 'owner_email' in session: #you're already logged in
        flash("Great news: You already have an account,"
              "and you're already logged in! Here's your dashboard:")
        return redirect("/dashboard")

    return render_template("create_account.html")


@app.route("/create-account-handler", methods=["POST"])
def handle_create_account():
    """Handle create account request with a POST request, 
    and store the login information in a session."""

    owner_fname = request.form.get('owner_fname')
    owner_lname = request.form.get('owner_lname')
    owner_email = request.form.get('owner_email')
    owner_email = owner_email.lower()
    password = request.form.get('password')
    hashed = argon2.hash(password) #hash to db, adding salt

    user = Owner.query.filter_by(owner_email=owner_email).first()
    print(user)

    if user: #check in db, log in
        flash("Great news: You already have an account -"
              "please log in with your log in information, email and password:")
        return redirect("/login")

    else:
        new_user = Owner(owner_fname=owner_fname, owner_lname=owner_lname, owner_email=owner_email, hashed=hashed) #create user instance

        print(type(db.session))

        db.session.add(new_user) #add user instance to database with .add built-in func
        db.session.commit() #then need to commit the change/add to the database
        flash(f"Thanks for creating your account, {owner_fname} - please log in")
        return redirect("/login")


@app.route("/dashboard")
def dashboard():
    """View logged in user's/owner's dashboard."""

    # Retrieve owner info. from the session
    owner_id = session.get('owner_id')
    owner_fname = session.get('owner_fname')

    # Query the pets associated with the given owner_id
    owner_pets = Pet.query.join(Pet_Owner).filter(Pet_Owner.owner_id == owner_id).all()
    print(owner_pets)

    # Check if the user is logged in
    if owner_fname and owner_id:
        return render_template("dashboard.html", owner_fname=owner_fname, owner_pets=owner_pets)
    else:
        flash("You need to log in first.")
        return redirect("/login")


@app.route("/my-account")
def get_account_info():
    """Render my_account.html with user's account information."""

    # Check if the user is logged in
    if "owner_email" in session:
        owner_fname = session.get('owner_fname')
        owner_lname = session.get('owner_lname')
        owner_email = session.get('owner_email')

        return render_template("my_account.html", owner_fname=owner_fname, owner_lname=owner_lname, owner_email=owner_email)
    else:
        flash("You'll need to log in first.")
        return redirect("/login")


@app.route("/save-account-info", methods=["POST"])
def save_account_info():
    """Save account info. in session and database, and then redirect to the /my-account route."""

    # Flask session (for storing session data like owner_id)
    print(session)

    # Fetching the owner_id from the session
    owner_id = session.get('owner_id')
    # Fetching the information from the user via the form inputs the user inputted
    owner_fname = request.json.get('owner_fname')
    owner_lname = request.json.get('owner_lname')
    owner_email = request.json.get('owner_email')
    owner_email = owner_email.lower()

    # Debugging print statements
    print(owner_id)
    print(owner_fname)
    print(owner_lname)
    print(owner_email)

    # Uses CRUD function in crud.py on line 13
    # - retrieves the user base on the owner_id within
    # the Owner class instance originally created for the user
    user = crud.get_owner_by_id(owner_id)
    # Debugging statement
    print(user)

    if user:
        print("in the 'if user' area")

        # Updating user attributes (to what the user has just input in the form via the retrieval above)
        user.owner_fname = owner_fname
        print(f"Owner first name is: {owner_fname}")
        user.owner_lname = owner_lname
        print(f"Owner last name is: {owner_lname}")
        user.owner_email = owner_email
        print(f"Owner email is: {owner_email}")

        try:
            db.session.commit()
            print("Session has been saved with new information")
        except Exception as e:
            db.session.rollback() # Roll back the session if there's an error 
            print(f"Error during commit: {e}")
            return jsonify({'error': 'Could not save information'})

        # Update Flask session
        session['owner_fname'] = owner_fname
        session['owner_lname'] = owner_lname
        session['owner_email'] = owner_email
        session.modified = True

        return jsonify({
            'owner_fname': owner_fname,
            'owner_lname': owner_lname,
            'owner_email': owner_email,
        }), 200
    else:
        return jsonify({'error': 'Owner not found'}), 404


@app.route("/save-new-password", methods=['POST'])
def save_new_password():
    """Save the user's new password in the db."""

    owner_id = session.get('owner_id') #pull owner_id to query database
    password = request.json.get('password') #get password from key at password in JSON object

    print("Owner_id:", owner_id)

    user = crud.get_owner_by_id(owner_id) #query database for user instance with owner_id
    print("User found or not found in database:", user)

    if user: #if user with owner_id is found in database, then:
        user.password = password #use chaining to set row of data at the user class instance and assign it to the new password passed to server from JS JSON object
        db.session.commit() #save the new pw to the database

        print("Session has been saved with new My Account pw")

        session.modified = True #refresh the session to updated with the new user pw

        #now return a response of success
        return jsonify({
            'status': 'success',
        }), 200
    else: #else return a response of error
        return jsonify({'error': 'Owner not found'}), 404


@app.route("/add-a-pet", methods=['POST'])
def create_pet():
    """Create a new instance of the Pet class, and save it in the db."""

    owner_id = session.get('owner_id')
    print(owner_id)

    my_file = request.files.get('petphoto')
    species = request.form.get('species')
    pet_fname = request.form.get('pet_fname')
    pet_lname = request.form.get('pet_lname')
    birthday = request.form.get('birthday', None)
    if birthday == "":
        birthday = None
    age = request.form.get('age', None)
    if age == "null":
        age = None
    breed = request.form.get('breed')
    weight = request.form.get('weight', None)
    if weight == "null":
        weight = None
    energy_level = request.form.get('energy_level')
    coat = request.form.get('coat')
    emer_contact_fname = request.form.get('emer_contact_fname')
    emer_contact_lname = request.form.get('emer_contact_lname')
    emer_contact_phone = request.form.get('emer_contact_phone')
    emer_contact_email = request.form.get('emer_contact_email')
    insurance_company = request.form.get('insurance_company')
    insurance_policy_num = request.form.get('emer_contact_email')
    pet_comment = request.form.get('pet_comment')

    owner = Owner.query.filter_by(owner_id=owner_id).first()

    pet = Pet.query.filter_by(pet_fname=pet_fname).join(Pet.owners).filter(Owner.owner_id==owner_id).first()
    print(pet)

    if pet: #check in db, if in db, tell user
        response = {"success": False, "status": f"Looks like {pet_fname} is already one of your pets"}
        return jsonify(response), 200

    else:
        if my_file is not None:
            result = cloudinary.uploader.upload(my_file, api_key=CLOUDINARY_KEY, api_secret=CLOUDINARY_SECRET, cloud_name=CLOUD_NAME)

            imgUrl = result['secure_url']

        else:
            imgUrl = None

        print(birthday)

        pet = Pet(imgUrl=imgUrl, species=species, pet_fname=pet_fname, pet_lname=pet_lname, birthday=birthday, age=age, breed=breed, weight=weight, energy_level=energy_level, coat=coat, emer_contact_fname=emer_contact_fname, emer_contact_lname=emer_contact_lname, emer_contact_phone=emer_contact_phone, emer_contact_email=emer_contact_email, insurance_company=insurance_company, insurance_policy_num=insurance_policy_num, pet_comment=pet_comment) #create pet instance
        pet.owners.append(owner)
        db.session.add(pet) #add user instance to database with .add built-in func
        db.session.commit() #then need to commit the change/add to the database
        response = {"success": True, "status": f"{pet_fname}'s been added!"}
        return jsonify(response), 200


@app.route("/breeds")
def show_breeds():
    """Send cat and dog breeds as json object from dictionary 
    of two lists in Python file, animal_breeds.py."""

    return jsonify(breed_data)


@app.route("/get-pets-for-owner")
def get_existing_pets_assoc_w_owner():
    """Get pets associated in this owner/user's account. 
    (Use of this route is on the add.jsx file to pull the pets 
    for when the user is completing the add a specialist form 
    to then use this list of pets to select from to associate 
    the new specialist to either one or more, or all of the 
    user's pets.)"""

    # pass a dictionary that is the instance of pet,
    # create key-value pairs that is: key: pet_id :
    # value: pet's data from model.py

    owner_id = session.get('owner_id')
    print(owner_id)

    # query the pets associated with the given owner_id
    owner_pets = Pet.query.join(Pet_Owner).filter(Pet_Owner.owner_id == owner_id).all()
    print(owner_pets)

    # Create a list of dictionaries with pet information
    pets_info = []

    for pet in owner_pets:
        pets_info.append(
            {"pet_id": pet.pet_id,
            "species": pet.species,
            "pet_fname": pet.pet_fname,
            "pet_lname": pet.pet_lname,
            "birthday": pet.birthday,
            "age": pet.age,
            "breed": pet.breed,
            "weight": pet.weight,
            "energy_level": pet.energy_level,
            "coat": pet.coat,
            "emer_contact_fname": pet.emer_contact_fname,
            "emer_contact_lname": pet.emer_contact_lname,
            "emer_contact_phone": pet.emer_contact_phone,
            "emer_contact_email": pet.emer_contact_email, 
            "insurance_company": pet.insurance_company,
            "insurance_policy_num": pet.insurance_policy_num, 
            "pet_comment": pet.pet_comment,
            }
        )
    print(pets_info)
    return jsonify(pets_info)


@app.route("/pets-pet-cards")
def get_owners_pets():
    """Get pets associated in this owner/user's account. (This is for the pet cards - jinja.)"""

    owner_id = session.get('owner_id')
    print(owner_id)

    # Query the pets associated with the given owner_id
    owner_pets = Pet.query.join(Pet_Owner).filter(Pet_Owner.owner_id == owner_id).all()
    print(owner_pets)

    # Create a list of dictionaries with pet information
    pets_info = []

    for pet in owner_pets:
        pets_info.append(
            {"pet_id": pet.pet_id,
            "species": pet.species,
            "pet_fname": pet.pet_fname,
            "pet_lname": pet.pet_lname,
            "birthday": pet.birthday,
            "age": pet.age,
            "breed": pet.breed,
            "weight": pet.weight,
            "energy_level": pet.energy_level,
            "coat": pet.coat,
            "emer_contact_fname": pet.emer_contact_fname,
            "emer_contact_lname": pet.emer_contact_lname,
            "emer_contact_phone": pet.emer_contact_phone,
            "emer_contact_email": pet.emer_contact_email, 
            "insurance_company": pet.insurance_company,
            "insurance_policy_num": pet.insurance_policy_num, 
            "pet_comment": pet.pet_comment,
            }
        )

    return render_template(pets_info)


@app.route("/my-events")
def render_events():
    """View logged in owner's pet's events in the calendar."""

    return render_template("my_events.html")


@app.route('/show-events')
def publish_events():
    """Retrieve event instances of Event class associated 
    with Owner who is logged in and render them on the calendar 
    that shows on the user's dashboard.html."""

    print("IN THE SHOW EVENTS ROUTE")

    owner_id = session.get('owner_id')
    print("OWNER_ID SHOW EVENTS:", owner_id)

    owner = Owner.query.get(owner_id) #getting access to Owner and events
    # owner_pets = Pet.query.join(Pet_Owner).filter(Pet_Owner.owner_id == owner_id).all()
    print("OWNER DICT:", owner)
    # owner_pets = Owner.query.join(Owner_Events).filter(Pet_Owner.owner_id == owner_id).all()

    if owner:
        print("OWNER.EVENTS:", owner.events)

        events_data = []

        # package the events in a dictionary to be able to package
        # it in a JSON object back to fetch request in calendar.js
        for event in owner.events:
            events_data.append({
                'title': event.title, 
                'start_date': event.start_date.isoformat() if event.start_date else None,
                'start_time': event.start_time.isoformat() if event.start_time else None, 
                'end_date': event.end_date.isoformat() if event.end_date else None,
                'end_time': event.end_time.isoformat() if event.end_time else None, 
                'allDay': event.allDay,
                'description': event.description,
            })

            print("EVENTS_DATA:", events_data)

        request_data = {'events': events_data}
        print(type(request_data))
        print(request_data)
        return jsonify(request_data), 200
    else:
        print("Owner not found.")
        return jsonify({'error': 'Owner not found'}), 404


@app.route('/create-event', methods=['POST'])
def create_event():
    """Create an event and save to the database."""

    owner_id = session.get('owner_id')
    print(owner_id)
    owner = Owner.query.get(owner_id)

    title = request.form.get("title")
    location = request.form.get("location")
    start_date = request.form.get("start_date")
    start_time = request.form.get("start_time")
    end_date = request.form.get("end_date")
    end_time = request.form.get("end_time")
    all_day = request.form.get("allDay")
    description = request.form.get("description")

    if all_day == "true":
        all_day = True
        start_time = None
        end_time = None
    else:
        all_day = False

    event = Event(title=title, location=location, start_date=start_date,start_time=start_time, end_date=end_date, end_time=end_time, all_day=all_day, description=description)

    event.owners.append(owner)
    db.session.add(event) #add user instance to database with .add built-in func
    db.session.commit() #then need to commit the change/add to the database
    response = {"success": True, "status": f"{event.title}'s been added!"}
    return jsonify(response), 200


@app.route("/add-a-specialist", methods=['POST'])
def add_specialist_to_pet():
    """Create a new instance of the Specialist class 
    that's associated with a pet, and save it in the db."""

    owner_id = session.get('owner_id')
    owner = Owner.query.get(owner_id)

    role = request.form.get('role')
    specialist_company = request.form.get('specialist_company')
    specialist_fname = request.form.get('specialist_fname')
    specialist_lname = request.form.get('specialist_lname')
    specialist_email = request.form.get('specialist_email')
    specialist_phone = request.form.get('specialist_phone')
    street = request.form.get('street')
    street2 = request.form.get('street2')
    city = request.form.get('city')
    state = request.form.get('state')
    zip_code = request.form.get('zip_code')
    specialist_comment = request.form.get('specialist_comment')
    pet_selected = request.form.get('pet_selected')
    print(type(pet_selected))
    print(pet_selected)
    all_pets_selected = request.form.get('all_pets_selected')

    specialist = Specialist.query.filter_by(specialist_lname=specialist_lname).join(Pet.specialists).first()
    print(specialist)

    if specialist: #check in db, if in db, tell user
        response = {"success": False, "status": "Looks like this specialist was already added"}
        return jsonify(response), 200

    else:
        specialist = Specialist(role=role, specialist_company=specialist_company, specialist_fname=specialist_fname, specialist_lname=specialist_lname, specialist_email=specialist_email, specialist_phone=specialist_phone, street=street, street2=street2, city=city, state=state, zip_code=zip_code, specialist_comment=specialist_comment)

        if all_pets_selected == "true":
            for pet in owner.pets:
                specialist.pets.append(pet)
        else: #if all pets selected is not selected, if it's false
            pet = Pet.query.get(pet_selected)
            specialist.pets.append(pet)

        db.session.add(specialist) #add specialist to database
        db.session.commit() #then need to commit the to the database
        response = {"success": True, "status": "This specialist's been added!"}
        return jsonify(response), 200


if __name__ == "__main__":
    connect_to_db(app, db_uri) #postgresql:///pets

    app.run(host="0.0.0.0", debug=True)