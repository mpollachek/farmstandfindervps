import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  ListGroupItem,
  ListGroup,
  CardHeader,
  CardFooter,
  CardImgOverlay,
  Col,
  Row,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GMapsIconOld from '../assets/google-maps-old.2048x2048.ico';
import FarmTypeIconsMap from "../components/FarmTypeIconsMap";
import { backendUrl } from "../config";

/* Bring name above image and add avg rating to it
avg of farmstand.comments.rating
Also add avg rating in farmstandDetailpage */

const FarmstandCard = ({ item, favorite, getFavorites, setRunGet }) => {
  console.log("farmstand card item: ", item);
  const { _id, images, farmstandName, comments, location, farmstandType } = item;
  const imageLink = `${backendUrl}/public/images/${_id}/${images[0]}`;
  console.log("comments: ", comments)
  console.log("favorite: ", favorite)
  console.log("location: ", location)

  const lat = location.coordinates[1]
  const long = location.coordinates[0]

  const ratingsSum = () => {
    let sum = 0
    for (const i of comments){
      sum += i.rating
    }
    return sum;
  }

  const avgRating = (ratingsSum()/comments.length).toFixed(1)
  // const testImage = `${backendUrl}/public/images/63ae1562439a346736c442fb/1672353122205.jpg`;
  // const testImage2 = `${backendUrl}/public/images/63ae1562439a346736c442fb/1672353122205.jpg`;

  const favoriteToggle = async () => {
    const token = await localStorage.getItem("token");
    let favToggle = await axios.put(
      `${backendUrl}/api/users/isfavorite/${_id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRunGet(true);
    console.log("favToggle: ", favToggle);
    getFavorites();
  };


  return (
    <Card>
    <Link to={`../farmstands/${_id}`}>
      {console.log("farmstand card item: ", item)}
      {console.log("farmstand card id: ", _id)}
      {console.log("farmstand card image: ", images)}
      {console.log("farmstand card name: ", farmstandName)}      
            <CardTitle
            tag="h5"
            className="my-2 title"
            style={{ fontWeight: "bold" }}>
              <Row>
                <Col className="col-8">
              {farmstandName}
              </Col>
              <Col tag="h6" className="text-end">
              {avgRating > 0 ? (
                <div>
                <StarIcon style={{color: '#f79707', fontWeight: 'bold'}}  /> {avgRating}
                </div>
              ) : null}
              </Col>
              </Row>
              </CardTitle>
              <CardBody>
        {images.length > 0 ? (
          <CardImg width="100%" src={imageLink} alt={farmstandName} />
        ) : null}
        </CardBody>
        </Link>
        <CardFooter>
          <Row>
            <Col className="col-8">
            <a 
            href = {`https://www.google.com/maps/search/?api=1&query=${lat},${long}`}
            target="blank"
            >
            <img src={GMapsIconOld} style={{width:'50px'}} className='mt-1' />
            </a>
            </Col>
            <Col className="text-end">
            {favorite ? (
            <IconButton onClick={favoriteToggle}>
              <FavoriteIcon fontSize='large' style={{color: 'red'}} /> 
            </IconButton>) : (
            <IconButton onClick={favoriteToggle}>
              <FavoriteBorderIcon fontSize="large" />
            </IconButton>
            )}
            </Col>
            </Row>
            <Row>
              <FarmTypeIconsMap farmType={farmstandType} />
            </Row>
          </CardFooter>
      </Card>    
  );
};

export default FarmstandCard;
