import React from 'react';

const UserContext = React.createContext({
  userData: {
    firstName: '',
    lastName: '',
    email: '',
    roleId: '',
    userName: '',
    password: '',
    access: []
  },
  login: ()=> {},
  logout: ()=> {}
});

export default UserContext;