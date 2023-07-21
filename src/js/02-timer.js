import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";


refs = {
  data: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
  

 
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] <= Date.now()) {
        alert('Please choose a date in the future');
         refs.startBtn.disabled = true;
        selectedDates[0] = new Date();
      } else {
        startTime = selectedDates[0];
         refs.startBtn.disabled = false;
      }
    },
  };

  flatpickr(refs.data, options);

  const timer = {
    intervalId: null,
    isActive: false,
    start() {
      if(this.isActive) {
        return;
      }
      this.isActive = true;
      this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        const componentsTimer = convertMs(deltaTime);
        updateTimerComponents(componentsTimer);
      console.log(componentsTimer);
      }, 1000);
    },
    stop() {
      clearInterval(this.intervalId);
      this.isActive = false;
    },
  }
  
function updateTimerComponents({days, hours, minutes, seconds}) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
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

function onClick() {
  timer.start();
 
  refs.data.disabled = true;
}

refs.startBtn.addEventListener('click', onClick);





