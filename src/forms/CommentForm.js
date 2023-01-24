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
import ReactStars from "react-rating-stars-component";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
//import { validateCommentForm } from "../../utils/validateCommentForm";
//import { postComment } from "./commentsSlice";

const CommentForm = ({ farmstandId }) => {
  const { userId, userName } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(0);

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

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");
    try {
      console.log("rating: ", rating);
      console.log("post comment values: ", values);
      axios.post(
        `http://localhost:8080/api/farms/${farmstandId}/comments`,
        {
          author: userId,
          text: values.commentText,
          rating: rating,
          date: new Date(Date.now()).toISOString(),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
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
        className="my-3"
      >
        <EditIcon /> Add Comment
      </Button>
      <Modal isOpen={modalOpen}>
        <ModalHeader toggle={() => setModalOpen(false)}>
          Add Comment
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              rating: rating,
              author: userId,
              commentText: "",
            }}
            onSubmit={handleSubmit}
            //validate={validateCommentForm}
          >
            <Form>
              <FormGroup>
                <Label htmlFor="rating">Rating</Label>
                <ReactStars {...starsRating} />
                <ErrorMessage name="rating">
                  {(msg) => <p className="text-danger">{msg}</p>}
                </ErrorMessage>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="commentText">Comment</Label>
                <Field
                  name="commentText"
                  as="textarea"
                  rows="12"
                  className="form-control"
                />
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

export default CommentForm;
