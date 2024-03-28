<a name="top"></a>

# PetPlanner

![Image of dashboard](/static/images/Readme_Markdown/dashboard_zoom_in.png)

### Project Description 
PetPlanner allows pet owners to centralize their pets' information in one location. The full stack project that includes a PostgreSQL relational database was built and architected solely by Lucca Wang, who created the app from scratch, developing with Python, Flask, React, JavaScript, and more. Pet owners can log each pet and the pet's information as well as their pets' specialists, like groomers and vets, and events, like annual vet visits, nail trims, and play dates. (Lucca Wang is the software engineer of this project - she did all of the coding on this project - everything, including the Markdown and writing of this README documentation.) Wang chose two APIs and created datasets from data scraping for the app.

![Image of homepage, carousel, top nav before logging in/while logged out](/static/images/Readme_Markdown/home.png)
<a name="table-of-contents"></a>

## Table of Contents 
- [Snapshot of Project](#snapshot) 
- [Technologies Used](#technologies-used) 
- [MVP Description](#mvp-description)
- [How To Use PetPlanner / What The User Can Do](#how-to-1)
- [Snapshot of the Data Model](#data-model)
- [How To Run PetPlanner](#run-pp)
- [Photos (frontend)](#photos)
- [Author](#author) 
<a name="snapshot"></a>

### Snapshot of Project
* Web app for pet owners to keep their pets’ information, including events and specialists like vets, in a centralized location.
* Experience overcoming AJAX fetch request JSON date and time and object/data structure challenges, including in React.
* Built out a [data model](#data-model) for many-to-many and one-to-many relationships to set the foundation for the postgreSQL database.
* Utilized [Cloudinary and FullCalendar APIs; built datasets from data scraping.](#mvp-description)
* [Hand built navbar in HTML with Jinja for a clean user interface to streamline the user experience.](#log-in)
<a name="technologies-used"></a>

### Technologies Used
1. Python (Server, OOP)
2. Flask (Python Framework)
3. Javascript (AJAX/JSON) (Frontend)
4. React (Frontend)
5. PostgreSQL (relational database)
6. SQL (used to query the database in psql)
7. SQLAlchemy (used to query the database within Python)
8. HTML (webpages, base)
9. CSS, Flexbox (styling)
10. Cloudinary API (photo uploader API)
11. Full Calendar API (calendar and events API)
12. Jinja2 (Python web dev. templating engine that extends base.html, used for conditional rendering on navbars throughout site)
13. Bootstrap (styling, used with React)
14. Passlib and Argon2 (Password Hashing)
15. Wang chose to created data sets through her research and from data scraping for lists of different animal breeds. (She chose this over using PetFinder's API.)

[Back to the Table of Contents](#table-of-contents) 

![Image of the user's dashboard that contains the pet cards](/static/images/Readme_Markdown/dashboard_zoom_out.png)
<a name="mvp-description"></a>

### MVP Description
1. After creating an account, a user can add a pet to their account, and that pet will show in the cards on the dashboard. They can add as many pets as they would like and different kinds of pets. The animals that are hardcoded into the React.js Bootstrap modal form are alphabetized from A-Z for organization for the UX of the user, and the animal types/species to choose from include: bird, cat, dog, fish, guinea pig, horse, and turtle. When the user gets to the breed field, that's is mapped in React.js to the type field - so depending on the type of animal, a dataset of breeds will pop up that corresponds to that type of animal. (So if a user selects a "cat" type of animal, they can choose from a list of cat breeds like American Shorthair, Bengal, Munchkin, etc. Like the animal types, the breeds are listed in alphabetical order for organization and a good user experience.) Pet lovers can upload a photo of their pet with the help of the Cloudinary API. In the pet's information, many different types of information can be stored, including an emergency contact name, phone, and email and the pet's insurance company and policy number. 

![Image of the add a pet form: species](/static/images/Readme_Markdown/add_pet_species.png)

![Image of the add a pet form: breeds](/static/images/Readme_Markdown/add_pet_breeds.png)

2. Pet lovers can add events for each of their pets using FullCalendar API, including daily or annual events based on the needs and appointments of the pet -- like vaccinations, walks, annual vet appointments, or even medication administration. For each event, the user inputs the: title, location, start date, start time, end date, end time, and any notes. UT date and time formatting were used here and transmitted from the frontend of React.js to the Python server backend - and again from backend to frontend in the JSON response. 

![Image of Full Calendar API calendar on my_events.html webpage](/static/images/Readme_Markdown/add_event_modal.png)

3. A user can add care providers, or specialists, for each pet. The specialists can include the pet's vet, groomer, nail trimmer, and emergency vet.  The specialists' contact information includes the phone number, address, any notes, and more that the pet owner would like to include. Specialists (like users, pets, and events) are saved in the PostgreSQL relational database within the User instance, AKA within the user's account. And, the user can assign the specialist to one or all of their pets. 

![Image of the add a specialist form](/static/images/Readme_Markdown/add_specialist_modal.png)

![Image of the add a specialist form with the user's mapped pets](/static/images/Readme_Markdown/add_specialist_pets.png)

[Back to the Table of Contents](#table-of-contents) 

<a name="how-to-1"></a>
### How To Use PetPlanner / What The User Can Do
1. Create an account 

A user instance is created via the user inputs to the form and the User class in model.py. The user's account information is stored in the app's postgreSQL relational database. Passwords are hashed with salt using Passlib and Argon2 to securely hash passwords in a way that makes it difficult for attackers to perform brute-force (dictionary) attacks, even if they have access to significant computational resources. 

![Image of the Create Account webpage](/static/images/Readme_Markdown/create-account.png)

<a name="log-in"></a>
2. Log in

![Image of the Log In webpage](/static/images/Readme_Markdown/log-in.png)

3. Log out 

The session is cleared when the user clicks the "Log Out" button that's in the top right of the website - on any webpage the user is on. About this user experience (UX) and the log out button in the top right navbar: Utilizing Jinja templating on the navbar, Wang hand-built the top and bottom nav bars with HTML and Jinja to determine what the user sees depending on which page the user is on and if they are logged in or not. She intentionally chose this as a way to create a clean user interface to streamline the user experience when we're navigating the app.

![Image of Dashboard webpage with the Log Out button/link in the top navbar in the top right of the image](/static/images/Readme_Markdown/log-out.png)

4. Update their account information

The "Edit" and "Save" buttons contain hover and active css for visible changes for the user. And when the user clicks the Edit button to edit their account information, the input fields turn the pink-beige color of the set color palette of the app. Wang had a lot of fun quickly coding this Javascript with styling, listener, and the fetch request to the server and handling the server-side and server's response. 

![Image of My Account webpage](/static/images/Readme_Markdown/ma.png)

![Image of My Account webpage after clicking edit](/static/images/Readme_Markdown/ma-edit.png)

![Image of My Account webpage when saving](/static/images/Readme_Markdown/ma-saving.png)

![Image of My Account webpage](/static/images/Readme_Markdown/ma.png)

5. View the Homepage 

Lucca Wang chose a Bootstrap carousel for a dynamic feature that's interesting and relates to the subject matter of the app, people and their pets. Photos are sourced from Unsplash.com and have the photographer's name in the file names. Wang designed this by choosing time of the intervals (how much time is spent on one photo before transitioning to the next photo in the carousel), size of the carousel (dimensions on the webpage), size of the photos, and the order of the photos, which Wang hardcoded onto the Homepage. 

![Image of the Homepage with the turtle slide on the automatically moving Carousel that also has buttons](/static/images/Readme_Markdown/home.png)

6. View their Dashboard with their pets on it 

![Image of the user's Dashboard](/static/images/Readme_Markdown/dashboard_zoom_in.png)

7. Add a pet

All of the Javascript React Bootstrap Modal Forms (also see add an event and add a specialist) use 1-2 Javascript React AJAX fetch requests to one) load the user's information at the time the modal form loads on the DOM AND two) to save the information to the database and communicate between the server side and the client/browser side. Wang took pride in overcoming challenges related to handling the asynchronous requests, sending and receiving JSON objects. She successfully managed date and time formatting.

Pet lovers can add a pet, uploading a photo of their pet and entering the pet's information. They can add any type of animal from birds to dogs to horses.

Wang used conditional rendering and mapping on the breed data field - it's based on the type of animal, or species, the user selected previously. 

Once they save the pet, they'll be notified of the add, and the pet will appear on their dashboard. 

![Image of the user's Dashboard and the dropdown menu](/static/images/Readme_Markdown/add_dropdown.png)

![Image of the user's Dashboard and the dropdown menu hovering](/static/images/Readme_Markdown/add_dropdown_hover.png)

![Image of the add a pet form](/static/images/Readme_Markdown/add_pet_modal.png)

![Image of the add a pet form: species](/static/images/Readme_Markdown/add_pet_species.png)

![Image of the add a pet form: breeds](/static/images/Readme_Markdown/add_pet_breeds.png)

8. Add an event 

Users can add an event for their pet. My Events webpage is an HTML page that uses Jinja templating and the Full Calendar API. When we refresh the page, we see the event's added to our calendar. 

![Image of the hover over add event in dropdown](/static/images/Readme_Markdown/add_event_dropdown.png)

![Image of the add a event form](/static/images/Readme_Markdown/add_event_modal.png)

9. See their events on the My Events webpage 

Users can add an event for their pet. My Events webpage is an HTML page that uses Jinja templating and the Full Calendar API. When we refresh the page, we see the event's added to our calendar. 

10. Add a specialist 

Pet owners can also add a specialist. A Javascript fetch request brings in the user's pet data, and Wang mapped to it so the user can associate one or all of their pets with the specialist. 

![Image of the hover over add specialist in dropdown](/static/images/Readme_Markdown/add_specialist_dropdown.png)

![Image of the add a specialist form](/static/images/Readme_Markdown/add_specialist_modal.png)

![Image of the add a specialist form with the user's mapped pets](/static/images/Readme_Markdown/add_specialist_pets.png)

[Back to the Table of Contents](#table-of-contents) 

<a name="data-model"></a>

### Snapshot of the Data Model

The data model on this puppy is huge. It's designed with future features in mind and has over 6 tables and more associative tables to create several many-to-many relationships. There are also one-to-many relationships between tables. The Postgresql database is modeled and queried with SQLAlchemy.

![Image of the PetPlanner Data Model](/static/images/Readme_Markdown/data_model.png)

[Back to the Table of Contents](#table-of-contents) 

<a name="run-pp"></a>

### How To Run PetPlanner 

#### Run the PetPlanner Flask App

1. Set up and activate a python virtualenv, and install all dependencies:

   * pip install -r requirements.txt

2. Make sure you have PostgreSQL running. Create a new database in psql named pets:

   * psql

   * CREATE DATABASE pets;

3. Create the tables in your database:

   * python -i model.py

   * While in interactive mode, create tables: db.create_all()

   * Seed the pets table with some pets

4. Now, quit interactive mode. Start up the flask server:

   * python server.py

5. Go to localhost:5000 to see the web app

[Back to the Table of Contents](#table-of-contents) 

<a name="photos"></a>

### Photos 

Photos are sourced from Unsplash and from Wang. (See the photos folder in the repo in: [PetPlanner/static/images in GitHub](https://github.com/LuccaWang1/PetPlanner/tree/main/static/images))

There are 6 organized folders in the /static/images folder for clean organization:
1. Carousel slides 
2. Default add a pet photo - for if someone doesn't have a photo of their pet at the time they add a pet. It's a pink/red-ish image with hearts on it 
3. Demo add a pet - photo of Benny the Bengal cat 
4. Favicon - it's a calendar icon with a heart in the middle. This is the Bootstrap calendar2-heart-fill.svg.
5. Readme Markdown photos for this document - screenshots of the web app to go along with the text in this document
6. Seed pets - these were for the demo video uploaded to Youtube at [https://www.youtube.com/watch?v=GA6h8ELNkco](https://www.youtube.com/watch?v=GA6h8ELNkco)

All photos titles are formatted the same: "petplanner-title/name.format". 

All photos for adding a pet are around the same size and are 500px width by around 500px tall. 
All photos for the carousel are 1200px width.  

[Back to the Table of Contents](#table-of-contents) 

<a name="author"></a>

### Author

Lucca Wang is an American software engineer.

[Back to the Table of Contents](#table-of-contents)

[Back to Top](#top)