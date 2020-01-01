const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

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
        name: 'Anand'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: `it's about page!`,
        name: 'Anand'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: `It's a help page.`,
        name: 'Anand',
        helpText: 'You can approach us anytime.'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is raining.',
        location: 'Chennai'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: `404 Page`,
        name: 'Anand',
        message: 'Requested help content is not found!'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'name',
        message: 'Requested page is not found!'
    })
});

app.listen(3000, () => {
    console.log('Server is up!');
});