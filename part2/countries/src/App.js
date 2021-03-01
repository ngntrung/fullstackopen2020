import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Search = ({value, event}) => {
  return (
    <div>
       find countries <input value={value} onChange={event}/>
    </div>
  )
}
const Countries = ({results}) => {
  console.log(results.length)
  if (results.length > 10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (results.length <= 10 && results.length > 1){
    return (
      results.map(country => <div key={country.name}>
        <p>{country.name}</p>
      </div>)
    )
  }
  return (
    results.map(country => <div key={country.name}>
      <h1>{country.name}</h1> 
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language['iso639_2']}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width='80px' height='80px' />
      </div>)
  )
  /*
  if (results.length === 1) {
    return (
      results.map(country => <div key={country.name}>
      <h1>{country.name}</h1> 
      {country.capital}
      {country.population}
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li>{language.name}</li>)}
      </ul>
      </div>)
    )
  } else if (results.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  */
    
}
function App() {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value)
  }
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  const results = countries.filter(country => country.name.toLowerCase().includes(searchInput.toLowerCase()))
  return (
    <div>
    <Search value={searchInput} event= {handleSearchInput}/>
    <Countries results={results}/>
    </div>
  );
}

export default App;
