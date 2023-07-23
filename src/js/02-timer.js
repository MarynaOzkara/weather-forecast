import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let startTime = null;

const refs = {
  data: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
}
 
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] < Date.now()) {
        Notiflix.Notify.failure('Please choose a date in the future');
         refs.startBtn.disabled = true;
         selectedDates[0] = new Date();
      } else {
         Notiflix.Notify.success('That is ok!');
         startTime = selectedDates[0];
         refs.startBtn.disabled = false;
      }
    },
  };

  flatpickr(refs.data, options);

  class Timer {
    constructor({onTick}) {
      this.intervalId = null;
      this.isActive = false;
      refs.startBtn.disabled = true;
      this.onTick = onTick;
    }
    start() {
      if(this.isActive) {
        return;
      }
      this.isActive = true;
      this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        const componentsTimer = convertMs(deltaTime);
        
        this.onTick(componentsTimer);
        
        if(deltaTime < 1000) {
          this.stop();
          refs.data.disabled = false;
        }
      }, 1000);
    }
    stop() {
      clearInterval(this.intervalId);
    }
  }
  
  const timer = new Timer({
    onTick: updateTimerComponents
  });
  
function updateTimerComponents({days, hours, minutes, seconds}) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}



function onClick() {
  timer.start();
  refs.data.disabled = true;
}

refs.startBtn.addEventListener('click', onClick);





