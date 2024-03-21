import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Container, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import Divider from "@mui/material/Divider";
import Modal from '@mui/material/Modal';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AddUser from '../../components/user/AddUsers';

const UserList = () => {
  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, exclua-o!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deletado!",
          text: "O Usuário foi Excluído.",
          icon: "success"
        });
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
    });
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'login',
      headerName: 'Nome',
      flex: 2
    },
    {
      field: 'password',
      headerName: 'Senha',
      flex: 2,
      renderCell: (params) => {
        const password = params.row.password;
        const maskedPassword = '*'.repeat(password.length);
        return maskedPassword;
      }
    },
    {
      field: 'date',
      headerName: 'Data de Cadastro',
      flex: 2
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 2,
      renderCell: (params) => (
        <>
          <Button
            title='Editar'
            color='primary'
            onClick={() => handleEditUser(params.row.id)}
            startIcon={<EditIcon
              style={{
                fontSize: "20px",
                color: 'blue',
                cursor: 'pointer',
              }}
            />}
          >
          </Button>
          <Button
            title='Excluir'
            color='error'
            onClick={() => handleDeleteUser(params.row.id)}
            startIcon={<DeleteIcon
              style={{
                fontSize: "20px",
                color: 'darkred',
                cursor: 'pointer'
              }}
            />}
          >
          </Button>
        </>
      ),
    },
  ];

  const handleEditUser = (userId) => {
    const userToEdit = users.find(user => user.id === userId);
    setEditingUser(userToEdit);
    setOpenEditModal(true);
  };

  const handleUpdateUser = (newLogin, newPassword) => {
    const updatedUsers = users.map(user => {
      if (user.id === editingUser.id) {
        return { ...user, login: newLogin, password: newPassword };
      }
      return user;
    });
    Swal.fire({
      icon: "success",
      title: "Alteração Feita com Sucesso!",
      showConfirmButton: false,
      timer: 1500
    });
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUser(null);
    setOpenEditModal(false);
  };

  return (
    <>
      <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px", marginTop: '6%', bgcolor: "#f9f8f8" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "5px" }}
        >
          Lista de Usuários
        </Typography>
        <Typography>
          <Button
            color='success'
            onClick={handleOpen}
            startIcon={<AddIcon />}
            sx={{ mb: 2 }}
          >
            Cadastrar Usuário
          </Button>
        </Typography>
        <Divider />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {open && <AddUser setUsers={setUsers} onClose={() => setOpen(false)} />}
          </Box>
        </Modal>
        <div style={{ height: 400, minWidth: "80vh" }}>
          <DataGrid
            rows={users}
            columns={columns}
            paginationPageSizeOptions={[5, 10, 25]}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
          />
        </div>
      </Paper>
      <Grid container justifyContent="center">
        <Grid>
          <Container>
            <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
              <Box sx={style}>
                <Typography variant='h6' align='center'>Editar Usuário</Typography>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateUser(editingUser.login, editingUser.password);
                }}>
                  <div>
                    <TextField
                      required
                      margin='normal'
                      variant='standard'
                      size='small'
                      type="text"
                      label="Usuário"
                      sx={{ width: "20rem" }}
                      value={editingUser ? editingUser.login : ''}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, login: e.target.value })}
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      margin='normal'
                      variant='standard'
                      size='small'
                      type="password"
                      label="Senha"
                      sx={{ width: "20rem" }}
                      value={editingUser ? editingUser.password : ''}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, password: e.target.value })}
                    />
                  </div>
                  <Grid>
                    <Typography 
                      variant='h5' 
                      align='center'
                    >
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
                      style={{ 
                        position: 'absolute', 
                        top: '0', 
                        right: '0' 
                      }}
                      variant="contained"
                      onClick={() => 
                        setOpenEditModal(false)
                      }
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </form>
              </Box>
            </Modal>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default UserList;
