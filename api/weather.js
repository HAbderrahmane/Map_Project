import axios from "axios";
import { X_RapidAPI_Key_Weather } from "../store/api";
export const getWeatherData = async () => {
  try {
    const options = {
      method: 'GET',
      url: 'https://open-weather13.p.rapidapi.com/city/marseille',
      headers: {
        //X_RapidAPI_Key_Weather
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401){
      
    }
    
    return null;
  }
};
