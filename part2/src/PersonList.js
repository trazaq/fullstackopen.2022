import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

export default function InteractiveList({persons, onClick}) {
    return (
        <Box sx={{flexGrow: 1, maxWidth: '100%'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography sx={{mt: 4, mb: 2}} variant="h6" component="div">
                        Entries:
                    </Typography>
                    <List>
                        {persons.map(person => {
                            return <ListItem
                                key={person.id}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={onClick} value={person.id}>
                                        <DeleteIcon/>
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <PersonOutlineIcon/>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{textAlign: 'center'}}
                                    primary={person.name}
                                />
                                <ListItemText
                                    sx={{textAlign: 'center'}}
                                    primary={person.phone}
                                />
                            </ListItem>
                        })
                        }
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
}
