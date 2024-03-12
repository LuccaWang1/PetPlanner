'use strict';

console.log("in the my_account_info.js file");

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
   myAccountOwnerFName.style.backgroundColor = 'rgb(230,158,143)';
   myAccountOwnerLName.style.backgroundColor = 'rgb(230,158,143)';
   myAccountOwnerEmail.style.backgroundColor = 'rgb(230,158,143)';

   console.log(myAccountOwnerFName.value);
   console.log(myAccountOwnerLName.value);
   console.log(myAccountOwnerEmail.value);
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

   const saveFormInputs = {
      owner_fname: myAccountOwnerFName.value,
      owner_lname: myAccountOwnerLName.value,
      owner_email: myAccountOwnerEmail.value,
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