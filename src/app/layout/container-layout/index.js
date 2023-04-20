import { AppBar, Container, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import Header from '../header';
import './style.scss';

interface ContainerLayoutProps {
  children: React.ReactElement;
}

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    // login logic here
    setUser({ email: e.target[0].value });
  };

  const handleLogout = () => {
    // logout logic here
    setUser(null);
  };

  const handleShare = () => {
    // share video logic here
  };
  return (
    <div>
      <AppBar className="main">
        <Header
          user={user}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          handleShare={handleShare}
        />
      </AppBar>
      <Container maxWidth="lg">
        <Paper className="app-content">{children}</Paper>
      </Container>
    </div>
  );
};

export default ContainerLayout;
