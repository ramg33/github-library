import { useRef } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Col,
  Input,
  Form,
  Button,
  Label
} from 'reactstrap';
import Select from 'react-select'

import './components.css';

const UserForm = ({option = 'I', currentUser, onSave, roles}) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  let roleRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const firstName =  firstNameRef.current.value ? firstNameRef.current.value.trim() : '';
    const lastName = lastNameRef.current.value ? lastNameRef.current.value.trim() : '';
    const email = emailRef.current.value ? emailRef.current.value.trim() : '';
    const roleId = roleRef.props.value ? roleRef.props.value.value : 0;
    const userName = userNameRef.current.value ? userNameRef.current.value.trim() : '';
    const password = passwordRef.current.value ? passwordRef.current.value.trim() : '';

    if (!firstName) {
      alert('The fisrt name is required!');
      return;
    }
    if (!lastName) {
      alert('The last name is required!');
      return;
    }
    if (!email) {
      alert('The email is required!');
      return;
    }
    if (!roleId) {
      alert('The role year must be selected!');
      return;
    }
    if (!userName) {
      alert('The user name is required!');
      return;
    }
    if (!password) {
      alert('The password is required!');
      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      roleId,
      userName,
      password
    };
    firstNameRef.current.value = '';
    lastNameRef.current.value = '';
    emailRef.current.value = '';
    roleRef = null;
    userNameRef.current.value = '';
    passwordRef.current.value = '';
    onSave(newUser, option);
  }

  const handleCancel = (e) => {
    e.preventDefault();
  }

  const rolesCombo = roles.map(({id, name}) => ({
    value: id,
    label: name
  }));

  rolesCombo.unshift({ value: '', label: 'Select...' });

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>
          User
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit} >

          <FormGroup row>
            <Label sm='3' for='title'> First name </Label>
            <Col sm='9'>
              <Input type='text' id='title' placeholder='Insert the fisrt name' innerRef={firstNameRef} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm='3' for='Author'> Last name </Label>
            <Col sm='9'>
              <Input type='text' id='author' placeholder='Insert the last name' innerRef={lastNameRef} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm='3' for='publishedYear'> Email </Label>
            <Col sm='9'>
              <Input type='numeric' id='publishedYear' placeholder='Insert the ' innerRef={emailRef} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm='3' for='eikw'> Role </Label>
            <Col sm='9'>
              <Select
                ref={ref => {
                  roleRef = ref
                }}
                id='role'
                isClearable={true}
                // defaultValue={defaultSelect}
                className='react-select'
                classNamePrefix='select'
                options={rolesCombo}
                //onChange={onChangeSelected}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm='3' for='userName'> User Name</Label>
            <Col sm='9'>
              <Input type='text' id='userName' placeholder='Insert the user name' innerRef={userNameRef} />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm='3' for='password'> Password </Label>
            <Col sm='9'>
              <Input type='password' id='password' placeholder='Insert the password' innerRef={passwordRef} />
            </Col>
          </FormGroup>

          <FormGroup className='mb-0' row>
            <Col className='d-flex' md={{ size: 9, offset: 3 }}>
              <Button className='mr-1 space_elements' color='primary' type='submit'>
                {option === 'I' ? 'Add' : 'Save'}
              </Button>
              <Button outline className='mr-1' color='secondary' type='button' onClick={handleCancel}>
                Cancel
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  )
}

export default UserForm;