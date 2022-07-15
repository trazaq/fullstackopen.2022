import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Input} from "@mui/material";

export default function StateTextFields() {
    const [name, setName] = React.useState('Cat in the Hat');
    const handleChange = (event) => {
        setName(event.target.value);
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <Input
                id="outlined-name"
                variant={'outlined'}
                label="Name"
                value={name}
                onChange={handleChange}
            />
        </Box>
    );
}
