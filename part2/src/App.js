import {useState, useEffect, useRef, memo} from 'react'
import {nanoid} from "nanoid";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Footer from './Footer';
import AppBar from './AppBar';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import personService from "./services/personService";
import './index.css';
//import {randPhoneNumber, randFullName} from "@ngneat/falso";
import {
    Button,
    Chip,
    Grid,
    Paper, styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Box from "@mui/material/Box";
import Input from './Input';
import PersonList from './PersonList';
//import Form from './Form';
import store from './store';
import {notify, un_notify} from "./store";
import { useSelector, useDispatch } from 'react-redux';

/*const Persons = ({persons, onClick}) => {
    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Number</StyledTableCell>
                        <StyledTableCell align="right">Delete?</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {persons.map((person) => (
                        <StyledTableRow
                            key={person.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <StyledTableCell component="th" scope="row">
                                {person.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{person.number}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Chip label="Delete" variant="outlined" onDelete={onClick}/>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}*/

const Form = ({onSubmit, persons, setPersons, setNotificationMsg}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        try {
            dispatch(notify("NOTIFY"));
            dispatch(un_notify())
        } catch (e) {
            console.log(e)
        }
        e.preventDefault()
        let name = newName.trim();
        let phone = newNumber.trim();
        if (name.length > 0 && phone.length > 0) {
            //prevent duplicates and alert if found
            if (persons.find(e => e.name.toLowerCase() === name.toLowerCase())) {
                alert(`${name} is already added to the phonebook`)
            } else {
                let new_entry = {id: nanoid(), name: name, phone: newNumber}
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

    return (
        <form onSubmit={handleSubmit}>
            <Input fullWidth={true}
                   placeholder={'Name'}
                   onChange={(e) => setNewName(e.target.value)}
                   value={newName}/>
            <br/>
            <Input placeholder={'Number'}
                   type={'number'}
                   inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                   helperText={'Enter Only Numbers'}
                   fullWidth={true}
                   onChange={(e) => setNewNumber(e.target.value)}
                   value={newNumber}/>
            <br/>
            <Button type="submit" variant={'outlined'} fullWidth={true}>Add</Button>
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

    const [search, setSearch] = useState('')
    const [notificationMsg, setNotificationMsg] = useState(null)

    const footerRef = useRef(null);
    const [footerHeight, setFooterHeight] = useState(0);


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


    const handleDelete = (e) => {
        e.preventDefault()
        let id = e.currentTarget.value
        personService.remove(id).then(response => {
            if (response.status === 200) {
                setPersons(persons.filter(p => p.id !== id))
               // store.dispatch({type: "NOTIFY", data: "DELETED!"});
                setTimeout(() => {
                    setNotificationMsg(null)
                }, 2000)
            } else {
                console.log(response)
            }
        }).catch((response) => {
            console.log(response)
        })
    }

    //hook to *initially* render the phonebook contents from the db.json file
    //Need to make sure the Express Server is running
    useEffect(() => {
        personService.getAll().then(data => {
            setPersons(persons.concat(data).sort((a, b) => {
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            }))
        })
        /* let data = []
         for (let i = 0; i < 200; i++) {
             data.push({id: nanoid(), name: randFullName(), number: randPhoneNumber()});
         }
         setPersons(persons.concat(data))*/
    }, [])

    useEffect(() => {
        setFooterHeight(footerRef.current?.clientHeight)
    }, [])

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Box
                    position={'relative'}
                    minHeight={'100vh'}
                >
                    <CssBaseline enableColorScheme={true}/>
                    <Box
                        paddingBottom={`${footerHeight}px`}
                    >
                        <AppBar search={search} setSearch={setSearch}/>
                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="stretch"
                        >
                            <Grid item>
                                <Container maxWidth='md'>
                                    <Box marginTop='10px'>
                                        <h2>Phonebook</h2>
                                        <Notification message={notificationMsg}/>
                                        <br/>
                                        <Form
                                            persons={persons}
                                            setPersons={setPersons}
                                            setNotificationMsg={setNotificationMsg}
                                        />
                                        {
                                            //If there's data in the filter input field, render the matches, if any, else render the entire phonebook
                                            search.length > 0 ?
                                                <PersonList
                                                    persons={persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))}
                                                    onClick={handleDelete}
                                                />
                                                :
                                                <PersonList
                                                    persons={persons} onClick={handleDelete}
                                                />
                                        }
                                    </Box>
                                </Container>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        ref={footerRef}
                        position={'absolute'}
                        bottom={'0'}
                        width={'100%'}
                    >
                        <Footer/>
                    </Box>
                </Box>
            </ThemeProvider>
        </div>
    )
}

export default App