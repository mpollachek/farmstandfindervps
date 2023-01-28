import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Col,
  CardTitle,
  CardSubtitle,
  ListGroup,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Row,
} from "reactstrap";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import "../css/FarmstandDetail.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { UserContext } from "../App";
import GMapsIconOld from '../assets/google-maps-old.2048x2048.ico'

const FarmstandDetail = ({ farmstand }) => {
  const { images, farmstandName, description, products, _id, location } = farmstand;

  const { userId, userName, setUserId, setUserName } = useContext(UserContext);
  console.log("farmstand: ", farmstand);

  const imageLink = `http://localhost:8080/images/${_id}/`;
  const lat = location.coordinates[1]
  const long = location.coordinates[0]

  const [isFavorite, setIsFavorite] = useState(false);
  const [runGet, setRunGet] = useState(false);

  const favoriteToggle = async () => {
    const token = await localStorage.getItem("token");
    let favToggle = await axios.put(
      `http://localhost:8080/api/users/isfavorite/${_id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRunGet(true);
    console.log("favToggle: ", favToggle);
    getIsFavorite();
  };

  const getIsFavorite = async () => {
    console.log("_id: ", _id);
    console.log("runGet: ", runGet);
    const token = await localStorage.getItem("token");
    if (runGet && _id) {
      let fav = await axios.get(
        `http://localhost:8080/api/users/isfavorite/${_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("fav response: ", fav.data);
      console.log("fav:", fav);
      setIsFavorite(fav.data);
      setRunGet(false);
      console.log("isfavorite: ", isFavorite);
    }
  };

  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //   console.log('setrunget true')
  //   setRunGet(true)
  // }, 0);
  // return () => clearTimeout(timer);
  // }, [_id])

  useEffect(() => {
    console.log("farmstandId: ", _id);
    if (_id) {
      setRunGet(true);
      console.log("setrunget farmstanddetail");
    }
  }, [_id]);

  useEffect(() => {
    getIsFavorite();
    console.log("farmstanddetail getisfavorite");
  }, [runGet]);

  /* useEffect to check and set logged in status */
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token: ", token);
    axios
      .get("http://localhost:8080/api/users/protected", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        setUserId(res.data._id);
        setUserName(res.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  /* end useEffect to check and set logged in status */

  /* Carousel */

  const items = images.map((image, idx) => ({
    src: imageLink + `${image}`,
    key: idx + 1,
  }));
  // {
  //   src: 'https://picsum.photos/id/123/1200/400',
  //   altText: 'Slide 1',
  //   caption: 'Slide 1',
  //   key: 1,
  // },
  // {
  //   src: 'https://picsum.photos/id/456/1200/400',
  //   altText: 'Slide 2',
  //   caption: 'Slide 2',
  //   key: 2,
  // },
  // {
  //   src: 'https://picsum.photos/id/678/1200/400',
  //   altText: 'Slide 3',
  //   caption: 'Slide 3',
  //   key: 3,
  // },

  console.log("images: ", images);
  console.log("items: ", items);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} style={{ width: "100%" }} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });
  /* end carousel */

  return (
    <Col>
      <Card>
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          interval={false}
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
        {/* <CardImg top src={imageLink + `${images[0]}`} alt={farmstandName} /> */}
        <Row className="my-2">
          <Col md="8">
            <CardTitle className="ms-3 mt-2" tag="h4">
              {farmstandName}
            </CardTitle>
          </Col>
          <Col md="4">
          <a 
            href = {`https://www.google.com/maps/search/?api=1&query=${lat},${long}`}
            target="blank"
            >
            <img src={GMapsIconOld} style={{width:'50px'}} className='mt-1' />
            </a>
            {isFavorite ? (
              <IconButton onClick={favoriteToggle}>
                <FavoriteIcon fontSize="large" style={{color: 'red'}} />
              </IconButton>
            ) : (
              <IconButton onClick={favoriteToggle}>
                <FavoriteBorderIcon fontSize="large" />
              </IconButton>
            )}
          </Col>
        </Row>

        <ListGroup>
          <CardSubtitle className="ms-3 my-2">{description}</CardSubtitle>
        </ListGroup>
        <ListGroup>
          <CardBody className="ms-3 my-2">
            <CardText>
              <span className="products-list" style={{ fontWeight: "700" }}>
                Products:
                <span style={{ fontWeight: "400" }}>
                  {/* <ul>
              {products.map(p => <li>{p}</li>) key=}
            </ul> */}
                  <ul className="products">
                    {products.map((product, idx) => {
                      return product && <li key={idx}>{product}</li>;
                    })}
                  </ul>
                </span>
              </span>
            </CardText>
          </CardBody>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default FarmstandDetail;
