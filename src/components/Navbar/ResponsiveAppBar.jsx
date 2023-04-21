import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {MenuItem, Box, Typography} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import { useSelector, useDispatch } from 'react-redux';
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "./NavLinkComponent";
import { authActions } from "../../store/auth";
import LightModeIcon from '@mui/icons-material/LightMode';
import woman_avatar from './woman_avatar.png';
import { darkThemeActions } from "../../store/darkTheme";
import SearchPartial from "./SearchPartial";
import DarkModeIcon from '@mui/icons-material/DarkMode';

const pages = [{label: 'Home', url: ROUTES.HOME}, {label: "About", url: ROUTES.ABOUT}];
const nonLoginPages = [{label: "Signup", url: ROUTES.SIGNUP},{label: "Login", url: ROUTES.LOGIN}];
const loginPages = [{label: 'Favorites Cards', url: ROUTES.FAVORITES}];
const BusinessPages = [{label: 'My Cards', url: ROUTES.MYCARDS}];
const settings = [{label: 'Profile', url: ROUTES.PROFILE}, {label: 'Logout', url: ROUTES.LOGOUT}]

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  const isBiz = useSelector((bigState) => bigState.authSlice.isBiz);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (state) => state.darkThemeSlice.isDarkTheme
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const setToDarkTheme = () => {
    dispatch(darkThemeActions.setToDarkTheme());
  };

  const setToLightTheme = () => {
    dispatch(darkThemeActions.setToLightTheme());
  };
  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* xs Screen */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))}
              {isLoggedIn && loginPages.map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))}
              {(isLoggedIn && isBiz) && BusinessPages.map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))} 

            </Menu>
          </Box>
          {/* md Screen */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}
            {isLoggedIn && loginPages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}
            {(isLoggedIn && isBiz) && BusinessPages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))} 
          </Box>
          {/* Right Side */}
          <SearchPartial />
          <IconButton aria-label="dark-theme" checked={isDarkTheme} onClick={setToDarkTheme}>
              {isDarkTheme ? <Typography display='none'></Typography> : <DarkModeIcon/>}
            </IconButton>
            <IconButton aria-label="light-theme" checked={isDarkTheme} onClick={setToLightTheme}>
              {isDarkTheme ? <LightModeIcon/> : <Typography display='none'></Typography>}
            </IconButton> 
          {isLoggedIn ? <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="avatar" src={woman_avatar}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            {settings.map((page) => (
              page.url === ROUTES.LOGOUT ? (
                <MenuItem key={page.url} onClick={handleCloseUserMenu}>
                  <NavLinkComponent
                    key={page.url}
                    {...page}
                    onClick={logoutClick}
                  />
                </MenuItem> 
              ) : (
                <MenuItem key={page.url} onClick={handleCloseUserMenu}>
                  <NavLinkComponent key={page.url} {...page}/>
                </MenuItem>
              )
            ))}
            </Menu>
          </Box> : <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
            {nonLoginPages.map((page) => (
              <NavLinkComponent
                key={page.url} {...page}
                //onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              />
            ))}
          </Box>}

          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;