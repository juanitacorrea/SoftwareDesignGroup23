module.exports = {
   checkForm1,
   encrypt
};

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

// Encrypts text using a shift od s
function encrypt(text, s)
{
   function encrypt(text, s)
   {
       let result=""
       for (let i = 0; i < text.length; i++)
       {
           let char = text[i];
           if (char.toUpperCase(text[i]))
           {
               let ch =  String.fromCharCode((char.charCodeAt(0) + s-65) % 26 + 65);
               result += ch;
           }
           else
           {
               let ch = String.fromCharCode((char.charCodeAt(0) + s-97) % 26 + 97);
               result += ch;
           }
           
       }
       return result;
   }
}



function checkForm1(username, password, passwordCheck)
{
   if (!username) //makes sure that you inputted something in the name box
   {
      return false;
   }

   if (password.length < 10 || password.length > 20) //checks to make sure the password is withing the length restrictions
   {
      return false;
   }

   if (!password|| !/[a-z]/.test(password)) //checks to make sure that the password has lower case letters
   {
      return false;
   }

   if (!password || !/[A-Z]/.test(password)) //checks to make sure the password has uppercase letters
   {
      return false;
   }

   if (!password || !/[0-9]/.test(password)) //checks to make sure that the password has numbers in it
   {
      return false;
   }

   if (passwordCheck && password !== passwordCheck) //checks to make sure that the confirmation password is the same
   {
      return false;
   }

   else 
   {
      return true;
   }
}


// document.getElementById("submit").addEventListener("click", function(event) 
// {
//     checkForm(); 
//    //Prevent default form action. DO NOT REMOVE THIS LINE
//    //  event.preventDefault();
// });