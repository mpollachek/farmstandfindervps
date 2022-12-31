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
  CardImgOverlay
} from 'reactstrap';
import { Link } from 'react-router-dom';


const FarmstandCard = ({ item }) => {
  const { _id, image, name } = item;
  const imageLink = `http://localhost:8080/images/${_id}/`
  const testImage = `http://localhost:8080/images/63ae1562439a346736c442fb/1672353122205.jpg`
  return (
    <Link to={`../farmstands/${_id}`}>
      {console.log("farmstand card item: ", item)}
      {console.log("farmstand card id: ", _id)}
      {console.log("farmstand card image: ", image)}
      {console.log("farmstand card name: ", name)}
    <Card>

      <CardImg 
        width='100%'
        src={testImage}
        alt={name}
      />
      <CardImgOverlay>
        <CardTitle>{name}</CardTitle>
      </CardImgOverlay>
  </Card>
  </Link>
  );
}

export default FarmstandCard;