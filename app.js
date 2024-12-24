require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


// ------------------------------------------DATABASE Stuff-------------------------------------------

// connect database
mongoose.connect("mongodb://localhost:27017/userDB")
    .then(() => {console.log("Database Connected....")})
    .catch((e) => {console.log(e)});


// Create a Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});


// Register a model/Collection
const User = mongoose.model("User", userSchema);

// -------------------------------------------------------------------------------------------------------



app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", function(req, res){
    const email = req.body.username;
    const password = md5(req.body.password);

    const newUser = User({
        email: email,
        password: password
    });

    newUser.save().then(
        ()=> {
            console.log("User registered Successfully...");
            res.render("secrets");
        } 
    ).catch( (err)=>{console.log(err)} );

});


app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = md5(req.body.password);

    User.findOne({email: username}).then( (foundUser) => {
        if (foundUser.password === password){
            console.log("User authenticated Successfully....");
            res.render("secrets");
        }
    } ).catch( (err) => {
        console.log(err);
    } )

});




app.listen(3000, function(){
    console.log("Sever started on port 3000");
});