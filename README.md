## Authentication Level 6

### Previous Problem

In the previous level (auth-level-5), we addressed password hashing and salting using `bcrypt` to secure user passwords. While this enhanced security, it still required users to manage passwords. Managing passwords can be inconvenient for users and risky for applications, as any exposure of the encryption key can compromise all encrypted data.

### Solution

To further enhance security and improve user convenience, we integrate OAuth 2.0 for user authentication using Google. This approach allows users to log in with their Google accounts, eliminating the need to handle passwords directly.

### Implementation

We use `passport.js` with the `passport-google-oauth20` strategy, along with `express-session` for session management. The following steps outline the integration:

#### Steps:

1. **Install Required Packages**:
   ```bash
   npm install express-session passport passport-local-mongoose passport-google-oauth20 mongoose-findorcreate
   ```

2. **Configure Passport and Sessions**:
   ```javascript
   const session = require("express-session");
   const passport = require("passport");
   const passportLocalMongoose = require("passport-local-mongoose");
   const GoogleStrategy = require('passport-google-oauth20').Strategy;
   const findOrCreate = require('mongoose-findorcreate');

   passport.use(User.createStrategy());

   passport.serializeUser(function (user, cb) {
       process.nextTick(function () {
           return cb(null, {
               id: user.id,
               username: user.username,
               picture: user.picture
           });
       });
   });

   passport.deserializeUser(function (user, cb) {
       process.nextTick(function () {
           return cb(null, user);
       });
   });

   passport.use(new GoogleStrategy({
       clientID: process.env.CLIENT_ID,
       clientSecret: process.env.CLIENT_SECRET,
       callbackURL: "http://localhost:3000/auth/google/secrets",
       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
   },
   function (accessToken, refreshToken, profile, cb) {
       console.log(profile);
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
           return cb(err, user);
       });
   }
   ));

   app.get("/auth/google",
       passport.authenticate("google", { scope: ["profile"] })
   );

   app.get('/auth/google/secrets',
       passport.authenticate('google', { failureRedirect: '/login' }),
       function (req, res) {
           // Successful authentication, redirect to secrets.
           res.redirect('/secrets');
       });
   ```

3. **Setup Environment Variables**:
   Ensure that your `CLIENT_ID` and `CLIENT_SECRET` from Google Developer Console are stored in your `.env` file.

   ```env
   CLIENT_ID=your_google_client_id
   CLIENT_SECRET=your_google_client_secret
   ```

4. **Use findOrCreate Plugin in Mongoose**:
   ```javascript
   const userSchema = new mongoose.Schema({
       username: String,
       googleId: String,
       picture: String
   });

   userSchema.plugin(passportLocalMongoose);
   userSchema.plugin(findOrCreate);

   const User = mongoose.model("User", userSchema);
   ```

5. **Google Cloud Console Setup**:
   - **Create a New Project**:
     - Go to the [Google Cloud Console](https://console.cloud.google.com/).
     - Click on the project dropdown at the top and select "New Project".
     - Name your project and click "Create".
   - **Enable the Google+ API**:
     - In the left sidebar, navigate to "APIs & Services" > "Library".
     - Search for "Google+ API" and click "Enable".
   - **Create OAuth Credentials**:
     - Navigate to "APIs & Services" > "Credentials".
     - Click "Create Credentials" and select "OAuth 2.0 Client IDs".
     - Configure the consent screen, then select "Web application".
     - Add `http://localhost:3000` to the "Authorized JavaScript origins".
     - Add `http://localhost:3000/auth/google/secrets` to the "Authorized redirect URIs".
     - Click "Create" and note the `CLIENT_ID` and `CLIENT_SECRET` values.

#### Benefits:

- **Improved Security**: By leveraging OAuth 2.0, passwords are not directly handled, reducing the risk of password-related vulnerabilities.
- **User Convenience**: Users can log in using their existing Google accounts, enhancing user experience.
- **Scalability**: OAuth 2.0 allows easy integration with other third-party services in the future.

**Branch**:  
[Level 6: OAuth with Google](https://github.com/ahmadfaraz2/express-authentication/tree/auth-level-6)

---

Each level's implementation can be found in its respective branch. Start with the main branch for the initial setup and switch to the corresponding branch for each level to see the changes and improvements made.
