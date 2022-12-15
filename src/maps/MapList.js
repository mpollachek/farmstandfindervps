import { Col, Row } from "reactstrap";
import { selectAllFarmstands } from "../farmstands/farmstandFilter";
import FarmstandCard from "../farmstands/FarmstandCard";
import { Marker, Popup } from "react-leaflet";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

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

const MapList = ({farmstands}) => {
  

  // const [farmstands, setFarmstands] = useState([]);
  
  // const selectAllFarmstands = async () => {
  //   let allFarms = await axios.get(`http://localhost:8080/api/farms`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       }});
  //       console.log("response: " + JSON.stringify(allFarms.data));
  //       setFarmstands(JSON.stringify(allFarms.data));
  //     }  

  // useEffect(() => {
  //   selectAllFarmstands();
  // }, []);

  // Try conditional rendering in Map.js. set farmstands before rendering

  // const getFarmstands = () => {
  //   const allFarms = selectAllFarmstands();
  //   setFarmstands(JSON.stringify(allFarms.data));
  //   console.log("current farmstands: " + allFarms.data);
  //   console.log("JSON stringify current farmstands: " + JSON.stringify(allFarms.data));
  // } 

  // useEffect(() => {
  //   setFarmstands(selectAllFarmstands())
  // }, [])

  // useEffect(() => {
  //   let allFarms = selectAllFarmstands( async (response) => {
  //     await console.log("farmstands response: " + response)
  //   });
  //   setFarmstands(allFarms)
  //   console.log("current farmstands: " + allFarms);
  //   console.log("JSON stringify current farmstands: " + JSON.stringify(allFarms));
  // }, []);


  console.log("got here")

//   return (
//     <Row className="ms-auto">
//       { useEffect(() => {
//         console.log("got here 2")
//       // let allFarms = selectAllFarmstands(() => {
//       //   setFarmstands(allFarms); 
      
//       console.log("farmstands: " + farmstands);
//       farmstands.map((farmstand) => {
//         console.log("farmstand: " + farmstand)
//         console.log("farmstand longitude: " + farmstand.location.coordinates[1])
//         console.log("farmstand longitude: " + farmstand.location.coordinates[0])
//         return (
//           <Marker key={farmstand.id}
//             position={[farmstand.location.coordinates[1], farmstand.location.coordinates[0]]}
//             icon={farmIcon}
//           >
//             <Popup minWidth="250">
//               <Col className="mx-2 mt-3" >
//               <FarmstandCard item={farmstand} />
//               <Row className="mx-1 mt-3" style={{ fontSize: 20 }}>{farmstand.description}</Row>
//               </Col>
//             </Popup>
//           </Marker>
//         );
//       // })
//     });
//     }, [])}
//     </Row>  
//   );
// };


  return (
    <Row className="ms-auto">
      {console.log("farmstands: " + farmstands)}
      {console.log("type of farmstands: " + typeof farmstands)}
      {farmstands.map((farmstand) => {
        console.log(farmstand)
        console.log("lat, long: " + farmstand.location.coordinates[1] + ", " + farmstand.location.coordinates[0]) 
        console.log("farmstandid: ", farmstand._id)
        return (
          <Marker 
            key={farmstand._id}
            position={[farmstand.location.coordinates[1], farmstand.location.coordinates[0]]}
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
