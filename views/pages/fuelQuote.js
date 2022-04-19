//take all inputs from fuel QUOTE HTML
//IN FUEL QUOTOE HTML GIVE ELEMENTS A SPECIFIC ID
//create a function that calculates the total amount due (gallons*price)
//then output onto a text file the data that was inputted into the fuel quote (and final quote that was calculated from function)

window.sessionStorage //to access from sessionStorage (current user logged in)

function calcAmount(gallonsRequested, sugPriceInputBoxes)
{ 
    var gals = gallonsRequested;
    var price = sugPriceInputBoxes;
    var amountDue = gals * price;
    return amountDue.toFixed(2);
}

function calcAmountWithMargin(gallons, currentPrice, locationFactor, rateHistory, gallonsRegFactor, companyProfitFactor)
{
   var margin = currentPrice * (locationFactor - rateHistory + gallonsRegFactor + companyProfitFactor);
   var suggPrice = currentPrice + margin;
   var totalAmountWMargin = gallons * suggPrice;

   return totalAmountWMargin;
}

function inputInformation() 
{
   const gallonsRequested = document.getElementById('gallonsInputBoxes');
   const city = sessionStorage.getItem('city');//document.getElementById('cityInputBoxesFQ');
   const street = sessionStorage.getItem('currentUserAddr1');//document.getElementById('address1InputBoxesFQ');
   const state = sessionStorage.getItem('state');//document.getElementById('stateInputBoxesFQ');
   const zip = sessionStorage.getItem('zipcode');//document.getElementById('zipcodeInputBoxesFQ');
   const delDate = document.getElementById('delDateInputBoxes');
   const sugPriceInputBoxes = document.getElementById('sugPriceInputBoxes');
   let delAddress= street + ", " + city + ", "  + state + " " + zip;
   const error = document.getElementById('formErrors');
   let errorsFound = false;
   let AmountDue = calcAmount(gallonsRequested.value, sugPriceInputBoxes.value);

   if (!gallonsRequested.value) //makes sure that you inputted something in the name box
   {
      errorsFound = true;
      gallonsRequested.style = "border: 2px solid red;";
      error.style = "display: block";
      const nameErr = document.createElement("li");
      nameErr.textContent = "Missing Gallons Requested.";
      error.appendChild(nameErr);
   }
    if (!delDate.value) //makes sure that you inputted something in the calender
     {
          errorsFound = true;
          delDate.style = "border: 2px solid red;";
          error.style = "display: block";
          const nameErr = document.createElement("li");
          nameErr.textContent = "Missing Date";
          error.appendChild(nameErr);
    }

   if (errorsFound === false) 
   {
      //outputting into local storage 
      var updatedUserDate = new Object();
      var tempQuote = new Object();
      tempQuote = {Gallons: gallonsRequested.value, Address: delAddress, SuggPrice: sugPriceInputBoxes.value, Total: AmountDue, Date: delDate.value};

      var currerntUser = sessionStorage.getItem('currentloggedin');
      var copyOfObjPeople = JSON.parse(localStorage.getItem("users"));
      copyOfObjPeople.every(function(objPeople) //u can use this to iterate through the array in your bool function
      {
         var usrnm = objPeople.username;
         if(currerntUser === usrnm)
         {
           objPeople.quotes.push(tempQuote);
           console.log("just put a quote in");
           return false;
         }
         return true;
      });
      localStorage.setItem('users', JSON.stringify(copyOfObjPeople));
      sessionStorage.setItem('mostRecentGallons', tempQuote.Gallons);
      sessionStorage.setItem('mostRecentSugg', tempQuote.SuggPrice);
      sessionStorage.setItem('mostRecentAddr', delAddress);
      sessionStorage.setItem('mostRecentTotal',tempQuote.Total);

      window.location.href = "finalSubmissionForm.html";
   }
}
      
   
document.getElementById("submit").addEventListener("click", function(event) 
{
    inputInformation(); 
   //Prevent default form action. DO NOT REMOVE THIS LINE
    event.preventDefault();
});