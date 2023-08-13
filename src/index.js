import { getWeather } from './forecastwether-api.js';


const search = document.querySelector('.js-search');
const list = document.querySelector('.js-list');
const location = document.querySelector('.js-location');
const forecastContainer = document.querySelector('.container');

search.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();
    
    const { query, days, lang } = event.currentTarget.elements;

    getWeather(query.value, days.value, lang.value).then((resp) => {

        const { location, current, forecast } = resp.data;
        console.log(forecast);
        console.log(location);
        console.log(current);
      
        list.innerHTML = createMarkup(forecast.forecastday);
        
    }).catch(err => console.log(err)); 
    
}

function createMarkup(arr) {
   return arr.map(({date, day:{ avgtemp_c, condition:{ text, icon} }}) => `
    <li class="list-item">
        <h3 class="date">${date}</h3>
        <div class="weather-icon">
          <img src="${icon}" alt="${text}">
        </div>
        <h2 class="temper">${avgtemp_c}</h2>
        <p class="descr">${text}</p>
    </li>
   `).join('');
}






