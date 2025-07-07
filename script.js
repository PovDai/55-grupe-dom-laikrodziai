const dateElDOM = document.getElementsByClassName('date')[0];
const timeElDOM = document.getElementsByClassName('time')[0];
const hourElDOM = document.getElementsByClassName('hours')[0];
const minElDOM = document.getElementsByClassName('minutes')[0];
const sElDOM = document.getElementsByClassName('seconds')[0];

const sliderDOM = document.getElementsByClassName('slider')[0]
const pDOM = document.querySelector('p')


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

let isPomodoro = false;
let click = 0;let countdownInterval; // kad galėtume sustabdyti seną laikmatį

sliderDOM.addEventListener('click', () => {
    isPomodoro = !isPomodoro;
    sliderDOM.classList.toggle('active');
    click++;

    // išvalyti seną laikmatį
    clearInterval(countdownInterval);

    if (isPomodoro) {
        pDOM.innerHTML = `<h3 style="color:green">Šiuo metu 25min vyks darbas</h3>
        <div id="timer">25:00</div>`;
        startCountdown(25 * 60, () => { // 25 min
            chill(); // kai baigiasi darbas, pradedam pertrauką
        });
    } else {
        pDOM.innerHTML = `<h3 style="color:blue">Šiuo metu vyksta 5min pertrauka</h3>
        <div id="timer">05:00</div>`;
        startCountdown(5 * 60, () => { // 5 min
            work(); // kai baigiasi pertrauka, pradedam darbą
        });
    }
});

function startCountdown(duration, onEnd) {
    let timer = duration;
    const timerEl = document.getElementById('timer');

    countdownInterval = setInterval(() => {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;

        minutes = addZero(minutes);
        seconds = addZero(seconds);

        timerEl.textContent = `${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(countdownInterval);
            onEnd();
        }
    }, 1000);
}

function chill() {
    timeElDOM.classList.remove('chill');
    timeElDOM.classList.add('work');
    pDOM.innerHTML = `<h3 style="color:blue">Šiuo metu vyksta 5min pertrauka</h3>
    <div id="timer">05:00</div>`;
    startCountdown(5 * 60, work);
}

function work() {
    timeElDOM.classList.remove('work');
    timeElDOM.classList.add('chill');
    pDOM.innerHTML = `<h3 style="color:green">Šiuo metu 25min vyks darbas</h3>
    <div id="timer">25:00</div>`;
    startCountdown(25 * 60, chill);
}

function remove() {
    timeElDOM.classList.remove('chill')
    timeElDOM.classList.remove('work')

}





