import { Col, Row } from "reactstrap";
import FarmstandCard from "./FarmstandCard";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useContext } from "react";
import {
  selectFeaturedFarmstands,
  selectAllFarmstands,
} from "../farmstands/farmstandFilter";
import { FarmstandsContext } from "../App";

//bring farmstands useState array to App.js and useContext for Map.js and FarmstandsList.js.  Allow changing filter and radius parameters on this page

const FarmstandList = () => {
  const { farmstands, setFarmstands } = useContext(FarmstandsContext);
  console.log("featured farmstands: ", farmstands);
  return (
    <Row>
      <h3 className="text-center">All Farmstands Within Current Map View</h3>
      {farmstands.map((item, id) => {
        const { isLoading, errMsg } = item;
        if (isLoading) {
          return <Loading key={id} />;
        }
        if (errMsg) {
          return <Error errMsg={errMsg} key={id} />;
        }

        return (
          item && (
            <Col md="4" className="g-4" key={id}>
              <FarmstandCard item={item} />
            </Col>
          )
        );
      })}
    </Row>
  );
};

export default FarmstandList;
