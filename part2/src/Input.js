import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({placeholder, onChange, value, inputProps, helperText, fullWidth}) {
    return (
        <Box
            noValidate
            autoComplete="off"
        >
            <TextField inputProps={inputProps}
                       helperText={helperText}
                       autoComplete={'off'}
                       id="outlined-basic"
                       placeholder={placeholder}
                       variant="outlined"
                       fullWidth
                       onChange={onChange}
                       value={value}/>
        </Box>
    );
}
