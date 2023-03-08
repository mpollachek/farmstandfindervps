import axios from "axios";
import { useEffect, useState } from "react";
import {
  selectAllData,
  selectImagesByIds,
  selectImagesByIdsTest,
  selectCardImage,
} from "../farmstands/farmstandFilter";
import { Row, Container } from "reactstrap";
import { backendUrl, localPath  } from "../config";

const TestPage2 = () => {
  console.log("test2");

  const [runGet, setRunGet] = useState(false);
  const [images, setImages] = useState([]);
  const [images2, setImages2] = useState([]);
  const [cardImage, setCardImage] = useState("");

  const testPath = `${backendUrl}/images/`;

  const testImage = `${backendUrl}/images/63ae1562439a346736c442fb/1672353122205.jpg`;

  const id = "63ae4f5c7ab1e01e94b626e8";

  /*
  const getImages = async () => {
  if (runGet) {
    //const allDataImages = await selectImagesByIds([`${id}`]);
    const getCardImage = await selectCardImage(`${id}`)
    // console.log("allDataImages: ", allDataImages)
    // console.log("allDataImages.data: ", allDataImages.data)
    // console.log("allDataImages.data values: ", Object.values(allDataImages.data)[0])
    // console.log("stringify allDataImages: ", JSON.stringify(allDataImages))
    // console.log("stringify allDataImages.data: ", JSON.stringify(allDataImages.data))
    // console.log("stringify allDataImages.data values: ", JSON.stringify(Object.values(allDataImages.data)))
    console.log("getcardImage: ", getCardImage)
    console.log("getCardImage.data: ", getCardImage.data)
    console.log("getCardImage.data values: ", Object.values(getCardImage.data)[0])
    //setImages(Object.values(allDataImages.data)[0])
    //setImages2(Object.values(images))
    setCardImage(getCardImage.data)
    console.log("Images: ", images)
    console.log("Images2: ", images2)
    setRunGet(false);
  }} 

  useEffect(() => {
    let timer = setTimeout(() => {
    setRunGet(true)
  }, 1000);
  return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    getImages()
}, [runGet])
*/

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    axios
      .get(`${backendUrl}/api/users/test`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("You are Authenticated: ", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <img
        src={`${backendUrl}/images/${id}/${cardImage}`}
        style={{ maxWidth: "300px" }}
      />
      {console.log("images[0]: ", images[0])}

      {/* <Row className="ms-auto">
    { images.map((image, index) => {
      console.log("image: ", image)
      return(
      <img 
      key={index} 
      src={`${backendUrl}/images/${id}/${image}`} 
      style={{maxWidth: '300px'}}
      />
    )})
    }
    </Row> */}
    </Container>
  );
};

export default TestPage2;
