import axios from "axios";

const BASE_URL = `https://api.weatherapi.com/v1`;
const API_KEY = `39e338bbeaed4123987154447231208`;



export async function getWeather (city, days, lang) {
    try{
        
        const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&lang=${lang}`);
        
        return response;
    } catch(error) {
        console.log(error);
        throw error;
    }
    
}