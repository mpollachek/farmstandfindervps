import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardHeader,
  CardFooter,
  CardImgOverlay,
  Col,
  Row,
  CardSubtitle,
} from "reactstrap";
import axios from "axios";
import { SingleFarmstandContext } from "../App";
import { selectFarmstandById } from "../farmstands/farmstandFilter";
import { backendUrl } from "../config";

const SelectCoverImageCard = ({farmstandId, image, setImages, images }) => {

  const imageLink = `http://${backendUrl}/public/images/${farmstandId}/${image}`;

  const getFarmstandImages = async () => {
    const farm = await selectFarmstandById(farmstandId);
    setImages(farm.images)
}

  const coverImgSubmit = async (values) => {
    const token = await localStorage.getItem("token");
    try {
      console.log("post comment values: ", values);
      await axios.put(
        `${backendUrl}/api/farms/${farmstandId}/coverimage`,
        {
          image: image,
          images: images
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getFarmstandImages()
    } catch (error) {
      console.error(error);
    }
  } 


  return (
    <Card>
      <CardImg width="100%" src={imageLink} alt='' />
      <Button
      onClick={() => coverImgSubmit()}
      color='success'
      >
        make cover image
      </Button>
    </Card>
  )
}

export default SelectCoverImageCard;
