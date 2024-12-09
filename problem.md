## Authentication Level 2

### Previous Problem

User **passwords** were stored in **plain text**, posing a significant **security risk**. Any **employee** with database access or a **hacker** who breaches the server could easily read the passwords.

### Solution

To secure passwords, we use the `mongoose-encryption` package to encrypt passwords before saving them to the database.

#### Implementation Steps:

1. **Install the Package**:
   ```bash
   npm install mongoose-encryption
   ```

2. **Configure the Schema**:
   ```javascript
   const mongoose = require('mongoose');
   const encrypt = require('mongoose-encryption');

   const userSchema = new mongoose.Schema({
     email: String,
     password: String
   });

   const secret = "Thisisourlittlesecret.";
   userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

   const User = mongoose.model('User', userSchema);
   ```

3. **Encrypt Passwords**:
   Passwords will now be automatically encrypted before being saved to the database and decrypted when retrieved.

#### Benefits:

- **Enhanced Security**: Ensures passwords are not readable even if the database is compromised.
- **Regulatory Compliance**: Meets data protection regulations requiring secure storage of sensitive information.
