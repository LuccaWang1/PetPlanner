<a name="top"></a>

# PetPlanner

![Image of homepage, carousel, top nav before logging in/while logged out](/static/images/Readme_Markdown/home.png)
_The web app's homepage with a Bootstrap carousel_
<a name="description"></a>

## Project Description 
PetPlanner allows pet owners to centralize their pets' information in one location. Pet owners can log each pet and the pet's information as well as their pets' specialists, like groomers and vets, and events, like annual vet visits, nail trims, and play dates.

The full stack project includes a PostgreSQL relational database and was built and architected solely by Lucca Wang, who created the app from scratch, developing with Python, Flask, React, JavaScript and working with APIs.

<br>

![Image of dashboard](/static/images/Readme_Markdown/dashboard_zoom_in.png)
_A user's dashboard_
<a name="snapshot"></a>

<br>

## Snapshot
* __Full stack web app built from scratch__ used by pet owners to centralize their pets' information in one location
<br>

* Created a __[data model](#data-model)__ for __many-to-many and one-to-many relationships__ to set the foundation for the __PostgreSQL database__
<br>

* Experience overcoming __AJAX fetch request JSON date and time__ challenges, including in React
<br>

* Developed in __Python, Flask, JavaScript, React__, and PostgreSQL to create features for an MVP
<br>

* Integrated __[Cloudinary and FullCalendar APIs](#mvp-description)__
<br>

* Hand built navbar in __HTML__ with __Jinja2__ for a clean __user interface__ to streamline the __user experience__

<br>

![Image of server.py code to add a pet](/static/images/Readme_Markdown/server.png)
_The code in the server that creates a pet instance on the Pet class_
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
- [Photos](#photos)
- [Challenges & Thoughts](#challenges)
- [Author](#author)

<br>

### Technologies
1. __Python__ (Server, OOP)
2. __Flask__ (Python Framework)
3. __JavaScript__ (AJAX/JSON) (Frontend)
4. __React__ (Frontend)
5. __PostgreSQL__ (relational database)
6. __SQL__ (used to query the database in psql)
7. __SQLAlchemy__ (used to query the database within Python)
8. __HTML__ (webpages, base)
9. __CSS__, __flexbox__ (styling)
10. __Cloudinary API__ (photo uploader API)
11. __Full Calendar API__ (calendar and events API)
12. __Jinja2__ (Python web dev. templating engine that extends base.html, used for conditional rendering on navbars throughout site)
13. __Bootstrap__ (styling, used with React)
14. __Passlib__ and __Argon2__ (Password Hashing)
15. I chose to create __datasets__ through __research__. (__I chose this over using PetFinder's API__)

<br>

[Back to the Table of Contents](#table-of-contents) 
<a name="features"></a>

<br>

### Main Features

1. React Bootstrap Modal Forms (3 forms) 

![Image of the user's Dashboard and the dropdown menu hovering](/static/images/Readme_Markdown/add_dropdown_hover.png)
_We can see the CSS hover styling here on the dropdown menu_

![Image of the add a pet form](/static/images/Readme_Markdown/add_pet_modal.png)
_The Add a Pet form that's a React Bootstrap modal form_

* Each form uses 1-2 __JavaScript React AJAX fetch requests__
<br>

* A AJAX fetch request loads the user's information __at the time the modal form loads on the DOM__ 
<br>

* Another AJAX fetch request __saves user inputs to the database__ and __communicates between the server and client__
<br>

* I __overcame challenges handling the asynchronous requests__, sending and receiving __JSON__ objects, especially with __date and time formatting__ on the client side and on the browser side 

<br>

2. Add a Pet

![Image of the add a pet form: species](/static/images/Readme_Markdown/add_pet_species.png)
_Conditional rendering and mapping on the breed `select options` in React are based on the species field_

![Image of the add a pet form: breeds](/static/images/Readme_Markdown/add_pet_breeds.png)
_The Add A Pet React Bootstrap modal form with the breed dropdown menu_

* After creating an account, a user can add a pet to their account
<br>

* A __Jinja templating for loop__ iterates over the Pets associated with the __User instance in session__ to generate the content __dynamically__ 
<br>

* I opted for __Bootstrap's Card layout grid__, utilizing __rows and columns__ to organize and add __whitespace__ to the display of cards on the user's Dashboard
<br>

* The Bootstrap grid card layout consists of three columns, with __additional cards wrapping to the next row as needed__. This __design choice__ ensures that users can easily view all their pets on the Dashboard. I selected this layout for its superior __user experience__ compared to alternatives like an accordion layout
<br>

* Thanks to the __many-to-many relationship between the Owner and Pet classes in the model__, users can add multiple pets without limitations. This __foundational model design__ allows for a flexible structure, enabling each pet to belong to multiple users and vice versa
<br>

* A user completes the __Bootstrap React Modal form__ by inputting their pet's information. Each input is the value in the dictionary that's sent the backend in a JSON object
<br>

* The user selects a species for the pet, and I used __conditional rendering and mapping__ within React to display breeds based on the animal species selected
<br>

* Pet lovers can upload a photo of their pet with the help of the __Cloudinary API__

<br>

3. Add an Event

![Image of the hover over add event in dropdown](/static/images/Readme_Markdown/add_event_dropdown.png)
_This is how a user can add a calendar event for their pet_

![Image of the add a event form](/static/images/Readme_Markdown/add_event_modal.png)
_The Add an Event form that's a React Bootstrap modal form_

* Users can add and save events for each of their pets __via the PostgreSQL database and FullCalendar API__

<br>

4. Add a Specialist 

![Image of the hover over add specialist in dropdown](/static/images/Readme_Markdown/add_specialist_dropdown.png)
_The dropdown menu is styled with Bootstrap and my own CSS, and each button is an HTML div_

![Image of the add a specialist form](/static/images/Readme_Markdown/add_specialist_modal.png)
_The Add a Specialist form that's a React Bootstrap modal form_

![Image of the add a specialist form with the user's mapped pets](/static/images/Readme_Markdown/add_specialist_pets.png)
_I mapped to the user's existing pet data, so the user can assign the specialist to one or all of their pets_

* A user can add care providers, or specialists, like a vet, groomer, nail trimmer, or emergency vet to their pet's instance because of the many-to-many relationship between the specialist and pet tables in the model 
<br>

* Specialists are saved in the PostgreSQL relational database under the user's account
<br>

* The __user's existing pet data is mapped__, so the user can assign the specialist to one or all of their pets

<br>

[Back to the Table of Contents](#table-of-contents) 
<a name="data-model"></a>

<br>

![Image of the PetPlanner Data Model](/static/images/Readme_Markdown/data_model.png)
_The data model of PetPlanner_

### Snapshot of the Data Model

* Has __6 tables__ and __associative tables__ to create several __many-to-many relationships__
<br>

* Also __one-to-many relationships__ between tables
<br>

* The __PostgreSQL__ database is modeled and queried with __SQLAlchemy__
<br>

* Designed to be built out even more with messaging between users and saved settings for calendar events

<br>

[Back to the Table of Contents](#table-of-contents) 
<a name="run-pp"></a>

<br>

### How To Run the PetPlanner Flask App

1. Set up and activate a Python __`virtualenv`__, and install all dependencies:
<br>

   * `pip install -r requirements.txt`
<br>

2. __Seed the app__: `python3 seed.py`
<br>

3.  Start up the __Flask server__: `python3 server.py`
<br>

4. Go to the __URL__ `localhost:5000` in the browser to see the web app run
<br>

5. How to run __tests__:
<br>

   * `python3 tests.py`
   <br>

   * Testing coverage is light right now with a couple unit tests
<br>

<a name="more"></a>

[Back to the Table of Contents](#table-of-contents) 

<br>

### More if you're interested
1. Create an account form 

![Image of the Create Account webpage](/static/images/Readme_Markdown/create-account.png)
_A user can create an account_

* A user instance is created via the user inputs to the form and the `User` class in model.py with __Object Oriented Programming__
<br>

* The user's account information is stored in the app's PostgreSQL relational database
<br>

* __Passwords are hashed__ with salt using __Passlib__ and __Argon2__ to securely hash passwords in a way that makes it difficult for attackers to perform brute-force (dictionary) attacks, even if they have access to significant computational resources 
<br>

* Form styled with __flexbox__

<br>

2. Log in form

![Image of the Log In webpage](/static/images/Readme_Markdown/log-in.png)
_A user can log in_

* The __user inputs__ are transmitted to the backend as a __JSON__ object. Using Python logic, the __values within the dictionary__ are examined to determine if they correspond to the data stored in the __database__
<br>

* Form styled with __flexbox__

<br>

3. Log out 

![Image of Dashboard webpage with the Log Out button/link in the top navbar in the top right of the image](/static/images/Readme_Markdown/log-out.png)
_A user can log out_

* The __Flask session__ is cleared when the user clicks the "Log Out" button that's in the top right of the website - on any webpage the user is on
<br>

* Utilizing __Jinja templating__ on the navbar, I hand-built the top and bottom nav bars with __HTML__ and Jinja to determine what the user sees depending on which page the user is on and if they are logged in or not
<br>

* I intentionally chose this as a way to create a clean __user interface__ to streamline the __user experience__ when we're navigating the app

<br>

4. Update their account information

![Image of My Account webpage](/static/images/Readme_Markdown/ma.png)
_A user's My Account webpage_

![Image of My Account webpage after clicking edit](/static/images/Readme_Markdown/ma-edit.png)
_A user can edit their account information_

![Image of My Account webpage when saving](/static/images/Readme_Markdown/ma-saving.png)
_A user can save their account information in the database_

![Image of My Account webpage](/static/images/Readme_Markdown/ma.png)
_The user has saved their account information!_

* The `Edit` and `Save` buttons contain __hover and active CSS__ for visible changes for the user 
<br>

* When the user clicks the `Edit` button to edit their account information, a __JavaScript event listener__ changes the input field __style__ 
<br>

* I had a lot of fun coding this JavaScript with styling, listener, and the __fetch request__ 

<br>

[Back to the Table of Contents](#table-of-contents) 
<a name="photos"></a>

<br>

### Photos 

The [photos](https://github.com/LuccaWang1/PetPlanner/tree/main/static/images) are sourced from Unsplash

There are 6 organized folders in the `/static/images` folder for clean organization:
1. __Carousel__ slides 
<br>

2. __Default add a pet photo__ - for if someone doesn't have a photo of their pet at the time they add a pet. It's a pink/red-ish image with hearts on it 
<br>

3. __Demo__ add a pet - photo of Benny the Bengal cat 
<br>

4. __Favicon__ - this is the [Bootstrap calendar2-heart-fill.svg](https://icons.getbootstrap.com/icons/calendar2-heart-fill/), a calendar icon with a heart in the middle
<br>

5. __README__ Markdown photos for this document - screenshots of the web app to go along with the text in this document
<br>

6. __Seed__ pets - these were for the demo video uploaded to Youtube at [https://www.youtube.com/watch?v=GA6h8ELNkco](https://www.youtube.com/watch?v=GA6h8ELNkco)

All photos have __short condensed titles for efficiency and organization__.

<br>

[Back to the Table of Contents](#table-of-contents) 
<a name="challenges"></a>

<br>

### Challenges & Thoughts 

- __CSS__, prioritizing my CSS styling over __Bootstrap and FullCalendar API's CSS styling__, including the __stack__ of the dropdown menu in my HTML & CSS top navbar (which I'll be working on)
<br>

- __Date and Time formatting__ with the transmitted __JSON object__ between the frontend React.js modal form and the backend Python logic on the Add An Event feature 
<br>

- Learning __React's hook useState__, and __React's state and props__
<br>

- I coded most things out the long way, since this is one of my first projects, but I know I could do a better job of using my __CRUD__ file in my backend server Python logic. I used CRUD a couple times in server.py.
<br>

- I __refactored my JavaScript__ code so that there aren't as many __document queries__ by __reusing variables__, cutting down on some __Runtime__.  
<br>

- Not a challenge but an opportunity: __build out the User, Messages, and Saved_Settings classes of the model__ and features
<br>

- I wasn't sure if I was going to be able to finish all the __features__ in this app by the __deadline__, but I managed to do it - through some long nights, nearly tears, and a lot of __research__ and __asking for help__
<br>

- Speaking of deadlines and time: My first choice for a calendar was Google Calendar's API, because it's widely used. But, since Google migrated their sign in process, it caused __issues with OAuth__ and there were some bugs. __I gained valuable experience working through this challenge, pivoting, and coming to a solution on what's possible in the given amount of time by utilizing the Full Calendar API instead.__  
<br>

- Two things that I thought were important to gain experience with on the app that I did later are the __password hashing__ (and thinking about my knowledge of __hashmap structures__) and __testing__. I added two __unit tests__ and would appreciate adding more. 

<a name="author"></a>
<br>

### Author

Hi, my name is Lucca, and I'm a software engineer. This pet planner app is my first full stack application which I created in four weeks as my final project at Hackbright, a 12-week accelerated software engineering fellowship. Feel free to connect on [LinkedIn](https://www.linkedin.com/in/luccawang/)!

<br>

[Back to the Table of Contents](#table-of-contents)

[Back to Top](#top)