const dateElDOM = document.getElementsByClassName('date')[0];
const timeElDOM = document.getElementsByClassName('time')[0];
const hourElDOM = document.getElementsByClassName('hours')[0];
const minElDOM = document.getElementsByClassName('minutes')[0];
const sElDOM = document.getElementsByClassName('seconds')[0];

const sliderDOM = document.getElementsByClassName('slider')[0]
const pDOM=document.querySelector('p')


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
let click = 0;
sliderDOM.addEventListener('click', () => {
    isPomodoro ? isPomodoro = false : isPomodoro = true;
    sliderDOM.classList.toggle('active')
   
    isPomodoro ? work() : remove()
    click++
    
    if (click % 2 === 1) {
        pDOM.insertAdjacentHTML('beforeend', '<p>Šiuo metu vyksta 5 min pertrauka</p>')
    } else {
        pDOM.innerHTML = '';
        pDOM.insertAdjacentHTML('beforeend','<p>Šiuo metu 25min vyks darbas</p>')
        
    }


})
function chill() {
    timeElDOM.classList.remove('work')
    timeElDOM.classList.add('chill')
    isPomodoro ? setTimeout(work, 5 * 60000) : remove()
    pDOM.innerHTML = ''; // Išvalo seną pranešimą
 
    

}

function work() {
    
    timeElDOM.classList.remove('chill')
    timeElDOM.classList.add('work')
    isPomodoro ? setTimeout(chill, 25 * 60000) : remove()
    pDOM.innerHTML = ''; // Išvalo seną pranešimą

  
    


}

function remove() {
    timeElDOM.classList.remove('chill')
    timeElDOM.classList.remove('work')
  
    
}

