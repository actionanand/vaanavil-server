console.log('weather js is loaded.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const chk = document.getElementById('check');
const msgTime = document.querySelector('#msg-time');
const msg0 = document.querySelector('#msg-0');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');
const msg3 = document.querySelector('#msg-3');
const msg4 = document.querySelector('#msg-4');
const msg5 = document.querySelector('#msg-5');
var tempUnit = 'ca';

setInterval(()=> {
    msgTime.textContent = 'Local Time: ' + new Date().toString();
    if (chk.checked) {
        tempUnit = 'us';
    } else {
        tempUnit = 'ca';
    }
}, 1000);

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    msg1.textContent = 'Loading...';
    msg0.textContent = '';
    msg2.textContent = '';
    msg3.textContent = '';
    msg4.textContent = '';
    msg5.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}&units=${tempUnit}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                msg1.textContent = data.error;
                // console.log(data.error);
            } else {
                msg0.textContent = data.currentTemp;
                msg1.textContent = data.location;
                msg2.textContent = `${data.time} | ${data.solarInfo}`
                msg3.textContent = data.tempInfo;
                msg4.textContent = data.summary + data.rain;
                msg5.textContent = data.otherInfo;
                // console.log(data.forecast);
                // console.log(data.location);
                // console.log('Temp unit is ' + tempUnit)
            }
        })
    })
})