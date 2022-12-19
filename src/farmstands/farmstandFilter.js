import axios, { Axios } from "axios";
import { FARMSTANDS } from "../testData/FARMSTANDS";

// export const selectAllFarmstands = () => {
//   return FARMSTANDS;
// };

// ***  Need to return all documents in collection as an array with each document as an item.  schema is used to select collection within database, but it appears to make a subfolder.  currently saving to "test" database, need to change that

// export const selectAllFarmstands = () => {
//   axios.get(`http://localhost:8080/api/farms`, {
//     headers: {
//       "Content-Type": "application/json",
//   },
// }).then((response) => {
//   console.log("response: " + JSON.stringify(response.data));
//   return JSON.stringify(response.data);
// })}

export const selectAllFarmstands = async (lat, long, distance) => {
  console.log("filter get lat: ", lat);
  console.log("filter get long: ", long);
  console.log("filter get distance: ", distance);
  let allFarms = await axios.get(`http://localhost:8080/api/farms`, {
    params: {
      longitude: long,
      latitude: lat,
      distance: distance
    },
    headers: {
      "Content-Type": "application/json",
    }});
    console.log("response: ", allFarms.data);
    return allFarms.data;
  }

// find one
export const selectFeaturedFarmstand = () => {
  return FARMSTANDS.find((farmstand) => farmstand.featured);
};

// find all featured
export const selectFeaturedFarmstands = () => {
  return FARMSTANDS.filter((farmstand) => farmstand.featured);
};

export const selectRandomFarmstand = () => {
  return FARMSTANDS[Math.floor(FARMSTANDS.length * Math.random())];
}

export const selectFarmstandById = (id) => {
  return FARMSTANDS.find((farmstand) => farmstand.id === parseInt(id));
};