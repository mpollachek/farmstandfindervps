import { useState, useContext } from "react";
import { FormGroup, Label, Button, Col, Row, Container } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { Divider } from "@mui/material";
import axios, { Axios } from "axios";
import { UserContext } from "../App";
import { loginSchema, registerSchema } from "./validations";
//import defaultAvatar from '../../app/assets/img/unicorn.png';
//import { validateUserLoginForm } from '../../utils/validateUserLoginForm';

const UserLoginForm = () => {
  const { userId, setUserId, userName, setUserName } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();
  console.log("location", location)

  const siteUrl = 'http://localhost:3000'

  const [currentUrl, setCurrentUrl] = useState(location.pathname)

  const initialValuesLogin = {

    username: "",
    password: "",
  };

  const initialValuesRegister = {
    username: "",
    password: "",
    useremail: "",
  };

  const handleLoginSubmit = async (values) => {
    try {
      console.log("post values: " + JSON.stringify(values));
      await axios
        .post(`http://localhost:8080/api/users/login`, values)
        .then((user) => {
          console.log("user: ", user);
          localStorage.setItem("token", user.data.token);
          setUserName(user.data.userName);
          setUserId(user.data.userId);
          navigate(currentUrl);
          console.log("login username: ", userName)
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegisterSubmit = async (values) => {
    try {
      console.log("post values: " + JSON.stringify(values));
      await axios
        .post(`http://localhost:8080/api/users/signup`, values)
        .then((user) => {
          console.log("user: ", user);
          localStorage.setItem("token", user.data.token);
          setUserName(user.data.userName);
          setUserId(user.data.userId);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // const facebookLogin = async () => {
  //   let facebook = await axios.get(`http://localhost:8080/api/users/login/facebook`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   return facebook;
  //   }

    const facebookLogin = async () => {
      await window.open(`http://localhost:8080/api/users/login/facebook`,"_self")
      console.log("test")
    };

  const googleLogin = async () => {
    await window.open("http://localhost:8080/api/users/login/google","_self")
    console.log("test")
  };
  

  return (
    <Container>
      <Formik
        initialValues={initialValuesLogin}
        onSubmit={handleLoginSubmit}
        validationSchema={loginSchema}
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
          <div className="text-center">
            <FormGroup row>
              <Col>
                <Button type="submit" color="primary" size="lg">
                  Login
                </Button>
              </Col>
            </FormGroup>
            <FormGroup>
              <Button onClick={facebookLogin} >
                Facebook
              </Button>
              <Button onClick={googleLogin} >
                Google
              </Button>
            </FormGroup>
          </div>
        </Form>
      </Formik>

      <Row className="text-center">
        <h3>Not Registered?</h3>
      </Row>

      <Formik
        initialValues={initialValuesRegister}
        onSubmit={handleRegisterSubmit}
        validationSchema={registerSchema}
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
              <ErrorMessage name="confirmPassword">
                {(msg) => <p className="text-danger">{msg}</p>}
              </ErrorMessage>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Field
                className="form-control"
                name="confirmPassword"
                placeholder="confirm password"
              />
              <ErrorMessage name="confirmPassword">
                {(msg) => <p className="text-danger">{msg}</p>}
              </ErrorMessage>
            </Col>
          </FormGroup>
          <div className="text-center">
            <FormGroup row>
              <Col>
                <Button type="submit" color="primary" size="lg">
                  Register New Account
                </Button>
              </Col>
            </FormGroup>
            <h1>OAUTH</h1>
          </div>
        </Form>
      </Formik>
    </Container>
  );
};

export default UserLoginForm;
