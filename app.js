const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { default: mongoose } = require("mongoose");

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
    newUser = new User({
        email: req.body.username,
        password: req.body.password,
    })

    newUser.save().then(
        ()=> {
            res.render("secrets");
        } 
    ).catch( (err)=>{console.log(err)} );

});

app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}).then( (foundUser) => {
        if (foundUser.password === password){
            console.log("User authenticated successfully....");
            res.render("secrets");
        }
    }).catch( (err) => { console.log(err)} );

});





app.listen(3000, function(){
    console.log("Sever started on port 3000");
});