import { AppBar, Container, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import Header from '../header';
import { useAuth } from './../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './style.scss';

interface ContainerLayoutProps {
  children: React.ReactElement;
}

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  let navigate = useNavigate();
  const { login } = useAuth();
  const { logout } = useAuth();
  const logOut = () => {
    logout();
    setUser(null);
    localStorage.clear();
    navigate(`/`);
    window.location.reload();
  };

  // React States
  const [errorMessages, setErrorMessages] = React.useState({
    name: '',
    message: '',
  });

  // User Login info
  const [users, setUsers] = useState([
    {
      username: 'remitano@gmail.com',
      password: 'remitano',
    },
  ]);

  const errors = {
    uname: 'Invalid username',
    pass: 'Invalid password',
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = users.find((human) => human.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: 'pass', message: errors.pass });
      } else {
        login({
          username: userData.username,
          password: userData.password,
          exp: Date.now(),
        });
      }
    } else {
      // Username not found register new user
      addUser({
        username: uname.value,
        password: pass.value,
      });
      login({
        username: uname.value,
        password: pass.value,
        exp: Date.now(),
      });
    }
  };

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const handleShare = () => {
    navigate(`/share`);
  };

  React.useEffect(() => {
    if (localStorage.user !== 'null') {
      setUser(JSON.parse(localStorage.user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);

  return (
    <div className="main">
      <AppBar className="header">
        <Header
          user={user}
          handleLogin={handleSubmit}
          handleLogout={logOut}
          handleShare={handleShare}
          renderErrorMessage={renderErrorMessage}
        />
      </AppBar>
      <Container maxWidth="lg">
        <Paper className="app-content">{children}</Paper>
      </Container>
    </div>
  );
};

export default ContainerLayout;
