window.sessionStorage;
function checkForm()
{
   const fullname = document.getElementById('fullNameInputBoxes');
   const addrLine1 = document.getElementById('address1InputBoxes');
   const addrLine2 = document.getElementById('addres2InputBoxes');
   const city = document.getElementById('cityInputBoxes');
   const state = document.getElementById('stateInputBoxes');
   const zip = document.getElementById('zipcodeInputBoxes');
   const error = document.getElementById('formErrors');
   let errorsFound = false;

   
   if (!fullname.value) //makes sure that you inputted something in the name box
   {
      errorsFound = true;
      fullname.style = "border: 2px solid red;";
      error.style = "display: block";
      const nameErr = document.createElement("li");
      nameErr.textContent = "Missing full name.";
      error.appendChild(nameErr);
   }

   if (!addrLine1.value) //checks to make sure that the password has numbers in it
   {
      errorsFound = true;
      addrLine1.style = "border: 2px solid red;";
      error.style = "display: block";
      const passErr4 = document.createElement("li");
      passErr4.textContent = "Password must contain at least one digit.";
      error.appendChild(passErr4);
   }

   if (!addrLine2.value) //checks to make sure that the password has numbers in it
   {
      errorsFound = true;
      addrLine2.style = "border: 2px solid red;";
      error.style = "display: block";
      const passErr4 = document.createElement("li");
      passErr4.textContent = "Password must contain at least one digit.";
      error.appendChild(passErr4);
   }

   if (!city) //checks to make sure that the password has numbers in it
   {
      errorsFound = true;
      city.style = "border: 2px solid red;";
      error.style = "display: block";
      const passErr4 = document.createElement("li");
      passErr4.textContent = "Password must contain at least one digit.";
      error.appendChild(passErr4);
   }

   if (!zip) //checks to make sure that the password has numbers in it
   {
      errorsFound = true;
      city.style = "border: 2px solid red;";
      error.style = "display: block";
      const passErr4 = document.createElement("li");
      passErr4.textContent = "Password must contain at least one digit.";
      error.appendChild(passErr4);
   }

   if (errorsFound === false) 
   {
      error.style = "display: none";
      fullname.style = "border: 1px solid #aaa;";
      addrLine1.style = "border: 1px solid #aaa;";
      addrLine2.style = "border: 1px solid #aaa;";
      city.style = "border: 1px solid #aaa;";
      state.style = "border: 1px solid #aaa;";
      zip.style = "border: 1px solid #aaa;";
      var currerntUser = sessionStorage.getItem('currentloggedin');
      var copyOfObjPeople = JSON.parse(localStorage.getItem("users"));
      copyOfObjPeople.forEach(function(objPeople) //u can use this to iterate through the array in your bool function
      {
         var usrnm = objPeople.username;
         //console.log(usrnm + "   " + pswd + "\n");
         if(currerntUser === usrnm)
         {
             console.log("Currently editing: " + usrnm);  
             objPeople.fullName = fullname.value;
             objPeople.addrLine1 = addrLine1.value;
             objPeople.addrLine2 = addrLine2.value;
             objPeople.city = city.value;
             objPeople.state = "temp";
             objPeople.zip = zip.value;
         }
      });
      localStorage.setItem('users', JSON.stringify(copyOfObjPeople));
   }
}
document.getElementById("submit").addEventListener("click", function(event) 
{
    checkForm(); 
   //Prevent default form action. DO NOT REMOVE THIS LINE
    event.preventDefault();
});



