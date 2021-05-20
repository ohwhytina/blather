import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import { makeStyles, AppBar, Toolbar, Button, Typography, Box, Backdrop, Fade, IconButton, Checkbox, InputBase, FormControlLabel } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 5, 4),
  },
}));


const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div>
      <AppBar position="static" style={{ background: '#2196f3', width: '100%' }}>
        <Toolbar>
        
        <Link to="/" style={{ textDecoration: 'none', color: "#FFFFFF"}}>
          <Typography variant="h4" style={{ flex:1 }}>
            BLATHER!
          </Typography>
        </Link>
        <Box style={{ marginLeft: 'auto'}}>
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile" style={{ textDecoration: 'none'}}><Button color="black">Profile</Button></Link>
              <a href="/" onClick={logout} style={{ textDecoration: 'none' }}><Button color="white">
                Logout
                </Button></a>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none' }}><Button color="black">Login</Button></Link>
              <Link to="/signup" style={{ textDecoration: 'none'  }}><Button color="black">Signup</Button></Link>
            </>
          )}
      </Box>
      </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
