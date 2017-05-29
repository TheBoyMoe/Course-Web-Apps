/*
	References:
	[1] https://davidwalsh.name/promises
	[2] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

 */

"use strict";
function getJson(url) {
	return new Promise(function(resolve, reject){
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onreadystatechange = handleResponse;
		xhr.onerror = function (err) {
			reject(err);
		};
		xhr.send();
		
		function handleResponse() {
			if(xhr.readyState === 4) {
				if (xhr.status === 200) {
					let employees = JSON.parse(xhr.responseText);
					resolve(employees);
				} else {
					reject(this.statusText);
				}
			}
		}
		
	})
}

const ajaxPromise = getJson('../data/employees.json');

// var xhr = new XMLHttpRequest();
// xhr.open('GET', '../data/employees.json');
// xhr.onreadystatechange = handleResponse;
// xhr.send();
//
// function handleResponse() {
//   if(xhr.readyState === 4 && xhr.status === 200) {
//     var employees = JSON.parse(xhr.responseText);
//     addEmployeesToPage(employees)
//   }
// };

function generatListItems(employees)  {
    let statusHTML = '';
    for (let i=0; i<employees.length; i += 1) {
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

// function addEmployeesToPage(employees) {
//     document.getElementById('employeeList').innerHTML =
// 		generateUnorderedList(generatListItems(employees));
// }

function addEmployeesToPage(unorderedList) {
	document.getElementById('employeeList').innerHTML = unorderedList;
}


ajaxPromise.then(generatListItems)
			.then(generateUnorderedList)
			.then(addEmployeesToPage)
			.catch(console.error);