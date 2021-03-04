import React from 'react'
const Country = ({props}) => {
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

export default Country