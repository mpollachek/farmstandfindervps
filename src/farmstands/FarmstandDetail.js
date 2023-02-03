import {
  Button,
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
  Input,
  FormGroup,
  FormText
} from "reactstrap";
import { useState, useContext, useEffect } from "react";
import axios, {Axios} from "axios";
import { Formik, Field, Form, } from "formik";
import { Divider, IconButton } from "@mui/material";
import "../css/FarmstandDetail.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { UserContext } from "../App";
import GMapsIconOld from '../assets/google-maps-old.2048x2048.ico'
import { selectUserOwned } from "../user/UserFns";
import OwnerComment from "../features/comments/OwnerComment";
import { selectOwnerCommentsByFarmstandId } from "../features/comments/commentsFns";
import OwnerCommentForm from "../forms/OwnerCommentForm";
import AddProductsForm from "../forms/AddProductsForm";

const FarmstandDetail = ({ farmstand }) => {
  const { images, farmstandName, description, products, _id: farmstandId, location, owner: farmstandOwner, ownercomments: ownerComments } = farmstand;

  const { userId, userName, setUserId, setUserName, userOwned, setUserOwned } = useContext(UserContext);
  console.log("farmstand: ", farmstand);

  const imageLink = `http://localhost:8080/images/${farmstandId}/`;
  const lat = location.coordinates[1]
  const long = location.coordinates[0]

  const [isFavorite, setIsFavorite] = useState(false);
  const [runGet, setRunGet] = useState(false);

  // const [ownerMsgSent, setOwnerMsgSent] = useState("")
  // const handleOwnerMsgSent = (msg) => {
  //   setOwnerMsgSent(msg)
  // }

  // const [isOwner, setIsOwner] = useState(false);
  // const [runGetIsOwner, setRunGetIsOwner] = useState(false);

  const [files, setFiles] = useState([]);
  const [image, setImage] = useState([]);

  // const [runGetOwnerComments, setRunGetOwnerComments] = useState(false)
  // const [ownerComments, setOwnerComments] = useState([
  //   {
  //     ownerCommentId: "",
  //     text: "",
  //     author: "",
  //     date: "2000-08-04T20:11Z",
  //     updated: "",
  //   },
  // ]);

  /* Favorite Functions */
  const favoriteToggle = async () => {
    const token = await localStorage.getItem("token");
    let favToggle = await axios.put(
      `http://localhost:8080/api/users/isfavorite/${farmstandId}`,
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
    console.log("_id: ", farmstandId);
    console.log("runGet: ", runGet);
    const token = await localStorage.getItem("token");
    if (runGet && farmstandId) {
      let fav = await axios.get(
        `http://localhost:8080/api/users/isfavorite/${farmstandId}`,
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
    console.log("farmstandId: ", farmstandId);
    if (farmstandId) {
      setRunGet(true);
      console.log("setrunget farmstanddetail");
    }
  }, [farmstandId]);

  useEffect(() => {
    getIsFavorite();
    console.log("farmstanddetail getisfavorite");
  }, [runGet]);
  /* End Favorite Functions */

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

  /* Retrieve Owner Comments */
  // const getOwnerComments = async () => {
  //   if (runGetOwnerComments) {
  //     const ownerComments = await selectOwnerCommentsByFarmstandId(`${farmstandId}`);
  //     console.log("comments:", ownerComments);
  //     setOwnerComments(ownerComments);
  //     setRunGetOwnerComments(false);
  //   }
  // };

  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     console.log("setRunGetOwnerComments true");
  //     setRunGetOwnerComments(true);
  //   }, 0);
  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  //   getOwnerComments();
  // }, [runGetOwnerComments]);
  /* End Retrieve Owner Comments */

  /* Add images to farmstand */
  const handleSubmit = async(values) => {
    const formData = new FormData();
    for (const i of image) {
      formData.append("image", i);
    }
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.put(
        `http://localhost:8080/api/farms/${farmstandId}/images`,
        formData,
        config
      ).then((response) => {
        console.log("post: ", values);
        console.log("response: " + JSON.stringify(response));
      });
    } catch (error) {
      console.error(error);
    }
  }
  /* End Add Images to Farmstand */

  // const getIsOwner = async () => {
  //     let ownedArray = await selectUserOwned();
  //     console.log("owner response: ", ownedArray.data);
  //     console.log("ownedArray:", ownedArray);
  //     setUserOwned(ownedArray.data);
  //     console.log("userOwned: ", userOwned);
  // };

  const ownerSubmit = async (values) => {
    const token = await localStorage.getItem("token");
      let ownerToggle = await axios.put(`http://localhost:8080/api/users/owned/${farmstandId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
  console.log("ownerToggle: ", ownerToggle)
  // getIsOwner();
  };

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
        <Row className="my-2" >
          <Col md="8">
            <CardTitle className="ms-3 mt-2" tag="h4">
              {farmstandName}
            </CardTitle>
          </Col>
          <Col md="4" style={{whiteSpace: 'nowrap'}}  >
          <a 
            href = {`https://www.google.com/maps/search/?api=1&query=${lat},${long}`}
            target="blank"
            >
            <img src={GMapsIconOld} style={{width:'50px'}} className='mt-1' />
            </a>
            {userId ? ( 
            <div style={{display: 'inline-block'}} >
            {isFavorite ? (
              <IconButton onClick={favoriteToggle}>
                <FavoriteIcon fontSize="large" style={{color: 'red'}} />
              </IconButton>
            ) : (
              <IconButton onClick={favoriteToggle}>
                <FavoriteBorderIcon fontSize="large" />
              </IconButton>
            )} 
            </div>) : null }
          </Col>
        </Row>
        <Row>
        <Formik
          initialValues={image}
          onSubmit={handleSubmit}
        >
          <Form>
            <FormGroup row>

          <label htmlFor="image" >
            <h5 style={{fontWeight: 'bold'}}>
              Upload Farmstand Images
            </h5>
          </label>
          <Col>
            <Input
              type="file"
              multiple="multiple"
              name="image"
              id="exampleFile"
              value={undefined}
              onChange={(e) => setImage(e.target.files)}
            />
            <FormText color="muted">              
              <Button type="submit" color="primary" className="me-2">
              Add images
            </Button>
            Select 1 or multiple images
            </FormText>
          </Col>
        </FormGroup>
          </Form>
        </Formik>          
        </Row>

        <ListGroup>
          <CardSubtitle className="ms-3 my-2">{description}</CardSubtitle>
        </ListGroup>
        <ListGroup>
          <CardBody className="ms-3 my-2">
            <CardText>
              <span className="products-list" style={{ fontWeight: "700" }}>
                Products and Services:
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

              {/* create add products component in place of below button */}
              <AddProductsForm farmstandId={farmstandId} />
            </CardText>
          </CardBody>
        </ListGroup>
      </Card>

      {/* Below owner messages and buttons need to re-render after change 
      Owner Comments couild be pulled in separate function so as to only rerender comments */} 

      {/* Can remove owner from usercontext in app.js   */}

      {/* If owner, post message button  */}
      {farmstandOwner.includes(userId) ? (
        <OwnerCommentForm farmstandId={farmstandId} />
      ) : null}

      {/* {ownerMsgSent ? (
        <p>{ownerMsgSent}</p> 
      ) : null} */}

      {/* If owner messages, display messages  */}
      <Row>
        {ownerComments && ownerComments.length > 0 ? (
          <Col className="ms-1">
            <h4 className="mb-4">Updates from Owner</h4>
            {ownerComments.map((ownerComment) => {
              return <OwnerComment key={ownerComment.commentId} ownerComment={ownerComment} farmstandOwner={farmstandOwner} />;
            })}
          </Col>
        ) : (
          <Col className="ms-1 ">
            There are no updates for this farmstand yet.
          </Col>
        )}
      </Row>

      {/* Claim/reliquish ownership button  */}
      {userId ? (
        <div>
        {farmstandOwner.includes(userId) ? (
        <Button onClick={ownerSubmit} color="primary" className="mt-3">
          I don't own this farmstand
        </Button>) :
        (<Button onClick={ownerSubmit} color="primary" className="mt-3">
          I own this farmstand
        </Button>) }
        </div>
        ) : null}
      {/* End Claim/reliquish ownership button  */}
    </Col>
  );
};

export default FarmstandDetail;
