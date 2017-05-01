'use strict';

export class Http {
    static fetchData(url){ // static method
        return new Promise((resolve, reject)=>{
            const HTTP = new  XMLHttpRequest();
            HTTP.open('GET', url);
            HTTP.onreadystatechange = ()=>{
                if(HTTP.readyState === XMLHttpRequest.DONE && HTTP.status === 200){
                    // parse the received json string into js obj
                    const RESPONSE_DATA = JSON.parse(HTTP.responseText);
                    resolve(RESPONSE_DATA);
                } else if(HTTP.readyState === XMLHttpRequest.DONE){
                    reject('Error retrieving weather data');
                }
            };
            HTTP.send(); // execute the request
        });
    }
}