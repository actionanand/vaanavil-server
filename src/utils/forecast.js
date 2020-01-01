const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/c5f2c915e55c4a57ecb2387f527a0716/${lat},${lng}?lang=en`;
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the Vaanilai server', undefined);
        } else if (body.error) {
            callback('Unable to find the location, please try different location!', undefined);
        } else {
            summary = body.daily.data[0].summary;
            currentTemp = body.currently.temperature;
            precipProbability = body.currently.precipProbability;
            forecastInfo = `${summary} Current temperature is ${currentTemp} degree F and there is ${precipProbability} % posibility for rain.`;
            
            callback(undefined, forecastInfo);
        }
    });
}

module.exports = forecast
