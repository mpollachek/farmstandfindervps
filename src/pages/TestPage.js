import { useState, useEffect, useContext } from "react";
import {
  Button as RSButton,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
import axios, { Axios } from "axios";
import { FarmstandsContext } from "../App"
import FarmstandCard from "../farmstands/FarmstandCard";
import { selectAllData } from "../farmstands/farmstandFilter";

const TestPage = () => {
  
  const [runGet, setRunGet] = useState(false);
  const { farmstands, setFarmstands } = useContext(FarmstandsContext);

  const getFarmstands = async () => {
    if (runGet) {
      const allFarms = await selectAllData();
      setFarmstands(allFarms)
    }
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      setRunGet(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getFarmstands();
  }, [runGet]);

  const farmstand = farmstands[0]

  

  return (
    // <div>
    //   <FarmstandCard item={farmstand} favorite={favorite} getFavorites={getFavorites} setRunGet={setRunGet} />
    // </div>
    <div></div>
  );
};

export default TestPage;
