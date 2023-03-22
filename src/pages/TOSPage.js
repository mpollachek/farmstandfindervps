import { Container, Row } from 'reactstrap'
import SubHeader from '../components/SubHeader';
import { iframeTOS } from '../assets/legal/termsofservice';

const TOSPage = () => {

  return(
    <Container>
      <SubHeader current="Terms of Service" detail={false} />
      <Row>
      <div dangerouslySetInnerHTML={{ __html: iframeTOS }} />;
      </Row>
    </Container>
  )
}

export default TOSPage