### Create
 
````javascript
      // invoke the constructor 
      var elie = new Instructor({firstName: 'Elie' });
      // call .save on the object created from the constructor (which is the model)
      elie.save().then(function(){
          console.log('saved!');
      }, function(err){
          console.log('Error saving!', err);
      })
```` 
 
````javascript  
    // invoke the create method directly on the model
    Instructor.create({firstName: 'Elie'}).then(function(instructor){
      console.log('saved!');
    }, function(err){
      console.log('Error creating!');
    })
````  

````javascript  
  Instructor.create({firstName: 'Elie'})
    .then((instructor)=>{
        console.log('saved!');
    })
    .catch((err)=> {
        console.log(err.message);
    });
````


### Read
 * there are a number of ways of querying mongoose
 
```javascript
     // finding multiple records
     Instructor.find({}).then(function(instructors){
         console.log(instructors);
     }, function(err){
         console.log('error!', err);
     })
````
 
```javascript
     // finding a single record
     Instructor.findOne({firstName: 'Elie'}).then(function(data){
         console.log(data)
     }, function(err){
         console.log('error!', err);
     })
````
 
```javascript
     // finding by id - this is very useful with req.params!
     Instructor.findById(2).then(function(data){
         console.log(data)
     }, function(err){
         console.log('error!', err);
     })
````
 
```javascript
     // Using queries to find a particular document 
     var query = Person.findOne({ 'name.first': 'Elie' });
     
     // selecting the `name` and `occupation` fields
     query.select('name occupation');
     
     // execute the query at a later time
     query.exec().then(function(person) {
         console.log(person);
     }, function(err){
         console.log("ERROR!");
     })
````

### Update
````javascript
    // update one record - updateMany() version 
    Instructor.update({firstName:'Elie'}, {firstName:'Bob'}).then(function(data){
        console.log(data);
    }, function(err){
        console.log('error!', err);
    });

````

````javascript
    // update a single record
    Instructor.findOneAndUpdate({firstName:'Elie'}, {firstName:'Bob'}).then(function(data){
        console.log(data);
    }, function(err){
        console.log('error!', err);
    });

````

````javascript
    // update a single record and find by id (very useful with req.params!)
    Instructor.findByIdAndUpdate(1, {firstName:'Bob'}).then(function(data){
        console.log(data);
    }, function(err){
        console.log('error!', err);
    });

````

### Delete

````javascript
    // remove multiple records
    Instructor.remove({firstName:'Elie'}, {firstName:'Bob'}).then(function(data){
        console.log(data);
    }, function(err){
        console.log('error!', err);
    });

````

````javascript
     // find and remove
     Instructor.findOneAndRemove({firstName:'Elie'}).then(function(data){
         console.log(data);
     }, function(err){
         console.log('error!', err);
     });   

````

````javascript
    // find by id and remove (very useful with req.params)
    Instructor.findByIdAndRemove(1).then(function(data){
        console.log(data);
    }, function(err){
        console.log('error!', err);
    });

````

#### References
[Mongoose Queries](http://mongoosejs.com/docs/queries.html)
[update](http://mongoosejs.com/docs/api.html#model_Model.update)
[updateMany](http://mongoosejs.com/docs/api.html#model_Model.updateMany)
[findOneAndRemove](http://mongoosejs.com/docs/api.html#model_Model.findOneAndRemove)
[findByIdAndRemove](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove)