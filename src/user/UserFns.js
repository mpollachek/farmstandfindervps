import axios from "axios";

export const selectUserOwned = async () => {
  const token = await localStorage.getItem("token");  
    let ownedArray = await axios.get(
      `http://localhost:8080/api/users/owned`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return ownedArray;
}