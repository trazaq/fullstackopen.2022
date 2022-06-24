import {useState} from 'react'
import {nanoid} from "nanoid";

const Persons = ({persons}) => {
    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {persons.map((p) => <li key={nanoid()}>{p.name} {p.number}</li>)}
            </ul>
        </>
    )
}

const Form = ({onSubmit, newName, setNewName, newNumber, setNewNumber}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input onChange={(e) => setNewName(e.target.value)} value={newName}/>
            </div>
            <div>
                <br/>
                number: <input onChange={(e) => setNewNumber(e.target.value)} value={newNumber}/>
            </div>
            <div>
                <br/>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([{name: 'Arto Hellas', number: '000-000-0000'}])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        let name = newName.trim();
        if (name.length > 0) {
            //prevent duplicates and alert if found
            if (persons.find(e => e.name.toLowerCase() === name.toLowerCase())) {
                alert(`${name} is already added to the phonebook`)
            } else {
                setPersons(persons.concat({name: name, number: newNumber}))
                setNewName('')
                setNewNumber('')
            }
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Form onSubmit={handleSubmit}
                  newName={newName} setNewName={setNewName}
                  newNumber={newNumber} setNewNumber={setNewNumber}
            />
            <Persons persons={persons}/>
        </div>
    )
}

export default App