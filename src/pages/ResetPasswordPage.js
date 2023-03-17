import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Input, Button } from 'reactstrap'
import { useState } from 'react'
import { backendUrl } from "../config";
import SubHeader from '../components/SubHeader';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordPage = () => {

  const { userId } = useParams();

  const [ resetUserPassword, setResetUserPassword ] = useState("")

  const [ showPassword, setShowPassword ] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();

  const resetResetNotify = (responseMessage) => 
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

  const handleResetSubmit = async (resetUserPassword) => {
    try {
      console.log("resetEmail post: ", resetUserPassword)
      await axios
        .put(`${backendUrl}/api/users/profile/resetuserpassword/${userId}`, 
        {'resetUserPassword': resetUserPassword})
        .then((reset) => {
          resetResetNotify(reset.data)
          navigate("/")
        })
    } catch (error) {
      console.error(error);
    }
  }

  return(
    <Container className=' text-center' >
      <SubHeader current="Reset Password" detail={false} />
      <ToastContainer />
      <Row className='my-3 text-center' style={{display: 'inline-block'}}>
        <Col>
        <div style={{whiteSpace: 'nowrap'}}>
        <Input
          onChange={(e) => setResetUserPassword(e.target.value)}
          placeholder="New Password"
          type={showPassword ? 'text' : 'password'}
          style={{width: '500px', display: 'inline-block'}}
          />
          <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              style={{display: 'inline-block'}}
             >
               {showPassword ? <VisibilityOff /> : <Visibility />}
             </IconButton>
            </div>
          <div className="mt-3">
          <Button onClick={() => handleResetSubmit(resetUserPassword)} color="primary" size="lg">
            Change Password
          </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ResetPasswordPage