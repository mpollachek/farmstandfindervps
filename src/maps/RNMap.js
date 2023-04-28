import { useState, useEffect, useContext, createContext, useMemo } from "react";
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
  OffcanvasHeader,
} from "reactstrap";
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
import {
  GeoSearchControl,
  MapBoxProvider,
  OpenStreetMapProvider,
} from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import Control from "react-leaflet-custom-control";
import { Button, IconButton, Divider } from "@mui/material";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import "leaflet/dist/leaflet.css";
import "../css/MapsPage.css";
// import { rgba } from "@react-spring/shared";
import MapList from "./MapList";
import CreateListingForm from "../forms/CreateListingForm";
import NewFarmstand from "../forms/NewFarmstand";
import CreateListingFormNoAddress from "../forms/CreateListingFormNoAddress";
import NewFarmstandNoAddress from "../forms/NewFarmstandNoAddress";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SheepLogo from "../assets/sheep.jpg";
//import FormModal from "../../components/FormModal";
import Header from "../components/Header";
import Header2 from "../components/Header2";
import Sidebar from "../sidebar/Sidebar";
import {
  selectAllFarmstands,
  selectImagesByIds,
} from "../farmstands/farmstandFilter";
import icon from "./mapIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserLoginForm from "../forms/UserLoginForm";
import UserModal from "../user/UserModal";
import axios from "axios";
import { UserContext, MapContext, FarmstandsContext, SidebarContext } from "../App";
import { Navigation } from "@mui/icons-material";
import { backendUrl } from "../config";

/* Add a List view button that will display all farmstands on mapview current boundaries */

const { BaseLayer } = LayersControl;

function RNMap() {
  const { userId, setUserId, userName, setUserName } = useContext(UserContext);
  const { farmstands, setFarmstands } = useContext(FarmstandsContext);
  const { mapCenter, setMapCenter } = useContext(MapContext)
  const {sidebarProducts, setSidebarProducts, sidebarSeasons, setSidebarSeasons, sidebarSearch, setSidebarSearch, sidebarTypes, setSidebarTypes, sidebarProductSearch, setSidebarProductSearch } = useContext(SidebarContext)

  //const [myLocation, setMyLocation] = useState({lat: 51.505, lng: -0.09});
  const [myLocation, setMyLocation] = useState([]);

  const [runGet, setRunGet] = useState(false);
  const [boundsDistance, setBoundsDistance] = useState(30000);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);

  const [profileModal, setProfileModal] = useState(false);
  const profileToggle = () => setProfileModal(!profileModal);

  const [offcanvas, setOffcanvas] = useState(false);
  const toggleOffcanvas = () => setOffcanvas(!offcanvas);

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const [moved, setMoved] = useState(false);
  const [distance, setDistance] = useState(null);

  const [farmIds, setFarmIds] = useState([]);

  const [eventMsg, setEventMsg] = useState();
  const [eventCtr1, setEventCtr1] = useState();
  const [eventCtr2, setEventCtr2] = useState();

  // sidebar states:
  // const [sidebarProducts, setSidebarProducts] = useState([]);
  // const [sidebarSeasons, setSidebarSeasons] = useState("yearRound");
  // const [sidebarSearch, setSidebarSearch] = useState("");
  // const [sidebarTypes, setSidebarTypes] = useState([]);
  // const [sidebarProductSearch, setSidebarProductSearch] = useState("all")
  // console.log("intial sidebarProducts: ", sidebarProducts);
  // console.log("type sidebarProducts: ", typeof(sidebarProducts) );
  // console.log("intial sidebarSeasons: ", sidebarSeasons);
  // console.log("type sidebarSeasons: ", typeof(sidebarSeasons) );

  const navigate = useNavigate();

  //window.addEventListener('message', message => alert(JSON.stringify(message)))
  // document.addEventListener('message', function(event) {
  //   console.log("testing onmessage event: ", event)
  //   setMapCenter([45, 39])
  // })
  // document.addEventListener('message', function(event) {
  //   alert(`testing onmessage event.data: ${event.data}`)
  //   setMapCenter(event.data)
  // })

  const handleEventMsg = async (event) => {
    //await document.removeEventListener('message', handleEventMsg);
    //await setEventMsg(JSON.parse(event.data))
    //await setEventCtr1(JSON.parse(event.data)[1])
    //await setEventCtr2(JSON.parse(event.data)[2])
    //sendMsg("eventCtr1: " + eventCtr1)
    //sendMsg("eventCtr2: " + eventCtr2)

    //***NOTE TO SELF: must split string into array.  currently crashing. possibly \ character. need to setMapCenter to [array[1], array[2]]***

    const eventString = JSON.parse(event.data);
    sendMsg("eventString: " + eventString)
    //const eventArray = JSON.parse(event.data).split(',');
    //const eventArray = eventString.split(',')
    //sendMsg("eventArray: " + eventArray.toString())

    //sendMsg("eventMsg: " + eventMsg)
    sendMsg(`event.data message parse:` + JSON.parse(event.data))

    await setMapCenter(JSON.parse(event.data)[1]) 
    //await setMapCenter([JSON.parse(eventCtr1), JSON.parse(eventCtr2)])
    //await setMapCenter([JSON.parse(event.data)[1], JSON.parse(event.data)[2]])
    //sendMsg("map center: " + mapCenter)
    //await setMapCenter(JSON.parse(event.data))
    // await setMyLocation(JSON.parse(event.data))

    // await setMapCenter(myLocation)
    
    setRunGet(true)
    console.log("mapCenter after set from RN", mapCenter)
    //document.addEventListener('message', handleEventMsg);
  }

  document.addEventListener('message', handleEventMsg);

  // document.addEventListener('message', async function (event) {
  //   //alert(`testing onmessage event.data`, event.data)
  //   console.log(`testing onmessage event:`, event)
  //   // alert(`stringify: JSON.parse`, JSON.parse(event.data))
  //   await setMapCenter(JSON.parse(event.data))
  //   // await setMyLocation(JSON.parse(event.data))

  //   // await setMapCenter(myLocation)
    
  //   setRunGet(true)
  //   console.log("mapCenter after set from RN", mapCenter)
  // })

  const sendMsg = ( item2) => {window.ReactNativeWebView.postMessage(JSON.stringify({ "sending message from webview": item2 }))}

  const getFarmstands = async () => {
    if (runGet) {
      console.log("sidebarTypes: ", sidebarTypes)
      const allFarms = await selectAllFarmstands(
        mapCenter[0],
        mapCenter[1],
        boundsDistance,
        sidebarProducts,
        sidebarProductSearch,
        sidebarSeasons,
        sidebarTypes
      );
      setFarmstands(allFarms);
      // console.log("allFarms: ", allFarms );
      // console.log("object.values allfarms[0].id: ", Object.values(allFarms)[0]._id)
      let farmIdList = [];
      allFarms.forEach((f) => {
        // console.log('f: ', f)
        farmIdList.push(f._id);
        // console.log('farmIdList', farmIdList)
      });
      setFarmIds(farmIdList);
      // console.log("farmIds: ", farmIds)
      if (!allFarms) {
        setFarmstands([]);
        setFarmIds([]);
      }
      // console.log("current farmstands: ", allFarms);
      // console.log("JSON stringify current farmstands: ", JSON.stringify(allFarms));
      setRunGet(false);
    }
  };

  function ChangeMapView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    const currentBounds = map.getBounds();
    // console.log("currentBounds._southwest ", currentBounds._southWest);
    setBoundsDistance(
      map.distance(currentBounds._northEast, currentBounds._southWest)
    );
    // console.log("boundsDistance: " + boundsDistance);
    // console.log("setting view")
    // console.log("coords: ", coords)
    // setMyLocation({lat: coords.lat, lng: coords.lng});
    // setMapCenter({lat: coords.lat, lng: coords.lng});
    return null;
  }

  const ChangeMyLocationRNMessage = (lat, long) => {
    setMapCenter([lat, long])
  }

  const ChangeMyLocation = async () => {
    if (navigator.geolocation) {
      sendMsg("navigator.geolocation exists")
      await navigator.geolocation.getCurrentPosition((position) => {
        console.log("position.coords.latitude: ", position.coords.latitude)
        sendMsg(position)
        setMapCenter([position.coords.latitude, position.coords.longitude]);
      });
    }
  };

  const MapMoveEventDrag = () => {
    const mapMoveEnd = useMapEvent("dragend", () => {
      setMapCenter([mapMoveEnd.getCenter().lat, mapMoveEnd.getCenter().lng]);
      // console.log("get bounds: " + JSON.stringify(mapMoveEnd.getBounds()));
      setMoved(true);
      // console.log("moved: " + moved);
      const currentBounds = mapMoveEnd.getBounds();
      // console.log("currentBounds._southwest ", currentBounds._southWest);
      setBoundsDistance(
        mapMoveEnd.distance(currentBounds._northEast, currentBounds._southWest)
      );
      // setMapCenter(mapMoveEnd.getCenter());
      // console.log("currentBounds: ", currentBounds);
      // console.log("boundsDistance: " + boundsDistance);
      // console.log("get center: ", mapMoveEnd.getCenter());
    });
  };

  const MapMoveEventZoom = () => {
    const mapMoveEnd = useMapEvent("zoomend", () => {
      setMapCenter([mapMoveEnd.getCenter().lat, mapMoveEnd.getCenter().lng]);
      // console.log("get bounds: " + JSON.stringify(mapMoveEnd.getBounds()));
      setMoved(true);
      // console.log("moved: " + moved);
      const currentBounds = mapMoveEnd.getBounds();
      // console.log("currentBounds._southwest ", currentBounds._southWest);
      setBoundsDistance(
        mapMoveEnd.distance(currentBounds._northEast, currentBounds._southWest)
      );
      // setMapCenter(mapMoveEnd.getCenter());
      // console.log("currentBounds: ", currentBounds);
      // console.log("boundsDistance: " + boundsDistance);
      // console.log("get center: ", mapMoveEnd.getCenter());
    });
  };

  /* geosearch */
  const SearchField = () => {
    const map = useMap();
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      // marker: {
      //   icon
      // },
      autoClose: true,
      keepResult: true,
    });
    useEffect(() => {
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, []);

    return null;
  };
  /* end geosearch */

  /* use effect get farmstands in local map area on page load */
  useEffect(() => {
    let timer = setTimeout(() => {
      setRunGet(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getFarmstands();
  }, [runGet]);

  useEffect(() => {
    ChangeMyLocation();
  }, []);
  /* end use effect get farmstands in local map area on page load */

  /* useEffect to check and set logged in status */
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    axios
      .get(`${backendUrl}/api/users/protected`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        setUserId(res.data._id);
        setUserName(res.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  /* end useEffect to check and set logged in status */

  return (
    <Container>
      <Row className="map-wrapper">
        {/* <Header /> */}
        <MapContainer center={mapCenter} zoom={11}>
          <MapMoveEventDrag />
          <MapMoveEventZoom />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
          />

          {/* <LayersControl position='topright'>     
        <LayersControl.Overlay checked name='farmstands'> */}
          {/* <MapCenterContext.Provider value={mapCenter}> */}
          <LayerGroup>
            {farmstands.length > 0 && <MapList farmstands={farmstands} />}
          </LayerGroup>
          {/* </MapCenterContext.Provider> */}
          {/* </LayersControl.Overlay> 
      </LayersControl> */}

          <SearchField />

          <Control prepend position="bottomright">
            <Button
              onClick={() => {
                //sendMsg()
                ChangeMyLocation();
              }}
              color="inherit"
            >
              <ChangeMapView coords={mapCenter} />
              <LocationSearchingIcon
                style={{ backgroundColor: "white", fontSize: "40", marginBottom: '70px'}}
                className='me-4' 
              />
            </Button>
          </Control>

          <div>
            { moved ? (
              <div>
          {/* Search map Area for farmstands */}
          <Control prepend position="topright">
            {/* <MapBoundsFilter getFarmstands={getFarmstands} /> */}
              <RSButton
                color="info"
                onClick={() => setRunGet(true)}
                className="mt-5 me-4"
              >
                Search this Area
                {/* filter farmstands to current bounds */}
              </RSButton>
          </Control>

          {/* Modal for opening login/register profile */}
          <Control append position="topright">
            <IconButton onClick={profileToggle}>
              <AccountCircleIcon
                className="me-4 mt-1"
                color="primary"
                fontSize="large"
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
          </Control>
          </div>
            ) : (
              <div>
              {/* Modal for opening login/register profile */}
          <Control append position="topright">
          <IconButton onClick={profileToggle}>
            <AccountCircleIcon
              className="me-4 mt-5"
              color="primary"
              fontSize="large"
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
        </Control>
        </div>
            )}
          </div>

          <Control prepend position="bottomleft">
            {/* List View */}
            {console.log("farmstands: ", farmstands)}
            <RSButton color="success" onClick={() => navigate("/farmstands")}>
              List View
            </RSButton>
          </Control>

          <Control append position="bottomleft">
            {/* Button/Modal for share a farmstand */}

            <RSButton color="primary" onClick={toggle} style={{marginBottom: '70px'}}>
              share a farmstand
            </RSButton>
            <Modal isOpen={modal} toggle={toggle} size="lg">
              <ModalHeader toggle={toggle}>
                How will you enter the farmstand's location?
              </ModalHeader>
              <ModalBody>
                <NewFarmstandNoAddress
                  toggle={toggle}
                  toggle2={toggle2}
                  lat={lat}
                  long={long}
                  setLat={setLat}
                  setLong={setLong}
                />
              </ModalBody>
            </Modal>

            {/* Modal for createListingForm */}
            <Modal isOpen={modal2} toggle={toggle2} size="lg" scrollable={true}>
              <ModalHeader toggle={toggle2}>Please do not post large commercial chains. Family owned stores OK</ModalHeader>
              <ModalBody>
                <CreateListingFormNoAddress 
                lat={lat} 
                long={long} 
                toggle2={toggle2} 
                setFarmstands={setFarmstands} 
                refreshLat={mapCenter[0]}
                refreshLong={mapCenter[1]}
                boundsDistance={boundsDistance}
                sidebarProducts={sidebarProducts}
                sidebarSeasons={sidebarSeasons}
                setFarmIds={setFarmIds}
                />
              </ModalBody>
              <ModalFooter className="justify-content-center">
                Thanks for sharing!
              </ModalFooter>
            </Modal>
          </Control>

          {/* Offcanvas button/wrapper */}
          <Control prepend position="topleft">
            <div>
              <RSButton
                color="warning"
                onClick={toggleOffcanvas}
                className="mt-5"
              >
                Filters
              </RSButton>
              <Offcanvas isOpen={offcanvas} toggle={toggleOffcanvas}>
                <OffcanvasHeader toggle={toggleOffcanvas}>
                  Location Filters
                </OffcanvasHeader>
                <OffcanvasBody>
                  <Sidebar
                    sidebarProducts={sidebarProducts}
                    setSidebarProducts={setSidebarProducts}
                    sidebarSeasons={sidebarSeasons}
                    setSidebarSeasons={setSidebarSeasons}
                    sidebarSearch={sidebarSearch}
                    setSidebarSearch={setSidebarSearch}
                    sidebarTypes={sidebarTypes}
                    setSidebarTypes={setSidebarTypes}
                    sidebarProductSearch={sidebarProductSearch}
                    setSidebarProductSearch={setSidebarProductSearch}
                    setRunGet={setRunGet}
                    runGet={runGet}
                    toggleOffcanvas={toggleOffcanvas}
                  />
                </OffcanvasBody>
              </Offcanvas>
            </div>
          </Control>
        </MapContainer>
      </Row>
    </Container>
  );
}

export default RNMap;
