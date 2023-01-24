import { Container, Row } from "reactstrap";
import FarmstandList from "../farmstands/FarmstandsList";
import SubHeader from "../components/SubHeader";

const FarmstandsPage = () => {
  return (
    <Container>
      <SubHeader current="Farmstands" />
      <Row>
        <FarmstandList />
      </Row>
    </Container>
  );
};

export default FarmstandsPage;
