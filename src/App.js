import {useState} from 'react'
import {nanoid} from "nanoid";

const Numbers = ({persons}) => {
    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {persons.map((p, i) => <li key={nanoid()}>{p.name}</li>)}
            </ul>
        </>
    )
}

const App = () => {
    const [persons, setPersons] = useState([{name: 'Arto Hellas'}])
    const [newName, setNewName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newName.trim().length > 0) {
            setPersons(persons.concat({name: newName}))
            setNewName('')
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input onChange={(e) => setNewName(e.target.value)} value={newName}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <Numbers persons={persons}/>
        </div>
    )
}

export default App