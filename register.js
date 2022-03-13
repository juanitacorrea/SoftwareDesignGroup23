var objPeople = new Array();
user1 = new Object();
user2 = new Object();
user3 = new Object();
user1 =
   {
      username: 'exxon',
      password: 'Exxon&Mobil1',
      fullName: "",
      addrLine1: "",
      addrLine2: "",
      city: "",
      state: "",
      zip: "",
      quotes: []
   };
user2 =
   {
      username: 'chevron',
      password: 'ChevronGas1!',
      fullName: "",
      addrLine1: "",
      addrLine2: "",
      city: "",
      state: "",
      zip: "",
      quotes: []
   };
user3 =
   {
      username: 'shell',
      password: 'ShellOil&Gas1',
      fullName: "",
      addrLine1: "",
      addrLine2: "",
      city: "",
      state: "",
      zip: "",
      quotes: []
   };
objPeople.push(user1);
objPeople.push(user2);
objPeople.push(user3);


function checkForm()
{
   const name = document.getElementById('usernameInputBoxes');
   const password = document.getElementById('passwordInputBoxes');
   const passwordCheckInputBoxes = document.getElementById('passwordCheckInputBoxes');
   const error = document.getElementById('formErrors');
   let errorsFound = false;

   
   if (!name.value) //makes sure that you inputted something in the name box
   {
      errorsFound = true;
      name.style = "border: 2px solid red;";
      error.style = "display: block";
      const nameErr = document.createElement("li");
      nameErr.textContent = "Missing full name.";
      error.appendChild(nameErr);
   }

   if (password.value.length < 10 || password.value.length > 20) //checks to make sure the password is withing the length restrictions
   {
      errorsFound = true;
      password.style = "border: 2px solid red;";
      error.style = "display: block";
      const passErr1 = document.createElement("li");
      passErr1.textContent = "Password must be between 10 and 20 characters.";
      error.appendChild(passErr1);
   }

   if (!password.value || !/[a-z]/.test(password.value)) //checks to make sure that the password has lower case letters
   {
      errorsFound = true;
      password.style = "border: 2px solid red;";
      error.style = "display: block";
      const passErr2 = document.createElement("li");
      passErr2.textContent = "Password must contain at least one lowercase character.";
      error.appendChild(passErr2);
   }

   if (!password.value || !/[A-Z]/.test(password.value)) //checks to make sure the password has uppercase letters
   {
      errorsFound = true;
      password.style = "border: 2px solid red;";
      error.style = "display: block";
      const passErr3 = document.createElement("li");
      passErr3.textContent = "Password must contain at least one uppercase character.";
      error.appendChild(passErr3);
   }

   if (!password.value || !/[0-9]/.test(password.value)) //checks to make sure that the password has numbers in it
   {
      errorsFound = true;
      password.style = "border: 2px solid red;";
      error.style = "display: block";
      const passErr4 = document.createElement("li");
      passErr4.textContent = "Password must contain at least one digit.";
      error.appendChild(passErr4);
   }

   if (passwordCheckInputBoxes && password.value !== passwordCheckInputBoxes.value) //checks to make sure that the confirmation password is the same
   {
      errorsFound = true;
      password.style = "border: 2px solid red;";
      passwordCheckInputBoxes.style = "border: 2px solid red;";
      error.style = "display: block";
      const passErr5 = document.createElement("li");
      passErr5.textContent = "Password and confirmation password don't match.";
      error.appendChild(passErr5);
   }

   if (errorsFound === false) 
   {
      error.style = "display: none";
      name.style = "border: 1px solid #aaa;";
      password.style = "border: 1px solid #aaa;";
      passwordCheckInputBoxes.style = "border: 1px solid #aaa;";

      var userData = new Object();
      userData={username:name.value, password:password.value, fullName: "",addrLine1: "",addrLine2: "",city: "",state: "",quotes: []};
      objPeople.push(userData);
      console.log(objPeople);
      localStorage.setItem('users', JSON.stringify(objPeople));
      window.location.href = "login.html";
   }
}
   
document.getElementById("submit").addEventListener("click", function(event) 
{
    checkForm(); 
   //Prevent default form action. DO NOT REMOVE THIS LINE
    event.preventDefault();
});