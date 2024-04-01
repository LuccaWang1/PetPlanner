<a name="top"></a>

# PetPlanner

![Image of homepage, carousel, top nav before logging in/while logged out](/static/images/Readme_Markdown/home.png)
*The web app's homepage with a carousel*
<a name="description"></a>

## Project Description 
PetPlanner allows pet owners to centralize their pets' information in one location. Pet owners can log each pet and the pet's information as well as their pets' specialists, like groomers and vets, and events, like annual vet visits, nail trims, and play dates.

The full stack project includes a PostgreSQL relational database and was built and architected solely by Lucca Wang, who created the app from scratch, developing with Python, Flask, React, JavaScript, APIs, datasets from data scraping, and more. 

<br>

![Image of dashboard](/static/images/Readme_Markdown/dashboard_zoom_in.png)
*A user's dashboard*
<a name="snapshot"></a>

<br>

## Snapshot
* Full stack web app built from scratch used by pet owners to centralize their pets' information in one location.
* Created a [data model](#data-model) for many-to-many and one-to-many relationships to set the foundation for the postgreSQL database.
* Experience overcoming AJAX fetch request JSON date and time challenges, including in React.
* Developed in Python, Flask, JavaScript, and PostgreSQL to create over 5 features for a MVP.
* Integrated [Cloudinary and FullCalendar APIs; built datasets from data scraping.](#mvp-description)
* Hand built navbar in HTML with Jinja2 for a clean user interface to streamline the user experience.

<br>

![Image of server.py code to add a pet](/static/images/Readme_Markdown/server.png)
*The code in the server that creates a pet instance on the Pet class (OOP!)*
<a name="table-of-contents"></a>

<br>

## Table of Contents 
- [Project Description](#description)
- [Snapshot](#snapshot) 
- [Technologies](#technologies)
- [Main Features](#features)
- [Data Model](#data-model) 
- [How To Run PetPlanner](#run-pp)
- [More](#more)
- [Photos (frontend)](#photos)
- [Author](#author)

<br>

### Technologies
1. Python (Server, OOP)
2. Flask (Python Framework)
3. JavaScript (AJAX/JSON) (Frontend)
4. React (Frontend)
5. PostgreSQL (relational database)
6. SQL (used to query the database in psql)
7. SQLAlchemy (used to query the database within Python)
8. HTML (webpages, base)
9. CSS, flexbox (styling)
10. Cloudinary API (photo uploader API)
11. Full Calendar API (calendar and events API)
12. Jinja2 (Python web dev. templating engine that extends base.html, used for conditional rendering on navbars throughout site)
13. Bootstrap (styling, used with React)
14. Passlib and Argon2 (Password Hashing)
15. Wang chose to created data sets through her research and from data scraping for lists of different animal breeds. (She chose this over using PetFinder's API.)

<br>

[Back to the Table of Contents](#table-of-contents) 
<a name="features"></a>

<br>

### Main Features

1. React Bootstrap Modal Forms (3 forms) 

![Image of the user's Dashboard and the dropdown menu](/static/images/Readme_Markdown/add_dropdown.png)
*This is how a user can use the reusable React components - they're in the navbar, accessible from all webpages*

![Image of the user's Dashboard and the dropdown menu hovering](/static/images/Readme_Markdown/add_dropdown_hover.png)
*We can see the CSS hover styling here on the dropdown menu*

![Image of the add a pet form](/static/images/Readme_Markdown/add_pet_modal.png)
*The Add a Pet form that's a React Bootstrap modal form*

* Use 1-2 JavaScript React AJAX fetch requests per form
* AJAX fetch request loads the user's information at the time the modal form loads on the DOM 
* AJAX fetch request saves user inputs to the database and communicates between the server and client
* Wang took pride in overcoming challenges related to handling the asynchronous requests, sending and receiving JSON objects
* Date and time formatting

<br>

2. Add a Pet

![Image of the add a pet form: species](/static/images/Readme_Markdown/add_pet_species.png)
*The Add a Pet form that's a React Bootstrap modal form - with the species dropdown menu*

![Image of the add a pet form: breeds](/static/images/Readme_Markdown/add_pet_breeds.png)
*The Add a Pet form that's a React Bootstrap modal form - with the breeds dropdown menu*

* After creating an account, a user can add a pet to their account
* The pet card is placed on the Dashboard
* Users can add as many pets as they want 
* User inputs information about their pet
* Inputs include information on species
* The breed options depend on the species selected (conditional rendering and mapping)
* Pet lovers can upload a photo of their pet with the help of the Cloudinary API

<br>

3. Add an Event

![Image of the hover over add event in dropdown](/static/images/Readme_Markdown/add_event_dropdown.png)
*This is how a user can add an event for their pet*

![Image of the add a event form](/static/images/Readme_Markdown/add_event_modal.png)
*The Add an Event form that's a React Bootstrap modal form*

* Users can add events for each of their pets using FullCalendar API
* Events can be for daily or annual events based on the needs and appointments of the pet

<br>

4. Add a Specialist 

![Image of the hover over add specialist in dropdown](/static/images/Readme_Markdown/add_specialist_dropdown.png)
*A user can add a specialist from the dropdown menu*

![Image of the add a specialist form](/static/images/Readme_Markdown/add_specialist_modal.png)
*The Add a Specialist form that's a React Bootstrap modal form*

![Image of the add a specialist form with the user's mapped pets](/static/images/Readme_Markdown/add_specialist_pets.png)
*Wang mapped to the user's existing pet data, so the user can assign the specialist to one or all of their pets*

* A user can add care providers, or specialists, for each pet (e.g. vet, groomer, nail trimmer, and emergency vet)  
* Specialists are saved in the PostgreSQL relational database under the user's account
* The user's existing pet data is mapped, so the user can assign the specialist to one or all of their pets

<br>

[Back to the Table of Contents](#table-of-contents) 
<a name="data-model"></a>

<br>

![Image of the PetPlanner Data Model](/static/images/Readme_Markdown/data_model.png)
*The data model of PetPlanner*

### Snapshot of the Data Model

* Has over 6 tables and more associative tables to create several many-to-many relationships
* Also one-to-many relationships between tables
* The PostgreSQL database is modeled and queried with SQLAlchemy
* Designed to be built out even more with messaging between users and saved settings for calendar events

<br>

[Back to the Table of Contents](#table-of-contents) 
<a name="run-pp"></a>

<br>

### How To Run the PetPlanner Flask App

1. Set up and activate a Python `virtualenv`, and install all dependencies:

   * `pip install -r requirements.txt`

2. Make sure you have PostgreSQL running. Create a new database in psql named pets:

   * `psql`

   * `CREATE DATABASE pets;`

3. Create the tables in your database:

   * `python -i model.py`

   * While in interactive mode, create tables: `db.create_all()`

   * Seed the `pets` table with some pets

4. Now, quit interactive mode. Start up the Flask server:

   * `python3 server.py`

5. Go to the URL `localhost:5000` in the browser to see the web app run
<a name="more"></a>

<br>

[Back to the Table of Contents](#table-of-contents) 

<br>

### More if you're interested
1. Create an account 

![Image of the Create Account webpage](/static/images/Readme_Markdown/create-account.png)
*A user can create an account*

* A user instance is created via the user inputs to the form and the `User` class in model.py (OOP). 
* The user's account information is stored in the app's PostgreSQL relational database. 
* Passwords are hashed with salt using Passlib and Argon2 to securely hash passwords in a way that makes it difficult for attackers to perform brute-force (dictionary) attacks, even if they have access to significant computational resources. 
* Form styled with flexbox.

<br>

2. Log in

![Image of the Log In webpage](/static/images/Readme_Markdown/log-in.png)
*A user can log in*

* Form styled with flexbox.

<br>

3. Log out 

![Image of Dashboard webpage with the Log Out button/link in the top navbar in the top right of the image](/static/images/Readme_Markdown/log-out.png)
*A user can log out*

* The session is cleared when the user clicks the "Log Out" button that's in the top right of the website - on any webpage the user is on. 
* Utilizing Jinja templating on the navbar, Wang hand-built the top and bottom nav bars with HTML and Jinja to determine what the user sees depending on which page the user is on and if they are logged in or not. 
* She intentionally chose this as a way to create a clean user interface to streamline the user experience when we're navigating the app.

<br>

4. Update their account information

![Image of My Account webpage](/static/images/Readme_Markdown/ma.png)
*A user's My Account webpage*

![Image of My Account webpage after clicking edit](/static/images/Readme_Markdown/ma-edit.png)
*A user can edit their account information*

![Image of My Account webpage when saving](/static/images/Readme_Markdown/ma-saving.png)
*A user can save their account information in the database*

![Image of My Account webpage](/static/images/Readme_Markdown/ma.png)
*The user has saved their account information!*

* The `Edit` and `Save` buttons contain hover and active CSS for visible changes for the user. 
* When the user clicks the `Edit` button to edit their account information, the input fields turns pink. 
* Wang had a lot of fun quickly coding this JavaScript with styling, listener, and the fetch request. 

<br>

[Back to the Table of Contents](#table-of-contents) 
<a name="photos"></a>

<br>

### Photos 

Photos are sourced from Unsplash and from Wang. (See the photos folder in the repo in: [PetPlanner/static/images in GitHub](https://github.com/LuccaWang1/PetPlanner/tree/main/static/images))

There are 6 organized folders in the /static/images folder for clean organization:
1. Carousel slides 
2. Default add a pet photo - for if someone doesn't have a photo of their pet at the time they add a pet. It's a pink/red-ish image with hearts on it 
3. Demo add a pet - photo of Benny the Bengal cat 
4. Favicon - this is the [Bootstrap calendar2-heart-fill.svg](https://icons.getbootstrap.com/icons/calendar2-heart-fill/), a calendar icon with a heart in the middle
5. Readme Markdown photos for this document - screenshots of the web app to go along with the text in this document
6. Seed pets - these were for the demo video uploaded to Youtube at [https://www.youtube.com/watch?v=GA6h8ELNkco](https://www.youtube.com/watch?v=GA6h8ELNkco)

All photos have short condensed titles for efficiency and organization.

<br>

[Back to the Table of Contents](#table-of-contents) 
<a name="author"></a>

<br>

### Author

Lucca Wang is an American software engineer.

<br>

[Back to the Table of Contents](#table-of-contents)

[Back to Top](#top)