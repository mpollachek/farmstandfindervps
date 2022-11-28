import { Col, Row } from 'reactstrap';
import FarmstandCard from './FarmstandCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { selectFeaturedFarmstands, selectAllFarmstands } from '../farmstands/farmstandFilter';
import { FARMSTANDS } from '../testData/FARMSTANDS';

const FarmstandList = () => {
    const items = selectAllFarmstands();
    console.log("featured farmstands: " + items);
  return(
    <Row>
        <h1 className='text-center'>All Farmstands Within XXX Miles</h1>
        {items.map((item, id) => {
          const { isLoading, errMsg } = item;
          if (isLoading) {
            return <Loading key={id} />;
          }
          if (errMsg) {
            return <Error errMsg={errMsg} key={id} />;
          }

          return (
            item && (
              <Col md='4' className='g-4' key={id}>
                <FarmstandCard item={item} />
              </Col>
            )
          )
        })}
    </Row>
  );
};

export default FarmstandList;