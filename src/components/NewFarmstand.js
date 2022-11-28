import { useState, useEffect } from "react";
import { useMapEvents, useMap } from "react-leaflet";
import CreateListingForm from "../forms/CreateListingForm";
import {
  Container,
  Button,
  Label,
  Col,
  FormGroup,
  Input,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { LatLongContext } from '../maps/Map';

//create modal with "select location on map", "Use Address" or use current location
//if "select location" modal closes and user clicks location - lat long go to createlisting form with latlong true and address false
//if "use address" modal closes and go to createlistingform with address true and latlong false
//if "use current location" run the navigator.geolocation.getCurrentPosition function in the changeMyLocation function

const NewFarmstand = ({ toggle, toggle2, lat, long, setLat, setLong }) => {

  // const [newLat, setNewLat] = value;
  // const [newLong, setNewLong] = value2;

// const NewFarmstand = ({ useChooseLocation, }) => {

  const map = useMap();  
  
  // for reference:
  // const shareWithLocation = useMapEvents({
  //   click: () => {
  //     shareWithLocation.locate();
  //   },
  //   locationfound: (e) => {
  //     console.log(e.latlng.lat);
  //     console.log(e.latlng.lng);
  //     setLat(e.latlng.lat);
  //     setLong(e.latlng.lng);
  //   },
  // });


  function handleClick(e) {  
    console.log('Button clicked');    
      console.log(e.latlng.lat);
      console.log(e.latlng.lng);
      setLat(e.latlng.lat);
      setLong(e.latlng.lng);
      console.log("lat: " + lat);
      console.log("long: " + long);
      map.removeEventListener('click', handleClick);
      toggle2();
  }
  
  const chooseLocation = () => {
    toggle();    
    map.addEventListener('click', handleClick); 
  }

  const currentLocation = () => {
    toggle();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    }
    toggle2();
  }

  const chooseAddress = () => {
    toggle();
    setLat('');
    setLong('');
    toggle2();
  }

      return (
        <Container>
          <Row>
            <Col md="4">
              <h2>Choose Location on Map</h2>
              <br />
              <Button onClick={chooseLocation} color="primary">Choose Location</Button>
            </Col>
            <Col md="4">
              <h2>Use Current Location</h2>
              <br />
              <Button onClick={currentLocation} color="primary">Current Location</Button>
            </Col>
            <Col md="4">
              <h2>Choose Location on Map</h2>
              <br />
              <Button onClick={chooseAddress} color="primary">Input Address</Button>
            </Col>

          </Row>
        </Container>
      );    
};

export default NewFarmstand;
