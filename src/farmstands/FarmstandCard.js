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
import StarIcon from '@mui/icons-material/Star';

/* Bring name above image and add avg rating to it
avg of farmstand.comments.rating
Also add avg rating in farmstandDetailpage */

const FarmstandCard = ({ item }) => {
  console.log("farmstand card item: ", item);
  const { _id, images, farmstandName, comments } = item;
  const imageLink = `http://localhost:8080/images/${_id}/${images[0]}`;
  console.log("comments: ", comments)

  const ratingsSum = () => {
    let sum = 0
    for (const i of comments){
      sum += i.rating
    }
    return sum;
  }

  const avgRating = ratingsSum()/comments.length
  // const testImage = `http://localhost:8080/images/63ae1562439a346736c442fb/1672353122205.jpg`;
  // const testImage2 = `http://localhost:8080/images/63ae1562439a346736c442fb/1672353122205.jpg`;
  return (
    <Link to={`../farmstands/${_id}`}>
      {console.log("farmstand card item: ", item)}
      {console.log("farmstand card id: ", _id)}
      {console.log("farmstand card image: ", images)}
      {console.log("farmstand card name: ", farmstandName)}
      <Card>
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
        {images.length > 0 ? (
          <CardImg width="100%" src={imageLink} alt={farmstandName} />
        ) : null}
        {/* {images.length > 0 ? (
          <CardImgOverlay>
            <CardTitle>{farmstandName}</CardTitle>
          </CardImgOverlay>
        ) : null} */}

      </Card>
    </Link>
  );
};

export default FarmstandCard;
