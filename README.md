# Authentication Level 3

## Previous Problem

In **Authentication Level 2**, we used **encryption** to secure user **passwords** with the `mongoose-encryption` package. However, this approach had a vulnerability: if someone discovered our **encryption key (secret)**, they could easily decrypt the passwords.

## Solution

To address this vulnerability, we use **hashing** with the `md5` package. Hashing is a one-way process that converts a password into a fixed-size string of characters, which is irreversible and therefore provides better security.

### Implementation Steps:

1. **Install the `md5` Package**:
   ```bash
   npm install md5
   ```

2. **Update the User Schema**:
   Define the user schema without encryption:
   ```javascript
   const mongoose = require('mongoose');
   const md5 = require('md5');

   const userSchema = new mongoose.Schema({
     email: String,
     password: String
   });

   const User = mongoose.model('User', userSchema);
   ```

3. **User Registration and Login Routes**:
   Implement the registration and login routes with password hashing:
   ```javascript
   const express = require('express');
   const bodyParser = require('body-parser');
   const mongoose = require('mongoose');
   const md5 = require('md5');

   const app = express();

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
       const password = md5(req.body.password);

       const newUser = new User({
           email: email,
           password: password
       });

       newUser.save().then(
           () => {
               console.log("User registered successfully...");
               res.render("secrets");
           }
       ).catch((err) => {
           console.log(err);
       });
   });

   // Login route
   app.post("/login", (req, res) => {
       const username = req.body.username;
       const password = md5(req.body.password);

       User.findOne({ email: username }).then((foundUser) => {
           if (foundUser.password === password) {
               console.log("User authenticated successfully...");
               res.render("secrets");
           }
       }).catch((err) => {
           console.log(err);
       });
   });

   // Start the server
   app.listen(3000, () => {
       console.log('Server started on port 3000');
   });
   ```

### How It Works

1. **Hashing Passwords**: The `md5` package hashes the password before it is saved to the database during user registration.
2. **Authentication**: During login, the password provided by the user is hashed and compared with the hashed password stored in the database.

### Benefits

- **Irreversible Hashing**: Hashing is a one-way function, making it impossible to retrieve the original password from the hash.
- **Increased Security**: Prevents attackers from decrypting passwords even if they gain access to the database.

### Branch

You can find the implementation for this level in the `auth-level-3` branch.

**Branch Link**: [Level 3: Hashing Passwords](https://github.com/yourusername/yourrepository/tree/auth-level-3)

---

Replace `yourusername` and `yourrepository` with your actual GitHub username and repository name. This README provides a clear and concise guide for implementing password hashing using the `md5` package in the `auth-level-3` branch.
