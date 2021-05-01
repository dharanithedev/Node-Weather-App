const request = require('request');

// Getting Weather details
const forecastWeather = (latitude, longitude, callback) => {
    // Getting URl from `Dark Sky`
    const url = 'https://api.darksky.net/forecast/796c0f682d18872967827384c862bc9e/'+latitude+','+longitude+'?unit=si';

    // HTTP request -> Dark Sky
    request( {url , json : true} ,(error,{ body })=>{
        if (error){
            callback('Unable to connect with weather service!' , undefined);
        }
        else if(body.error){
            callback('Unable to find the location.', undefined);
        }
        else {
            //const data = 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + ' chance of rain.'
            callback(undefined, body);
        }
    });
};


module.exports = forecastWeather;