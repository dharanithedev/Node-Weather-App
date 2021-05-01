const request = require('request');

// MapBox - dharanimap-box123
const getGeoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiZGhhcmFuaW1hcC1ib3gxMjMiLCJhIjoiY2s3ZGxjOXZtMGFxbDNrbnk4MTlpcmo1eCJ9.fLPPNfCOjCesDmCLZPygPg&limit=1';
    // Hit HTTP request
    request( {url , json : true} , (error,{body})=>{
        if (error){
            callback('Unable to connect with weather services!', undefined);
        }
        else if(body.features.length === 0){
            callback('Unable to find the location. Try another search.', undefined);
        }
        else
        {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            });
        }
    });
}

module.exports = getGeoCode;