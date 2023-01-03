import axios from "axios";
import { useEffect, useState } from "react";
import { selectAllData, selectAllDataImages } from "../farmstands/farmstandFilter";
import { Row, Container } from "reactstrap";




const TestPage2 = () => {

  console.log('test2')

  const [runGet, setRunGet] = useState(false);
  const [images, setImages] = useState([])
  const [images2, setImages2] = useState([])

  const testPath = `http://localhost:8080/images/`

  const testImage = `http://localhost:8080/images/63ae1562439a346736c442fb/1672353122205.jpg`

  const id = '63ae4f5c7ab1e01e94b626e8'

  const getImages = async () => {
    const allDataImages = await selectAllDataImages([`${id}`]);
    console.log("allDataImages: ", allDataImages)
    console.log("allDataImages.data: ", allDataImages.data)
    console.log("allDataImages.data values: ", Object.values(allDataImages.data)[0])
    console.log("stringify allDataImages: ", JSON.stringify(allDataImages))
    console.log("stringify allDataImages.data: ", JSON.stringify(allDataImages.data))
    console.log("stringify allDataImages.data values: ", JSON.stringify(Object.values(allDataImages.data)))
    setImages(Object.values(allDataImages.data)[0])
    setImages2(Object.values(images))
    console.log("Images: ", images)
    console.log("Images2: ", images2)
  } 

  useEffect(() => {
    let timer = setTimeout(() => {
    setRunGet(true)
  }, 1000);
  return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    if (runGet) {
    getImages()
}}, [])

  useEffect(() => {
      getImages();
}, [runGet]);

  return(
    <Container>
      <img 
      src={`http://localhost:8080/images/${id}/${images[0]}`} 
      style={{maxWidth: '300px'}}
      />
      {console.log("images[0]: ", images[0])}

    <Row className="ms-auto">
    { images.map((image, index) => {
      console.log("image: ", image)
      return(
      <img 
      key={index} 
      src={`http://localhost:8080/images/${id}/${image}`} 
      style={{maxWidth: '300px'}}
      />
    )})
    }
    </Row>
    </Container>
  )  
}

export default TestPage2