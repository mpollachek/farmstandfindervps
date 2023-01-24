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
} from "reactstrap";

const DisplayCard = ({ item }) => {
  const { id, image, name, description } = item;
  return (
    <Card>
      <CardImg src={image} alt={name} />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  );
};

export default DisplayCard;
