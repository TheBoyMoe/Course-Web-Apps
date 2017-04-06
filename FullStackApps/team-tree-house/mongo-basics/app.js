/*
	
	References:
	[1] https://github.com/hdngr/treehouse-mongo-basics (git repo)
	[2] https://docs.mongodb.com/master/tutorial/install-mongodb-on-ubuntu (ubuntu install guide)
	[3] http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/ (nodejs setup and quick start)
	[4] https://docs.mongodb.com/manual/
	[5] https://docs.mongodb.com/manual/introduction/
	[6] https://www.mongodb.com/nosql-explained
	[7] https://docs.mongodb.com/manual/reference/sql-comparison/
	[8] https://docs.mongodb.com/master/reference/method/load/
	
	
	Mongo basics:
	1. start the mongo daemon
		$ mongod
		
	2. once the daemon is running, you can start the mongo shell in another cmd tab
		$ mongo
		
	3. to quit the shell and Ctrl + C to stop mongod
		$ quit()
	
	note: you can start mongod as a bkgd service and carry on using the same cmd tab
		$ sudo service mongod start
		
		then start the shell and quit as normal. to stop mongod
		$ sudo service mongod stop
		
		you can check if the mongod service is running using
		$ ps aux OR ps -ef => look for mongod entry (use 'kill -9 [pid]' to kill the service)
		
	4. to create and switch to a database
		$ use [database_name]
		
	5. to insert documents - post creates a collection, insert adds json obj
		$ db.post.insert({.....})
	
	6. to view db collections
		$ show collections
	
	7. to list all records
		$ db.post.find()
	
	 

 */