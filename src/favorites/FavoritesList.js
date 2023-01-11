import {Col, Row} from 'reactstrap';
import { useState, useEffect } from 'react';
import { selectFavoriteFarmstands } from '../farmstands/farmstandFilter';
import FarmstandCard from '../farmstands/FarmstandCard';

const FavoritesList = () => {

  const [favoriteFarmstands, setFavoriteFarmstands] = useState([]);
  const [runGet, setRunGet] = useState(false)

  //to change:
  const userId = "blah"

  const getFavorites = async () => {
    if (runGet) {
      const allFavorites = selectFavoriteFarmstands(`${userId}`);
      setFavoriteFarmstands(allFavorites);
      console.log("allFavorites: ", allFavorites);
      setRunGet(false);
    }
  }

  useEffect(() => {
    setRunGet(true)
  }, [])

  useEffect(() => {
      getFavorites();
}, [runGet]);

  return (
    <Row className='ms-auto'>
      {favoriteFarmstands.map((farmstand) => {
        return(
          <Col md='4' className='m-4' key={farmstand._id}>
            <FarmstandCard farmstand={farmstand} />
          </Col>
        )
      }) }
    </Row>
  )
}

export default FavoritesList;