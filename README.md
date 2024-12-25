# Authentication Level 4

## Previous Problem

In **Authentication Level 3**, we used **hashing** with the `md5` package to secure user **passwords**. However, this approach had a vulnerability: **MD5** is considered outdated and susceptible to **collision attacks**, making it less secure for password storage.

## Solution

To address this vulnerability, we use **hashing** with the `bcrypt` package. `bcrypt` incorporates salting and is designed to be computationally expensive to deter brute-force attacks, making it a more secure option for password storage.

### Implementation Steps:

1. **Install the `bcrypt` Package**:
   ```bash
   npm install bcrypt
   ```

2. **Update the User Schema**:
   Define the user schema without encryption:
   ```javascript
   const mongoose = require('mongoose');
   const bcrypt = require('bcrypt');
   const saltRounds = 10;

   const userSchema = new mongoose.Schema({
     email: String,
     password: String
   });

   const User = mongoose.model('User', userSchema);
   ```

3. **User Registration and Login Routes**:
   Implement the registration and login routes with password hashing using `bcrypt`:
   ```javascript
   const express = require('express');
   const bodyParser = require('body-parser');
   const mongoose = require('mongoose');
   const bcrypt = require('bcrypt');

   const app = express();
   const saltRounds = 10;

   app.use(bodyParser.urlencoded({ extended: true }));

   // Connect to MongoDB
   mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });

   // User schema and model configuration
   const userSchema = new mongoose.Schema({
     email: String,
     password: String
   });

   const User = mongoose.model('User', userSchema);

   // Registration route
   app.post("/register", (req, res) => {
       const email = req.body.username;
       const plainPassword = req.body.password;

       bcrypt.hash(plainPassword, saltRounds)
       .then((hash) => {
           const newUser = new User({
               email: email,
               password: hash,
           });

           return newUser.save();
       })
       .then(() => {
           console.log("User registered successfully...");
           res.render("secrets");
       })
       .catch((err) => {
           console.log(err);
       });
   });

   // Login route
   app.post("/login", (req, res) => {
       const username = req.body.username;
       const plainPassword = req.body.password;

       User.findOne({ email: username })
       .then((foundUser) => {
           if (foundUser) {
               bcrypt.compare(plainPassword, foundUser.password)
               .then((result) => {
                   if (result === true) {
                       console.log("User authenticated successfully...");
                       res.render("secrets");
                   } else {
                       console.log("Password mismatch");
                       res.send("Invalid username or password");
                   }
               })
               .catch((err) => {
                   console.log(err);
               });
           } else {
               console.log("User not found");
               res.send("Invalid username or password");
           }
       })
       .catch((err) => {
           console.log(err);
       });
   });

   // Start the server
   app.listen(3000, () => {
       console.log('Server started on port 3000');
   });
   ```

### How It Works

1. **Hashing and Salting Passwords**: The `bcrypt` package hashes and salts the password before it is saved to the database during user registration.
2. **Authentication**: During login, the password provided by the user is hashed and compared with the hashed password stored in the database.

### Benefits

- **Irreversible Hashing**: Hashing with `bcrypt` ensures that passwords cannot be retrieved from the hash.
- **Salting**: Adding a unique salt to each password before hashing makes it more resistant to dictionary and rainbow table attacks.
- **Increased Security**: `bcrypt` is computationally expensive, making it difficult for attackers to perform brute-force attacks.

### Branch

You can find the implementation for this level in the `auth-level-4` branch.

**Branch Link**: [Level 4: Hashing and Salting Passwords with bcrypt](https://github.com/ahmadfaraz2/express-authentication/tree/auth-level-4)

.