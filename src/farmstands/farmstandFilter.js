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

export const selectAllFarmstands = async (
  lat,
  long,
  distance,
  products,
  productSearchType,
  seasons,
  farmstandType
) => {
  // console.log("filter get lat: ", lat);
  // console.log("filter get long: ", long);
  // console.log("filter get distance: ", distance);
  console.log("farmstandType: ", farmstandType)
  let allFarms = await axios.get(`http://localhost:8080/api/farms`, {
    params: {
      longitude: long,
      latitude: lat,
      distance: distance,
      products: products,
      productSearchType: productSearchType,
      seasons: seasons,
      farmstandType: farmstandType,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response: ", allFarms.data);
  return allFarms.data;
};

export const selectAllData = async () => {
  let allData = await axios.get(`http://localhost:8080/api/farms`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response: ", allData.data);
  return allData.data;
};

// export const selectCardImage = async (id) => {
//   let cardImage = await axios.get(`http://localhost:8080/api/farms/cardImage`, {
//     params: {
//       id: id
//     },
//     headers: {
//       "Content-Type": "application/json",
//     }});
//   console.log("response: ", cardImage);
//   return cardImage;
// }

export const selectImagesByIdsTest = async (id) => {
  let allDataImages = await axios.get(`http://localhost:8080/api/farms/test`, {
    params: {
      id: id,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response: ", allDataImages);
  return allDataImages;
};

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
};

export const selectFarmstandById = async (farmstandId) => {
  let farmstandById = await axios.get(
    `http://localhost:8080/api/farms/${farmstandId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("response: ", farmstandById.data);
  return farmstandById.data;
};

export const selectFavoriteFarmstands = async () => {
  let token = ""
  let googleToken = "";
  let facebookToken = "";  
  let authType = "";
  const userIdStorage = await localStorage.getItem("userId");
  if (localStorage.getItem("token")) {
    token = await localStorage.getItem("token");
    authType = 'jwt'
  } else if (localStorage.getItem("google")) {
    googleToken = await localStorage.getItem("google");
    authType = 'google'
  } else if (localStorage.getItem("facebook")) {
    facebookToken = await localStorage.getItem("facebook");
    authType = 'facebook'
  }
  //const token = await localStorage.getItem("token");
  
  let userFavorites = await axios.get(
    `http://localhost:8080/api/users/favorites`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "googleToken": googleToken,
        "facebookToken": facebookToken,
        "authType": authType,
        "userId": userIdStorage,
      },
    }
  );
  console.log("favorites response: ", userFavorites);
  return userFavorites.data;
};

export const selectFavoriteFarmstandIds = async () => {
  let token = ""
  let googleToken = "";
  let facebookToken = "";
  let authType = "";
  const userIdStorage = await localStorage.getItem("userId");
  if (localStorage.getItem("token")) {
    token = await localStorage.getItem("token");
    authType = 'jwt'
  } else if (localStorage.getItem("google")) {
    googleToken = await localStorage.getItem("google");
    authType = 'google'
  } else if (localStorage.getItem("facebook")) {
    facebookToken = await localStorage.getItem("facebook");
    authType = 'facebook'
  }
  
  let userFavorites = await axios.get(
    `http://localhost:8080/api/users/favoritesIdList`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "googleToken": googleToken,
        "facebookToken": facebookToken,
        "authType": authType,
        "userId": userIdStorage,
      },
    }
  );
  console.log("favorites response: ", userFavorites);
  return userFavorites.data;
};

/* if not jwt token send googleToken or facebookToken 
in usermodel save authtype as google, facebook or jwt
in verify user middleware, if jwt do passport.authenticate.
if facebook or google make sure token exists

have cookie checker remove local storage if cookies have expired
*/
