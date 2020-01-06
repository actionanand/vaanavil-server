const request = require('request');

const aqi = (lat, lng, callback) => {
    const apiUrl = `https://api.ambeedata.com/latest/by-lat-lng?lat=${lat}&lng=${lng}&limit=1`;
    let options = {
        url: apiUrl,json: true,
        headers: {
          'accept': 'application/json',
          'x-api-key': 'CWzChXCMdS8EMC5sNNaTmavCLy6e9Nw073VqKBNb'
        }
      };

      request(options, (error, {body}) => {
        
        if(error) {
            callback('Unable to connect to the Vaanilai server', undefined);
        } else if(body.data.length < 1){
            callback('No info found! Please try other location', undefined)
        } else {
            const info = body.data[0];
            const indicator = JSON.parse(info.aqiInfo);
            callback(undefined, {
                aqi: `Air Quality Index(AQI) is ${info.AQI}.`,
                summary: ` It's ${indicator.category}.`,
                place: `Your place is ${info.distance.toFixed(3)} km away from the Nearest place: ${info.placeName}, ${info.city}, ${info.state} ${info.postalCode}, ${info.division}`,
                otherAqi: `Various AQIs:- PM10: ${info.PM10}, PM2.5: ${info.PM25}, CO: ${info.CO}, SO2: ${info.SO2}, NOX: ${info.NOX}`
            });
        }
        
    });
}

module.exports = aqi