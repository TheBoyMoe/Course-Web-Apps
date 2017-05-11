### app routes
Since we now have two resources, pets and owners and pets are dependent on owners (we can't have a pet without an owner), we need to nest or place our pets routes inside of owners. Here is what the RESTful routes for each resource will look like:

#### Owners
GET	    /owners	            Show all owners
GET	    /owners/new	        Show a form for creating a new owner
GET	    /owners/:id	        Show a single owner
GET	    /owners/:id/edit    Show a form for editing a owner
POST	/owners	            Create a owner when a form is submitted
PATCH	/owners/:id	        Edit a owner when a form is submitted
DELETE	/owners/:id	        Delete a owner when a form is submitted

#### Pets
GET	    /owners/:owner_id/pets	            Show all pets for an owner
GET	    /owners/:owner_id/pets/new	        Show a form for creating a new pet for an owner
GET	    /owners/:owner_id/pets/:id	        Show a single pet for an owner
GET	    /owners/:owner_id/pets/:id/edit	    Show a form for editing an owner's pet
POST	/owners/:owner_id/pets	            Create a pet for an owner when a form is submitted
PATCH	/owners/:owner_id/pets/:id	        Edit an owner's pet when a form is submitted
DELETE	/owners/:owner_id/pets/:id	        Delete an owner's pet when a form is submitted
