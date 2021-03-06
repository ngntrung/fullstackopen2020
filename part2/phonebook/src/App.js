import React, { useEffect, useState } from 'react'
import personService from './services/serverservices'
import './style.css'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import PersonDisplay from './components/PersonDisplay'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchInput, setSearchInput ] = useState('')
  const [ notiMessage, setNoti ] = useState({'type': '', 'message': ''})

  const notiDisplay = (type, message) => {
    setNoti({
        'type': type,
        'message': message
    })
  }

  const notiTimeout = () => {
    setTimeout(() => {
      setNoti({
        'type': '',
        'message': ''
      })
    }, 5000)
  }

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
        .then(response => {
          setNewName('')
          setNewNumber('')
          if (response.status === 200){
            notiDisplay('success', `Update ${personObj.name}'s number`)
            notiTimeout()
          }
        })
        .catch(error => {
          if(error.response.status === 404){
            notiDisplay('error', `Information of ${personObj.name} has already been removed from server`)
            notiTimeout()
          }
        })
      }
    } 
    else {
      const personObj = {
        name: newName,
        number: newNumber
      }
      personService
      .create(personObj)
      .then(response => {
        setPersons([...persons, response.data])
        setNewName('')
        setNewNumber('')
        notiDisplay('success', `Added ${response.data.name}`)
        notiTimeout()
      })
      .catch(error =>{
        console.log(error);
        notiDisplay('error', 'Oops! There is something wrong. Please try again')
        notiTimeout()
      })
    }
  }

  const deletePersonEvent = (deletePerson) => {
    if (window.confirm(`Delete ${deletePerson.name}?`)) {
      personService
      .remove(deletePerson.id)
      .then(response => {
        setPersons(persons.filter(person => person !== deletePerson))
        notiDisplay('success', `Delete ${deletePerson.name}`)
        notiTimeout()
      }
        
      )
      .catch(error => {
        console.log(error)
        notiDisplay('error', 'Oops! There is something wrong. Please try again')
        notiTimeout()
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
      <Notification props={notiMessage} />
      <Filter value={searchInput} event={handleSearchInput} />
      <h2>Add a new</h2>
      <PersonForm event={addPersonEvent} nameValue={newName} nameEvent={handleNameInput} numberValue={newNumber} numberEvent={handleNumberInput} />
      <h2>Numbers</h2>
      {results.map(person => <PersonDisplay key={person.id} person={person} event={() => deletePersonEvent(person)} />)}
    </div>
  )
}

export default App