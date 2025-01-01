Here's the README file for the main branch, including the problems and solutions of each authentication level (1 to 5) with their respective branch links:

---

# Authentication Practice Repository

This repository is designed to practice different levels of authentication in an Express application. Each level builds upon the previous one to enhance security and functionality.

## Levels of Authentication

### Level 1: Registering Users with Email and Password

**Problem**:  
User **passwords** are stored in **plain text**, posing a significant **security risk**. Any **employee** with database access or a **hacker** who breaches the server could easily read the passwords.

**Solution**:  
Implement basic user registration where users can sign up with their email and password, which are then saved to the database.

**Branch**:  
[Level 1: Registering Users](https://github.com/ahmadfaraz2/express-authentication/tree/auth-level-1)

---

### Level 2: Database Encryption

**Previous Problem**:  
User **passwords** were stored in **plain text**, posing a significant **security risk**.

**Solution**:  
To secure passwords, we use the `mongoose-encryption` package to encrypt passwords before saving them to the database.

**Steps**:
1. Install and configure the `mongoose-encryption` package.
2. Use environment variables to store the encryption key.
3. Encrypt the password field in the user schema.

**Branch**:  
[Level 2: Database Encryption](https://github.com/ahmadfaraz2/express-authentication/tree/auth-level-2)

---

### Level 3: Hashing Passwords

**Previous Problem**:  
Encryption can be **vulnerable** if someone knows our encryption key (secret), they can **decrypt** it easily.

**Solution**:  
Use hashing which is **irreversible** to secure passwords with the `md5` package.

**Steps**:
1. Install and configure the `md5` package.
2. Hash the password before saving it to the database.

**Branch**:  
[Level 3: Hashing Passwords](https://github.com/ahmadfaraz2/express-authentication/tree/auth-level-3)

---

### Level 4: Hashing and Salting with bcrypt

**Previous Problem**:  
Using `md5` for hashing is not secure as it is vulnerable to **rainbow table attacks**.

**Solution**:  
Enhance security by using `bcrypt` for hashing and salting passwords.

**Steps**:
1. Install and configure the `bcrypt` package.
2. Hash and salt the password before saving it to the database.

**Branch**:  
[Level 4: Hashing and Salting with bcrypt](https://github.com/ahmadfaraz2/express-authentication/tree/auth-level-4)

---

### Level 5: Session Management

**Previous Problem**:  
Although bcrypt is secure, there is a need to manage user sessions properly to ensure data protection during interactions.

**Solution**:  
Implement session management using `express-session` and `passport.js`.

**Steps**:
1. Install and configure `express-session` and `passport`.
2. Update registration and login routes to use `passport`.
3. Manage user sessions securely.

**Branch**:  
[Level 5: Session Management](https://github.com/ahmadfaraz2/express-authentication/tree/auth-level-5)

---

### Level 6: OAuth with Google

**Previous Problem**:  
Managing passwords can be inconvenient for users and risky for applications, as any exposure of the encryption key can compromise all encrypted data.

**Solution**:  
To further enhance security and improve user convenience, we integrate OAuth 2.0 for user authentication using Google. This approach allows users to log in with their Google accounts, eliminating the need to handle passwords directly.

**Steps**:
1. Install and configure the `passport-google-oauth20` package.
2. Set up Google credentials in the Google Cloud Console.
3. Configure Passport to use Google OAuth for authentication.

**Setting up Google Cloud Console**:
1. **Create a New Project**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Click on the project dropdown at the top and select "New Project".
   - Name your project and click "Create".
2. **Enable the Google+ API**:
   - In the left sidebar, navigate to "APIs & Services" > "Library".
   - Search for "Google+ API" and click "Enable".
3. **Create OAuth Credentials**:
   - Navigate to "APIs & Services" > "Credentials".
   - Click "Create Credentials" and select "OAuth 2.0 Client IDs".
   - Configure the consent screen, then select "Web application".
   - Add `http://localhost:3000` to the "Authorized JavaScript origins".
   - Add `http://localhost:3000/auth/google/secrets` to the "Authorized redirect URIs".
   - Click "Create" and note the `CLIENT_ID` and `CLIENT_SECRET` values.

**Branch**:  
[Level 6: OAuth with Google](https://github.com/ahmadfaraz2/express-authentication/tree/auth-level-6)

---

Each level's implementation can be found in its respective branch. Start with the main branch for the initial setup and switch to the corresponding branch for each level to see the changes and improvements made.

---