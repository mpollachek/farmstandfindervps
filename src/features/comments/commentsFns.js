import axios, { Axios } from "axios";

export const selectCommentsByFarmstandId = async (farmstandId) => {
  console.log("get comments farmstand Id: ", farmstandId);
  let allComments = await axios.get(
    `http://localhost:8080/api/farms/${farmstandId}/comments`,
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
    `http://localhost:8080/api/farms/${farmstandId}/ownercomments`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Comments response: ", allComments.data);
  return allComments.data;
};
