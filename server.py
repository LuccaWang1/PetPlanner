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
    """Render the homepage.html template."""

    return render_template("homepage.html")

@app.route("/login", methods=["GET"])
def login():
    """Render login.html template."""
    
    return render_template("login.html")

@app.route("/login-handler", methods=["POST"])
def loginhandler():
    """Handle login request with a POST request, and store the login information in a session."""

    owner_email = request.form.get('email')
    owner_password = request.form.get('password')

    if 'owner_email' in session: #you're already logged in 
        flash("Great news: You're already logged in")
        return redirect("/dashboard")
    
    user = Owner.query.filter_by(owner_email=owner_email).first()

    if user: #check in db, log in 
        if owner_password == user.password:
            session['owner_email'] = owner_email
            session['owner_fname'] = user.owner_fname
            print(session)
            return redirect("/dashboard", owner_fname=user.owner_fname)
        else: #check in db, if user in db but pw is incorrect 
            flash('Oops! Wrong password - please try again or reset your password')
            return redirect("/login")
    else: 
        flash("Please check your email address, and try again - or, if you don't already have an account, please create one with the link below")
        return redirect("/login")
    

@app.route("/create-account")
def create_account():
    """Render the create_account.html webpage."""

    return render_template("create_account.html")

@app.route("/create-account-handler", methods=["POST"])
def handle_create_account():
    """Handle create account request with a POST request, and store the login information in a session."""

    owner_fname = request.form.get('owner_fname')
    owner_lname = request.form.get('owner_lname')
    owner_email = request.form.get('email')
    owner_password = request.form.get('password')
    
    if 'owner_email' in session: #you're already logged in 
        flash("Great news: You already have an account, and you're already logged in! Here's your dashboard:")
        return redirect("/dashboard")
    
    user = Owner.query.filter_by(owner_email=owner_email).first()
    print(user)

    if user: #check in db, log in 
        if owner_password == user.password:
            session['owner_email'] = owner_email
            flash("Great news: You already have an account - please log in with your log in information, email and password:")
            return redirect("/login")
    else: 
        new_user = Owner(owner_fname=owner_fname, owner_lname=owner_lname, owner_email=owner_email, owner_password=owner_password) #create user instance
        db.session.add(new_user) #add user instance to database with .add built-in func
        db.session.commit() #then need to commit the change/add to the database
        flash(f"Thanks for creating your account, ${owner_fname} - you're in!")
        return redirect("/dashboard")

@app.route("/dashboard")
def dashboard():
    """View logged in user's/owner's dashboard."""

    return render_template("dashboard.html")

@app.route("/my-account")
def get_account_info():
    """Render my_account.html with user's account information."""

    return render_template("my_account.html")

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