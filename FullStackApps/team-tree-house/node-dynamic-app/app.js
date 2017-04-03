// problem: need a simple way to display the user's badge count and javascript score in a web page
// solution: Use node to fetch the user's profile info and server our template files via http

/*
	1. create a web server
	
	2. handle http route GET / and POST / i.e Home
		if url == '/' && GET => show search
		if url == '/' && POST => redirect to /:username
		
	3. handle http route GET /:username, ie home/[username]
		if url == '/.....' => get json from treehouse
			on 'end' => show profile
			on 'error' => show error message
			
	4. function that handles the reading of files and merge in value
		read from file and get a string
		merge values into string
		
*/
