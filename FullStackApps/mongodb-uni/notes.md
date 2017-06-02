### Mongo shell commands

Start the mongod service:

```text
   $ sudo service mongod start
```

to access the shell enter:

```text
    $ mongo
```

The mongo shell is synchronous, meaning it blocks waiting for the query to complete before continuing. Queries (or setting up the connection to the database) using the node js driver for mongodb are asynchronous, i.e. we don't wait for the result. Instead an event is logged and the process continues with other tasks. When the event is complete, e.g a database query, a callback is called into which we pass the result (or error) and carry out any further processing. 

help                            show available commands  
show dbs                        show database names  
show collections                show collections in current dbase  
show users                      show users in current dbase
use video                       switch to video database(if it does not exis create it when inserting first doc)
db.movies.insertOne({...})      insert record in movies collection in video dbase - db holds ref to dbase
db.movies.find()                return all inserted docs in movies collection
db.movies.find().pretty()       format returned docs



#### find()
You can pass query parameters (constraints) to find() - if you don't pass in any constraints, then all docs will match. find() returns a cursor object - the result of which you can assign to a variable and then use next() to iterate over the cursor object