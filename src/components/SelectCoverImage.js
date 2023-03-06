import { useState, useContext, useEffect } from "react";
import {
  Container,
  Col,
  Row,
} from "reactstrap";
import { useParams } from "react-router-dom";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { selectFarmstandById } from "../farmstands/farmstandFilter";
import { SingleFarmstandContext } from "../App";
import SelectCoverImageCard from "./SelectCoverImageCard";
import SubHeader from "./SubHeader";


const SelectCoverImage = () => {

  const {farmstand, setFarmstand} = useContext(SingleFarmstandContext)

  const [images, setImages] = useState(farmstand.images)
  const [runGetFarmstands, setRunGetFarmstands] = useState(false);

  const { farmstandId } = useParams();

  const getFarmstand = async () => {
    console.log("run getFarmstand");
    if (runGetFarmstands) {
      console.log("run getFarmstand2");
      const farm = await selectFarmstandById(farmstandId);
      console.log("farm:", farm);
      setFarmstand(farm);
      setImages(farm.images);
      setRunGetFarmstands(false);
      console.log("images: ", images)
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      console.log("setrunget true");
      setRunGetFarmstands(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getFarmstand();
  }, [runGetFarmstands]);

  console.log("images: ", images)

  return(
    <Container>
      <Row>
      <SubHeader current={farmstand.farmstandName} detail={true} cover={true} farmstandId={farmstandId} />
      </Row>
    <Row className="ms-auto">
    {images.map((image) => {
      console.log("1 image: ", image);
      return (
        <Col md="4" className="p-4" key={image}>
          <SelectCoverImageCard farmstandId={farmstandId} image={image} setFarmstand={setFarmstand} setImages={setImages} images={images} />
        </Col>
      );
    })}
  </Row>
  </Container>
  )
}

export default SelectCoverImage