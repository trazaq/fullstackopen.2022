import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({placeholder, onChange, value}) {
    return (
        <Box
            sx={{
                '& > :not(style)': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <TextField autoComplete={'off'} id="outlined-basic" placeholder={placeholder} variant="outlined" onChange={onChange} value={value}/>
        </Box>
    );
}
