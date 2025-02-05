import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { Data } from '../../../App';
import deva from '../AdminNavbar/deva.png';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material'; // Make sure Button is imported correctly.
import './AdminNav.css';
import HomeIcon from '@mui/icons-material/Home';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import BookIcon from '@mui/icons-material/Book';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(Data);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAdminImageClick = () => {
    setSidebarOpen(!sidebarOpen); // Toggle the sidebar visibility
  };

  const handleLogout = () => {
    setLoggedInUser(null); // Clear the user from context
    localStorage.removeItem('loggedInUser'); // Clear the user from localStorage
    setSidebarOpen(false); // Close the sidebar
    navigate('/login'); // Redirect to login page
  };

  const renderLoginButton = () => {
    if (loggedInUser && loggedInUser.email) {
      return (
        <img
          src={deva}
          alt="Admin"
          className="admin-image"
          onClick={handleAdminImageClick}
        />
      ); // Admin image click event
    } else {
      return <button>Login</button>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            SDR TOURS ADMIN
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {renderLoginButton()} {/* Render the login or email based on the state */}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:'#0c2759',
            color:'white'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader >
        <h1>Dashboard</h1>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

        </DrawerHeader>
        <hr className='admin-hr' />
        <div className='admin-navs'>
          <Link to='/admindashboard' className='admin-link'><HomeIcon /> Home</Link>
          <Link to='/admindashboard/tours' className='admin-link'> <LocalAirportIcon />Tours</Link>
          <Link to='/admindashboard/bookingdetails' className='admin-link'><BookIcon /> Bookings</Link>
          <Link to="/admindashboard/addhotel" className='admin-link'><AddIcon/>Add new tour</Link>
        </div>
      </Drawer>

      {/* Sidebar for admin */}
      {sidebarOpen && (
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 300,
              height:300,
              boxSizing: 'border-box',
              background: '#2957ab',
              color:'white'
            },
          }}
          variant="persistent"
          anchor="right"
          open={sidebarOpen}
        >
          <DrawerHeader>
            <IconButton onClick={() => setSidebarOpen(false)}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Box  sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              {loggedInUser?.email}
            </Typography>
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Drawer>
      )}

      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
