import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.value} onChange={props.event}/>
    </div>
  )
}

const PersonForm = (props) => {
  const {event, nameValue, nameEvent, numberValue, numberEvent} = props
  return (
    <form onSubmit={event}>
      <div>
        name: <input value={nameValue} onChange={nameEvent}/>
      </div>
      <div>
        number: <input value={numberValue} onChange={numberEvent}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({results}) => {
  return (
    results.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchInput, setSearchInput ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPersonEvent = (event) => {
    event.preventDefault()
    const check = persons.some(person => person['name'] === `${newName}`)
    check ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }
  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value)
  }
  const results = searchInput === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(searchInput.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchInput} event={handleSearchInput} />
      <h2>Add a new</h2>
      <PersonForm event={addPersonEvent} nameValue={newName} nameEvent={handleNameInput} numberValue={newNumber} numberEvent={handleNumberInput} />
      <h2>Numbers</h2>
      <Persons results={results} />
    </div>
  )
}

export default App