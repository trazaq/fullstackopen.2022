import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestorePage from '@mui/icons-material/RestorePage';


export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{position: 'relative', bottom: 0, left: 0, right: 0}}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Restore Page" icon={<RestorePage/>}/>
                <BottomNavigationAction label="LinkedIn" icon={<LinkedInIcon/>}/>
            </BottomNavigation>
        </Box>
    );
}