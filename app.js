const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

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

const secret = "Thisisourlittlesecret.";
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]}); 

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
    const password = req.body.password;

    const newUser = User({
        email: email,
        password: password
    });

    newUser.save().then(()=>{
        res.render("secrets");
    }).catch((err)=>{console.log(err)});
});





app.listen(3000, function(){
    console.log("Sever started on port 3000");
});