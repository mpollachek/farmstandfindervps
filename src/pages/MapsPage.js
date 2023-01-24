import { useMemo, useState } from "react";
import { Container, Row } from "reactstrap";
import SubHeader from "../components/SubHeader";
import Map from "../maps/Map";
import "../css/MapsPage.css";

const MapsPage = () => {
  return (
    <Container className="full-width">
      {/* <SubHeader current='Maps' /> */}
      <Row className="full-width">
        <Map />
      </Row>
    </Container>
  );
};

export default MapsPage;
