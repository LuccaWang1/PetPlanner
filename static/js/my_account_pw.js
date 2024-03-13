'use strict';

console.log("in the my_account_pw.js file");

'use strict';

console.log("in the my_account_pw2.js file");

// START edit my account user pw
const editPWFormButton = document.querySelector('#MA_OwnerPWEditButton');

const inputCurrentPW = document.querySelector('#MA_password_old')
const inputPW1 = document.querySelector('#MA_password')
const inputPW2Verify = document.querySelector('#MA_passwordVerify')

function handleClick() {
   console.log('in the handleClick function');

   inputCurrentPW.removeAttribute('readonly');
   inputPW1.removeAttribute('readonly');
   inputPW2Verify.removeAttribute('readonly');

   inputCurrentPW.style.backgroundColor = 'rgb(255,192,203)';
   inputPW1.style.backgroundColor = 'rgb(255,192,203)';
   inputPW2Verify.style.backgroundColor = 'rgb(255,192,203)';

   console.log(inputCurrentPW.value);
   console.log(inputPW1.value);
   console.log(inputPW2Verify.value);
   // console.logs should show nothing, because not prepopulating those fields to keep pw more secure 
}

editPWFormButton.addEventListener('click', handleClick);
// END edit my account user pw


// START save my account user pw 
const pwForm = document.querySelector('#changePWForm');

function savePWChange(event) {
   event.preventDefault();

   //change color upon form submit
   inputCurrentPW.style.backgroundColor = 'rgb(212,235,242)';
   inputPW1.style.backgroundColor = 'rgb(212,235,242)';
   inputPW2Verify.style.backgroundColor = 'rgb(212,235,242)';

   // check current/old password input.value to db/hashed pw
   
   // does the current/old password match with the password in the db? 
   const inputCurrentPWValue = document.querySelector('#MA_password_old').value;

   // if 2 passwords are the same:
   const inputPW1Value = document.querySelector('#MA_password').value;
   const inputPW2VerifyValue = document.querySelector('#MA_passwordVerify').value;

   console.log(f`The current/old password is ${inputCurrentPWValue}`);
   console.log(f`The new password is ${inputPW1Value}`);
   console.log(f`The new verified password is ${inputPW2VerifyValue}`);

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

      alert("You're password has been changed");
   } else {
      alert('Please try again - check that your current password is what you typed in, and check that the new password is the same in both the New Password and Verify the New Password fields');
   }
};

pwForm.addEventListener('submit', savePWChange);
// END save new pw