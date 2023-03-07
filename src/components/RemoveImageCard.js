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

const RemoveImageCard = ({farmstandId, image, setImages }) => {

  const imageLink = `${backendUrl}/images/${farmstandId}/${image}`;

  const getFarmstandImages = async () => {
    const farm = await selectFarmstandById(farmstandId);
    setImages(farm.images)
}

  const removeImgSubmit = async (values) => {
    const token = await localStorage.getItem("token");
    try {
      console.log("post comment values: ", values);
      await axios.put(
        `${backendUrl}/api/farms/${farmstandId}/removeImage`,
        {
          image: image,
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
      onClick={() => removeImgSubmit()}
      color='danger'
      >
        Delete
      </Button>
    </Card>
  )
}

export default RemoveImageCard;

{/* <img src={`${imageLink}${image}`} width='100%' /> */}