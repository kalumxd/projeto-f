import CloseIcon from '@mui/icons-material/Close';
import { Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddUser = ({ users, setUsers, onClose }) => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAddUser = (login, password) => {
    setUsers((prevUsers) => {
      const newId = prevUsers.length > 0 ? Math.max(...prevUsers.map(user => user.id)) + 1 : 1;
      const newUser = {
        id: newId,
        login,
        password,
        date: new Date().toLocaleString(),
      };
      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      Swal.fire({
        icon: "success",
        title: "Usuário Cadastrado com Sucesso!",
        showConfirmButton: false,
        timer: 1500
      });
      return updatedUsers;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!login || !password) return;
    handleAddUser(login, password);
    setLogin('');
    setPassword('');
    onClose();
  };

  return (
    <Grid container justifyContent="center">
      <Grid >
          <Container>
           <Typography variant='h6' align='center'>Cadastro de Usuário</Typography>
            <form onSubmit={handleFormSubmit}>
              <Grid item sx={6}>
              <TextField
                  margin='normal'
                  size='small'
                  required
                  variant='standard'
                  label="Usuário"
                  type="text"
                  value={login}
                  onChange={handleLoginChange}
                  sx={{width: "20rem"}}
                />
              </Grid>
                <Grid item sx={6}>
                <TextField
                  margin='normal'
                  size='small'
                  required
                  variant='standard'
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  sx={{width: "20rem"}}
                />
                </Grid>
              <Grid>
                <Typography variant='h5' align='center'>
                <Button
                  id="edit-button"
                  color='primary'
                  variant="contained"
                  type="submit"
                >
                  Salvar
                </Button>
                </Typography>
                <IconButton
                  style={{position: 'absolute', top: '0', right: '0' }}
                  variant="contained"
                  onClick={onClose}
                >
                  <CloseIcon/>
                </IconButton>
              </Grid>
            </form>
          </Container>
      </Grid>
    </Grid>
  );
};

export default AddUser;
