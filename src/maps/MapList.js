import { Col, Row } from "reactstrap";
import { selectAllFarmstands } from "../farmstands/farmstandFilter";
import FarmstandCard from "../farmstands/FarmstandCard";
import { Marker, Popup } from "react-leaflet";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import { selectFavoriteFarmstandIds } from "../farmstands/farmstandFilter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCow } from "@fortawesome/free-solid-svg-icons";


const iconMarkup = renderToStaticMarkup(
  <AgricultureIcon
    style={{
      color: "green",
      background: "rgba(220, 220, 220, .6)",
      fontSize: 40,
    }}
    variant="contained"
  >
    Booyah
  </AgricultureIcon>
  //<FontAwesomeIcon icon={faCow} />
);
const farmIcon = divIcon({
  html: iconMarkup,
});

const MapList = ({ farmstands }) => {
  
  const [favoriteFarmstands, setFavoriteFarmstands] = useState([]);
  const [runGet, setRunGet] = useState(false);

  const getFavorites = async () => {
    if (runGet) {
      //need to make empty array and add all ids 
      const allFavorites = await selectFavoriteFarmstandIds();
      console.log("allFavorites: ", allFavorites);
      setFavoriteFarmstands(allFavorites);
      setRunGet(false);
    }
  };

  useEffect(() => {
    setRunGet(true);
  }, []);

  useEffect(() => {
    getFavorites();
  }, [runGet]);

  return (
    <Row className="ms-auto">
      {console.log("farmstands: ", farmstands)}
      {console.log("type of farmstands: " + typeof farmstands)}
      {farmstands.map((farmstand) => {
        let favorite = false
        if (favoriteFarmstands.includes(farmstand._id)){
          favorite = true
        }
        console.log(farmstand);
        console.log(
          "lat, long: " +
            farmstand.location.coordinates[1] +
            ", " +
            farmstand.location.coordinates[0]
        );
        console.log("farmstandid: ", farmstand._id);
        console.log("favorites list: ", favoriteFarmstands)
        return (
          <Marker
            key={farmstand._id}
            position={[
              farmstand.location.coordinates[1],
              farmstand.location.coordinates[0],
            ]}
            icon={farmIcon}
          >
            <Popup minWidth="250">
              <Col className="mx-2 mt-3">
                <FarmstandCard item={farmstand} favorite={favorite} getFavorites={getFavorites} setRunGet={setRunGet} />
                {/* <Row className="mx-1 mt-3" style={{ fontSize: 20 }}>{farmstand.description}</Row> */}
              </Col>
            </Popup>
          </Marker>
        );
      })}
    </Row>
  );
};

export default MapList;
