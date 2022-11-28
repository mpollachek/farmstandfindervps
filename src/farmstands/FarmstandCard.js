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
  const { id, image, name } = item;
  return (
    <Link to={`../farmstands/${id}`}>
    <Card>
      <CardImg 
        width='100%'
        src={image}
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