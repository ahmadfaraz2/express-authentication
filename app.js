require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session"); 
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// ------------------------------------------DATABASE Stuff-------------------------------------------

// connect database
mongoose.connect("mongodb://127.0.0.1:27017/userDB")
    .then(() => {console.log("Database Connected....")})
    .catch((e) => {console.log(e)});


// Create a Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

userSchema.plugin(passportLocalMongoose);


// Register a model/Collection
const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
    

});


app.post("/login", (req, res) => {
    
});




app.listen(3000, function(){
    console.log("Sever started on port 3000");
});