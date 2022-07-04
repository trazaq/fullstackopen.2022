import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function SimpleBottomNavigation() {
    return (
        <BottomNavigation showLabels>
            <BottomNavigationAction
                href={'https://www.linkedin.com/in/tipurazaq/'}
                target={'_blank'}
                rel={'noopener'}
                label="My LinkedIn"
                icon={<LinkedInIcon/>}
            />
        </BottomNavigation>
    );
}