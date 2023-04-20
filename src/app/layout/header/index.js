import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import { AccountCircle, VideoCall, ExitToApp } from '@material-ui/icons';

const Header = ({ user, handleLogin, handleLogout, handleShare }) => {
  const isLoggedIn = !!user;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          MyApp
        </Typography>

        {isLoggedIn ? (
          <>
            <IconButton color="inherit" onClick={handleShare}>
              <VideoCall />
            </IconButton>

            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToApp />
            </IconButton>
          </>
        ) : (
          <>
            <form onSubmit={handleLogin}>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <Button type="submit" color="inherit">
                Login
              </Button>
            </form>

            <Button component={Link} to="/register" color="inherit">
              Register
            </Button>
          </>
        )}

        {user && (
          <>
            <IconButton color="inherit" component={Link} to="/profile">
              <AccountCircle />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
