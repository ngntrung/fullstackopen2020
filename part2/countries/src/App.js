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
  console.log(props);
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
  if (results.length > 10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (results.length <= 10 && results.length > 1){
    const showEvent = (selection) => {
      console.log(selection)
      return (
        <Country props={selection} />
      )
    }
    return (
      results.map(country => <div key={country.name}>
        <p>{country.name}<button onClick={() => showEvent({country})}>show</button></p> 
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
