import { useState, useContext } from "react";
import { FormGroup, Label, Button, Col, Row, Container, Modal, ModalHeader, ModalFooter, ModalBody, Input, Alert } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { Divider } from "@mui/material";
import axios, { Axios } from "axios";
import { UserContext } from "../App";
import { loginSchema, registerSchema } from "./validations";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrands, faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import defaultAvatar from '../../app/assets/img/unicorn.png';
import { backendUrl, siteUrl } from "../config";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const UserLoginForm = () => {
  const { userId, setUserId, userName, setUserName } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();
  console.log("location", location)

  const [currentUrl, setCurrentUrl] = useState(location.pathname)
  const [ incorrectLogin, setIncorrectLogin ] = useState(false)

  const [resetModal, setResetModal] = useState(false)
  const resetToggle = () => setResetModal(!resetModal) 

  const [ showPassword, setShowPassword ] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [ showRegisterPassword, setShowRegisterPassword ] = useState(false)
  const handleClickShowRegisterPassword = () => setShowRegisterPassword((show) => !show);
  const [ showRegisterConfirmPassword, setShowRegisterConfirmPassword ] = useState(false)
  const handleClickShowRegisterConfirmPassword = () => setShowRegisterConfirmPassword((show) => !show);

  const [passwordNotMatch, setPasswordNotMatch] = useState(false)

  const resetEmailNotify = (responseMessage) => 
  toast.success(`${responseMessage}`, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const initialValuesLogin = {

    username: "",
    password: "",
  };

  const initialValuesRegister = {
    registerusername: "",
    registerpassword: "",
    useremail: "",
    confirmpassword: "",
  };

  const handleLoginSubmit = async (values) => {
    try {
      console.log("post values: " + JSON.stringify(values));
      await axios
        .post(`${backendUrl}/api/users/login`, values)
        .then((user) => {
          console.log("user: ", user);
          localStorage.setItem("token", user.data.token);
          setUserName(user.data.userName);
          setUserId(user.data.userId);
          setIncorrectLogin(false)
          navigate(currentUrl);
          console.log("login username: ", userName)
        });
    } catch (error) {
      setIncorrectLogin(true)
      console.error(error);
    }
  };

  const handleRegisterSubmit = async (values) => {
    if (values.registerpassword !== values.confirmpassword) {
      setPasswordNotMatch(true)
    } else {
      setPasswordNotMatch(false)
    try {
      console.log("post values: " + JSON.stringify(values));
      await axios
        .post(`${backendUrl}/api/users/signup`, values)
        .then( async (user) => {
          console.log("user: ", user);
          localStorage.setItem("token", user.data.token);
          setUserName(user.data.userName);
          setUserId(user.data.userId);
        });
    } catch (error) {
      console.error(error);
    }
  }};

  const handleResetSubmit = async (resetEmail) => {
    try {
      console.log("resetEmail post: ", resetEmail)
      await axios
        .post(`${backendUrl}/api/users/profile/resetuserpassword`, 
        {'resetemail': resetEmail})
        .then((reset) => {
          console.log(reset)
          resetEmailNotify(reset.data)
          resetToggle()
          })
    } catch (error) {
      console.error(error);
    }
  }

  // const facebookLogin = async () => {
  //   let facebook = await axios.get(`${backendUrl}/api/users/login/facebook`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   return facebook;
  //   }

    const facebookLogin = async () => {
      await window.open(`${backendUrl}/api/users/login/facebook`,"_self")
      console.log("test")
    };

  const googleLogin = async () => {
    await window.open(`${backendUrl}/api/users/login/google`,"_self")
    console.log("test")
  };

  const LoginErrorMsg = () => {
    return(
      <h5 className="text-danger" >Incorrect username or password</h5>
    )
  }

  const ResetModalComponent = () => {
    const [resetEmail, setResetEmail] = useState("")
    return(
      <Modal isOpen={resetModal} toggle={resetToggle}>
        <ModalHeader>
          <h5>If the email submitted has a registered account you will receive your username and a link to reset your password</h5>
        </ModalHeader>
        <ModalBody>
          <Input
          onChange={(e) => setResetEmail(e.target.value)}
          placeholder="AwesomeName@email.com"
          />
          <div className="mt-2 text-center">
          <Button onClick={() => handleResetSubmit(resetEmail)} color="primary" size="lg">
            Request Email
          </Button>
          </div>
        </ModalBody>
      </Modal>
    )
  }

  return (
    <Container>
      <ToastContainer />
      <Formik
        initialValues={initialValuesLogin}
        onSubmit={handleLoginSubmit}
        validationSchema={loginSchema}
        //validate={validateLoginForm}
      >
        <Form>
          {incorrectLogin ? <LoginErrorMsg /> : null}
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
              <div style={{whiteSpace: 'nowrap'}}>
              <Field
                className="form-control"
                name="password"
                placeholder="password"
                type={showPassword ? 'text' : 'password'}
                style={{width: '92%', display: 'inline-block'}}
              />
              <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              style={{display: 'inline-block'}}
             >
               {showPassword ? <VisibilityOff /> : <Visibility />}
             </IconButton>
              </div>
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
            {/* <FormGroup className="d-flex justify-content-around">
              <Button onClick={facebookLogin} color="primary" className="col-5" size="lg">
              <FontAwesomeIcon icon={faFacebook} className='me-2 text-nowrap' /> Facebook 
              </Button>
              <Button onClick={googleLogin} color="primary" className="col-5" size="lg">
              <FontAwesomeIcon icon={faGoogle} className='me-2 text-nowrap'  /> Google
              </Button>
            </FormGroup> */}
          </div>
        </Form>
      </Formik>
      <div className="text-center">
      <Button onClick={resetToggle} color="link" >
          Forgot username or password?
      </Button>
      <ResetModalComponent />
      </div>

      <Row className="text-center mt-2">
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
              <Label htmlFor="registerusername">Username</Label>
              <Field
                className="form-control"
                name="registerusername"
                placeholder="johndoe"
              />
              <ErrorMessage name="registerusername">
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
              <Label htmlFor="registerpassword">Password</Label>
              <div style={{whiteSpace: 'nowrap'}}>
              <Field
                className="form-control"
                name="registerpassword"
                placeholder="password"
                type={showRegisterPassword ? 'text' : 'password'}
                style={{width: '92%', display: 'inline-block'}}
              />
              <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowRegisterPassword}
              style={{display: 'inline-block'}}
             >
               {showRegisterPassword ? <VisibilityOff /> : <Visibility />}
             </IconButton>
              </div>
              <ErrorMessage name="registerpassword">
                {(msg) => <p className="text-danger">{msg}</p>}
              </ErrorMessage>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col>
              <Label htmlFor="confirmpassword">Confirm Password</Label>
              <div style={{whiteSpace: 'nowrap'}}>
              <Field
                className="form-control"
                name="confirmpassword"
                placeholder="confirm password"
                type={showRegisterConfirmPassword ? 'text' : 'password'}
                style={{width: '92%', display: 'inline-block'}}
              />
              <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowRegisterConfirmPassword}
              style={{display: 'inline-block'}}
             >
               {showRegisterConfirmPassword ? <VisibilityOff /> : <Visibility />}
             </IconButton>
             </div>
              <ErrorMessage name="confirmpassword">
                {(msg) => <p className="text-danger">{msg}</p>}
              </ErrorMessage>
              {passwordNotMatch ? <p className="text-danger">Passwords Must Match</p> : null}
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
            {/* <FormGroup className="d-flex justify-content-around">
              <Button onClick={facebookLogin} color="primary" className="col-5" size="lg">
              <FontAwesomeIcon icon={faFacebook} className='me-2 text-nowrap' /> Facebook 
              </Button> */}
              {/* <Button onClick={googleLogin} color="primary" className="col-5" size="lg">
              <FontAwesomeIcon icon={faGoogle} className='me-2 text-nowrap'  /> Google
              </Button>       */}
              {/* <a href={`${backendUrl}/api/users/login/google`} class='btn btn-danger' >sign in with google</a>
            </FormGroup> */}
            <div>
            {/* <h5>Google and Facebook Oauth currently for test users only</h5>     */}
            </div>
          </div>
        </Form>
      </Formik>
    </Container>
  );
};

export default UserLoginForm;
