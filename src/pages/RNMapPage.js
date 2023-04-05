import { useMemo, useState } from "react";
import { Container, Row } from "reactstrap";
import SubHeader from "../components/SubHeader";
import RNMap from "../maps/RNMap";
import "../css/MapsPage.css";

const RNMapsPage = () => {

  return (
    <Container className="full-width" style={{marginLeft: '0'}}>
      <Row className="full-width">
        <RNMap />
      </Row>
    </Container>
  );
};

export default RNMapsPage;