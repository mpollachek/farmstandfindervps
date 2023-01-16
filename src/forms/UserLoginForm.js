import { useState, useContext } from 'react';
import {
    FormGroup,
    Label,
    Button,
    Col,
    Row,
    Container
} from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Divider } from '@mui/material';
import axios, { Axios } from 'axios';
import { UserContext } from "../App";
//import defaultAvatar from '../../app/assets/img/unicorn.png';
//import { validateUserLoginForm } from '../../utils/validateUserLoginForm';

const UserLoginForm = () => {

  const {userId, setUserId, userName, setUserName} = useContext(UserContext);

  const initialValuesLogin = {
    username: "",
    password: "",
  }

  const initialValuesRegister = {
    username: "",
    password: "",
    useremail: "",
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

  const handleRegisterSubmit = async (values) => {
    try {
      console.log("post values: " + JSON.stringify(values));
      await axios.post(`http://localhost:8080/api/users/signup`, values)
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
    <Container>
    <Formik
      initialValues={initialValuesLogin}        
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

    <Row className='text-center'>
      <h3>Not Registered?</h3>
    </Row>

    <Formik
    initialValues={initialValuesRegister}        
    onSubmit={handleRegisterSubmit}
    //validate={validateRegisterForm}
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
            <Label htmlFor="useremail">Email</Label>
            <Field
              className="form-control"
              name="useremail"
              placeholder="johndoe@email.com"
            />
            <ErrorMessage name="useremail">
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
            Register New Account
            </Button>
          </Col>
        </FormGroup>
        <h1>OAUTH</h1>
        </div>
      </Form>
    </Formik>
    </Container>


  )
}

export default UserLoginForm;