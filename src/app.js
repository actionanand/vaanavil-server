const path = require('path');
const express = require('express');

const app = express();

const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is raining.',
        location: 'Chennai'
    });
});


app.listen(3000, () => {
    console.log('Server is up!');
});