# express-authentication
In this I'm implementing different level of authentication using express. I have made many branches to demonstrate it. main branch is started point of anyother branch.


# Authentication Practice Repository

This repository is designed to practice different levels of authentication in an Express application. Each level builds upon the previous one to enhance security and functionality.

## Levels of Authentication

### Level 1: Registering Users with Email and Password

In this level, we implement basic user registration. Users can sign up with their email and password, which are then saved to the database.

**Steps:**
1. Set up a basic Express server.
2. Create a user registration route.
3. Validate the user's email and password.
4. Save the user's email and password to the database.

**Problem:**  
The problem with this approach is that user passwords are stored in plain text. This poses a significant security risk because anyone with access to the database can see the passwords, and if the database is compromised, attackers can easily retrieve and misuse the passwords.

**Solution:**  
Move to Level 2 where we implement database encryption to securely store user passwords.

**Branch:**  
[Level 1: Registering Users](https://github.com/ahmadfaraz2/express-authentication/tree/auth-level-1)

### Level 2: Database Encryption

In this level, we enhance security by encrypting user passwords before saving them to the database.

**Steps:**
1. Install and configure a library for password hashing (e.g., bcrypt).
2. Modify the user registration route to hash the password before saving it to the database.
3. Ensure that the hashed password is saved instead of the plain text password.

**Problem:**  
Storing passwords in plain text is a security risk. Encryption ensures that even if the database is compromised, the passwords are not easily retrievable.

**Solution:**  
Encrypting passwords mitigates the risk of password exposure and enhances the overall security of the application.

**Branch:**  
[Level 2: Database Encryption](https://github.com/ahmadfaraz2/express-authentication/tree/auth-level-2)

---

Each level's implementation can be found in its respective branch. Start with the main branch for the initial setup and switch to the corresponding branch for each level to see the changes and improvements made.
