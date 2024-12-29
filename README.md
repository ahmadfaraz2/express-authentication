Here's the updated README file for **Auth Level 5** that includes the code you are using for registration:

---

## Authentication Level 5

### Previous Problem

In **Auth Level 4**, we improved security by using bcrypt for password hashing and salting. However, we stored the passwords directly in our database after hashing. Although this approach is secure, we can further enhance our application's security by implementing session management to ensure that user sessions are properly handled and protected.

### Solution

In **Auth Level 5**, we introduce session management using `express-session` and `passport.js`. This will help us manage user sessions securely, making sure that user data is protected during their interactions with the application.

#### Implementation Steps:

1. **Install Required Packages**:
   ```bash
   npm install express-session passport passport-local-mongoose
   ```

2. **Configure Session Management**:
   ```javascript
   const session = require("express-session");
   const passport = require("passport");
   const passportLocalMongoose = require("passport-local-mongoose");

   app.use(session({
       secret: "OurLittleSecret.",
       resave: false,
       saveUninitialized: false
   }));

   app.use(passport.initialize());
   app.use(passport.session());

   userSchema.plugin(passportLocalMongoose);

   const User = mongoose.model("User", userSchema);

   passport.use(User.createStrategy());

   passport.serializeUser(User.serializeUser());
   passport.deserializeUser(User.deserializeUser());
   ```

3. **Update Registration Route**:
   ```javascript
   app.post("/register", function(req, res) {
       User.register({username: req.body.username}, req.body.password, function(err, user) {
           if (err) {
               console.log(err);
               res.redirect("/login");
           } else {
               passport.authenticate("local")(req, res, function() {
                   res.redirect("/secrets");
               });
           }
       });
   });
   ```

4. **Update Login Route**:
   ```javascript
   app.post("/login", function(req, res) {
       const user = new User({
           username: req.body.username,
           password: req.body.password
       });

       req.login(user, function(err) {
           if (err) {
               console.log(err);
               return res.redirect("/login");
           }
           passport.authenticate("local")(req, res, function() {
               res.redirect("/secrets");
           });
       });
   });
   ```

5. **Update Logout Route**:
   ```javascript
   app.get("/logout", function(req, res) {
       req.logout(function(err) {
           if (err) {
               return next(err);
           }
           res.redirect("/");
       });
   });
   ```

#### Benefits:

- **Enhanced Security**: By managing user sessions, we ensure that user data is protected during interactions with the application.
- **User Experience**: Users can log in and out smoothly, with their sessions managed securely.
- **Scalability**: This approach provides a scalable solution for managing user authentication in more complex applications.

**Branch**:  
[Level 5: Session Management](https://github.com/ahmadfaraz2/express-authentication/tree/auth-level-5)

---

Each level's implementation can be found in its respective branch. Start with the main branch for the initial setup and switch to the corresponding branch for each level to see the changes and improvements made.
