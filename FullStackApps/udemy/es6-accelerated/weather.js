'use strict';
import * as ELEMENTS from './elements.js';
import {API_KEY} from './apikey.js';
import {Http} from './http.js';
import {WeatherData, WEATHER_PROXY_HANDLER} from './weather-data.js';

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
            const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUpperCase());
            const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
            WEATHER_PROXY.temperature = responseData.main.temp;
        })
        .catch((err)=>console.error(err));
};

const updateWeather = (weatherData)=>{

};

export {
    searchWeather
}