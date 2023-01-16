import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button as RSButton, } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserLoginForm from "../forms/UserLoginForm";
import { UserContext } from "../App";

const UserModal = () => {

  const {userId, setUserId, userName, setUserName} = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('token');
    setUserId('');
    setUserName('');
  };

  console.log('userId: ', userId)

  const Protected = () => {
  return(
    // components: favorites, logout
    <Container className="text-center">
      <Row>
        <Col>
        <Link to={`./favorites`}>
          <h3>Favorites</h3>
        </Link>
        </Col>
      </Row>
      <Row className="justify-content-center my-3">
        <Col md="4" >
        <RSButton type="submit" onClick={logout} color="primary">
          logout
        </RSButton>
        </Col>
      </Row>
    </Container>
  )
  }




  return(
    <Container>
      <Row>
        { userId ? < Protected /> : < UserLoginForm /> }
      </Row>
    </Container>
    
  )
}

export default UserModal