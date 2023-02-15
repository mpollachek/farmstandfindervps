import { Container, Row } from "reactstrap";
import FavoritesList from "../favorites/FavoritesList";
import SubHeader from "../components/SubHeader";

const FavoritesPage = () => {
  return (
    <Container>
      <SubHeader current="Favorites" detail={false} />
      <Row>
        <FavoritesList />
      </Row>
    </Container>
  );
};

export default FavoritesPage;
