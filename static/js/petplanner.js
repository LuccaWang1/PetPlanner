// 'use strict';

// document.querySelector('#login-form').addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   const formInputs = {
//     owner_email: document.querySelector('email').value,
//     owner_password: document.querySelector('password').value,
//   };

//   fetch('/login', {
//     method: 'POST',
//     body: JSON.stringify(formInputs),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((responseJson) => {
//       alert(responseJson.status);
//     });
// });