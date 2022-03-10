
window.sessionStorage;

function input()
{
    //code
    //window.location.href = "finalSubmissionForm.html";
}

/* localStorage.setItem('users', JSON.stringify(copyOfObjPeople));
    window.location.href = "finalSubmissionForm.html";*/

document.getElementById("submit").addEventListener("click", function(event) 
{
    input(); 
   //Prevent default form action. DO NOT REMOVE THIS LINE
    event.preventDefault();
}
);