import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import CountryList from './components/CountryList'
import Country from './components/Country'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {       
    countryService.getAll()      
    .then(countries => {         
      setCountries(countries)      
    })
    }, [])  

  const handleQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }
  
  const handleButtonClick = (value, name) => {
    setSearchQuery(name)
  }
  const foundCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div>
      <div>        
     find countries<input 
          onChange={handleQueryChange}
        />       
      </div>
      {foundCountries.length <= 10 && foundCountries.length != 1 &&
         <CountryList foundCountries={foundCountries} handleButtonClick={handleButtonClick}/>
      }
      {foundCountries.length > 10 &&
        <p>Too many matches, specify another filter</p>
      }
      {foundCountries.length == 1 &&
      <Country foundCountries={foundCountries} />
      }
    </div>
  )
}

export default App