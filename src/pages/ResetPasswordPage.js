import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Input, Button } from 'reactstrap'
import { useState } from 'react'
import { backendUrl } from "../config";
import SubHeader from '../components/SubHeader';

const ResetPasswordPage = () => {

  const { userId } = useParams();

  const [ resetUserPassword, setResetUserPassword ] = useState("")

  const handleResetSubmit = async (resetUserPassword) => {
    try {
      console.log("resetEmail post: ", resetUserPassword)
      await axios
        .post(`${backendUrl}/api/users/profile/resetuserpassword/${userId}`, 
        {'resetUserPassword': resetUserPassword})
    } catch (error) {
      console.error(error);
    }
  }

  return(
    <Container className=' text-center' >
      <SubHeader current="Reset Password" detail={false} />
      <Row className='my-3 text-center' style={{display: 'inline-block'}}>
        <Col>
        <Input
          onChange={(e) => setResetUserPassword(e.target.value)}
          placeholder="New Password"
          style={{width: '500px'}}
          />
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