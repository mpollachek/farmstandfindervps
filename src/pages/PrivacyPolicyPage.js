import { Container, Row } from 'reactstrap'
import SubHeader from '../components/SubHeader';
import PrivacyPolicy from "../legal/PrivacyPolicy";

const PrivacyPolicyPage = () => {

  return(
    <Container>
      <SubHeader current="Privacy Policy" detail={false} />
      <Row>
        <PrivacyPolicy />
      </Row>
    </Container>
  )
}

export default PrivacyPolicyPage