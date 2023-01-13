import { useState, useContext } from 'react';
import {
    FormGroup,
    Label,
    Button,
    Col,
} from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Divider } from '@mui/material';
import axios, { Axios } from 'axios';
import { UserContext } from "../maps/Map";
//import defaultAvatar from '../../app/assets/img/unicorn.png';
//import { validateUserLoginForm } from '../../utils/validateUserLoginForm';

const UserLoginForm = () => {

  const {userId, setUserId, userName, setUserName} = useContext(UserContext);

  const initialValues = {
    username: "",
    password: "",
  }

  const handleLoginSubmit = async (values) => {
    try {
      console.log("post values: " + JSON.stringify(values));
      await axios.post(`http://localhost:8080/api/users/login`, values)
      .then((user) => {
        console.log("user: ", user);
        localStorage.setItem('token', user.data.token)
        setUserName(user.data.userName);
        setUserId(user.data.userId);
      })
    } catch (error) {
      console.error(error)
    }
  }

  return(
    
    <Formik
      initialValues={initialValues}        
      onSubmit={handleLoginSubmit}
      //validate={validateLoginForm}
    >
      <Form>
        <FormGroup row>
          <Col>
            <Label htmlFor="username">Username</Label>
            <Field
              className="form-control"
              name="username"
              placeholder="johndoe"
            />
            <ErrorMessage name="username">
              {(msg) => <p className="text-danger">{msg}</p>}
            </ErrorMessage>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col>
            <Label htmlFor="password">Password</Label>
            <Field
              className="form-control"
              name="password"
              placeholder="password"
            />
            <ErrorMessage name="password">
              {(msg) => <p className="text-danger">{msg}</p>}
            </ErrorMessage>
          </Col>
        </FormGroup>
        <div className='text-center'>
        <FormGroup row>
          <Col >
            <Button type="submit" color="primary" size='lg'>
              Login
            </Button>
          </Col>
        </FormGroup>
        <h1>OAUTH</h1>
        </div>
      </Form>
    </Formik>


  )
}

export default UserLoginForm;