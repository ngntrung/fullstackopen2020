import axios from 'axios'
import React, { useState, useEffect } from 'react'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({country}) => {
    const [weather, setWeather] = useState([])
  
    useEffect(() => {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
        .then(response => setWeather(response.data))
    },[])
  
    if (weather.length !== 0){
      return (
        <div>
          <h2>Weather in {weather.location.name}</h2>
          <p><strong>temperature:</strong> {weather.current['temperature']} Celcius</p>
          <img src={weather.current['weather_icons']} width='64px' height='64px' alt='weather icon' />
          <p><strong>wind:</strong> {weather.current['wind_speed']} mph direction {weather.current['wind_dir']}</p>
        </div>
      )
    }
    
    return (
      <div>
        <p>loading weather...</p>
      </div>
    )
    
  }

  export default Weather