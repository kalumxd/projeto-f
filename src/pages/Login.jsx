import React, { useState } from 'react';
import { Button, CssBaseline, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockSharpIcon from '@mui/icons-material/LockSharp';
import Swal from 'sweetalert2';
import fortesLogo from '../logo-fortes-tecnologia.png';

const Login = ({ users, loggedIn, setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (username, password) => {
    const foundUser = users.find(user => user.login === username && user.password === password);
    if ((username === 'Fortes' && password === '123') || foundUser) {
      setLoggedIn(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuário não encontrado",
      });
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://addee.com.br/wp-content/uploads/2020/04/original-e227a457f0113314cd02d3fcdef04f87.jpeg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid>
          <Typography align='end' sx={{ mt: -15, mb: 15 }}>
            <img src={fortesLogo} width="60%" />
          </Typography>
          <Typography variant="h5" align='start' sx={{ mb: 1, fontSize: "xx-large" }}>
            Entrar
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              id="username"
              label="Usuário"
              type="text"
              margin="normal"
              required
              fullWidth
              value={username}
              onChange={handleUsernameChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <TextField
              id="password"
              label="Senha"
              type="password"
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockSharpIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mb: 2 }}
            >
              Entrar
            </Button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
