const reg = require("./register");
const login = require("./login");
const fq = require("./fuelQuote");
let globalAddy = "global addy";
let globalUsername = "";
let quotesArray = require('./quotes.json');

let currentUserGlobal = 
        {
                "username":"",
                "fullName": "",
                "addrLine1": "",
                "addrLine2": "",
                "city": "",
                "state": "",
                "zip": "",
                "bVal": "val",
                "mostRecentGal": "",
                "mostRecentTotal": "",
                "mostRecentSugPrice": ""
        }

var currentUser = "";
var express=require("express");
var bodyParser=require("body-parser");

var app = express();
app.set('view engine', 'ejs');

const mongoose = require('mongoose');
const { stat } = require("fs/promises");
mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));
var spawn = require('child_process').spawn;


//*************************************//
//**********  POST FUNCTIONS  *********//
//*************************************//

//** REGISTER POST FUNCTION **//////////////////////////////////////////////////
app.post('/register', function(req,res)
{
    var username = req.body.username;
    var psw = req.body.psw;
    var pswCheck = req.body.pswCheck;

	var data = {
        "username":username,
        "fullName": "",
        "addrLine1": "",
        "addrLine2": "",
        "city": "",
        "state": "",
        "zip": ""
	}

    var loginData = {
        "username":username,
        "password":psw
	}
     if(reg.checkForm1(username, psw, pswCheck))
     {
        // login credentials get inserted into the loginCredentials collection
        db.collection('loginCredentials').insertOne(loginData,function(err, collection)
        {
            if (err) throw err;
            console.log("Login Credentials inserted Successfully");
            ls = spawn('mongoexport',['--db', 'gfg','--collection', 'loginCredentials', '--jsonArray', '--out', 'loginInfo.json']);
        });

        // userdata gets inserted into the userdata collection with balnk values on everything but username
        db.collection('userdata').insertOne(data,function(err, collection)
        {
            if (err) throw err;
            console.log("Record inserted Successfully");
            ls = spawn('mongoexport',['--db', 'gfg','--collection', 'userdata', '--jsonArray', '--out', 'userdata.json']);
        });

        return res.redirect('/login');
     }	
});



//** LOGIN POST FUNCTION **//////////////////////////////////////////////////
app.post('/login', function(req,res)
{
    var uname = req.body.uname;
    var pswd = req.body.pswd;

    var fullName = "";
    var addrLine1 = ""; 
    var addrLine2 = "";
    var city = "";
    var state = "";
    var zip = "";

    globalUsername = uname;

    console.log("username:" + uname + " password: " + pswd);

    const copyOfUserdataCollection = require('./userdata.json');
    const copyOfLoginCollection = require('./loginInfo.json');
    if(login.isInDB(uname, pswd, copyOfLoginCollection, 0) == 1)
    {
        console.log("You've successfully logged in!")
        //if userdata already exists, set these as currentUser values
        copyOfUserdataCollection.forEach(function(objPeople)
        {
            if(uname == objPeople.username)
            {
                fullName = objPeople.fullName;
                addrLine1 = objPeople.addrLine1; 
                addrLine2 = objPeople.addrLine2;
                city = objPeople.city;
                state = objPeople.state;
                zip = objPeople.zip;
            }
        });

        var data = 
        {
            $set:
            {
                "username":uname,
                "fullName": fullName,
                "addrLine1": addrLine1,
                "addrLine2": addrLine2,
                "city": city,
                "state": state,
                "zip": zip,
                "bVal": "val",
                "mostRecentGal": "",
                "mostRecentTotal": "",
                "mostRecentSugPrice": ""
            }
        }


        currentUserGlobal = 
        {
                "username":uname,
                "fullName": fullName,
                "addrLine1": addrLine1,
                "addrLine2": addrLine2,
                "city": city,
                "state": state,
                "zip": zip,
                "bVal": "val",
                "mostRecentGal": "",
                "mostRecentTotal": "",
                "mostRecentSugPrice": ""
        }

        // db.collection('currentUser').insertOne(data,function(err, collection)
        // {
        //     if (err) throw err;
        //     console.log("Current user data updated");
        // });

        var myquery = { bVal: "val" };

        db.collection('currentUser').updateOne(myquery, data, function(err, res) 
        {
            if (err) throw err;
            console.log("Current user data updated");
        });

        ls = spawn('mongoexport',['--db', 'gfg','--collection', 'currentUser', '--jsonArray', '--out', 'currentUser.json']);

        return res.redirect('/menu');
    }
});


//** FUEL QUOTE FORM POST FUNCTION **//////////////////////////////////////////////////
app.post('/fuelQuoteForm1', function(req,res)
{
    const copyOfQuotes = require('./quotes.json');

    //const copyOfCurrentUser = require('./currentUser.json');

    var fullname = "";
    var username = "";
    var address = "";
    var address2 = "";
    var city  = "";
    var state = "";
    var zipcode = "";


    // copyOfCurrentUser.forEach(function(objPeople)
    // {
    //     fullname = objPeople.fullName;
    //     username = objPeople.username;
    //     address = objPeople.addrLine1;
    //     address2 = objPeople.addrLine2;
    //     city = objPeople.city;
    //     state = objPeople.state;
    //     zipcode = objPeople.zip;
    //     console.log(state);
    // });

    fullname = currentUserGlobal.fullName;
    username = currentUserGlobal.username;
    address = currentUserGlobal.addrLine1;
    address2 = currentUserGlobal.addrLine2;
    city = currentUserGlobal.city;
    state = currentUserGlobal.state;
    zipcode = currentUserGlobal.zip;
    console.log(state);
    

    var gallons = req.body.gallonsR;
    var date = req.body.deliveryDate;

    var currentPrice = 1.50
    var locationFactor = .02 // .02 for texas and .04 for another state 
    if(state == "TX")
    {
        locationFactor = 0.02
    }
    else 
    {
        locationFactor = 0.04
    }
    
    var rateHistory = 0 //.01 if history and .00 if no history
    if (fq.isInQuotes(username, copyOfQuotes, 0) == 1)
    {
        rateHistory = .01
        console.log("User was there")
    }

    var gallonsRegFactor = .02 //.02 if >1000 gals and .03 if less
    if (gallons < 1000)
    {
        gallonsRegFactor = .03
    }
    
    var companyProfitFactor = .10 //constant
    
    //var margin = currentPrice * (locationFactor - rateHistory + gallonsRegFactor + companyProfitFactor)
    //var suggPrice = currentPrice + margin
    var suggPrice = fq.calcSuggPrice(currentPrice, locationFactor, rateHistory, gallonsRegFactor, companyProfitFactor);
    var total = fq.calcAmountWithMargin(gallons, suggPrice)
    var quote = 
    {
        "username": username,
        "gallonsReq": gallons,
        "suggPrice": suggPrice,
        "total": total,
        "date": date
    }

    quotesArray.push(quote);

    db.collection('quotes').insertOne(quote,function(err, collection)
    {
        if (err) throw err;
        console.log("Record inserted Successfully");
        ls = spawn('mongoexport',['--db', 'gfg','--collection', 'quotes', '--jsonArray', '--out', 'quotes.json']);
    });

    //update the current user with the most recent quote info
    var data = 
        {
            $set:
            {
                "username":username,
                "fullName": fullname,
                "addrLine1": address,
                "addrLine2": address2,
                "city": city,
                "state": state,
                "zip": zipcode,
                "bVal": "val",
                "mostRecentGal": gallons,
                "mostRecentTotal": total,
                "mostRecentSugPrice": suggPrice
            }
        }

        currentUserGlobal = 
        {
            "username":username,
            "fullName": fullname,
            "addrLine1": address,
            "addrLine2": address2,
            "city": city,
            "state": state,
            "zip": zipcode,
            "bVal": "val",
            "mostRecentGal": gallons,
            "mostRecentTotal": total,
            "mostRecentSugPrice": suggPrice
        }
    
    
    var myquery = { bVal: "val" };

    db.collection('currentUser').updateOne(myquery, data, function(err, res) 
    {
        if (err) throw err;
        console.log("Current user data updated");
        ls = spawn('mongoexport',['--db', 'gfg','--collection', 'currentUser', '--jsonArray', '--out', 'currentUser.json']);
    });
        
    return res.redirect('/finalSubmissionForm');
});



//** CLIENT PROFILE NAME POST FUNCTION **//////////////////////////////////////////////////
app.post('/clientProfileName', function(req,res)
{

    var fullname = req.body.name;
    var addrLine1 = req.body.adress;
    var addrLine2 = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zipcode;


    currentUserGlobal = 
        {
                "username":currentUserGlobal.username,
                "fullName": fullname,
                "addrLine1": addrLine1,
                "addrLine2": addrLine2,
                "city": city,
                "state": state,
                "zip": zip,
                "bVal": "val",
                "mostRecentGal": "",
                "mostRecentTotal": "",
                "mostRecentSugPrice": ""
        }


    globalAddy = addrLine1;
    // assigning the username that's found in currentUser
    const copyOfCurrentUser = require('./currentUser.json');
    var username = "";
    copyOfCurrentUser.forEach(function(objPeople)
    {
        username = objPeople.username;
    });

    // updating that user's data
    var myquery = { username: username };
    var myquery2 = { bVal: "val" };
    var newvalues = { $set: {username: username, fullName: fullname, addrLine1: addrLine1, addrLine2: addrLine2, city: city, state: state, zip: zip } };
    var newCurrentUserValues = { $set: {username: username, fullName: fullname, addrLine1: addrLine1, addrLine2: addrLine2, city: city, state: state, zip: zip,  bVal: "val"} };
    db.collection('userdata').updateOne(myquery, newvalues, function(err, res) 
    {
        if (err) throw err;
        console.log("User profile updated");
    });

    //updating the currentUser's data
    db.collection('currentUser').updateOne(myquery2, newCurrentUserValues, function(err, res) 
    {
        if (err) throw err;
        console.log("Current user data updated");
    });

    ls = spawn('mongoexport',['--db', 'gfg','--collection', 'currentUser', '--jsonArray', '--out', 'currentUser.json']);

    return res.redirect('/menu');
 });


//*************************************//
//**********  GET FUNCTIONS  **********//
//*************************************//

//** FUEL QUOTE FORM GET FUNCTION **//////////////////////////////////////////////////
 app.get('/fuelQuoteForm', function(req, res)
 {
    //ls = spawn('mongoexport',['--db', 'gfg','--collection', 'currentUser', '--jsonArray', '--out', 'currentUser.json']);
    const copyOfQuotes = require('./quotes.json');

    var username = "";
    var address = "";
    var city  = "";
    var state = "";
    var zipcode = "";

    username = currentUserGlobal.username;
    address = currentUserGlobal.addrLine1;
    city = currentUserGlobal.city;
    state = currentUserGlobal.state;
    zipcode = currentUserGlobal.zip;

    var gallons = req.body.gallonsR;
    var date = req.body.deliveryDate;

    var currentPrice = 1.50
    var locationFactor = .02 // .02 for texas and .04 for another state 
    if(state == "TX")
    {
        locationFactor = 0.02
    }
    else 
    {
        locationFactor = 0.04
    }
    
    var rateHistory = 0 //.01 if history and .00 if no history
    if (fq.isInQuotes(username, copyOfQuotes, 0) == 1)
    {
        rateHistory = .01
        console.log("User was there")
    }
    
    var companyProfitFactor = .10 //constant
    
    //var margin = currentPrice * (locationFactor - rateHistory + gallonsRegFactor + companyProfitFactor)
    //var suggPrice = currentPrice + margin
    var coeff = fq.calcCoeffWithoutGal(rateHistory, locationFactor, .1);
    console.log(coeff);
    var copyOfCurrentUser = require('./currentUser.json');
    // copyOfCurrentUser.forEach(function(objPeople)
    // {
    //     address = objPeople.addrLine1;
    //     city = objPeople.city;
    //     state = objPeople.state;
    //     zipcode = objPeople.zip;

    // });


    res.render('pages/fuelQuoteForm',
    {
        address: address,
        city: city,
        state: state,
        zipcode: zipcode,
        coeff: coeff

    });
 });

//** MENU GET FUNCTION **//////////////////////////////////////////////////
app.get('/menu', function(req, res){
    res.render('pages/menu');
});

//** LOGIN GET FUNCTION **//////////////////////////////////////////////////
app.get('/login', function(req, res){
    res.render('pages/login');
});

//** CLIENT PROFILE NAME GET FUNCTION **//////////////////////////////////////////////////
app.get('/clientProfileName', function(req, res){
    res.render('pages/clientProfileName');
});

//** FINAL SUBMISSION FORM GET FUNCTION **//////////////////////////////////////////////////
app.get('/finalSubmissionForm', function(req, res){
    
    
    var gallons = "";
    var address  = "";
    var suggPrice = "";
    var total = "";

    const copyOfCurrentUser = require('./currentUser.json');

    // copyOfCurrentUser.forEach(function(objPeople)
    // {
    //     //username = objPeople.username;
    //     gallons = objPeople.mostRecentGal;
    //     address = objPeople.addrLine1;
    //     suggPrice = objPeople.mostRecentSugPrice;
    //     total = objPeople.mostRecentTotal;

    // });

    gallons = currentUserGlobal.mostRecentGal;
    address = currentUserGlobal.addrLine1;
    suggPrice = currentUserGlobal.mostRecentSugPrice;
    total = currentUserGlobal.mostRecentTotal;
    
    res.render('pages/finalSubmissionForm',
    {
        gallons: gallons,
        address: address,
        suggPrice: suggPrice,
        total: total
    });
});

//** FUEL QUOTE HISTORY GET FUNCTION **//////////////////////////////////////////////////
app.get('/fuelQuoteHistory', function(req, res)
{
    // assigning the username that's found in currentUser
    //const copyOfCurrentUser = require('./currentUser.json');
    var username = globalUsername;
    // copyOfCurrentUser.forEach(function(objPeople)
    // {
    //     username = objPeople.username;
    // });

    var query = { username: username };
    const quoteHist = [];
    db.collection("quotes").find(query).toArray(function(err, result) 
    {
        if (err) throw err;
        console.log(result);

        result.forEach(function(q)
        {
            quoteHist.push("Gallons: " + q.gallonsReq + ", Suggested Price: " + q.suggPrice.toFixed(2) + ", Total: " + q.total.toFixed(2) + ", Date: " + q.date);
        });
        console.log(quoteHist);
        res.render('pages/fuelQuoteHistory',
        {
            quoteHist:quoteHist
        });
    });
  
});

//** CLIENT REGISTRATION GET FUNCTION **//////////////////////////////////////////////////
app.get ('/clientRegistration', function(req, res){
    res.render ('pages/clientRegistration');
});


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('/login');
}).listen(3000)


console.log("server listening at port 3000");
