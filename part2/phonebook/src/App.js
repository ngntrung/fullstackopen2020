import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchInput, setSearchInput ] = useState('')

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
      <div>
        filter shown with <input value={searchInput} onChange={handleSearchInput}/>
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPersonEvent}>
        <div>
          name: <input value={newName} onChange={handleNameInput}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {results.map(person => <p key={person.name}>{person.name} {person.number}</p>)}

    </div>
  )
}

export default App