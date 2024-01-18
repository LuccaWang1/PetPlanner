'use strict';

alert("Hello, I'm connected!");

// put this file script on base.html, so it will extends to all html template pages 

// login.html when a user clicks the login button
// the following code will change the login button on the navbar to logout when the user is logged in (the button will change after the user clicks the login button on the login page)

// currently line 12 on login.html 
const logInForm = document.querySelector('#login-form'); 

// currently line 49 on base.html 
const logInLogOutButtonNavBar = document.querySelector ('#loginlogout'); 

function handleLogIn() {
  logInForm.addEventListener('submit', (evt) => {
      console.log('inside handleLogIn function');
      // Perform actions related to login (e.g., change button text, send login request)
      logInLogOutButtonNavBar.textContent = 'Log Out';
  });
}

// Js when user clicks the logout button in the navbar to log out
function handleLogout() {
  logInLogOutButtonNavBar.addEventListener('click', async (evt) => {
      console.log('inside handleLogout function');

      try {
          const response = await fetch('/logout', {
              method: 'POST',
          });

          if (response.ok) {
              console.log('Logout successful');
              logInLogOutButtonNavBar.textContent = 'Log In';
          } else {
              // Handle non-successful logout and display an error message if so
              console.error('Logout failed:', response.statusText);
          }
      } catch (error) {
          // Handle errors during logout
          console.error('Error during logout:', error.message);
      }
  });
}

// Call functions
handleLogIn();
handleLogout();