import { Col, Row } from "reactstrap";
import { selectAllFarmstands } from "../farmstands/farmstandFilter";
import FarmstandCard from "../farmstands/FarmstandCard";
import { Marker, Popup } from "react-leaflet";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";

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
);
const farmIcon = divIcon({
  html: iconMarkup,
});

const MapList = () => {
  const farmstands = selectAllFarmstands();

  return (
    <Row className="ms-auto">
      {farmstands.map((farmstand) => {
        return (
          <Marker key={farmstand.id}
            position={[farmstand.latitude, farmstand.longitude]}
            icon={farmIcon}
          >
            <Popup minWidth="250">
              <Col className="mx-2 mt-3" >
              <FarmstandCard item={farmstand} />
              <Row className="mx-1 mt-3" style={{ fontSize: 20 }}>{farmstand.description}</Row>
              </Col>
            </Popup>
          </Marker>
        );
      })}
    </Row>
  );
};

export default MapList;
