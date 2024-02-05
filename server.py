"""Server for PetPlanner web app."""

import os
from jinja2 import StrictUndefined
from flask import Flask, render_template, request, flash, session, redirect, jsonify, url_for
import json
from model import connect_to_db, db, Owner, Pet_Owner, Pet, Pet_Specialist, Specialist, Pet_Events, Owner_Events, Event, Message, Saved_Setting
import crud #consider removing if no crud functions
from datetime import datetime
import cloudinary.uploader
from animal_breeds import breed_data

CLOUDINARY_KEY =  os.environ['CLOUDINARY_KEY']
CLOUDINARY_SECRET = os.environ['CLOUDINARY_SEC']
CLOUD_NAME = "lwpetplanner"

app = Flask(__name__)
app.secret_key = os.environ["KEY"]
app.jinja_env.undefined = StrictUndefined


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


@app.route("/login-handler", methods=["POST"])
def loginhandler():
    """Handle login request with a POST request, and store the login information in a session."""

    print("I'm in the login-handler route and view function")

    owner_email = request.form.get('email')
    owner_email = owner_email.lower()
    owner_password = request.form.get('password')
    
    user = Owner.query.filter_by(owner_email=owner_email).first()

    if user: #check in db, log in 
        if owner_password == user.password:
            session['owner_id'] = user.owner_id
            session['owner_email'] = owner_email
            session['owner_fname'] = user.owner_fname
            session['owner_lname'] = user.owner_lname

            return redirect("/dashboard")
        
        else: #check in db, if user in db but pw is incorrect 
            flash('Oops! Incorrect password - please try again or reset your password')
            return redirect("/login")
    
    else: 
        flash("Please check your email address, and try again - or, if you don't already have an account, please create one with the link below")
        return redirect("/login")


@app.route('/logout', methods=['GET'])
def logout():
    session.clear() # Clear the session data

    return redirect("/")


@app.route("/create-account")
def create_account():
    """Render the create_account.html webpage."""

    if 'owner_email' in session: #you're already logged in 
        flash("Great news: You already have an account, and you're already logged in! Here's your dashboard:")
        return redirect("/dashboard")

    return render_template("create_account.html")


@app.route("/create-account-handler", methods=["POST"])
def handle_create_account():
    """Handle create account request with a POST request, and store the login information in a session."""

    owner_fname = request.form.get('owner_fname')
    owner_lname = request.form.get('owner_lname')
    owner_email = request.form.get('owner_email')
    owner_email = owner_email.lower()
    password = request.form.get('password')
    
    user = Owner.query.filter_by(owner_email=owner_email).first()
    print(user)

    if user: #check in db, log in
        flash("Great news: You already have an account - please log in with your log in information, email and password:")
        return redirect("/login")
  
    else: 
        new_user = Owner(owner_fname=owner_fname, owner_lname=owner_lname, owner_email=owner_email, password=password) #create user instance
        db.session.add(new_user) #add user instance to database with .add built-in func
        db.session.commit() #then need to commit the change/add to the database
        flash(f"Thanks for creating your account, {owner_fname} - please log in")
        return redirect("/login")
        #lines 90-92 can be a crud function 


@app.route("/dashboard")
def dashboard():
    """View logged in user's/owner's dashboard."""

    # Retrieve owner_fname and owner_lname from the session
    owner_fname = session.get('owner_fname')
    owner_lname = session.get('owner_lname')

    # Check if the user is logged in
    if owner_fname and owner_lname:
        return render_template("dashboard.html", owner_fname=owner_fname)
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

    print(session)

    owner_id = session.get('owner_id')
    owner_fname = request.json.get('owner_fname')
    owner_lname = request.json.get('owner_lname')
    owner_email = request.json.get('owner_email')
    owner_email = owner_email.lower()

    print(owner_id)
    print(owner_fname)
    print(owner_lname)
    print(owner_email)

    user = Owner.query.get(owner_id)
    print(user)

    if user:
        print("in the if user area - line 155 or around there")
        user.owner_fname = owner_fname
        print(f"Owner first name is: {owner_fname}")
        user.owner_lname = owner_lname
        print(f"Owner last name is: {owner_lname}")
        user.owner_email = owner_email
        print(f"Owner email is: {owner_email}")

        db.session.commit()
        print("Session has been saved with new information")

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

    owner_id = session.get('owner_id')
    password = request.json.get('password')

    print("Owner_id:", owner_id)

    user = Owner.query.get(owner_id)
    print("User found or not found in database:", user)

    if user:
        print("in the /save-new-password route, found user - around line 205 in server.py")

        user.password = password #set to new pw
        db.session.commit() #save to db

        print("Session has been saved with new My Account pw")

        session.modified = True #session updated as well 
        
        return jsonify({
            'status': 'success',
        }), 200
    else:
        return jsonify({'error': 'Owner not found'}), 404


def validate_pet(pet_data):
    """Validate a pet's information for number fields if not filled out in React form, then set to these defaults."""

    if pet_data['birthday'] is not None and not isinstance(pet_data['birthday'], int):
        pet_data['birthday'] = None
    if pet_data['age'] is not None and not isinstance(pet_data['age'], int):
        pet_data['age'] = None
    if pet_data['weight'] is not None and not isinstance(pet_data['weight'], int):
        pet_data['weight'] = None

@app.route("/add-a-pet", methods=['PUT'])
def create_pet():
    """Create a new instance of the Pet class, and save it in the db."""

    try: 
        owner_id = session.get('owner_id')
        print(owner_id)
        #formData = request.form.get('pet', {})

        #formData.request.form.get('petphoto') 
        #get individually, use request.form.get('ind') -- default would be none, but could go through and set a default value for each one 

        my_file = request.files['petphoto']
        species = request.form.get('species')
        pet_fname = request.form.get('pet_fname')
        pet_lname = request.form.get('pet_lname')
        birthday = request.form.get('birthday')
        age = request.form.get('age')
        breed = request.form.get('breed')
        weight = request.form.get('weight')
        energy_level = request.form.get('energy_level')
        coat = request.form.get('coat')
        emer_contact_fname = request.form.get('emer_contact_fname')
        emer_contact_lname = request.form.get('emer_contact_lname')
        emer_contact_phone = request.form.get('emer_contact_phone')
        emer_contact_email = request.form.get('emer_contact_email')
        insurance_company = request.form.get('insurance_company')
        insurance_policy_num = request.form.get('emer_contact_email')
        pet_comment = request.form.get('pet_comment')

        pet_data = {'birthday': birthday, 'age': age, 'weight': weight}
        print(pet_data)
        validate_pet(pet_data)
        print(pet_data)

        owner = Owner.query.filter_by(owner_id=owner_id).first()

        pet = Pet.query.filter_by(pet_fname=pet_fname).join(Pet.owners).filter(Owner.owner_id==owner_id).first()
        print(pet)

        if pet: #check in db, if in db, tell user
            response = {"success": False, "status": f"Looks like {pet_fname} is already one of your pets"}
            return jsonify(response), 200
            
        else: 
            result = cloudinary.uploader.upload(my_file, api_key=CLOUDINARY_KEY, api_secret=CLOUDINARY_SECRET, cloud_name=CLOUD_NAME)

            imgUrl = result['secure_url']
            
            pet = Pet(imgUrl=imgUrl, species=species, pet_fname=pet_fname, pet_lname=pet_lname, birthday=birthday, age=age, breed=breed, weight=weight, energy_level=energy_level, coat=coat, emer_contact_fname=emer_contact_fname, emer_contact_lname=emer_contact_lname, emer_contact_phone=emer_contact_phone, emer_contact_email=emer_contact_email, insurance_company=insurance_company, insurance_policy_num=insurance_policy_num, pet_comment=pet_comment) #create pet instance
            pet.owners.append(owner)
            db.session.add(pet) #add user instance to database with .add built-in func
            db.session.commit() #then need to commit the change/add to the database
            response = {"success": True, "status": f"{pet_fname}'s been added!"}
            return jsonify(response), 200
    except Exception as e:
        # If an exception occurs, return an error response
        error_message = str(e)
        response = {"success": False, "error": error_message}
        return jsonify(response), 500


@app.route("/breeds")
def show_breeds():
    """Send cat and dog breeds as json object from dictionary of two lists in Python file, animal_breeds.py."""

    return jsonify(breed_data)


@app.route("/get-pets-for-owner")
def get_existing_pets_assoc_w_owner():
    """Get pets associated in this owner/user's account. (One use of this route is on the add.jsx file to pull the pets for when the user is completing the add a specialist form to then use this list of pets to select from to associate the new specialist to either one or more, or all of the user's pets.)"""

    #pass a dictionary that is the instance of pet, create key-value pairs that is: key: pet_id : value: pet's data from model.py

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


def validate_specialist(specialist_data):
    """Validate a specialist's information for number fields if not filled out in React form, then set to these defaults."""

    if specialist_data['birthday'] is not None and not isinstance(specialist_data['birthday'], int):
        specialist_data['birthday'] = None
    if specialist_data['age'] is not None and not isinstance(specialist_data['age'], int):
        specialist_data['age'] = None
    if specialist_data['weight'] is not None and not isinstance(specialist_data['weight'], int):
        specialist_data['weight'] = None

@app.route("/add-a-specialist", methods=['PUT'])
def add_specialist_to_pet():
    """Create a new instance of the Specialist class that's associated with a pet, and save it in the db."""

    owner_id = session.get('owner_id')
    specialist_data = request.json.get('specialist', {})
    print(specialist_data)

    role = specialist_data.get('role')
    specialist_company = specialist_data.get('specialist_company')
    specialist_fname = specialist_data.get('specialist_fname')
    specialist_lname = specialist_data.get('specialist_lname')
    specialist_email = specialist_data.get('specialist_email')
    specialist_phone = specialist_data.get('specialist_phone')
    street = specialist_data.get('street')
    street2 = specialist_data.get('street2')
    city = specialist_data.get('city')
    state = specialist_data.get('state')
    zip_code = specialist_data.get('zip_code')
    specialist_comment = specialist_data.get('specialist_comment')

    #we have the owner id, then pull pets associated w/ owner, then pull specialists associated with all the pets, then query that set of the specialist
    #add in owner_id below 
    specialist = Specialist.query.filter_by(specialist_lname=specialist_lname).join(Pet.specialists).first()
    print(specialist)

    #if specialist: #check in db, if in db, tell user
    #if they're already in db, just add them to the pet 
    #for pet add specialist 
    #for specialist add pet  
    #     response = {"success": False, "status": f"Looks like {pet_fname} is already one of your pets"}
    #     return jsonify(response), 200
        
    # else: 
    #     pet = Pet(species=species, pet_fname=pet_fname, pet_lname=pet_lname, birthday=birthday, age=age, weight=weight, energy_level=energy_level, coat=coat, emer_contact_fname=emer_contact_fname, emer_contact_lname=emer_contact_lname, emer_contact_phone=emer_contact_phone, emer_contact_email=emer_contact_email, insurance_company=insurance_company, insurance_policy_num=insurance_policy_num, pet_comment=pet_comment) #create pet instance
    #     db.session.add(pet) #add user instance to database with .add built-in func
    #     db.session.commit() #then need to commit the change/add to the database
    #     response = {"success": True, "status": f"{pet_fname}'s been added!"}
    #     return jsonify(response), 200


@app.route("/calendar-events")
def show_cal_events():
    """Retrieve event instances of Event class associated with Owner who is logged in and render them on the calendar that shows on the user's dashboard.html."""
    
    owner_id = session.get('owner_id')
    print(owner_id)

    events = Event.query.filter_by(owner_id=owner_id).all()
    print(events)

    return jsonify(events)


@app.route("/my-events")
def render_events():
    """View logged in owner's pet's events in the calendar."""

    return render_template("my_events.html")


@app.route('/put-events-on-cal')
def publish_events():
    """Publish events on the calendar."""

    owner_id = session.get('owner_id')

    if 'owner_email' not in session:
        return jsonify({'error': 'User not logged in'}), 401
    
    start_str = request.args.get('start')
    end_str = request.args.get('end')

    if start_str is None or end_str is None: 
        return jsonify({'error': 'Missing start or end parameter'}), 400
    
    try: 
        month_start = datetime.fromisoformat(start_str)
        month_end = datetime.fromisoformat(end_str)

    except ValueError:
        return jsonify({'error': 'Invalid date format'}), 400
    
    events = Event.query.filter(
        Event.owner_id == owner_id,
        Event.start_date.between(month_start.date(), month_end.date()), 
        Event.deleted_on.is_(None)
    ).all()

    events_data = []
 
    for event in events:
        events_data.append({
            'event_id': event.event_id,
            'title': event.title, 
            'start_date': event.start_date,
            'start_time': event.start_date, 
            'end_date': event.end_date,
            'end_time': event.end_time, 
            'allDay': event.allDAy,
            'description': event.description,
            'extendedProps': {
                'location': event.location,
            }
        })

    response_data = {'events': events_data}
    
    return jsonify(response_data)


# @app.route('/create-event', methods=['POST', 'GET', 'PUT'])
# def create_event():
#     """Create an event and save to the database."""
    
#     if user not in session: 
#         flash
#         return redirect('/homepage')

#     user = pull owner_id from session 
#     crud function that's repeating 

#     title = request.form.get("title")
#     #etc 

#     start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date()
#     end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date()

#     start_time = datetime.combine(start_date, datetime.strptime(start_time_str, "%H:%M").time())
#     end_time = datetime.combine(end_date, datetime.strptime(end_time_str, "%H:%M").time())

#     event = Event(owner_id=owner_event_id,
                  
#                   )
    
#     event_data = {
#         "event_id": event.event_id,
#         #etc
#     }

#     db.session.add(event)
#     db.session.commit()
#     flash("Success!")

#     return #dashboard 




@app.route("/dashboard/pets/pet") #is this going to have the dictionary in the url? 
def dashboard_pets_pet():
    """View logged in owner's specific pet."""

    #need code here 

    return render_template("pet.html") #might need to update this 


if __name__ == "__main__":    
    connect_to_db(app) #postgresql:///pets

    app.run(host="0.0.0.0", debug=True)