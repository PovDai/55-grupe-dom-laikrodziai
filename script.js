const dateElDOM = document.getElementsByClassName('date')[0];
const timeElDOM = document.getElementsByClassName('time')[0];
const hourElDOM = document.getElementsByClassName('hours')[0];
const minElDOM = document.getElementsByClassName('minutes')[0];
const sElDOM = document.getElementsByClassName('seconds')[0];

const months = ['sausio', 'vasario', 'kovo', 'balandžio', 'gegužės', 'birželio', 
    'liepos', 'rugpjūčio', 'rugsėjo', 'spalio', 'lapkričio', 'gruodžio'];

const weekDays = ['sekmadienis', 'pirmadienis', 'antradienis', 'trečiadienis', 
     'ketvirtadienis', 'penktadienis', 'šeštadienis'];

function clock() {
const now = new Date();
let h = now.getHours();
let m = now.getMinutes();
let s = now.getSeconds();

h = addZero(h);
m = addZero(m);
s = addZero(s);

let year = now.getFullYear();
let month = now.getMonth(); // 0-11
let weekDay = now.getDay(); // 0-6
let day = now.getDate();

timeElDOM.textContent = h + ':' + m + ':' + s;
dateElDOM.textContent = weekDays[weekDay].toUpperCase() + ', ' + months[month] + ' ' + day + ' d., ' + year;

hourElDOM.style.transform = "rotate(" + (h * 30) + "deg)";
minElDOM.style.transform = "rotate(" + (m * 6) + "deg)";
sElDOM.style.transform = "rotate(" + (s * 6) + "deg)"; 

setTimeout(clock, 1000);
}
function addZero(t) {
    if (t < 10) {
        t='0'+t
    }
    return t; 
}

clock();


