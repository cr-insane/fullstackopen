const CountryList = ({foundCountries, handleButtonClick}) => {
    return (
    <div>
    {foundCountries.map(country => 
   <div>{country.name.common} <button onClick={() => handleButtonClick(1, country.name.common)}>show</button></div>
    )}
    </div>
    )
    }
export default CountryList