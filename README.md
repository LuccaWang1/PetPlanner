# PetPlanner

### Project Description 
PetPlanner is a web application built from scratch for pet lovers of all kinds to keep track of their pets’ information, care providers, and events and appointments in a centralized location. After creating an account, pet owners can add a pet, specialist for their pet, and an event for the pet. Pet owners can add all their pets from horses to birds to cats and dogs.

![Image of homepage, carousel, top nav before logging in/while logged out](/static/images/Readme_Markdown/petplanner_Homepage_Horse.png)

##Table of Contents 
- Technologies Used 
- MVP Description
- How To Use PetPlanner / What The User Can Do
- Snapshot of the Data Model
- How To Run PetPlanner
- Author 

### Technologies Used
1. Python
2. Flask
3. Javascript
4. React 
5. Postgresql 
6. AJAX/JSON
7. SQLAlchemy/SQL
8. Jinja2
9. HTML 
10. CSS
11. Bootstrap
12. Flexbox
13. Cloudinary API
14. Full Calendar API  

![Image of the user's dashboard that contains the pet cards](/static/images/Readme_Markdown/petplanner_Dashboard.png)

### MVP Description
1. After creating an account, a user can add a pet to their account, and that pet will show in the cards on the dashboard. They can add as many pets as they would like and different kinds of pets from a guinea pig to a bird to a horse to a cat. The breeds are shown as a result of conditional rendering in Javascript React and Lucca's data scraping and research on breeds and creating data sets from that breed research information. Pet lovers can upload a photo of their pet with the help of the Cloudinary API. In the pet's information, many different types of information can be stored, including an emergency contact name, phone, and email and the pet's insurance company and policy number. 

![Image of Add A Pet Javascript React Bootstrap Modal Form, the species Form Control Select option for various animal species/types hardcoded into form](/static/images/Readme_Markdown/petplanner_Add_A_Pet_Modal_species.png)

![Image of Add A Pet Javascript React Bootstrap Modal Form, the breed Form Control Select option for various breeds from conditional rendering, depending on animal species/type selected by user, mapped from the data sets built from research and data scraping](/static/images/Readme_Markdown/petplanner_Add_A_Pet_Modal_breeds.png)

2. Pet lovers can add events for each of their pets using FullCalendar API, including daily or annual events based on the needs and appointments of the pet -- like vaccinations, walks, annual vet appointments, or even medication administration. 

![Image of Full Calendar API calendar on my_events.html webpage](/static/images/Readme_Markdown/petplanner_Custom_Full_Calendar_API.png)

3. A user can add care providers, or specialists, for each pet. The specialists can include the pet's vet, groomer, nail trimmer, and emergency vet.  The specialists' contact information includes the phone number, address, any notes, and more that the pet owner would like to include.

![Image of the Add A Specialist Modal Bootstrap Form](/static/images/Readme_Markdown/petplanner_Add_A_Specialist_Modal.png)

### How To Use PetPlanner / What The User Can Do
1. Create an account 

![Image of the Create Account webpage](/static/images/Readme_Markdown/petplanner_Create_An_Account.png)

2. Log in

![Image of the Log In webpage](/static/images/Readme_Markdown/petplanner_Log_In.png)

3. Log out 
Utilizing Jinja templating on the navbar: I hand-built the top and bottom nav bars with HTML and Jinja to determine what the user sees depending on which page the user is on and if they are logged in or not. I intentionally chose this as a way to create a clean user interface to streamline the user experience when we're navigating the app.

![Image of Dashboard webpage with the Log Out button/link in the top navbar in the top right of the image](/static/images/Readme_Markdown/petplanner_Dashboard.png)

4. Update their account information 
The buttons contain hover and active css for visible changes for the user. And when the user clicks the Edit button to edit their account information, the input fields turn the pink-beige color of the set color palette of the app. I had a lot of fun coding this Javascript with styling, listener, and the fetch request to the server and handling the server-side and server's response. 

![Image of My Account webpage](/static/images/Readme_Markdown/petplanner_My_Account.png)

![Image of My Account webpage after the user clicks the Edit button](/static/images/Readme_Markdown/petplanner_My_Account_Edit.png)

5. View the Homepage 

![Image of the Homepage with the turtle slide on the automatically moving Carousel that also has buttons](/static/images/Readme_Markdown/petplanner_Homepage_Turtle.png)

6. View their Dashboard with their pets on it 

![Image of the user's Dashboard](/static/images/Readme_Markdown/petplanner_Dashboard.png)

7. Add a pet 

![Image of the user's Dashboard](/static/images/Readme_Markdown/petplanner_Add_A_Pet.png)

8. Add an event 

![Image of the user's Dashboard](/static/images/Readme_Markdown/petplanner_Add_An_Event.png)

9. See their events on the My Events webpage 

![Image of the user's Dashboard](/static/images/Readme_Markdown/petplanner_My_Events.png)

10. Add a specialist 

![Image of the user's Dashboard](/static/images/Readme_Markdown/petplanner_Add_A_Specialist.png)

### Snapshot of the Data Model

![Image of the PetPlanner Data Model](/static/images/Readme_Markdown/petplanner_Data_Model.png)

### How To Run PetPlanner 

#### Run the There and Back Again Flask App
- Set up and activate a python virtualenv, and install all dependencies:
* pip install -r requirements.txt
- Make sure you have PostgreSQL running. Create a new database in psql named pets:
* psql
* CREATE DATABASE pets;
- Create the tables in your database:
* python -i model.py
* While in interactive mode, create tables: db.create_all()
* Seed the pets table with some pets
- Now, quit interactive mode. Start up the flask server:
* python server.py
- Go to localhost:5000 to see the web app

### Author
Lucca Wang is an American software engineer.