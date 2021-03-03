import axios from 'axios'
import React, { useState, useEffect } from 'react'

const api_key = process.env.REACT_APP_API_KEY

const Show = (props) => {
  return (
    <button onClick={props.event}>show</button>
  )
}
const Search = ({value, event}) => {
  return (
    <div>
       find countries <input value={value} onChange={event}/>
    </div>
  )
}
const Country = ({props}) => {
  console.log('country',props);
  const {name, capital, population, languages, flag} = props
  return (
    <div>
    <h1>{name}</h1> 
    <p>capital {capital}</p>
    <p>population {population}</p>
    <h2>languages</h2>
    <ul>
      {languages.map(language => <li key={language['iso639_2']}>{language.name}</li>)}
    </ul>
    <img src={flag} width='80px' height='80px' alt="country flag" />
    </div>
  )
}

const Countries = ({results}) => {
  console.log('countries cpn', results);
  if (results.length > 10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (results.length <= 10 && results.length > 1){
    return (
      results.map(country => <div key={country.name}>
        <p>{country.name}<button onClick={() => <Country key={country.name} props={country} />}>show</button></p> 
      </div>)
    )
  }
  return (
    results.map(country => <Country key={country.name} props={country} />)
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
/*setResults(countries.filter(country => country.name.toLowerCase().includes(searchInput.toLowerCase())))*/
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
    </div>
  );
}

export default App;
