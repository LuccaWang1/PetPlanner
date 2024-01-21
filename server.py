"""Server for PetPlanner web app."""

import os
from jinja2 import StrictUndefined
from flask import Flask, render_template, request, flash, session, redirect, jsonify
import json
from model import connect_to_db, db, Owner, Pet_Owner, Pet, Pet_Specialist, Specialist, Pet_Events, Owner_Events, Event, Message, Saved_Setting
import crud

app = Flask(__name__)
app.secret_key = os.environ["KEY"] # Required to use Flask sessions
app.jinja_env.undefined = StrictUndefined

PET = os.environ["GOOGLE_CLIENT"]

@app.route("/", methods=['POST', 'GET']) 
def homepage():
    """Render the homepage.html template."""

    return render_template("homepage.html")


@app.route("/login", methods=["GET"])
def login():
    """Render login.html template."""
    
    return render_template("login.html")


@app.route("/login-handler", methods=["POST"])
def loginhandler():
    """Handle login request with a POST request, and store the login information in a session."""

    print("I'm in the login-handler route and view function")

    owner_email = request.form.get('email')
    owner_password = request.form.get('password')

    if 'owner_email' in session: #you're already logged in 
        flash("Great news: You're already logged in")
        return redirect("/dashboard")
    
    user = Owner.query.filter_by(owner_email=owner_email).first()
    
    session['owner_id'] = user.owner_id
    print(session)

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

    return render_template("create_account.html")

@app.route("/create-account-handler", methods=["POST"])
def handle_create_account():
    """Handle create account request with a POST request, and store the login information in a session."""

    owner_fname = request.form.get('owner_fname')
    owner_lname = request.form.get('owner_lname')
    owner_email = request.form.get('owner_email')
    password = request.form.get('password')
    
    if 'owner_email' in session: #you're already logged in 
        flash("Great news: You already have an account, and you're already logged in! Here's your dashboard:")
        return redirect("/dashboard")
    
    user = Owner.query.filter_by(owner_email=owner_email).first()
    print(user)

    if user: #check in db, log in 
        if password == user.password:
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
        return render_template("dashboard.html", owner_fname=owner_fname, owner_lname=owner_lname)
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
    """Save the user's new password in the db for them"""

    






@app.route("/dashboard/pets")
def dashboard_pets():
    """View logged in owner's pets list."""

    return render_template("pets.html")

@app.route("/dashboard/pets/pet") #is this going to have the dictionary in the url? 
def dashboard_pets_pet():
    """View logged in owner's specific pet."""

    #need code here 

    return render_template("pet.html") #might need to update this 



if __name__ == "__main__":    
    connect_to_db(app) #postgresql:///pets

    app.run(host="0.0.0.0", debug=True)