import { useState } from "react";
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import toastAlert from '../helpers/toastAlert';

import './login.css';

const Login = () => {
  
  const fetchLogin = async(data) => {
    // console.log(data);
    try {
      const resp = await fetch('http://localhost:3000/UserLogIn', {
          method: 'POST',
          //mode: 'no-cors',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      const respJson = await resp.json();
      return respJson;
    } catch (error) {
        return "";
    };
  };

    return (
    <div className="login-container">
      <div className="login-title">Login</div>
      <input type="text" className="login-input-text"></input>
      <br />
      <a href="#">Login</a>
    </div>
  );
};

export default Login;
