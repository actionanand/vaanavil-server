console.log('AQI js is loaded!');

const aqiForm = document.querySelector('form');
const search = document.querySelector('input');
const msg0 = document.querySelector('#msg-0');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');
const msg3 = document.querySelector('#msg-3');

aqiForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    msg1.textContent = 'Loading...';
    msg0.textContent = '';
    msg2.textContent = '';
    msg3.textContent = '';

    fetch(`/aqi-api?address=${location}`).then(response => {
        response.json().then(data => {
            if(data.error) {
                msg1.textContent = data.error;
            } else {
                msg0.textContent = data.aqi;
                msg3.textContent = data.summary;
                msg1.textContent = data.place;
                msg2.textContent = data.otherAqi;
            }
        })
    })
});