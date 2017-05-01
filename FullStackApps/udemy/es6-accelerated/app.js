'use strict';
import * as ELEMENTS from './elements.js';
import * as weather from './weather.js';

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', weather.searchWeather);