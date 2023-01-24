import { Col, Row } from "reactstrap";
import { useState, useEffect } from "react";
import { selectFavoriteFarmstands } from "../farmstands/farmstandFilter";
import FarmstandCard from "../farmstands/FarmstandCard";

const FavoritesList = () => {
  const [favoriteFarmstands, setFavoriteFarmstands] = useState([]);
  const [runGet, setRunGet] = useState(false);

  const getFavorites = async () => {
    if (runGet) {
      const allFavorites = await selectFavoriteFarmstands();
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
      {console.log("favorite farmstands: ", favoriteFarmstands)}
      {favoriteFarmstands.map((farmstand) => {
        console.log("1 farmstand: ", farmstand);
        return (
          <Col md="4" className="p-4" key={farmstand._id}>
            <FarmstandCard item={farmstand} />
          </Col>
        );
      })}
    </Row>
  );
};

export default FavoritesList;
