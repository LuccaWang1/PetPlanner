"""Server for PetPlanner web app."""

import os
from jinja2 import StrictUndefined
from flask import Flask, render_template, request, flash, session, redirect
from model import connect_to_db, db
import crud

app = Flask(__name__)
app.secret_key = os.environ["KEY"] # Required to use Flask sessions
app.jinja_env.undefined = StrictUndefined

PET = os.environ["GOOGLE_CLIENT"]

@app.route("/", methods=['POST']) 
def homepage():
    """Handle login request with a POST request, and store the login information in a session."""
    
    if request.method == 'POST':
        owner_email = request.form.get('email')
        owner_password = request.form.get('password')

    if 'email' in session and 'password' in session:
    #     name = session['name']
        return redirect("/dashboard")
    else:
        if owner_email == 'example@example.com' and owner_password == 'let-me-in':
            session['email'] = owner_email
            flash(f'Logged in as {owner_email}')
            return redirect("/dashboard")
        else:
            flash('Wrong email or password!')

    return render_template("homepage.html")

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
    connect_to_db(app, "postgresql://localhost:5000") #postgresql:///pets

    app.run(host="0.0.0.0", debug=True)