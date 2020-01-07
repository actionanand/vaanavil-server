const request = require('request');

const forecast = (lat, lng, tempUnit='ca', callback) => {
    const url = `https://api.darksky.net/forecast/c5f2c915e55c4a57ecb2387f527a0716/${lat},${lng}?units=${tempUnit}`;
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the Vaanilai server', undefined);
        } else if (body.error) {
            callback('Unable to find the location, please try different location!', undefined);
        } else {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const now = body.currently;
            const today = body.daily.data[0];

            summary = today.summary;
            currentTemp = now.temperature;
            rain = +now.precipProbability*100;
            sunRise = new Date(today.sunriseTime*1000).toLocaleTimeString('en-US', {timeZone: body.timezone});
            sunSet = new Date(today.sunsetTime*1000).toLocaleTimeString('en-US', {timeZone: body.timezone});
            // console.log(body.timezone);

            if(tempUnit == 'ca') {
                deg = '\xB0C';
                speed = `km/h`;
                dist = 'km';
            } else {
                deg = '\xB0F';
                speed = `m/h`;
                dist = 'miles'
            }

            forecastInfo = {
                tempInfo: `Feels like ${currentTemp} ${deg}, High: ${today.temperatureHigh} ${deg} Low: ${today.temperatureLow} ${deg}`,
                currentTemp: `${currentTemp} ${deg} ${now.summary}`,
                summary,
                solarInfo: `Sun rise: ${sunRise} | Sun set: ${sunSet}`,
                rain: `There is ${rain}% posibility for rain.`,
                time: `${new Date(now.time*1000).toLocaleTimeString('en-US', {timeZone: body.timezone})} ${new Date(now.time*1000).toLocaleDateString("en-US", {timeZone: body.timezone}, options)}`,
                otherInfo: `Humidity: ${Math.round(now.humidity*100)} %, Dew point: ${now.dewPoint} ${deg}, Pressure: ${now.pressure} hPa, Wind speed: ${now.windSpeed} ${speed}, UV Index: ${now.uvIndex}, Visibility: ${Math.round(now.visibility)} ${dist}`
            }
            
            callback(undefined, forecastInfo);
        }
    });
}

module.exports = forecast
