import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonsForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})
  useEffect(() => {
    personService.getAll()
    .then((response) => { 
    setPersons(response)
    }
    )
  }, [])
  const handleButtonClick = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
      }
      const existingPerson = (persons.find(p => p.name === newName))

      if(!existingPerson) {
        personService.create(personObject)
      .then((response) => {
          console.log('Person successfully inserted', response)
          setPersons(persons.concat(response))
          setNotification({message: `Added ${newName}`, type: 'success'})
          setTimeout(() => {          
            setNotification({message: null, type: null})        
          }, 5000)
          console.log(notification)
      })
      .catch(error => {
        alert(`failure maybe already exist or something`)
        console.log(error)
      })
    } else if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      personService.update(existingPerson.id, personObject)
        .then(updatedPerson => {
          setPersons(persons.map(person =>
            person.id === existingPerson.id ? updatedPerson : person 
          ));
          setNotification({message: `${updatedPerson.name} updated`, type: 'success'})
          setTimeout(() => {          
            setNotification({message: null, type: null})        
          }, 5000)
        })
        .catch(error => {
          if(error.response.status == '404') {
            setNotification({message: `${newName} has already been removed from server`, type: 'error'})
            setTimeout(() => {          
              setNotification({message: null, type: null})        
            }, 5000)
          }
          console.error(error);
        });
    }
      setNewName('')
      setNewNumber('')
  }
  const deletePerson = (id) => {
    if(window.confirm(`Are you sure you want to delete ${id}`)){
      personService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        alert(`Failed to delete person.`)
        console.error(error)
      })
    }
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
      <Notification message={notification.message} type={notification.type} />
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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App