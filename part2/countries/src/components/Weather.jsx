import weatherService from '../services/weather'
import {useEffect, useState} from 'react'

const Weather = ({country}) => {
    const [weatherData, setweatherData] = useState({})
    let iconUrl
    useEffect(() => {
        weatherService.getWeather(country.latlng[0], country.latlng[1])
        .then(resp => {
            setweatherData(resp)
        })
    }, [])
    if(!weatherData.main) {
        return <p>Loading weather data....</p>
    }
    return (     
        <div>
        <h2>Weather in {country.capital[0]}</h2>
        <p>temperature {weatherData.main.temp / 10} °C</p>
        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} />
        <p>wind {weatherData.wind.speed} m/s</p>
        </div>
        
    )
    }
export default Weather