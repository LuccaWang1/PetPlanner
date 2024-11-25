<a name="top"></a>

# PetPlanner

![Image of homepage, carousel, top nav before logging in/while logged out](/static/images/Readme_Markdown/luccawang-project-petplanner.gif)
_The full-stack web app PetPlanner by Lucca Wang © 2024_
<a name="description"></a>

## Table of Contents
- [Project Description](#project-description)
- [Snapshot](#snapshot)
- [Technologies](#technologies)
- [Features](#features)
- [Data Model](#data-model)
- [How To Run PetPlanner](#how-to-run-the-petplanner-flask-app)
- [Photos](#photos)
- [Author](#author)

## Project Description
PetPlanner allows pet owners to [__centralize their pets' information in one location__](#main-features). Pet owners can log [each pet and the pet's information](#add-a-pet) with vet records, the next vaccination appointment date, and other bio data, as well as their pets' [specialists](#add-a-specialist), like groomers and vets, and [events](#add-an-event), like annual vet visits, nail trims, and play dates.

The __full-stack project includes a PostgreSQL relational database__ and was __built and architected by [Lucca Wang](#author)__, who created the app from scratch, [developing with Python, Flask, React, JavaScript and working with APIs](#technologies).

__Users can do all of the following__: 

* [Create an __account__](#create-account)
* with [password hashing](#technologies) for __security__,
* [Log in](#log-in),
* [Log out](#log-out),
* See their pets on their dashboard,
* See their __calendar__ with [events](#add-an-event),
* Add a [pet](#add-a-pet),
* Add a calendar [event](#add-an-event),
* Add a [specialist](#add-a-specialist),
* See their [account](#update-account) information, and
* [__Update their account information__](#update-account).

<a name="snapshot"></a>

[Back to the Table of Contents](#table-of-contents)

## Snapshot

* __Built from scratch__.
<br>

* Created a __[data model](#data-model)__ for __many-to-many and one-to-many relationships__ to set the foundation for the __PostgreSQL database__.
<br>

* Gained experience with __AJAX fetch request JSON date and time formatting__, including in Python and React.
<br>

* Developed in __Python, Flask, JavaScript, React__, and __PostgreSQL__ to create features for an MVP.
<br>

* Integrated __[Cloudinary, FullCalendar and Google Fonts APIs](#technologies)__.
<br>

* Hand built navbar in __HTML__ with __Jinja2__ for a clean __user interface__ to streamline the __user experience__.

<a name="table-of-contents"></a>

<br>

[Back to the Table of Contents](#table-of-contents)

## Technologies
1. __Python__ (backend, server, OOP)
2. __Flask__ (Python framework)
3. __JavaScript__ (AJAX/JSON) (frontend)
4. __React__ (frontend)
5. __PostgreSQL__ (relational database)
6. __SQL__ (used to query the database in PSQL)
7. __SQLAlchemy__ (ORM used to query the database within Python)
8. __HTML__ (webpages/templates, extended base)
9. __CSS__, __flexbox__ (styling)
10. __Cloudinary API__ (photo uploader API)
11. __Full Calendar API__ (calendar and events API)
12. __Jinja2__ (Python templating engine that extends base.html, used for conditional rendering on navbars throughout site)
13. __Bootstrap__ (styling, used with React)
14. __Passlib__ and __Argon2__ (Password Hashing)
15. I chose to create __datasets__ through __research__. (__I chose this over using PetFinder's API__)

<br>

[Back to the Table of Contents](#table-of-contents)

<a name="features"></a>

## Features

1. [React Bootstrap Modal Forms](#react-modal-forms) 
2. [Add A Pet](#add-a-pet)
3. [Add An Event](#add-an-event)
4. [Add A Specialist](#add-a-specialist) 
5. [Create an account form](#create-account)
6. [Log in](#log-in)
7. [Log out](#log-out)
8. [Update their account information](#update-account)

<a name="react-modal-forms"></a>

### 1. React Bootstrap Modal Forms (3 forms) 

![Image of the add a pet form](/static/images/Readme_Markdown/add_pet_modal.png)
_The Add a Pet form that's a React Bootstrap modal form_

* Each form uses 1-2 __JavaScript React AJAX fetch requests__.
<br>

* A AJAX fetch request loads the user's information __at the time the modal form loads on the DOM__.
<br>

* Another AJAX fetch request __saves user inputs to the [database](#data-model)__ and __communicates between the server and client__.
<br>

* I gained experience __handling the asynchronous requests__, sending and receiving __JSON__ objects, especially with __date and time formatting__, on the client side and on the browser side.
<br>

[Back to Features Index](#features)

<a name="add-a-pet"></a>

### 2. Add a Pet

![Image of the add a pet form: species](/static/images/Readme_Markdown/add_pet_species.png)
_This is the Add A Pet React Bootstrap modal form. The user selects the `Species` of their pet from the dropdown menu._

<br>

![Image of the add a pet form: breeds](/static/images/Readme_Markdown/add_pet_breeds.png)
_Conditional rendering and mapping on the `Breed` `select options` are based on the species field._

* After creating an account, a user can add a pet to their account.
<br>

* A __Jinja templating for loop__ iterates over the Pets associated with the __User instance in session__ to generate the content __dynamically__.
<br>

* I opted for __Bootstrap's Card layout grid__, utilizing __rows and columns__ to organize and add __whitespace__ to the display of cards on the user's Dashboard.
<br>

* The Bootstrap grid card layout consists of three columns, with __additional cards wrapping to the next row as needed__. This __design choice__ ensures that users can easily view all their pets on the Dashboard. I selected this layout for its superior __user experience__ compared to alternatives like an accordion layout.
<br>

* Thanks to the [__many-to-many relationship between the Owner and Pet classes in the model__](#data-model), users can add multiple pets without limitations. This __foundational [model](#data-model) design__ allows for a flexible structure, enabling each pet to belong to multiple users and vice versa.
<br>

* A user completes the __Bootstrap React Modal form__ by inputting their pet's information. Each input is the value in the dictionary that's sent the backend in a JSON object.
<br>

* The user selects a species for the pet, and [I used __conditional rendering and mapping__ within React to display breeds based on the animal species selected](#add-a-pet).
<br>

* Pet lovers can upload a photo of their pet with the help of the __Cloudinary API__.


[Back to Features Index](#features)

<a name="add-an-event"></a>

### 3. Add an Event

![Image of the add a event form](/static/images/Readme_Markdown/add_event_modal.png)
_The Add an Event form that's a React Bootstrap modal form_

* Users can add and save events for each of their pets __via the [PostgreSQL database](#data-model) and FullCalendar API__.

[Back to Features Index](#features)

<a name="add-a-specialist"></a>

###  4. Add a Specialist

![Image of the add a specialist form](/static/images/Readme_Markdown/add_specialist_modal.png)
_The Add a Specialist form that's a React Bootstrap modal form_

<br>

![Image of the add a specialist form with the user's mapped pets](/static/images/Readme_Markdown/add_specialist_pets.png)
_I mapped to the user's existing pet data, so the user can assign the specialist to one or all of their pets_

* A user can add care providers, or specialists, like a vet, groomer, nail trimmer, or emergency vet to their pet's instance because of the [many-to-many relationship between the specialist and pet tables in the model](#snapshot-of-the-data-model).
<br>

* Specialists are saved in the PostgreSQL relational database under the user's account.
<br>

* The __user's existing pet data is mapped__, so the user can assign the specialist to one or all of their pets.

[Back to Features Index](#features)

<a name="create-account"></a>

### 5. Create an account form

* A user instance is created via the user inputs to the form and the `User` class in <a href="https://github.com/LuccaWang1/PetPlanner/blob/main/model.py" target="_blank">model.py</a> with __Object Oriented Programming__.
<br>

* The user's account information is stored in the app's PostgreSQL relational database.
<br>

* __Passwords are hashed__ with salt using __Passlib__ and __Argon2__ to securely hash passwords in a way that makes it difficult for attackers to perform brute-force (dictionary) attacks, even if they have access to significant computational resources.
<br>

* Form styled with __flexbox__.

[Back to Features Index](#features)

<a name="log-in"></a>

### 6. Log in form

* The __user inputs__ are transmitted to the backend as a __JSON__ object. Using Python logic, the __values within the dictionary__ are examined to determine if they correspond to the data stored in the __database__.
<br>

* Form styled with __flexbox__.

[Back to Features Index](#features)

<a name="log-out"></a>

### 7. Log out

* The __Flask session__ is cleared when the user clicks the "Log Out" button that's in the top right of the website - on any webpage the user is on.
<br>

* Utilizing __Jinja templating__ on the navbar, I hand-built the top and bottom nav bars with __HTML__ and Jinja to determine what the user sees depending on which page the user is on and if they are logged in or not.
<br>

* I intentionally chose this as a way to create a clean __user interface__ to streamline the __user experience__ when we're navigating the app.

[Back to Features Index](#features)

<a name="update-account"></a>

### 8. Update their account information

* The `Edit` and `Save` buttons contain __hover and active CSS__ for visible changes for the user.
<br>

* When the user clicks the `Edit` button to edit their account information, a __JavaScript event listener__ changes the input field __style__.
<br>

* I had a lot of fun coding this JavaScript with styling, listener, and the __fetch request__.

[Back to Features Index](#features)

[Back to the Table of Contents](#table-of-contents)

## Data Model

![Image of the PetPlanner Data Model](/static/images/Readme_Markdown/data_model.png)
_The data model of PetPlanner_

### Snapshot of the Data Model

* Has __6 tables__ and __associative tables__ to create several __many-to-many relationships__.
<br>

* Also __one-to-many relationships__ between tables.
<br>

* The __PostgreSQL__ database is modeled and queried with __SQLAlchemy__.
<br>

* Designed to be built out even more with messaging between users and saved settings for calendar events.

[Back to the Table of Contents](#table-of-contents)

## How To Run the PetPlanner Flask App

1. Set up and activate a Python __`virtualenv`__, and install all dependencies:
<br>

   * `pip install -r requirements.txt`.
<br>

2. __Seed the app__: `python3 seed.py`.
<br>

3.  Start up the __Flask server__: `python3 server.py`.
<br>

4. Go to the __URL__ `localhost:5000` in the browser to see the web app run.
<br>

5. How to run __tests__:
<br>

   * `python3 tests.py`.

[Back to the Table of Contents](#table-of-contents)

## Photos

The <a href="https://github.com/LuccaWang1/PetPlanner/tree/main/static/images" target="_blank">photos</a> are sourced from Unsplash

There are 6 organized folders in the `/static/images` folder for clean organization:
1. __Carousel__ slides.
<br>

2. __Default add a pet photo__ - for if someone doesn't have a photo of their pet at the time they add a pet. It's a pink/red-ish image with hearts on it.
<br>

3. __Demo__ add a pet - photo of Benny the Bengal cat.
<br>

4. __Favicon__ - the icon on the website's open tab in the browser.
<br>

5. __README__ Markdown photos for this document - screenshots of the web app to go along with the text in this document.
<br>

6. __Seed__ pets - these were for the demo video uploaded to <a href="https://www.youtube.com/watch?v=GA6h8ELNkco" target="_blank">Youtube</a>.

All photos have __short condensed titles for efficiency and organization__.

[Back to the Table of Contents](#table-of-contents)

## Author

Hi, my name is Lucca Wang, and I'm a software engineer. Visit my website I hand built at <a href="https://luccawang.dev" target="_blank">https://luccawang.dev</a>, and please feel free to connect on <a href="https://www.linkedin.com/in/luccawang/" target="_blank">LinkedIn!

<br>

[Back to the Table of Contents](#table-of-contents)

[Back to Top](#petplanner)