import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import { AppBar, Toolbar, Button, Typography, Box } from '@material-ui/core/';


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
              <Link to="/profile" style={{ textDecoration: 'none'}}><Button style={{ color: 'black' }}>Profile</Button></Link>
              <a href="/" onClick={logout} style={{ textDecoration: 'none' }}><Button style={{ color: 'white' }}>
                Logout
                </Button></a>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none' }}><Button style={{ color: 'black' }}>Login</Button></Link>
              <Link to="/signup" style={{ textDecoration: 'none'  }}><Button style={{ color: 'black' }}>Signup</Button></Link>
            </>
          )}
      </Box>
      </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
