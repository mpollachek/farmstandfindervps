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
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
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
import EditProductsForm from "../forms/EditProductsForm";
import { SingleFarmstandContext } from "../App";
import { selectFarmstandById } from "./farmstandFilter";
import RemoveImages from "../components/RemoveImages";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

const FarmstandDetail = ({ currentFarmstand }) => {
  const { images, farmstandName, description, products, _id: farmstandId, location, owner: farmstandOwner, ownercomments: ownerComments, farmstandType } = currentFarmstand;

  const { userId, userName, setUserId, setUserName, userOwned, setUserOwned } = useContext(UserContext);
  const {farmstand, setFarmstand} = useContext(SingleFarmstandContext);

  //console.log("farmstand: ", farmstand);

  const imageLink = `http://localhost:8080/images/${farmstandId}/`;
  const lat = location.coordinates[1]
  const long = location.coordinates[0]

  const [isFavorite, setIsFavorite] = useState(false);
  const [runGet, setRunGet] = useState(false);

  //const [ownerCommentsState, setOwnerCommentsState] = useState(ownerComments)

  const [files, setFiles] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    console.log("image changed: ", image)
  }, [image])

  const getFarmstand = async () => {
    const farm = await selectFarmstandById(farmstandId);
    setFarmstand(farm);
}

//const [runGetOwnerComments, setRunGetOwnerComments] = useState(false)

  // Create getOwnerComments function.  pass function to ownercomment.js. run function when submitting new comment or deleting.  Do same with comment.js

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
  //     const ownerMsgs = await selectOwnerCommentsByFarmstandId(farmstandId);
  //     console.log("comments:", ownerMsgs);
  //     setOwnerCommentsState(ownerMsgs);
  //     setRunGetOwnerComments(false);
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
  const initialValuesAddImages = {
    image: image
  }

  const handleSubmit = async (values) => {
    console.log("add images values: ", values)
    console.log("image: ", image)
    const formData = new FormData();
    for (const i of image) {
      console.log("image i: ", i)
      formData.append("image", i);
    }
    try {
      console.log("form data: ", formData)
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
      getFarmstand()
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
  getFarmstand();
  };

  // slice for owner comments 2 - end
  const ownerCommentsOlder = ownerComments.slice(1, ownerComments.length)

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
            <img src={GMapsIconOld} style={{width:'50px'}} className='mt-1' alt='find location on Google Maps' />
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
          initialValues={initialValuesAddImages}
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
            Select 1 or multiple images
            </FormText>            
          </Col>
        </FormGroup>
        <FormGroup>
        <Button type="submit" color="primary" className="me-2">
              <InsertPhotoIcon /> Add images
            </Button>
            {farmstandOwner.includes(userId) ? (
              <div>
                {'\n'}
            <Link to={`../farmstands/${farmstandId}/removeimages`}>
            <Button
            // onClick={() => setModalOpen(true)}      
            className="my-2"
            color="danger"
          >
            <InsertPhotoIcon /> Remove Images
          </Button>
          </Link>
          </div>
          ) : null }
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
              {farmstandOwner.includes(userId) ? (
        <EditProductsForm farmstandId={farmstandId} prevProducts={products} setFarmstand={setFarmstand} />
      ) : <AddProductsForm farmstandId={farmstandId} setFarmstand={setFarmstand} /> }
              
            </CardText>
          </CardBody>
        </ListGroup>
      </Card>

      {/* Below owner messages and buttons need to re-render after change 
      Owner Comments couild be pulled in separate function so as to only rerender comments */} 

      {/* Can remove owner from usercontext in app.js   */}

      <div className="text-center mt-4">
      <h4>Updates from Owner</h4>
      {/* If owner, post message button  */}      
        {farmstandOwner.includes(userId) ? (
        <OwnerCommentForm farmstandId={farmstandId} setFarmstand={setFarmstand} />
      ) : null}
      </div>

      {/* {ownerMsgSent ? (
        <p>{ownerMsgSent}</p> 
      ) : null} */}

      {/* If owner messages, display messages  */}
      <Row >
        
        {ownerCommentsOlder && ownerCommentsOlder.length > 0 ? (
          <Col className="ms-1">
            {ownerCommentsOlder.map((ownerComment) => {
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
