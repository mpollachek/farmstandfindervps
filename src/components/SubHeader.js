import {
  Col,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Button as RSButton,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext, MapContext } from "../App";
import { IconButton, Divider } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserLoginForm from "../forms/UserLoginForm";
import UserModal from "../user/UserModal";

const SubHeader = ({ current, detail, avgRating }) => {

  const { userId, setUserId, userName, setUserName } = useContext(UserContext);
  const { mapCenter } = useContext(MapContext)

  const [profileModal, setProfileModal] = useState(false);
  const profileToggle = () => setProfileModal(!profileModal);

  //const mapCenter = useContext(MapCenterContext);

  // Need to bring map center into subheader so that when map view is clicked, center of map can remain the same
  console.log("avgRating: ", avgRating)

  return (
    <Row style={{ marginTop: "1%" }}>
      <Col md={4}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to='/'>Map</Link>
          </BreadcrumbItem>
          {detail && (
            <BreadcrumbItem>
              <Link to="/farmstands">Farmstands</Link>
            </BreadcrumbItem>
          )}
          <BreadcrumbItem active>{current}</BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Col className="col-8">
            <h3>{current}</h3>
            </Col>
            <Col className="text-end">
            {avgRating > 0 ? (
                <h4>
                <StarIcon style={{color: '#f79707', fontWeight: 'bold'}}  /> {avgRating}
                </h4>
              ) : null}
          </Col>
        </Row>
      </Col>
      <Col md={4} className="text-center">
        <div>
          <Link to="/">
            <RSButton
              color="primary"
              size="lg"
              style={{ opacity: "80%", width: "200px" }}
            >
              Map View
            </RSButton>
          </Link>
        </div>
      </Col>
      <Col md={4} className='text-center'>
        
      <IconButton onClick={profileToggle}>
              <AccountCircleIcon
                color="primary"
                style={{fontSize: '2.5em'}}
              />
            </IconButton>
            <Divider />
            <Modal isOpen={profileModal} toggle={profileToggle}>
              {userName ? (
                <ModalHeader toggle={profileToggle}>
                  Hi {`${userName}`}!
                </ModalHeader>
              ) : (
                <ModalHeader toggle={profileToggle}>Welcome!</ModalHeader>
              )}

              <ModalBody>
                {/* Put everything in this modal into 1 imported component-change name from protected  */}

                {/* { userId ? <Protected /> : <UserLoginForm /> } */}
                <UserModal />

                {/* <UserLoginForm /> */}
              </ModalBody>
              <ModalFooter className="text-center"></ModalFooter>
            </Modal>

      </Col>
      <hr />
    </Row>
  );
};

export default SubHeader;
