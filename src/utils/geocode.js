const request = require('request');

const geoCode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWN0aW9uYW5hbmQiLCJhIjoiY2s0cjJpd3lzMnY3YjNpcXNoN3oxb3FkdSJ9.og2LkkH0n_sVx1XllTEfjw&limit=1';
    request({url: geoUrl, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to the Vaanilai server', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find the location, please try different location!', undefined);
        } else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                lng: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geoCode