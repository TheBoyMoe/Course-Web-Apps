### Password hashing with Bcrypt

 * Bcrypt is a library used for encrypting or hashing passwords.
 * based on the Blowfish Cipher- widely recognised as a secure one-way hashing algorithm.
 * with one-way encryption, hashing, the password is not meant to be decrypted. The hashed password is saved on the server. When a user tries to authenticate the password is hashed and the two hashes compared. Hashing on it's own is not secure since it opens you up to dictionary attacks. To prevent dictionary attacks a salt, or random series or characters, is added to the password before hashing
 
 * Mongoose includes certain functions that can be run either before or after (pre/post hooks) certain events occur, e.g 
    * init - when a ducument is initialized
    * validate - when a document is validated
    * save - when a document is saved
    * when a document is removed
    
 * we can use these features to hash the users password and save it the the user to the database.
 * pre- and post- save hooks are not executed on update(), findOneAndUpdate(), and other update methods. When we need to update a user's password, we need to find first find the actual document, modify the document and then call save() to trigger the pre-save hook to save the updated password.
 
### Cookies and Sessions
 * once you're storing hashed passwords, you need some way to remember that a user has logged in. Since the web is stateless we need some way of remembering across multiple sessions that a user has successfully authenticated.
 * one way is to use cookies & sessions, another is through the use of JSON Web Tokens
 * cookies - small text files sent from the server and saved in the user's browser. You can set and read cookies using the cookie-parser npm package.
 * session - the client state can be persisted between requests using a session object, which can be used to store info such as the userId. The session object can be requested from anywhere in the request-response cycle.
 * two different npm packages are commonly used for storing sessions:
    * express-session - session object stored in memory, lost if the service is re-started - user has to login again.
    * cookie-session - stores the session obj in memory, and sets a cookie in the client browser in case the session is destroyed - the cookie can be used to restore the session again if it has not expired. the cookie-session package gives us access to the session on the request object.
    * to ensure authentication on each request we need some middleware which will intercept each request and check if there is some some info saved in the session (put there when logging in). If not the user is re-directed to the login page, otherwise we allow the request to continue.
    
### Authentication
 * once a user has logged in information, e.g user_id, is placed in the session object. All we need to do is check it using middleware and verify if the user is logged in or not.
    
```javascript
    app.use(function(req, res, next){
        // if there is no value for the key of user_id in the session (null if we logged out or undefined if it has not been created yet)
        if(!req.session.user_id){
            res.redirect('/users/login');
        } else {
            next();
        }
    })
```
    
 * the problem with the above code is that it's executed for every route, certain pages such as about, contact etc should be available to everyone. To accommodate this, place the session checking code in a function and only use it on routes that need to be protected.

```javascript
    function loginRequired(req, res, next){
        if(!req.session.user_id){
            res.redirect('/users/login');
        } else {
            next();
        }
    }
    
    // now we can add that middleware....in the middle!
    app.get('/welcome', loginRequired, function(req, res, next){
        res.send('You are logged in!');
    })
```     

### Authorisation
 * Just because you can login does not mean you should be able to access every page , e.g. another use's profile page or be able to delete another user's blog posts. To ensure that only certain users are authorised to access certain routes or perform certain actions we can use middleware, e.g.
 
```javascript
    function ensureCorrectUser(req, res, next){
        if(req.params.user_id !== req.session.user_id){
            req.flash('Not Authorized');
            res.redirect(`/users/${req.session.user_id}/posts`);
        } else {
            next();
        }
    }
    
    app.delete('/users/:user_id/post', loginRequired, ensureCorrectUser, function(req, res, next){
        res.send('A post was just deleted!');
    })

``` 
 * flash messages allow us to store messages in the session object, and a so available across multiple requests - we need to set up some session storage before using flash messages - use the connect-flash package.

 