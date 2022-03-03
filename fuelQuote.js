//take all inputs from fuel QUOTE HTML
//IN FUEL QUOTOE HTML GIVE ELEMENTS A SPECIFIC ID
//create a function that calculates the total amount due (gallons*price)
//then output onto a text file the data that was inputted into the fuel quote (and final quote that was calculated from function)

function calcAmount(gallonsRequested, sugPriceInputBoxes)
{ 
    var gals = gallonsRequested;
    var price = sugPriceInputBoxes;
    var amountDue = gals * price;
    return amountDue;
}
function inputInformation() 
{
   const gallonsRequested = document.getElementById('gallonsInputBoxes');
   const city = document.getElementById('cityInput');
   const street = document.getElementById('streetInput');
   const state = document.getElementById('stateInput');
   const zip = document.getElementById('zipInput');
   const delDate = document.getElementById('delDateInputBoxes');
   const sugPriceInputBoxes = document.getElementById('sugPriceInputBoxes');
   let delAddress= city + "," + street + "," + state+ "," + zip;
   const error = document.getElementById('formErrors');
   let errorsFound = false;

   //didnt work but must add it to the fuelQuoteForm.html
   //let AmountDue= calcAmount(gallonsRequested, sugPriceInputBoxes);
   //const totalAmount=document.getElementById('totalAmount');
   //totalAmount.appendChild(AmountDue);

   
   if (!gallonsRequested.value) //makes sure that you inputted something in the name box
   {
      errorsFound = true;
      gallonsRequested.style = "border: 2px solid red;";
      error.style = "display: block";
      const nameErr = document.createElement("li");
      nameErr.textContent = "Missing Gallons Requested.";
      error.appendChild(nameErr);
   }
   if (!delDate.value) //makes sure that you inputted something in the name box
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
    //outputting into a text file
      
      window.location.href = "finalSubmissionForm.html";
   }
   
}
   
   
document.getElementById("submit").addEventListener("click", function(event) 
{
    inputInformation(); 
//Prevent default form action. DO NOT REMOVE THIS LINE
    event.preventDefault();
});