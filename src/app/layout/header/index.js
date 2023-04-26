import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { VideoCall, ExitToApp, House } from '@material-ui/icons';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const Header = ({
  user,
  handleLogin,
  handleLogout,
  handleShare,
  renderErrorMessage,
}) => {
  const isLoggedIn = !!user;
  let navigate = useNavigate();

  return (
    <AppBar position="static" className="app-header">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          onClick={() => {
            navigate(`/`);
          }}
          className="header-logo"
        >
          <House
            fontSize="inherit"
            style={{ fontSize: 48, marginRight: '20px' }}
          />
          <Typography className="header-title" style={{ flexGrow: 1 }}>
            Funny Movies
          </Typography>
        </div>
        {isLoggedIn ? (
          <div className="header-content">
            <div className="welcome-title">{`Welcome ${user.username}`}</div>
            <Button
              className="header-button"
              color="inherit"
              onClick={handleShare}
            >
              <VideoCall />
              &nbsp;Share a movie
            </Button>

            <Button
              className="header-button"
              color="inherit"
              onClick={handleLogout}
            >
              <ExitToApp />
              &nbsp;Logout
            </Button>
          </div>
        ) : (
          <div className="header-content">
            <form className="form" onSubmit={handleLogin}>
              <div className="input-container">
                <input placeholder="email" type="text" name="uname" required />
              </div>
              <div className="input-container">
                <input
                  placeholder="password"
                  type="password"
                  name="pass"
                  required
                />
                <div className="render-error">{renderErrorMessage('pass')}</div>
              </div>
              <div className="button-container">
                <Button type="submit" color="inherit">
                  Login/Register
                </Button>
              </div>
            </form>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
