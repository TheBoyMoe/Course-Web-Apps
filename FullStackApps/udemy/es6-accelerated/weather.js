'use strict';
import * as ELEMENTS from './elements.js';
import {API_KEY} from './apikey.js';
import {Http} from './http.js';

// weather functions

const searchWeather = ()=>{
    const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim();
    if(CITY_NAME.length === 0)
        return alert('Please enter a city name');
    ELEMENTS.ELEMENT_SEARCHED_CITY.value = '';
    // console.log(CITY_NAME);
    
    // fetch the weather data from OpenWeather.org using promises
    const URL = `api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=metric&appid=${API_KEY}`;
    Http.fetchData(URL)
        .then((responseData)=>{
    
        })
        .catch((err)=>console.error(err));
};

export {
    searchWeather
}