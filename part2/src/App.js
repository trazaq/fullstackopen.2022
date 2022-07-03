import {useState, useEffect} from 'react'
import {nanoid} from "nanoid";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Footer from './Footer';
import AppBar from './AppBar';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import personService from "./services/personService";
import './index.css';
import {randPhoneNumber, randFullName} from "@ngneat/falso";
import {Grid} from "@mui/material";

const Persons = ({persons, onClick}) => {
    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {
                    persons.map((p) =>
                        <li key={p.id}>{p.name} {p.number}
                            &nbsp;
                            <button onClick={onClick} value={p.id}>delete</button>
                        </li>
                    )
                }
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


const Notification = ({message}) => {
    if (message === null) {
        return null
    }
    return (
        <div className='message'>
            {message}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [notificationMsg, setNotificationMsg] = useState(null)

    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {'backgroundColor': 'rgb(42, 42, 42)'},
                },
            },
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        let name = newName.trim();
        if (name.length > 0) {
            //prevent duplicates and alert if found
            if (persons.find(e => e.name.toLowerCase() === name.toLowerCase())) {
                alert(`${name} is already added to the phonebook`)
            } else {
                let new_entry = {id: nanoid(), name: name, number: newNumber}
                personService.create(new_entry).then(() => {
                    setPersons(persons.concat(new_entry))
                    setNewName('')
                    setNewNumber('')
                    setNotificationMsg(`${new_entry.name} Added to Phonebook`)
                    setTimeout(() => {
                        setNotificationMsg(null)
                    }, 2500)
                })
            }
        }
    }

    const handleDelete = (e) => {
        e.preventDefault()
        let id = e.target.value
        personService.remove(id).then(response => {
            if (response.status === 200) {
                setPersons(persons.filter(p => p.id !== id))
                setNotificationMsg("Deleted!")
                setTimeout(() => {
                    setNotificationMsg(null)
                }, 2000)
            } else {
                alert("Error Deleting Entry From Phonebook! Check console")
                console.log(response)
            }
        })
    }

    //hook to *initially* render the phonebook contents from the db.json file
    //Need to make sure the Express Server is running
    useEffect(() => {
        /*personService.getAll().then(data => {
            data = JSON.parse(data)
            setPersons(persons.concat(data.persons))
        })*/
        let data = []
        for (let i = 20; i < 20; i++) {
            data.push({id: nanoid(), name: randFullName(), number: randPhoneNumber()});
        }
        setPersons(persons.concat(data))
    }, [])

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme={true}/>
                <AppBar search={search} setSearch={setSearch}/>
                <Grid
                    container
                    minHeight={'100vh'}
                    direction="column"
                    justifyContent="space-between"
                    alignItems="stretch"
                >
                    <Container maxWidth="false" disableGutters={false}>
                        <h2>Phonebook</h2>
                        <Notification message={notificationMsg}/>
                        <br/>
                        <Form onSubmit={handleSubmit}
                              newName={newName} setNewName={setNewName}
                              newNumber={newNumber} setNewNumber={setNewNumber}
                        />
                        {
                            //If there's data in the filter input field, render the matches, if any, else render the entire phonebook
                            search.length > 0 ?
                                <Persons
                                    persons={persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))}
                                    onClick={handleDelete}
                                />
                                :
                                <Persons persons={persons} onClick={handleDelete}/>
                        }
                    </Container>
                    <Footer/>
                </Grid>
            </ThemeProvider>
        </div>
    )
}

export default App