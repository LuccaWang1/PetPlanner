'use strict';

const logInButton = document.querySelector('#login-btn');
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')

function handleClick() {
  if (logInButton.textContent === 'Log In') {
    console.log('Button is Log In');
    button.textContent = "Log Out";
    console.log('Log In event is done');
  } else {
    console.log('Button is Log Out');
      button.textContent = "Log In";
      console.log('Log Out event is done')
  }
}

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting and page refreshing
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    
    // Do something with emailValue and passwordValue (e.g., save to a variable, send to server, etc.)
    console.log('Email:', emailValue);
    console.log('Password:', passwordValue);
    //save this in the session
  }
  
  // Attach the event listeners
  logInButton.addEventListener('click', handleClick);
  
  // Assuming you have a form with id "login-form"
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', handleFormSubmit);