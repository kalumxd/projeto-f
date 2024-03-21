import React, { useEffect, useState } from 'react';
import Sidenav from './pages/dashboard/Sidenav';
import Login from './pages/Login';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsers(storedUsers);
      console.log(users)
    }
  }, []);

  return (
    <>
      {loggedIn ? (
        <Sidenav
          users={users}
          setUsers={setUsers}
        />) : (
        <Login
          users={users}
          setUsers={setUsers}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
        />)}
    </>
  );
};

export default App;
