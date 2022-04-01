const reg = require("./register");
const login = require("./login");

var currentUser = "";
var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()
app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));
var spawn = require('child_process').spawn;


app.post('/register', function(req,res){
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

        return res.redirect('login.html');
     }	
});

app.post('/login', function(req,res)
{
    var uname = req.body.uname;
    var pswd = req.body.pswd;

    console.log("username:" + uname + " password: " + pswd);

    const copyOfLoginCollection = require('./loginInfo.json');
    if(login.isInDB(uname, pswd, copyOfLoginCollection, 0) == 1)
    {
        console.log("You've successfully logged in!")
        var data = 
        {
            $set:
        
        {
            "username":uname,
            "fullName": "",
            "addrLine1": "",
            "addrLine2": "",
            "city": "",
            "state": "",
            "zip": "",
            "bVal": "val"
        }
        }

        var myquery = { bVal: "val" };

        db.collection('currentUser').updateOne(myquery, data, function(err, res) 
        {
            if (err) throw err;
            console.log("Current user data updated");
        });

        ls = spawn('mongoexport',['--db', 'gfg','--collection', 'currentUser', '--jsonArray', '--out', 'currentUser.json']);

        return res.redirect('menu.html');
    }
});


app.post('/clientProfileName', function(req,res)
{
    var fullname = req.body.name;
    var addrLine1 = req.body.adress;
    var addrLine2 = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zipcode;

    // assigning the username that's found in currentUser
    const copyOfCurrentUser = require('./currentUser.json');
    var username = "";
    copyOfCurrentUser.forEach(function(objPeople)
    {
        username = objPeople.username;
    });

    // updating that user's data
    var myquery = { username: username };
    var newvalues = { $set: {username: username, fullName: fullname, addrLine1: addrLine1, addrLine2: addrLine2, city: city, state: state, zip: zip } };
    var newCurrentUserValues = { $set: {username: username, fullName: fullname, addrLine1: addrLine1, addrLine2: addrLine2, city: city, state: state, zip: zip,  bVal: "val"} };
    db.collection('userdata').updateOne(myquery, newvalues, function(err, res) 
    {
        if (err) throw err;
        console.log("User profile updated");
    });

    //updating the currentUser's data
    db.collection('currentUser').updateOne(myquery, newCurrentUserValues, function(err, res) 
    {
        if (err) throw err;
        console.log("Current user data updated");
    });

    return res.redirect('menu.html');
 });



app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('clientRegistration.html');
}).listen(3001)


console.log("server listening at port 3000");
