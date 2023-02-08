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
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext, MapContext } from "../App";
import { IconButton, Divider } from "@mui/material";
import '../css/SubHeader.css'
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserLoginForm from "../forms/UserLoginForm";
import UserModal from "../user/UserModal";
import ReactStars from "react-rating-stars-component";
import FarmTypeIcons from "./FarmTypeIcons";

const SubHeader = ({ current, detail, avgRating, farmType, remove, farmstandId }) => {

  const { userId, setUserId, userName, setUserName } = useContext(UserContext);
  const { mapCenter } = useContext(MapContext)

  const [profileModal, setProfileModal] = useState(false);
  const profileToggle = () => setProfileModal(!profileModal);

  //const mapCenter = useContext(MapCenterContext);

  // Need to bring map center into subheader so that when map view is clicked, center of map can remain the same
  console.log("avgRating: ", avgRating)
  console.log("farmType in subheader component: ", farmType)

  const starsRating = {
    name: "rating",
    count: 5,
    color: "black",
    activeColor: "#f79707",
    value: avgRating,
    a11y: true,
    isHalf: true,
    emptyIcon: <StarOutlineIcon className="stars" />,
    halfIcon: <StarHalfIcon className="stars" />,
    filledIcon: <StarIcon className="stars" />,
    edit: false,
  };

  return (
    <Row>
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
          { remove ? (
            <BreadcrumbItem>
            <Link to={`/farmstands/${farmstandId}`}>{current}</Link>
            </BreadcrumbItem> ) : (
            <BreadcrumbItem active >
            {current}
            </BreadcrumbItem>
            )
          }
          
          {remove && (
            <BreadcrumbItem active>removeimages</BreadcrumbItem>
          )}
        </Breadcrumb>
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
    <Row className="text-center" style={{fontWeight: 'bold', fontSize: '2em'}}>
      <Col>
      <div className="title d-inline" >{current}</div>
      {avgRating > 0 ? (
        <div className="title d-inline ms-5"  >
          {avgRating}
          <StarIcon style={{color: "#f79707"}} />
          {/* <ReactStars {...starsRating} className='stars' /> */}
        </div>
        ) : null}
        </Col>
  </Row>
  <Row>
    <FarmTypeIcons farmType={farmType} />
  </Row>
  </Row>
  );
};

export default SubHeader;
