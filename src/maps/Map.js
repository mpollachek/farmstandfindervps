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
import NewFarmstand from "../components/NewFarmstand";
import { Link } from "react-router-dom";
import SheepLogo from '../assets/sheep.jpg';
//import FormModal from "../../components/FormModal";
import Header from "../components/Header";
import Header2 from "../components/Header2";
import Sidebar from "../sidebar/Sidebar";
import { selectAllFarmstands } from "../farmstands/farmstandFilter";
import MapBoundsFilter from "./MapBoundsFilter";

const { BaseLayer } = LayersControl;

function Map() {
  
  //const [myLocation, setMyLocation] = useState({lat: 51.505, lng: -0.09});
  const [myLocation, setMyLocation] = useState([51.505, -0.09]);

  const [runGet, setRunGet] = useState(false)

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


  const getFarmstands = async () => {
    console.log("runGet: ", runGet)
    console.log("get lat: ", mapCenter[0]); 
    console.log("get lng: ", mapCenter[1]);
    if (runGet) {
    //const allFarms = await selectAllFarmstands(mapCenter.lat, mapCenter.lng);
    const allFarms = await selectAllFarmstands(mapCenter[0], mapCenter[1]);
    setFarmstands(allFarms);
    console.log("current farmstands: " + allFarms);
    console.log("JSON stringify current farmstands: " + JSON.stringify(allFarms));
    setRunGet(false);
  }} 

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
    console.log("setting view")
    console.log("coords: ", coords.lat)
    // setMyLocation({lat: coords.lat, lng: coords.lng});
    // setMapCenter({lat: coords.lat, lng: coords.lng});
    return null;
  }

  const ChangeMyLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        console.log("position.coords.latitude: ", position.coords.latitude)
        // setMyLocation({lat: position.coords.latitude, lng: position.coords.longitude});
        // setMyLocation([position.coords.latitude, position.coords.longitude]);
        setMapCenter([position.coords.latitude, position.coords.longitude]);
        console.log("2: ",  mapCenter);
      });
    }
  }

  // useEffect(() => {
  //   setMyLocation({lat: lat, lng: long});
  //   console.log("2: ",  myLocation);
  // }, [lat])

  // For MapMoveEvent: Determine how to calculate distance only when user clicks "search this area" button

  const MapMoveEventDrag = () => {
    const mapMoveEnd = useMapEvent('dragend', () => {
      setMapCenter([mapMoveEnd.getCenter().lat, mapMoveEnd.getCenter().lng ]);
      console.log("get bounds: " + JSON.stringify(mapMoveEnd.getBounds()));
      setMoved(true);      
      console.log("moved: " + moved);
      const currentBounds = mapMoveEnd.getBounds();
      console.log("currentBounds._southwest ", currentBounds._southWest);
      const boundsDistance = mapMoveEnd.distance(currentBounds._northEast, currentBounds._southWest);
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
      const boundsDistance = mapMoveEnd.distance(currentBounds._northEast, currentBounds._southWest);
      //setMapCenter(mapMoveEnd.getCenter());
      console.log("currentBounds: ", currentBounds);
      console.log("boundsDistance: " + boundsDistance);
      console.log("get center: ", mapMoveEnd.getCenter());
    })
  }

  useEffect(() => {
    setRunGet(true)
  }, [mapCenter])

  useEffect(() => {
    let timer = setTimeout(() => {
      console.log("useEffect getFarmstands mapcenter: ", mapCenter)
      console.log("useEffect runGet: ", runGet)
      getFarmstands();
    }, 1000);
    return () => clearTimeout(timer);
}, [runGet]);

  // const MapMoveEvent = () => {
  //   const mapMoveEnd = useMap() 
  //     console.log("get bounds: " + JSON.stringify(mapMoveEnd.getBounds()));
  //     setMoved(true);      
  //     console.log("moved: " + moved)
  //     const currentBounds = mapMoveEnd.getBounds()
  //     console.log("currentBounds._southwest ", currentBounds._southWest);
  //     const boundsDistance = mapMoveEnd.distance(currentBounds._northEast, currentBounds._southWest)
  //     console.log("currentBounds: " + currentBounds)
  //     console.log("boundsDistance: " + boundsDistance)
  // }





  const ZoomFilter = () => {
    const map = useMap();
    //map.getBounds()
    console.log('bounds: ', map.getBounds)
    // map.distance(currentBounds._northEast.lng, currentBounds._southWest.lng)
    // console.log("currentBounds: " + currentBounds)
    // console.log("boundsDistance: " + boundsDistance)
  }

  const ShowSearchButton = () => {
    if (moved) {
    return <MapSearchButton />
    }}

  const MapSearchButton = () => {
        <RSButton
          onClick={() => {
            console.log("MapSearchButtonPressed")
          }}
          color="info"
        >          
          Search this Area
        </RSButton>
  }

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
            {farmstands.length > 0 && 
            <MapList farmstands={farmstands} />} 
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
          <ChangeMapView coords={mapCenter} />
          <LocationSearchingIcon
            style={{ backgroundColor: "white", fontSize: "40" }}
          />
        </Button>
      </Control>

      <Control prepend position="topright">
      <MapBoundsFilter />
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
