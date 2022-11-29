import { useState, useEffect, createContext } from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button as RSButton,
  Row,
  InputGroup,
  Input,
  Container,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader
} from 'reactstrap';
import { renderToStaticMarkup } from "react-dom/server";
import L, { divIcon, InvalidateSizeOptions } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  LayersControl,
  useMap,
  useMapEvent,
  LayerGroup,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import Control from "react-leaflet-custom-control";
import { Button } from "@mui/material";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import AgricultureIcon from '@mui/icons-material/Agriculture';
import "leaflet/dist/leaflet.css";
import '../css/MapsPage.css';
import { rgba } from "@react-spring/shared";
import MapList from "./MapList";
import CreateListingForm from "../forms/CreateListingForm";
import NewFarmstand from "../components/NewFarmstand";
import { Link } from "react-router-dom";
import SheepLogo from '../assets/sheep.jpg';
//import FormModal from "../../components/FormModal";
import Header from "../components/Header";
import Header2 from "../components/Header2";
import Sidebar from "../sidebar/Sidebar";

const { BaseLayer } = LayersControl;

function Map() {
  
  const [myLocation, setMyLocation] = useState([51.505, -0.09]);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);

  const [offcanvas, setOffcanvas] = useState(false);
  const toggleOffcanvas = () => setOffcanvas(!offcanvas);

  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  // const changeLat = (newLat) => {
  //   setLat(newLat);
  // }

  // const changeLong = (newLong) => {
  //   setLat(newLong);
  // }

  const useLocation = () => {
    const map = useMap();
    map.locate();
    console.log("testing")
    console.log("map.locate.latlng.lat: " + map.locate.latlng.lat);
  }

  function ChangeMapView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
  }

  const ChangeMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setMyLocation([lat, long]);
        console.log("2: " + myLocation);
      });
    }
  }

  console.log("1: " + myLocation);
  console.log("Lat: " + lat);
  console.log("long: " + long);

  useEffect(() => {
    ChangeMyLocation()
  }, []);

  return (
    <Container >
      <Row className="map-wrapper">
        {/* <Header /> */}
    <MapContainer
      center={myLocation}
      zoom={13}
    >      
    
      <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
          />
      
          
          
      {/* <Control prepend position='topright' style={{marginTop: '0px'}}>
          <div className='map-list' >
          <Link to="/farmstands">
          <RSButton color='primary' size='lg' style={{opacity: '80%', width: '200px'}}>
            List View
          </RSButton>
          </Link>
          </div>
      </Control> */}

      {/* <LayersControl position='topright'>     
        <LayersControl.Overlay checked name='farmstands'> */}
          <LayerGroup>
            <MapList />
          </LayerGroup>
        {/* </LayersControl.Overlay> 
      </LayersControl> */}

      {/* <Control prepend position="topright" >
      <Link to="/">
        <img 
          src={SheepLogo}
          alt="Farmstand Finder Logo"
          className="brand-map"
        />
      </Link>
      </Control> */}

      <Control prepend position="bottomright">
        <Button
          onClick={() => {
            ChangeMyLocation()
          }}
          color="inherit"
        >
          <ChangeMapView coords={myLocation} />
          <LocationSearchingIcon
            style={{ backgroundColor: "white", fontSize: "40" }}
          />
        </Button>
      </Control>
      <Control prepend position="bottomleft">
        {/* Button/Modal for share a farmstand */}
        
      <RSButton color="primary" onClick={toggle}>share a farmstand</RSButton>
      <Modal isOpen={modal} toggle={toggle} size='lg'>
        <ModalHeader toggle={toggle} >How will you enter the farmstand's location?</ModalHeader>
        <ModalBody>          
            <NewFarmstand toggle={toggle} toggle2={toggle2} lat={lat} long={long} setLat={setLat} setLong={setLong} />          
        </ModalBody>
      </Modal>

      {/* Modal for createListingForm */}
      <Modal isOpen={modal2} toggle={toggle2} size='lg'>
        <ModalHeader >Modal title 2</ModalHeader>
        <ModalBody>
          <CreateListingForm lat={lat} long={long} />
        </ModalBody>
      </Modal>
      </Control>

      {/* Offcanvas button/wrapper */}
      <Control prepend position='topleft'>
      
      <div>
  <RSButton
    color="primary"
    onClick={toggleOffcanvas}
  >
    Open
  </RSButton>
  <Offcanvas  isOpen={offcanvas} toggle={toggleOffcanvas}>
    <OffcanvasHeader toggle={toggleOffcanvas}>
      Offcanvas
    </OffcanvasHeader>
    <OffcanvasBody>
      <strong>
        This is the Offcanvas body.
      </strong>
      <Sidebar />
    </OffcanvasBody>
  </Offcanvas>
</div>

      </Control>

    </MapContainer>
    </Row>
    </Container>
  );
}

export default Map;
