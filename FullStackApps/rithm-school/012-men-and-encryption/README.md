## Password hashing with Bcrypt

 * Bcrypt is a library used for encrypting or hashing passwords.
 * based on the Blowfish Cipher- widely recognised as a secure one-way hashing algorithm.
 * with one-way encryption, hashing, the password is not meant to be decrypted. The hashed password is saved on the server. When a user tries to authenticate the password is hashed and the two hashes compared. Hashing on it's own is not secure since it opens you up to dictionary attacks. To prevent dictionary attacks a salt, or random series or characters, is added to the password before hashing
 
 * Mongoose includes certain functions that can be run either before or after (pre/post hooks) certain events occur, e.g 
    * init - when a ducument is initialized
    * validate - when a document is validated
    * save - when a document is saved
    * when a document is removed
 * we can use these features to hash the users password and save it the the user to the database.   