//in login, check the inputs from username and password textboxes from the login.html (reference murtaza)
//craete a function to creat a query to 
    //-look for username 
    //-if username is in there look for password in the same line text file (matches up account) 
    //-if username was not in there say that "account doesn't exist" and give them a prompt to go back to sign up
    window.sessionStorage;
    var tester = 0;
    function checkForm1()
    {
        //assigning all the values that were inputted into the text boxes
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
    
       if (!password.value) //makes sure that you inputted something in the name box
       {
          errorsFound = true;
          password.style = "border: 2px solid red;";
          error.style = "display: block";
          const nameErr = document.createElement("li");
          nameErr.textContent = "Missing password.";
          error.appendChild(nameErr);
       }
       
       isInLocal(name, password);
       
       if (errorsFound === false && tester != 0)
       {
          error.style = "display: block";
          name.style = "border: 1px solid #aaa;";
          password.style = "border: 1px solid #aaa;";
          sessionStorage.setItem("currentloggedin", name.value);
          window.location.href = "menu.html";
       }
       else
       {
            errorsFound = true;
            name.style = "border: 2px solid red;";
            password.style = "border: 2px solid red;";
            error.style = "display: block";
            const nameErr = document.createElement("li");
            nameErr.textContent = "username or password is incorrect.";
            error.appendChild(nameErr);
       }
       
    }
    //insert a bool function here that can iterate through the array and tell you whether or not the username-password pair is in there

    function isInLocal(username, password)   // to check the login 
    {
        copyOfObjPeople = JSON.parse(localStorage.getItem("users"));
        copyOfObjPeople.forEach(function(objPeople) //u can use this to iterate through the array in your bool function
        {
            var usrnm = objPeople.username;
            var pswd = objPeople.password;
            //console.log(usrnm + "   " + pswd + "\n");
            if(username.value === usrnm && password.value === pswd)
            {
                console.log(usrnm + "logged in sucscessfully");
                
                tester = 1;
            }
        });
    }  

  
    document.getElementById("submit").addEventListener("click", function(event) 
    {
        checkForm1(); 

        event.preventDefault();
    });