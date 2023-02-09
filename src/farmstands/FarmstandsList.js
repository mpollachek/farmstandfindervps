import { Col, Row } from "reactstrap";
import FarmstandCard from "./FarmstandCard";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useContext, useState, useEffect } from "react";
import {
  selectFeaturedFarmstands,
  selectAllFarmstands,
} from "../farmstands/farmstandFilter";
import { FarmstandsContext } from "../App";
import { selectFavoriteFarmstandIds } from "../farmstands/farmstandFilter";

//bring farmstands useState array to App.js and useContext for Map.js and FarmstandsList.js.  Allow changing filter and radius parameters on this page

  

const FarmstandList = () => {

  const { farmstands, setFarmstands } = useContext(FarmstandsContext);

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


  console.log("featured farmstands: ", farmstands);
  return (
    <Row>
      <h3 className="text-center">All Farmstands Within Current Map View</h3>
      {farmstands.map((item, id) => {
        let favorite = false
        if (favoriteFarmstands.includes(item._id)){
          favorite = true
        }
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
              <FarmstandCard item={item} favorite={favorite} getFavorites={getFavorites} setRunGet={setRunGet} />
            </Col>
          )
        );
      })}
    </Row>
  );
};

export default FarmstandList;
