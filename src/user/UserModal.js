import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button as RSButton, } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserLoginForm from "../forms/UserLoginForm";
import { UserContext } from "../maps/Map";

const UserModal = () => {

  const {userId, setUserId, userName, setUserName} = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('token');
    setUserId('');
  };

  console.log('userId: ', userId)

  const Protected = () => {
  return(
    // components: favorites, logout
    <Container className="text-center">
      <Row>
        <Link to={`./favorites`}>
          <h3>Favorites</h3>
        </Link>
      </Row>
      <Row>
        <RSButton type="submit" onClick={logout}>
          logout
        </RSButton>
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