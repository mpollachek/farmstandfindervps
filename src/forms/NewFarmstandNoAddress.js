import { useState, useEffect } from "react";
import { useMapEvents, useMap } from "react-leaflet";
import CreateListingForm from "./CreateListingForm";
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
import { LatLongContext } from "../maps/Map";

//create modal with "select location on map", "Use Address" or use current location
//if "select location" modal closes and user clicks location - lat long go to createlisting form with latlong true and address false
//if "use address" modal closes and go to createlistingform with address true and latlong false
//if "use current location" run the navigator.geolocation.getCurrentPosition function in the changeMyLocation function

const NewFarmstandNoAddress = ({ toggle, toggle2, lat, long, setLat, setLong }) => {

  const map = useMap();

  function handleClick(e) {
    console.log("Button clicked");
    console.log(e.latlng.lat);
    console.log(e.latlng.lng);
    setLat(e.latlng.lat);
    setLong(e.latlng.lng);
    console.log("lat: " + lat);
    console.log("long: " + long);
    map.removeEventListener("click", handleClick);
    toggle2();
  }

  const chooseLocation = () => {
    toggle();
    map.addEventListener("click", handleClick);
  };

  const currentLocation = () => {
    toggle();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    }
    toggle2();
  };

  return (
    <Container>
      <Row className="text-center">
        <Col md="6" className="my-3">
          <h3>Choose Location on Map</h3>

          <Button onClick={chooseLocation} color="primary" className="mt-2">
            Choose Location
          </Button>
        </Col>
        <Col md="6" className="my-3">
          <h3>Use Current Location</h3>

          <Button onClick={currentLocation} color="primary" className="mt-2">
            Current Location
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NewFarmstandNoAddress;
