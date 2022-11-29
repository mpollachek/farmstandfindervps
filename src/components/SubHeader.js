import { Col, Row, Breadcrumb, BreadcrumbItem, Button as RSButton } from 'reactstrap';
import { Link } from 'react-router-dom';

const SubHeader = ({ current, detail }) => {
  return (
    <Row style={{marginTop: '1%'}}>
      <Col md={4}>
        <Breadcrumb>
          {/* <BreadcrumbItem>
            <Link to='/'>Map</Link>
          </BreadcrumbItem> */}
          {detail && (
          <BreadcrumbItem>
            <Link to='/farmstands'>Farmstands</Link>
          </BreadcrumbItem>
          )}
          <BreadcrumbItem active>{current}</BreadcrumbItem>
        </Breadcrumb>
        <h2>{current}</h2>
        </Col>
        <Col md={4} className='text-center'>
        <div >
          <Link to="/">
          <RSButton color='primary' size='lg' style={{opacity: '80%', width: '200px'}}>
            Map View
          </RSButton>
          </Link>
          </div>
        </Col>
        <Col md={4}></Col>
        <hr />        
      
    </Row>
  );
};

export default SubHeader;