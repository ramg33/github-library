import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { useRef } from 'react';

import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({onSubmit}) => {
  const userName = useRef();
  const password = useRef();

  const validate = (e) => {
    e.preventDefault();
    if (!userName.current.value) {
      alert('Enter the user');
      return;
    };
    
    if (!password.current.value) {
      alert('Enter the password');
      return;
    }
    onSubmit(userName.current.value.trim(), password.current.value.trim());
  }

  return (
      <div className="App">
        <h2 className='signin-title'>Sign In</h2>
        <Form className="form">
          <FormGroup>
            <Label for="name" className='label-name'>Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Insert the name"
              innerRef={userName}
            />
              <Label for="password" className='label-name'>Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Insert the password"
              innerRef={password}
            />
          </FormGroup>
        <Button color="primary" className="btn btn-primary" onClick={validate}>Submit</Button>
      </Form>
    </div>
  )
}
export default Login