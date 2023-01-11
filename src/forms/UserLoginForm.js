import { useState } from 'react';
import {
    FormGroup,
    Label,
    Button,
    Col,
} from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Divider } from '@mui/material';
import axios, { Axios } from 'axios';
//import defaultAvatar from '../../app/assets/img/unicorn.png';
//import { validateUserLoginForm } from '../../utils/validateUserLoginForm';

const UserLoginForm = () => {

  const initialValues = {
    useremail: "",
    password: "",
  }

  const handleLoginSubmit = async (values) => {
    try {
      await axios.post(`http://localhost:8080/api/users/login`, values)
      .then((response) => {
        console.log("post: " + JSON.stringify(values));
        console.log("response: " + JSON.stringify(response));
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