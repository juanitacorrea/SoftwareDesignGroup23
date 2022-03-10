//reads output

//get the current user
//save their quotes array in sessionStorage
//append a formErrors object with each quote
const error = document.getElementById('formErrors');
var tempQuotes = new Array();
var currerntUser = sessionStorage.getItem('currentloggedin');
var copyOfObjPeople = JSON.parse(localStorage.getItem("users"));
copyOfObjPeople.forEach(function(objPeople) //u can use this to iterate through the array in your bool function
{
     var usrnm = objPeople.username;
     if(currerntUser === usrnm)
     {
        tempQuotes = objPeople.quotes;
     }
});

tempQuotes.forEach(function(q)
{
    var Gallons = q.Gallons;
    var Address = q.Address;
    var SuggPrice = q.SuggPrice;
    var Total = q.Total;
    var outputString = "This quote is: " + Gallons + " " + Address + " " + SuggPrice + " " + Total;
    const passErr = document.createElement("li");
    passErr.textContent = outputString;
    error.appendChild(passErr);
});
      
//console.log(tempQuote);
//sessionStorage.setItem('users', JSON.stringify(copyOfObjPeople)); 