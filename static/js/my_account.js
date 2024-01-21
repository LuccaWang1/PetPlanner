'use strict';

console.log("i'm in the js file, my_account.js")

// START edit my account user info
const editInfoFormButton = document.querySelector('#MA_OwnerInfoEditButton');

function handleClick() {
   console.log('in the handleClick function');

   document.querySelector('#MA_owner_fname').removeAttribute('readonly');
   document.querySelector('#MA_owner_lname').removeAttribute('readonly');
   document.querySelector('#MA_owner_email').removeAttribute('readonly');
   document.querySelector('#MA_owner_fname').style.backgroundColor = 'rgb(255,192,203)';
   document.querySelector('#MA_owner_lname').style.backgroundColor = 'rgb(255,192,203)';
   document.querySelector('#MA_owner_email').style.backgroundColor = 'rgb(255,192,203)';
}

editInfoFormButton.addEventListener('click', handleClick);
// END edit my account user info



// START save my account user info 
const saveInfoForm = document.querySelector('#editInfoForm');

function saveChangesInfoForm(event) {
   event.preventDefault();
   
   document.querySelector('#MA_owner_fname').style.backgroundColor = 'rgb(212,235,242)';
   document.querySelector('#MA_owner_lname').style.backgroundColor = 'rgb(212,235,242)';
   document.querySelector('#MA_owner_email').style.backgroundColor = 'rgb(212,235,242)';

   console.log('in the saveChangesInfoForm function')

   // get values - any new values 
   const owner_fname = document.querySelector('#MA_owner_fname').value;
   const owner_lname = document.querySelector('#MA_owner_lname').value;
   const owner_email = document.querySelector('#MA_owner_email').value;

   const saveFormInputs = {
      owner_fname: owner_fname,
      owner_lname: owner_lname,
      owner_email: owner_email,
   };

   console.log(saveFormInputs);

   // send data to server (and save to db & session), get back the same info as the values typed into the form
   console.log('just before the fetch request');
   
   fetch('/save-account-info', {
      method: 'POST',
      body: JSON.stringify(saveFormInputs),
      headers: {
         'Content-Type': 'application/json',
      },
   })
      .then((response) => {
         console.log('in the response .then')
         return response.json()
      })
      .then((responseJson) => {
         console.log('in the responseJson .then doing the fetch AJAX response');
         console.log(responseJson);
      
         document.querySelector('#MA_owner_fname').innerHTML = responseJson['owner_fname']; 
         document.querySelector('#MA_owner_lname').innerHTML = responseJson['owner_lname'];
         document.querySelector('#MA_owner_email').innerHTML = responseJson['owner_email'];
         console.log('after the response from the server is given');
      })
}

saveInfoForm.addEventListener('submit', saveChangesInfoForm);
// END save my account user info



// // save new user pw START
// const pwForm = document.querySelector('#changePW');
// const pwSubmitButton = document.querySelector('saveChangePW');

// function savePasswordChange() {
//    // check current/old password input.value to db/hashed pw
   
//    // if 2 passwords are the same:
//    const inputPW1 = document.querySelector('MA_password');
//    const inputPW2Verify = document.querySelector('MA_passwordVerify');
//    const inputPW1Value = inputPW1.value
//    const inputPW2VerifyValue = inputPW2Verify.value 
//    console.log(inputPW1Value);
//    console.log(inputPW2VerifyValue);

//    if (inputPW1Value === inputPW2VerifyValue) {
//       newPW = {password: inputPW1Value} 

//       fetch('/save-new-password', {
//          method: 'POST',
//          body: JSON.stringify(newPW),
//          headers: {
//             'Content-Type': 'application/json',
//          },
//       })
//          .then((response) => {
//             console.log('doing the fetch request from here to server.py')
//             return response.json();
//          })
//          .then((responseJson) => {
//             console.log('doing the fetch AJAX response');
//             console.log(responseJson);
         
//             document.querySelector('#owner_fname').innerText = responseJson['owner_fname']; 
//             document.querySelector('#owner_lname').innerText = responseJson['owner_lname'];
//             document.querySelector('#owner_email').innerText = responseJson['owner_email'];
//          })
//          .catch((error) => {
//             console.error('Error during fetch:', error);
//          });



//       alert("You're password has been changed");
//    } else {
//       alert('Please try again (by checking the same new password is typed into both the Change My Password field and the Verify Password field exactly the same)');
//    }
//    // add and commit to db ... how do I do this with a hashed pw? 
//    // else: 
//    // tell the user to try again by checking that they typed in the same thing in both the Change My Password field and the Verify Password field
// };

// pwForm.addEventListener('submit', savePasswordChange);
// // save new user pw END