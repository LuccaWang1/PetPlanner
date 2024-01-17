"""Server for PetPlanner web app."""

import os
from jinja2 import StrictUndefined
from flask import Flask, render_template, request, flash, session, redirect
from model import connect_to_db, db, Owner, Pet_Owner, Pet, Pet_Specialist, Specialist, Pet_Events, Owner_Events, Event, Message, Saved_Setting
import crud

app = Flask(__name__)
app.secret_key = os.environ["KEY"] # Required to use Flask sessions
app.jinja_env.undefined = StrictUndefined

PET = os.environ["GOOGLE_CLIENT"]

@app.route("/", methods=['POST', 'GET']) 
def homepage():
    """Load the homepage"""

    return render_template("homepage.html")

@app.route("/login", methods=["GET"])
def login():
    """Handle login request with a POST request, and store the login information in a session."""
    
    return render_template("login.html")

@app.route("/loginhandler", methods=["POST"])
def loginhandler():
    owner_email = request.form.get('email')
    owner_password = request.form.get('password')
    print(owner_email)
    print(owner_password)
    print(session)

    if 'owner_email' in session: #you're already logged in 
        flash("You're already logged in")
        print("Just before I should redirect to dashboard b/c already logged in")
        return redirect("/dashboard")
    
    user = Owner.query.filter_by(owner_email=owner_email).first()
    print(user)

    if user: #check in db, log in 
        if owner_password == user.password:
            session['owner_email'] = owner_email
            return redirect("/dashboard")
        else: #check in db, if user in db but pw is incorrect 
            flash('Wrong password - please try again or reset your password')
            return redirect("/login")
    else: 
        flash("Please check your email address, and try again - or, if you don't already have an account, please create one with the link below")
        return redirect("/login")
    

@app.route("/create-account")
def create_account():
    """Handle create account request with a POST request, and store the login information in a session."""

    # if: check if in db already, then tell the user they're already in the database
    # else: add new user to owner db and store information in session

    return render_template("create_account.html")

@app.route("/dashboard")
def dashboard():
    """View logged in user's/owner's dashboard."""

    return render_template("dashboard.html")

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