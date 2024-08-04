import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonsForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then((response) => 
    setPersons(response.data)
    )
  }, [])
  const handleButtonClick = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
      }
      let obj = persons.find(o => o.name === newName);
      console.log(obj)
      if(obj !== undefined){
        alert(`${newName} is already added to phonebook`)
      } else
      {
        setPersons(persons.concat(personObject))
      }
      
      setNewName('')
      setNewNumber('')
  }
  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }
  const personsToShow = filterString == "" ? persons : persons.filter(person => person.name.toLocaleLowerCase().includes(filterString.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterString} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonsForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleButtonClick={handleButtonClick}
      />
      <h3>Numbers</h3>
      <Persons value={personsToShow} />
    </div>
  )
}

export default App