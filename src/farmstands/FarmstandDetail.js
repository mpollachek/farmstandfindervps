import { Card, CardImg, CardText, CardBody, Col, CardTitle, CardSubtitle} from 'reactstrap';

const FarmstandDetail = ({farmstand}) => {
  const {image, name, description, products} = farmstand;
  return (
    <Col md='5' className='m-1'>
      <Card>
        <CardImg top src={image} alt={name} />
        <CardTitle className='m-2 ms-3'>{name}</CardTitle>
        <CardSubtitle className='ms-3'>{description}</CardSubtitle>
        <CardBody>
          <CardText>
            <span className='products-list' style={{'fontWeight':'700'}}>Products:
            <span style={{'fontWeight':'400'}}>
            {/* <ul>
              {products.map(p => <li>{p}</li>) key=}
            </ul> */}
            <ul>
            {products.map((product, idx) => {
              return(
                product && (
                  
                    <li key={idx}>{product}</li>
                  
                )
              )
            })}
            </ul>
            </span>
            </span>
          </CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default FarmstandDetail;