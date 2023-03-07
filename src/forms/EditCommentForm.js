import { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Col,
  Row,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { UserContext } from "../App";
import { CommentsContext } from "../App";
import { selectCommentsByFarmstandId } from "../features/comments/commentsFns";
import ReactStars from "react-rating-stars-component";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Picker, {EmojiStyle} from "emoji-picker-react";
//import { validateCommentForm } from "../../utils/validateCommentForm";
//import { postComment } from "./commentsSlice";
import { backendUrl } from "../config";

const EditCommentForm = ({ farmstandId, commentId, commentText, prevRating, getFarmstand }) => {
  const { userId, userName } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(prevRating);
  const [textAreaValue, setTextAreaValue] = useState(commentText)
  //const { comments, setComments } = useContext(CommentsContext)

  function onEmojiClick(emojiObject, event) {
    console.log("emojiData: ", emojiObject)
    setTextAreaValue((prevText) => prevText + emojiObject.emoji);
  }

  const starsRating = {
    name: "rating",
    size: 0,
    count: 5,
    color: "black",
    activeColor: "#f79707",
    value: rating,
    a11y: true,
    isHalf: true,
    // emptyIcon: <i className="far fa-sharp fa-star star" />,
    // halfIcon: <i className="fa fa-sharp fa-star-half-alt star" />,
    // filledIcon: <i className="fa fa-sharp fa-star star" />,
    emptyIcon: <StarOutlineIcon className="star" />,
    halfIcon: <StarHalfIcon className="star" />,
    filledIcon: <StarIcon className="star" />,
    onChange: (newRating) => {
      setRating(newRating);
      console.log("rating: ", rating);
    },
  };

  // const getComments = async () => {
  //   const comments = await selectCommentsByFarmstandId(farmstandId);
  //   console.log("comments:", comments);
  //   setComments(comments);
  // }

  const handleSubmit = async (values) => {
    let token = ""
  if (localStorage.getItem("token")) {
    token = await localStorage.getItem("token");
  } else if (localStorage.getItem("google")) {
    token = await localStorage.getItem("google");
  } else if (localStorage.getItem("facebook")) {
    token = await localStorage.getItem("facebook");
  }
  
    try {
      console.log("rating: ", rating);
      console.log("post comment values: ", values);
      await axios.put(
        `${backendUrl}/api/farms/${farmstandId}/comments/${commentId}`,
        {
          text: textAreaValue,
          rating: rating,
          updatedAt: new Date(Date.now()).toISOString(),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setTextAreaValue("")
      setModalOpen(false)
      getFarmstand()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        outline
        onClick={() => setModalOpen(true)}
        style={{ fontWeight: "bold", color: "black" }}
        block
      >
        <EditIcon /> Edit Comment
      </Button>
      <Modal isOpen={modalOpen} size='lg'>
        <ModalHeader toggle={() => setModalOpen(false)}>
          Edit Comment
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              rating: rating,
              author: userId,
              commentText: textAreaValue,
            }}
            onSubmit={handleSubmit}
            //validate={validateCommentForm}
          >
            <Form>
              <FormGroup>
              <Row>
                  <Col>
                <Label htmlFor="rating">Rating</Label>
                <ReactStars {...starsRating} />
                <ErrorMessage name="rating">
                  {(msg) => <p className="text-danger">{msg}</p>}
                </ErrorMessage>
                </Col>
                </Row>
              </FormGroup>
              <FormGroup>
              <Row>
                  <Col>
                <Label htmlFor="commentText">Comment</Label>
                <Field
                  name="commentText"
                  as="textarea"
                  rows="12"
                  className="form-control"
                  value={textAreaValue}
                  onChange={(e) => setTextAreaValue(e.target.value)}
                />
                <img
                  className="emoji-icon"
                  src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                  alt=""
                />
                </Col>
                </Row>
                <Row>
                  <Col>
                  <Picker emojiStyle={EmojiStyle.GOOGLE} onEmojiClick={onEmojiClick} width='100%' />
                  </Col>
                </Row>
              </FormGroup>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditCommentForm;
