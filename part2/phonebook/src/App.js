import React, { useEffect, useState } from 'react'
import personService from './services/services'

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

const Persons = ({person, event}) => {
  return (
    <div> 
    <p>{person.name} {person.number}</p><button onClick={event}>delete</button> 
    </div>)
  
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchInput, setSearchInput ] = useState('')

  useEffect(() => {
    personService
      .get()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPersonEvent = (event) => {
    event.preventDefault()
    const existCheck = persons.some(person => person['name'] === `${newName}`)
    
    if (existCheck) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const personObj = persons.find(person => person['name'] === newName)
        personObj.number = newNumber

        personService
        .update(personObj.id, personObj)
        .then(
          setNewName(''),
          setNewNumber('')
        )
        .catch(error => {
          console.log(error);
          alert('Oops! There is something wrong. Please try again')
        })
      }
    } else {
      const personObj = {
        name: newName,
        number: newNumber
      }
      personService
      .create(personObj)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch(error =>{
        console.log(error);
        alert('Oops! There is something wrong. Please try again')
      })
    }
  }

  const deletePersonEvent = (deletePerson) => {
    if (window.confirm(`Delete ${deletePerson.name}?`)) {
      personService
      .remove(deletePerson.id)
      .then(
        setPersons(persons.filter(person => person !== deletePerson))
      )
      .catch(error => {
        console.log(error)
        alert('Oops! There is something wrong. Please try again')
      })
    }
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
      {results.map(person => <Persons key={person.id} person={person} event={() => deletePersonEvent(person)} />)}
    </div>
  )
}

export default App