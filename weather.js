'use strict';
//  Problem: We need a way to look at the current weather data based upon the
// user's current location, zip code, and city.
// Solution: Use Node.js to connect to the Open Weather Map's API to obtain
// the information for the current weather.
// Free version of the OpenWeatherMap allows Current Weather API, 5 days/3 hour
// forecast API, and the weather maps API
const EventEmitter = require('events');
const http = require('http');
const util = require('util');

function printWeatherInfo(zip, country, weatherInfo) {
    console.log(weatherInfo);
}
function Weather(zip, country) {
    const OpenWeatherMap = {
        url: 'http://api.openweathermap.org/data/2.5/',
        API_KEY: '&APPID=' + process.env.OpenWeatherMapAPIKey
    }
    // Get the user's current location.
    // Using the coordinates of the user's location, create a get request that will
    // send us back the current weather.

    var req = http.get(OpenWeatherMap.url + 'weather?zip=' + zip + ',' + country + OpenWeatherMap.API_KEY, (res) => {
        var weatherData = '';

        res.on('data', (body) => {
            weatherData += body;
        });

        res.on('end', () => {
            if (res.statusCode === 200) {
                try {
                    var weather = JSON.parse(weatherData);

                    printWeatherInfo(zip, country, weather);
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log('There was an errore getting the weather');
            }
        }).on('error', (error) => {
            console.log (error);
        });
    });
}

module.exports.getWeather = Weather;