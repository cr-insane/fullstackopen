import Weather from "./Weather"

const Country = ({foundCountries}) => {
    const country = foundCountries[0]
    console.log(Object.values(country.languages))
    return (     
        <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <br />
        <b>languages:</b>
        <ul>
            {Object.values(country.languages).map((key, i) => (
                <li>{key}</li>            
        ))}
        </ul>
        <img src={country.flags.svg} width="200" />
        <Weather country={country} />
        </div>
        
    )
    }
export default Country