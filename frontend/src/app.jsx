import { useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./security/login";
import Books from "./components/books";
import UserCreation from './components/userCreation';
import History from "./components/history";
import BookCreation from "./components/bookCreation";
import Layout from "./components/layout";
import './app.css';
import Checkin from "./components/checkin";
import { login, logout} from './security/loginValidations';
import toastAlert from './helpers/toastAlert';

const users = [
  {
    id: 1,
    firstName: 'Rodrigo',
    lastName: 'Moza',
    email: 'rodrigo@gmail.com',
    userName: '',
    password: '',
    roleId: 1,
    name: 'Checkout'
  },
  {
    id: 2,
    firstName: 'Rodrigo',
    lastName: 'Moza',
    userName: '',
    password: '',
    email: 'rodrigo@gmail.com',
    roleId: 1,
    name: 'Checkin'
  },
  {
    id: 3,
    firstName: 'Rodrigo',
    lastName: 'Moza',
    userName: '',
    password: '',
    email: 'rodrigo@gmail.com',
    roleId: 1,
    name: 'AddUser'
  },
  {
    id: 4,
    firstName: 'Rodrigo',
    lastName: 'Moza',
    userName: '',
    password: '',
    email: 'rodrigo@gmail.com',
    roleId: 1,
    name: 'AddBook'
  }
]

const App = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(users)

  const fnValidation = async (name, id) => {

    const userValidation = await fetch(`${process.env.REACT_APP_LIBRARY_API}usersByCredentials/${name}/${id}`);
    const userValidationJson = await userValidation.json();
    if (userValidationJson.length) {
      login(userValidationJson[0].id, userValidationJson[0].roleId);
      navigate("/books", { replace: true });
    }
    else {
      toastAlert('error', 'User not found!');
    }
  
  }
  
  return (
    <>
        { localStorage.getItem('userId') && <Routes>
          <Route path='/' element={<Layout />}>
            {/* <Route path='/' element={ <Login onSubmit={fnValidation} />} /> */}
            <Route path='/books' element={<Books />} />
            <Route path='/history' element={<History />} />
            <Route path='/checkin' element={<Checkin />} />
            <Route path='/userCreation' element={<UserCreation />} />
            <Route path='/bookCreation' element={<BookCreation />} />
          </Route>
        </Routes>}
      { !localStorage.getItem('userId') && <Login onSubmit={fnValidation} />}
    </>
  )
}

export default App;