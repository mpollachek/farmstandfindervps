import { Container, Row } from 'reactstrap'
import SubHeader from '../components/SubHeader';
import { iframePrivacy } from '../assets/legal/privacypolicy';

const PrivacyPolicyPage = () => {

  return(
    <Container>
      <SubHeader current="Privacy Policy" detail={false} />
      <Row>
      <div dangerouslySetInnerHTML={{ __html: iframePrivacy }} />;
      </Row>
    </Container>
  )
}

export default PrivacyPolicyPage