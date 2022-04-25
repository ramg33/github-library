import { useState, useEffect } from "react";
import UserForm from "./userForm";
import toastAlert from '../helpers/toastAlert';

const user =  {
  firstName: '',
  lastName: '',
  email: '',
  roleId: 1
};

const BookCreation = () => {
  
  const [rolesData, setRolesData] = useState([]);

  useEffect(() => {
    
    const getData = async () => {

      const fecthData = async () => {
        try {
          const getRoles = await fetch(`${process.env.REACT_APP_LIBRARY_API}roles`);
          const getRolesJson = await getRoles.json();
          if (getRolesJson.length > 0) {
            return getRolesJson;
          }        
        } catch (error) {
          return 'error';
        };
      };

      const result = await fecthData();
      
      if (result === 'error') {
        toastAlert('error', 'Books not found!');        
      } else {
        setRolesData(result);
      }

    };

    getData();

  }, []);

  const insertUser = async(data) => {
    try {
      // const resp = await fetch(`${process.env.LIBRARY_API}setUser`, {
      const resp = await fetch(`${process.env.REACT_APP_LIBRARY_API}setUser`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      const respJson = await resp.json();
      return respJson.msg;
    } catch (error) {
        return "error";
    };
  };

  const saveUserHandler = async (data, option) => {
    const result = await insertUser(data);
    if (result === 'Ok') {
      toastAlert('success', 'User created!');
    }
    else {
      toastAlert('error', 'The user could not be inserted!');
    }
  }

  return <UserForm currentUser={user} onSave={saveUserHandler} roles={rolesData} />
}

export default BookCreation