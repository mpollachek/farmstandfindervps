import { useState, useEffect, createContext, useMemo } from "react";
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
// import { rgba } from "@react-spring/shared";
import MapList from "./MapList";
import CreateListingForm from "../forms/CreateListingForm";
import NewFarmstand from "../forms/NewFarmstand";
import { Link } from "react-router-dom";
import SheepLogo from '../assets/sheep.jpg';
//import FormModal from "../../components/FormModal";
import Header from "../components/Header";
import Header2 from "../components/Header2";
import Sidebar from "../sidebar/Sidebar";
import { selectAllFarmstands } from "../farmstands/farmstandFilter";

const { BaseLayer } = LayersControl;

function Map() {
  
  //const [myLocation, setMyLocation] = useState({lat: 51.505, lng: -0.09});
  const [myLocation, setMyLocation] = useState([51.505, -0.09]);

  const [runGet, setRunGet] = useState(false);
  const [boundsDistance, setBoundsDistance] = useState(30000);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);

  const [offcanvas, setOffcanvas] = useState(false);
  const toggleOffcanvas = () => setOffcanvas(!offcanvas);

  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const [moved, setMoved] = useState(false);
  const [distance, setDistance] = useState(null);

  const [farmstands, setFarmstands] = useState([]);

  //const [mapCenter, setMapCenter] = useState({lat: 51.505, lng: -0.09})
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);

  // sidebar states:
  const [sidebarProducts, setSidebarProducts] = useState([]);
  const [sidebarSeasons, setSidebarSeasons] = useState("yearRound");
  const [sidebarSearch, setSidebarSearch] = useState("");
  console.log("intial sidebarProducts: ", sidebarProducts);
  console.log("type sidebarProducts: ", typeof(sidebarProducts) );
  console.log("intial sidebarSeasons: ", sidebarSeasons);
  console.log("type sidebarSeasons: ", typeof(sidebarSeasons) );


  const getFarmstands = async () => {
    console.log("runGet: ", runGet)
    console.log("get lat: ", mapCenter[0]); 
    console.log("get lng: ", mapCenter[1]);
    console.log("maps get farmstands type: ", typeof(getFarmstands))
    console.log("getFarmstands sidebarProducts: ", sidebarProducts)
    if (runGet) {
    //const allFarms = await selectAllFarmstands(mapCenter.lat, mapCenter.lng);
    const allFarms = await selectAllFarmstands(mapCenter[0], mapCenter[1], boundsDistance, sidebarProducts, sidebarSeasons);
    setFarmstands(allFarms);
    console.log("current farmstands: ", allFarms);
    console.log("JSON stringify current farmstands: ", JSON.stringify(allFarms));
    setRunGet(false);
  }} 

  function ChangeMapView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    const currentBounds = map.getBounds();
    console.log("currentBounds._southwest ", currentBounds._southWest);
    setBoundsDistance(map.distance(currentBounds._northEast, currentBounds._southWest));
    console.log("boundsDistance: " + boundsDistance);
    console.log("setting view")
    console.log("coords: ", coords)
    // setMyLocation({lat: coords.lat, lng: coords.lng});
    // setMapCenter({lat: coords.lat, lng: coords.lng});
    return null;
  }

  const ChangeMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        // const lat = position.coords.latitude;
        // const long = position.coords.longitude;
        console.log("position.coords.latitude: ", position.coords.latitude)
        setMapCenter([position.coords.latitude, position.coords.longitude]);
        console.log("2: ",  mapCenter);
      });
    }
  }

  const MapMoveEventDrag = () => {
    const mapMoveEnd = useMapEvent('dragend', () => {
      setMapCenter([mapMoveEnd.getCenter().lat, mapMoveEnd.getCenter().lng ]);
      console.log("get bounds: " + JSON.stringify(mapMoveEnd.getBounds()));
      setMoved(true);      
      console.log("moved: " + moved);
      const currentBounds = mapMoveEnd.getBounds();
      console.log("currentBounds._southwest ", currentBounds._southWest);
      setBoundsDistance(mapMoveEnd.distance(currentBounds._northEast, currentBounds._southWest));
      //setMapCenter(mapMoveEnd.getCenter());      
      console.log("currentBounds: ", currentBounds);
      console.log("boundsDistance: " + boundsDistance);
      console.log("get center: ", mapMoveEnd.getCenter());
    })
  }

  const MapMoveEventZoom = () => {
    const mapMoveEnd = useMapEvent('zoomend', () => {
      setMapCenter([mapMoveEnd.getCenter().lat, mapMoveEnd.getCenter().lng ]);
      console.log("get bounds: " + JSON.stringify(mapMoveEnd.getBounds()));
      setMoved(true);      
      console.log("moved: " + moved);
      const currentBounds = mapMoveEnd.getBounds();
      console.log("currentBounds._southwest ", currentBounds._southWest);
      setBoundsDistance(mapMoveEnd.distance(currentBounds._northEast, currentBounds._southWest));
      //setMapCenter(mapMoveEnd.getCenter());
      console.log("currentBounds: ", currentBounds);
      console.log("boundsDistance: " + boundsDistance);
      console.log("get center: ", mapMoveEnd.getCenter());
    })
  }

  const sidebarSubmit = (values) => {
    console.log("form values:", values);
    console.log("in JSON format:", JSON.stringify(values));
    
    setRunGet(true)
  }

  useEffect(() => {
    let timer = setTimeout(() => {
    setRunGet(true)
  }, 1000);
  return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    // let timer = setTimeout(() => {
      console.log("useEffect getFarmstands mapcenter: ", mapCenter)
      console.log("useEffect runGet: ", runGet)
      getFarmstands();
    // }, 1000);
    // return () => clearTimeout(timer);
}, [runGet]);

  useEffect(() => {
    ChangeMyLocation()
  }, []);


  return (
    <Container >
      <Row className="map-wrapper">
        {/* <Header /> */}
    <MapContainer
      center={mapCenter}
      zoom={11}
    >      
    <MapMoveEventDrag />
    <MapMoveEventZoom />
    
      <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
          />

      {/* <LayersControl position='topright'>     
        <LayersControl.Overlay checked name='farmstands'> */}
          <LayerGroup>
            {farmstands.length > 0 && 
            <MapList farmstands={farmstands} />} 
          </LayerGroup>
        {/* </LayersControl.Overlay> 
      </LayersControl> */}

      <Control prepend position="bottomright">
        <Button
          onClick={() => {
            ChangeMyLocation()
          }}
          color="inherit"
        >
          <ChangeMapView coords={mapCenter} />
          <LocationSearchingIcon
            style={{ backgroundColor: "white", fontSize: "40" }}
          />
        </Button>
      </Control>

      <Control prepend position="topright">
      {/* <MapBoundsFilter getFarmstands={getFarmstands} /> */}
      {moved && <RSButton
          color="info"
          onClick={() => setRunGet(true)}
        > 
          Search this Area
          {/* filter farmstands to current bounds */}
          
        </RSButton> }
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
      <Sidebar sidebarProducts={sidebarProducts} setSidebarProducts={setSidebarProducts} sidebarSeasons={sidebarSeasons} setSidebarSeasons={setSidebarSeasons} sidebarSearch={sidebarSearch} setSidebarSearch={setSidebarSearch} setRunGet={setRunGet} runGet={runGet} toggleOffcanvas={toggleOffcanvas}  />
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
