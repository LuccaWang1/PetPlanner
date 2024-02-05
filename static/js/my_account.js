'use strict';

console.log("i'm in the js file, my_account.js");

// START edit my account user info
const editInfoFormButton = document.querySelector('#MA_OwnerInfoEditButton');

const myAccountOwnerFName = document.querySelector('#MA_owner_fname');
const myAccountOwnerLName = document.querySelector('#MA_owner_lname');
const myAccountOwnerEmail = document.querySelector('#MA_owner_email');

function handleClick() {
   console.log('in the handleClick function');

   myAccountOwnerFName.removeAttribute('readonly');
   myAccountOwnerLName.removeAttribute('readonly');
   myAccountOwnerEmail.removeAttribute('readonly');
   myAccountOwnerFName.style.backgroundColor = 'rgb(255,192,203)';
   myAccountOwnerLName.style.backgroundColor = 'rgb(255,192,203)';
   myAccountOwnerEmail.style.backgroundColor = 'rgb(255,192,203)';

   const owner_fname = myAccountOwnerFName.value;
   const owner_lname = myAccountOwnerLName.value;
   const owner_email = myAccountOwnerEmail.value;

   console.log(owner_fname);
   console.log(owner_lname);
   console.log(owner_email);
}

editInfoFormButton.addEventListener('click', handleClick);
// END edit my account user info



// START save my account user info 
const saveInfoForm = document.querySelector('#editInfoForm');

function saveChangesInfoForm(event) {
   event.preventDefault();

   myAccountOwnerFName.style.backgroundColor = 'rgb(212,235,242)';
   myAccountOwnerLName.style.backgroundColor = 'rgb(212,235,242)';
   myAccountOwnerEmail.style.backgroundColor = 'rgb(212,235,242)';

   console.log('in the saveChangesInfoForm function');

   // get values - any new values 
   const owner_fname = myAccountOwnerFName.value;
   const owner_lname = myAccountOwnerLName.value;
   const owner_email = myAccountOwnerEmail.value;

   console.log(owner_fname);
   console.log(owner_lname);
   console.log(owner_email);

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
      
         myAccountOwnerFName.innerHTML = responseJson['owner_fname']; 
         myAccountOwnerLName.innerHTML = responseJson['owner_lname'];
         myAccountOwnerEmail.innerHTML = responseJson['owner_email'];
         console.log('after the response from the server is given');
      })
}

saveInfoForm.addEventListener('submit', saveChangesInfoForm);
// END save my account user info



// START save new pw
const pwForm = document.querySelector('#changePWForm');

const inputCurrentPW = document.querySelector('#MA_password_old')
const inputPW1 = document.querySelector('MA_password')
const inputPW2Verify = document.querySelector('MA_passwordVerify')

// inputCurrentPW.style.backgroundColor = 'rgb(255,192,203)';
// inputPW1.style.backgroundColor = 'rgb(255,192,203)';
// inputPW2Verify.style.backgroundColor = 'rgb(255,192,203)';

function savePWChange(event) {
   event.preventDefault();

   // check current/old password input.value to db/hashed pw
   
   // does the current/old password match with the password in the db? 
   const inputCurrentPWValue = document.querySelector('#MA_password_old').value;

   // if 2 passwords are the same:
   const inputPW1Value = document.querySelector('MA_password').value;
   const inputPW2VerifyValue = document.querySelector('MA_passwordVerify').value;

   console.log(f`The current/old password is ${inputCurrentPWValue}`);
   console.log(f`The current/old password is ${inputPW1Value}`);
   console.log(f`The current/old password is ${inputPW2VerifyValue}`);

   if (inputPW1Value === inputPW2VerifyValue) {
      newPW = {password: inputPW1Value} 
      console.log('check if newpw1 and newpw2 are the same, then put newpw in dictionary to send server - before fetch')

      fetch('/save-new-password', {
         method: 'POST',
         body: JSON.stringify(newPW),
         headers: {
            'Content-Type': 'application/json',
         },
      })
      .then((response) => {
         console.log('attempting to update pw: doing the fetch request change pw js to server.py')
         return response.json();
      })
      .then((responseJson) => {
         console.log('attempting to update pw: doing the fetch AJAX response responseJson:', responseJson);
         console.log(responseJson);
      })
      .catch((error) => {
         console.error('Error during fetch:', error);
      });

      // inputCurrentPW.style.backgroundColor = 'rgb(212,235,242)';
      // inputPW1.style.backgroundColor = 'rgb(212,235,242)';
      // inputPW2Verify.style.backgroundColor = 'rgb(212,235,242)';

      alert("You're password has been changed");
   } else {
      alert('Please try again - check that your current password is what you typed in, and check that the new password is the same in both the New Password and Verify the New Password fields');
   }
   // add and commit to db ... how do I do this with a hashed pw? 
   // else: 
   // tell the user to try again by checking that they typed in the same thing in both the Change My Password field and the Verify Password field
};

pwForm.addEventListener('submit', savePWChange);
// END save new pw