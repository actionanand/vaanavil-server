const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anand Raja'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: `About me`,
        name: 'Anand Raja'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: `Help Page`,
        name: 'Anand Raja',
        helpText: 'You can approach us anytime.'
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide the location!'
        });
    }

    geoCode(req.query.address, (error, {lat, lng, location}={}) => {
        if (error) {
            return res.send({error});
        }
console.log(req.url);
        forecast(lat, lng, req.query.units, (error, respData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                tempInfo: forecastInfo.tempInfo,
                currentTemp: forecastInfo.currentTemp,
                summary: forecastInfo.summary,
                solarInfo: forecastInfo.solarInfo,
                rain: forecastInfo.rain,
                time: forecastInfo.time,
                location,
                otherInfo: forecastInfo.otherInfo,
                address: req.query.address
            });
        });
    });
});

// app.get('/help/*', (req, res) => {
//     res.render('404', {
//         title: '404 Page',
//         name: 'Anand',
//         message: 'Requested help content is not found!'
//     })
// });

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Anand Raja',
        message: 'https://vaanilai.herokuapp.com' + req.url + ' is not found!'
    })
});

app.listen(port, () => {
    console.log('Server is up at '+port);
});