function generatListItems(employees)  {
    var statusHTML = '';
    for (var i=0; i<employees.length; i += 1) {
        if (employees[i].inoffice === true) {
            statusHTML += '<li class="in">';
        } else {
            statusHTML += '<li class="out">';
        }
        statusHTML += employees[i].name;
        statusHTML += '</li>';
    }

    return statusHTML;
}

function generateUnorderedList(listItems) {
    return '<ul class="bulleted">' + listItems +  '</ul>';
}

function addEmployeesToPage(ul) {
    document.getElementById('employeeList').innerHTML = ul;
}

function getJSON(url) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = handleResponse;
            xhr.onerror = function(error) { reject(error); };
            xhr.send();    
            
            function handleResponse() {
                if(this.readyState === this.DONE) 
                    if(this.status === 200) {
                        resolve(JSON.parse(this.responseText));
                    } else {
                        reject(this.statusText);
                    }
            }
            
        });
}


var p = getJSON('../data/employees.json').then(generatListItems)
                                         .then(generateUnorderedList)
                                         .then(addEmployeesToPage).catch(function(e){
                                            console.log(e);
                                         });