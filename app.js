const reg = require("./register");
const login = require("./login");

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
        "password":psw,
        "passwordCheck":pswCheck,
        "fullName": "",
        "addrLine1": "",
        "addrLine2": "",
        "city": "",
        "state": "",
        "zip": "",
        "quotes": []
	}
     if(reg.checkForm1(username, psw, pswCheck))
     {
        db.collection('userdata').insertOne(data,function(err, collection){
            if (err) throw err;
            console.log("Record inserted Successfully");
            ls = spawn('mongoexport',['--db', 'gfg','--collection', 'userdata', '--jsonArray', '--out', 'output.json']);
        });
        return res.redirect('login.html');
     }	
})

app.post('/login', function(req,res){
    var uname = req.body.uname;
    var pswd = req.body.pswd;

    console.log("username:" + uname + " password: " + pswd);

    const copyOfDB = require('./output.json');
    if(login.isInDB(uname, pswd, copyOfDB, 0) == 1)
    {
        console.log("You've successfully logged in!")
        return res.redirect('menu.html');
    }
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('clientRegistration.html');
}).listen(3000)


console.log("server listening at port 3000");
