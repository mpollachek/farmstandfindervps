import axios, { Axios } from "axios";
import { backendUrl } from "../../config";

export const selectCommentsByFarmstandId = async (farmstandId) => {
  console.log("get comments farmstand Id: ", farmstandId);
  let allComments = await axios.get(
    `${backendUrl}/api/farms/${farmstandId}/comments`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Comments response: ", allComments.data);
  return allComments.data;
};

export const selectOwnerCommentsByFarmstandId = async (farmstandId) => {
  console.log("get comments farmstand Id: ", farmstandId);
  let allComments = await axios.get(
    `${backendUrl}/api/farms/${farmstandId}/ownercomments`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Comments response: ", allComments.data);
  return allComments.data;
};

export const selectMyComments = async () => {
  const token = await localStorage.getItem("token");
  let userComments = await axios.get(
    `${backendUrl}/api/users/mycomments`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("user comments response: ", userComments);
  return userComments.data;
};

