import { useState } from "react";
import {
  Button as RSButton,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
import axios, { Axios } from "axios";

const TestPage = () => {
  const showData = async () => {
    axios
      .get(`http://66.135.5.166/farms`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div>
      <RSButton color="primary" onClick={showData}>
        Open
      </RSButton>
    </div>
  );
};

export default TestPage;
