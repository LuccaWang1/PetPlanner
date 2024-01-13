"""Server for PetPlanner web app."""

import os
from jinja2 import StrictUndefined
from flask import Flask, render_template, request, flash, session, redirect
from model import connect_to_db, db
import crud

app = Flask(__name__)
app.secret_key = os.environ["SECRET_KEY"] # Required to use Flask sessions
app.jinja_env.undefined = StrictUndefined

PET = os.environ["GOOGLE_CLIENT"]

@app.route("/", methods=['POST']) 
def homepage():
    """Return homepage, also check if the user has already entered a name and if so redirect to /dashboard webpage."""
    
    owner_email = request.args.get('email')

    if 'email' in session:
        name = session['name']
        return redirect("/dashboard") #make sure this is correct with a POST request
    else:
        name = session['name'] = {}
        return render_template("homepage.html")

# def handle_login():
#     """Log user into application."""

#     username = request.form['username']
#     password = request.form['password']

#     if password == ""
#         session["current_user"] = username
#         flash(f'Logged in as {username}')
#         return redirect('/')

#     else:
#         flash('Wrong password!')
#         return redirect('/login')

    

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