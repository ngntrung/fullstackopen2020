import axios from 'axios'
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
  console.log('render persons', persons);
  useEffect(() => {
    personService
      .get()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPersonEvent = (event) => {
    event.preventDefault()
    const check = persons.some(person => person['name'] === `${newName}`)
    if (check) {
      alert(`${newName} is already added to phonebook`)
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
    console.log('persons before delete',persons);
    const deletePersonId = deletePerson.id
    if (window.confirm(`Delete ${deletePerson.name}?`)) {
      personService
      .remove(deletePerson.id)
      .then(response=>{
        console.log('successful')
        console.log(response);
        console.log('person id to delete',deletePerson.id);
        console.log('person after delete', persons.filter(person => person.id === {deletePersonId}));
        setPersons(persons.filter(person => person !== {deletePerson}))
      })
      .catch(error => {
        console.log(error);
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