## Authentication Level 2

### Previous Problem

User **passwords** were stored in **plain text**, posing a significant **security risk**. Any **employee** with database access or a **hacker** who breaches the server could easily read the passwords.

### Solution

To secure passwords, we use the `mongoose-encryption` package to encrypt passwords before saving them to the database. Additionally, we store the encryption secret in a `.env` file for enhanced security.

#### Implementation Steps:

1. **Install the Package**:
   Install the required dependencies:
   ```bash
   npm install mongoose-encryption dotenv
   ```

2. **Configure the `.env` File**:
   Create a `.env` file in the root of your project and store the secret key:
   ```plaintext
   SECRET_KEY=Thisisourlittlesecret
   ```

3. **Update Your Schema to Use the Secret Key**:
   Modify your user schema to use `mongoose-encryption` and the secret key from the `.env` file:
   ```javascript
   require('dotenv').config();
   const mongoose = require('mongoose');
   const encrypt = require('mongoose-encryption');

   const userSchema = new mongoose.Schema({
     email: String,
     password: String
   });

   const secret = process.env.SECRET_KEY;
   userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

   const User = mongoose.model('User', userSchema);
   ```

4. **Encrypt Passwords**:
   Passwords will now be automatically encrypted before being saved to the database and decrypted when retrieved.

#### Benefits:

- **Enhanced Security**: Ensures passwords are not readable even if the database is compromised.
- **Regulatory Compliance**: Meets data protection regulations requiring secure storage of sensitive information.
- **Secure Secret Management**: The secret key is stored in an environment variable, keeping it safe from being exposed in the code.

#### Additional Notes:

- Ensure your `.env` file is added to the `.gitignore` file to prevent it from being committed to version control:
  ```plaintext
  node_modules
  .env
  ```

