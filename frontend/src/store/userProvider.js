import React, { useReducer } from 'react';
import userContext from './userContext';

const defaultDataUser = {
  firstName: '',
  lastName: '',
  email: '',
  roleId: '',
  userName: '',
  password: '',
  access: []
}
const userReducer = (state, action) => {
  if (action.type === 'SET_USER') {
    const firstName = action.userData[0].firstName;
    const lastName = action.userData[0].lastName;
    const email = action.userData[0].email;
    const roleId = action.userData[0].roleId;
    const userName = action.userData[0].userName;
    const password = action.userData[0].password;
    const access = action.userData.map(({name}) => {
      return name
    });
    localStorage.setItem('userId', action.userData[0].id);
    localStorage.setItem('roleId', action.userData[0].roleId);

    return {
      firstName,
      lastName,
      email,
      roleId,
      userName,
      password,
      access
    };
  }
  if (action.type === 'CLEAN_USER') {
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    return {...defaultDataUser};
  }
}

const UserProvider = (props) => {
  const [userState, dispatchUserAction] = useReducer(userReducer, defaultDataUser);

  const userLogin = (userData) => {
    dispatchUserAction({type:'SET_USER', userData});
  }

  const userLogout = () => {
    dispatchUserAction({type:'CLEAN_USER'});
  }

  const userValues = {
    userData: userState,
    login: userLogin,
    logout: userLogout
  }

  return (
    <userContext.Provider value={userValues}>
      {props.children}
    </userContext.Provider>
  )
};

export default UserProvider;