import { Container, Row } from "reactstrap";
import MyCommentsList from "../features/comments/MyCommentsList";
import SubHeader from "../components/SubHeader";

const MyCommentsPage = () => {

  return (
    <Container>
      <SubHeader current="My Comments" detail={false} />
      <Row>
        <MyCommentsList />
      </Row>
    </Container>
  );
};

export default MyCommentsPage;
