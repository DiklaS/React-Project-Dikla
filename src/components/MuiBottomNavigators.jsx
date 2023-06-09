import { BottomNavigationAction } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation'
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PortraitIcon from '@mui/icons-material/Portrait';
import { useSelector } from 'react-redux';

const pages = [{label: 'About', icon: <InfoIcon/>}];
const loginPages = [{label: 'Favorites', icon: <FavoriteIcon/>}];
const bizPages = [{label: 'My Cards', icon: <PortraitIcon/>}];



const MuiBottomNavigators = () => {
    const isLoggedIn = useSelector(
    (state) => state.authSlice.isLoggedIn
    );
    const isBiz = useSelector(
    (state) => state.authSlice.isBiz
    );
    return (
      <>
        <BottomNavigation showLabels>
          {pages.map((page) => (
                <BottomNavigationAction key={page.label} {...page} />
              ))}
          {isLoggedIn && loginPages.map((page) => (
                <BottomNavigationAction key={page.label} {...page} />
              ))}
          {isBiz && bizPages.map((page) => (
                <BottomNavigationAction key={page.label} {...page} />
              ))}

        </BottomNavigation>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <span>&copy; {new Date().getFullYear()} created by Dikla Shaked</span>
        </div>
      </>
    )
}

export default MuiBottomNavigators;
