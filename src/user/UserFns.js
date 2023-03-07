import axios from "axios";
import { backendUrl } from "../config";

export const selectUserOwned = async () => {
  const token = await localStorage.getItem("token");  
    let ownedArray = await axios.get(
      `${backendUrl}/api/users/owned`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return ownedArray;
}