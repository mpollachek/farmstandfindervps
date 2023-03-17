import { Row, Col, Container, Button, Input, Label, FormGroup } from 'reactstrap'
import axios from 'axios'
import { UserContext } from "../App";
import { useContext, useState, useEffect } from 'react';
import { backendUrl } from "../config";
import SubHeader from '../components/SubHeader';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { profileSchema } from '../forms/validations'


const ProfilePage = () => {

  const { userName, setUserName, userEmail, setUserEmail, userId, setUserId } = useContext(UserContext);
  const [ runGetUser, setRunGetUser ] = useState(false)

  const [ newUsername, setNewUsername ] = useState("")
  const [ newUseremail, setNewUseremail ] = useState("")
  const [ newUserpassword, setNewUserpassword ] = useState("")
  const [ oldUserpassword, setOldUserpassword ] = useState("")

  const [ changePassword, setChangePassword ] = useState(false)
  const [ showOldPassword, setShowOldPassword ] = useState(false)
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const [ showNewPassword, setShowNewPassword ] = useState(false)
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

  const initialUsernameValues = {
    newUsername: newUsername
  }

  const initialUseremailValues = {
    newUseremail: newUseremail
  }

  const initialUserpasswordValues = {
    newUserpassword: newUserpassword,
    oldUserpassword: oldUserpassword
  }

  const getUser = async () => {
    let token = ""
    if (localStorage.getItem("token")) {
      token = await localStorage.getItem("token");
  }

  if (runGetUser) {
    let getUser = await axios.get(`${backendUrl}/api/users/profile`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    console.log(getUser.data)
    setUserName(getUser.data.username)
    setUserEmail(getUser.data.useremail)
    setUserId(getUser.data._id)
    setRunGetUser(false)
  }
}

  useEffect(() => {
    console.log("setRunGetUser")
    setRunGetUser(true);
  }, []);

  useEffect(() => {
    getUser();
  }, [runGetUser]);

  const changeUsername = async(values) => {
    console.log("username values", values)
    let token = ""
    if (localStorage.getItem("token")) {
      token = await localStorage.getItem("token");
  }
  await axios.put(
    `${backendUrl}/api/users/profile/changeusername`,
        {
          newUsername: values.newUsername,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setUserName(values.newUsername);
  }

  const changeUseremail = async(values) => {
    let token = ""
    if (localStorage.getItem("token")) {
      token = await localStorage.getItem("token");
  }
  await axios.put(
    `${backendUrl}/api/users/profile/changeuseremail`,
        {
          newUseremail: values.newUseremail,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setUserEmail(values.useremail);
  }

  const changeUserpassword = async(values) => {
    let token = ""
    if (localStorage.getItem("token")) {
      token = await localStorage.getItem("token");
  }
  await axios.put(
    `${backendUrl}/api/users/profile/changeuserpassword`,
        {
          newUserpassword: values.newUserpassword,
          oldUserpassword: values.oldUserpassword
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
  }

  return(
    <Container>
      <SubHeader current="Profile" detail={false} />
      <Formik
        onSubmit={changeUsername}
        validationSchema={profileSchema}
        initialValues={initialUsernameValues}
      >
        <Form>
      <Row className='my-2'>
        <Col sm={{size: 6}}>
          <h5>Display Name: {userName}</h5>
        </Col>
        <Col sm={{size: 6}}>
          <Field name="newUsername" className='me-3' type="username"
          sx={{ width: '25ch' }}
          />          
          <Button
          type="submit"
          color="success"
          >Change Display Name</Button>
          <ErrorMessage name="newUsername">
                {(msg) => <p className="text-danger">{msg}</p>}
          </ErrorMessage>
        </Col>
      </Row>
      </Form>
      </Formik>
      <br/>
      <Formik
        onSubmit={changeUseremail}
        validationSchema={profileSchema}
        initialValues={initialUseremailValues}
      >
        <Form>
      <Row className='my-2'>
        <Col sm={{size: 6}}>
          <h5>Email Address: {userEmail}</h5>
        </Col>
        <Col sm={{size: 6}}>
          <Field type="text" name="newUseremail" className='me-3'
          sx={{ width: '25ch' }}
          />          
          <Button
          type="submit"
          color="success"
          >Change Email Address</Button>
          <ErrorMessage name="newUseremail">
                {(msg) => <p className="text-danger">{msg}</p>}
          </ErrorMessage>
        </Col>
      </Row>
      </Form>
      </Formik>
      <br/>
      <Formik
        onSubmit={changeUserpassword}
        validationSchema={profileSchema}
        initialValues={initialUserpasswordValues}
      >
        <Form>
      <Row className='my-2'>
        <Col sm={{size: 6}}>
          <h5>Password</h5>
        </Col>
        { changePassword ? 
        <Col sm={{size: 6}}>
        <InputLabel htmlFor="old-password">Old Password</InputLabel>
        <div style={{whiteSpace: 'nowrap'}}>
        <Field 
        name="oldUserpassword" 
        sx={{ width: '25ch' }}
        id="old-password"
        type={showOldPassword ? 'text' : 'password'}
          />
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowOldPassword}
             >
               {showOldPassword ? <VisibilityOff /> : <Visibility />}
             </IconButton>
             </div>
           <ErrorMessage name="oldUserpassword">
                {(msg) => <p className="text-danger">{msg}</p>}
          </ErrorMessage>
          <br/>
          <InputLabel htmlFor="new-password">New Password</InputLabel>
          <div style={{whiteSpace: 'nowrap'}}>
        <Field name="newUserpassword"  
        sx={{ width: '25ch' }}
        id="new-password"
        type={showNewPassword ? 'text' : 'password'}
        />        
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowNewPassword}
              className='me-3'
            >
              {showNewPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>       
        </div>
        <ErrorMessage name="newUserpassword">
                {(msg) => <p className="text-danger">{msg}</p>}
        </ErrorMessage>
        <Button
        type="submit"
        color="success"
        >Change Password</Button>
        <Button
          onClick={() => setChangePassword(!changePassword)}
          color="danger"
          >Cancel</Button>
      </Col>
      :
      <Col sm={{size: 6}}>
        <Button
        onClick={() => setChangePassword(!changePassword)}
        color="success"
        >Change Password</Button>
        </Col>
        }        
      </Row>
      </Form>
      </Formik>
      </Container>
  )
}

export default ProfilePage