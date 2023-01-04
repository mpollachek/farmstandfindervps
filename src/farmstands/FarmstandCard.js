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
  const { _id, images, farmstandName } = item;
  const imageLink = `http://localhost:8080/images/${_id}/${images[0]}`
  const testImage = `http://localhost:8080/images/63ae1562439a346736c442fb/1672353122205.jpg`
  const testImage2 = `http://localhost:8080/images/63ae1562439a346736c442fb/1672353122205.jpg`
  return (
    <Link to={`../farmstands/${_id}`}>
      {console.log("farmstand card item: ", item)}
      {console.log("farmstand card id: ", _id)}
      {console.log("farmstand card image: ", images)}
      {console.log("farmstand card name: ", farmstandName)}
    <Card>

    {images.length > 0 ? <CardImg 
        width='100%'
        src={imageLink}
        alt={farmstandName}
      /> : null}
      {images.length > 0 ? <CardImgOverlay>
        <CardTitle>{farmstandName}</CardTitle>
      </CardImgOverlay>
      : null}

      {images.length <= 0 ? <CardTitle
      tag='h5'
      className='text-center my-2'
        style={{fontWeight: 'bold'}}
      >
        {farmstandName}
      </CardTitle> 
      : null}
  </Card>
  </Link>
  );
}

export default FarmstandCard;