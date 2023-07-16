const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', () => {
    
    timerId = setInterval(() => {
        let hexColor = getRandomHexColor();
        function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
          }
          body.style.backgroundColor = hexColor;
    }, 1000); 
    startBtn.setAttribute('disabled', true);
 
})
stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled');
});









