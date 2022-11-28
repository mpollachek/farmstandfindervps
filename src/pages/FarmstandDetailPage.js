import { Container, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { selectFarmstandById } from '../farmstands/farmstandFilter';
import FarmstandDetail from '../farmstands/FarmstandDetail';
import CommentsList from '../features/comments/CommentList';
import SubHeader from '../components/SubHeader';
import Error from '../components/Error';
import Loading from '../components/Loading';

const FarmstandDetailPage = () => {
  const { farmstandId } = useParams();
  const farmstand = selectFarmstandById(farmstandId);
  console.log('farmstand:', farmstand);
  // const isLoading = useSelector((state) => state.farmstands.isLoading);
  // const errMsg = useSelector((state) => state.farmstands.errMsg);
  let content = null;

  // if (farmstand.isLoading) {
  //   content = <Loading />;
  // } else if (farmstand.errMsg) {
  //   content = <Error errMsg={errMsg} />;
  // } else {
    content = (
        <>
            <FarmstandDetail farmstand={farmstand} />
            <CommentsList farmstandId={farmstandId} />
        </>
    );
// }

  return (
    <Container>
      <SubHeader current={farmstand.name} detail={true} />
      <Row>
        <FarmstandDetail farmstand={farmstand} />
        <CommentsList farmstandId={farmstandId} />
      </Row>
    </Container>
  );
};

export default FarmstandDetailPage;