"""Server for PetPlanner web app."""

import os
from jinja2 import StrictUndefined
from flask import Flask, render_template, request, flash, session, redirect
from model import connect_to_db, db
import crud

app = Flask(__name__)
app.secret_key = os.environ["SECRET_KEY"]
app.jinja_env.undefined = StrictUndefined

PET = os.environ["GOOGLE_CLIENT"]

@app.route("/")
def homepage():
    """View homepage."""

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
    from model import connect_to_db

    connect_to_db(app, "postgresql://localhost:5000") #postgresql:///pets

    app.run(host="0.0.0.0", debug=True)