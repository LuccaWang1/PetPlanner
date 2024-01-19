'use strict';

alert("Hello, I'm connected!");

// edit my account user info START
const infoForm = document.querySelector('#editInfoForm');
const editInfoFormButton = document.querySelector('#MA_OwnerInfoEditButton');
const infoFormInputs = document.querySelectorAll('.MA_info');

function handleClick() {
   for (let i = 0; i < infoFormInputs.length; i++) {
      infoFormInputs[i].removeAttribute('readonly');
   }
}

editInfoFormButton.addEventListener('click', handleClick);
// edit my account user info END


// save my account user info START
const saveInfoButton = document.querySelector('#MA_OwnerInfoSaveButton');

function saveChangesInfoForm(event) {
   event.preventDefault();
   
   const fname = document.querySelector('#MA_owner_fname')
   const lname = document.querySelector('#MA_owner_lname')
   const email = document.querySelector('#MA_owner_email')
   // finish this HERE 
   // fetch AJAX
}

saveInfoButton.addEventListener('submit', saveChangesInfoForm);
// save my account user info END


// save new user pw START
const pwForm = document.querySelector('#changePW');
const pwSubmitButton = document.querySelector('saveChangePW');


function savePasswordChange() {
   // check current/old password input.value to db/hashed pw
   
   // if 2 passwords are the same:
   const inputPW1 = document.querySelector('MA_password');
   const inputPW2Verify = document.querySelector('MA_passwordVerify');
   const inputPW1Value = inputPW1.value
   const inputPW2VerifyValue = inputPW2Verify.value 
   console.log(inputPW1Value)
   console.log(inputPW2VerifyValue)

   if (inputPW1Value === inputPW2VerifyValue) {
      session['password'] = inputPW2VerifyValue
      db.session.add(inputPW2VerifyValue)
      db.session.commit()
      alert("You're password has been changed");
   } else {
      alert('Please try again (by checking the same new password is typed into both the Change My Password field and the Verify Password field exactly the same)');
   }
   // add and commit to db ... how do I do this with a hashed pw? 
   // else: 
   // tell the user to try again by checking that they typed in the same thing in both the Change My Password field and the Verify Password field
};

saveInfoButton.addEventListener('submit', saveChangesInfoForm);
// save new user pw END










// // NOT USING THE BELOW JS - USING JINJA IN BASE.HTML + SERVER.PY 
// put this file script on base.html, so it will extends to all html template pages 

// // login.html when a user clicks the login button
// // the following code will change the login button on the navbar to logout when the user is logged in (the button will change after the user clicks the login button on the login page)

// // currently line 12 on login.html 
// const logInForm = document.querySelector('#login-form'); 

// // currently line 49 on base.html 
// const logInLogOutButtonNavBar = document.querySelector ('#loginlogout'); 

// function handleLogIn() {
//   logInForm.addEventListener('submit', (evt) => {
//       console.log('inside handleLogIn function');
//       // Perform actions related to login (e.g., change button text, send login request)
//       logInLogOutButtonNavBar.textContent = 'Log Out';
//   });
// }

// // Js when user clicks the logout button in the navbar to log out
// function handleLogout() {
//   logInLogOutButtonNavBar.addEventListener('click', async (evt) => {
//       console.log('inside handleLogout function');

//       try {
//           const response = await fetch('/logout', {
//               method: 'POST',
//           });

//           if (response.ok) {
//               console.log('Logout successful');
//               logInLogOutButtonNavBar.textContent = 'Log In';
//           } else {
//               // Handle non-successful logout and display an error message if so
//               console.error('Logout failed:', response.statusText);
//           }
//       } catch (error) {
//           // Handle errors during logout
//           console.error('Error during logout:', error.message);
//       }
//   });
// }

// // Call functions
// handleLogIn();
// handleLogout();