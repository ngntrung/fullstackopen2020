import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Weather from './components/Weather'
import Country from './components/Country'

const Search = ({value, event}) => {
  return (
    <div>
       find countries <input value={value} onChange={event}/>
    </div>
  )
}



function App() {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [results, setResults] = useState([])
  
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value)
  }
  
  const handleClick = (selection) => {
    setResults(results.filter(country => country.name === selection.name))
  }
 
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        setResults(response.data)
      })
  }, [])
  
  useEffect(() => {
      setResults(countries.filter(country => country.name.toLowerCase().includes(searchInput.toLowerCase())))
  },[searchInput])

  if (results.length > 10){
    return (
      <div>
        <Search value={searchInput} event= {handleSearchInput}/>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }else if (results.length <= 10 && results.length > 1){
    return (
      <div>
        <Search value={searchInput} event= {handleSearchInput}/>
        {results.map(country => <div key={country.name}>
        <p>{country.name} <button onClick={() => handleClick(country)}>show</button></p> 
        </div>)}
      </div>
    )
  }

  return (
    <div>
      <Search value={searchInput} event= {handleSearchInput}/>
      {results.map(country => <Country key={country.name} props={country} />)}
      {results.map(country => <Weather key={country.name} country={country} />)}
    </div>
  );
}

export default App;
