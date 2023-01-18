import { useState, useContext } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
} from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { UserContext } from "../App";
//import { validateCommentForm } from "../../utils/validateCommentForm";
//import { postComment } from "./commentsSlice";

const CommentForm = ({ farmstandId }) => {

  const {userId, userName} = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);

  //const dispatch = useDispatch();

  // const handleSubmit = (values) => {
  //   const comment = {
  //     campsiteId: parseInt(campsiteId),
  //     rating: values.rating,
  //     author: values.author,
  //     text: values.commentText,
  //     date: new Date(Date.now()).toISOString(),
  //   };

   // console.log({ comment });

    //dispatch(postComment(comment));

    //setModalOpen(false);
  //};


  const handleSubmit = async (values) => {
    const token = localStorage.getItem('token');
    try {
      console.log("post comment values: ", values);
    axios.post(`http://localhost:8080/api/farms/${farmstandId}/comments`, {
      author: userId,
      text: values.commentText,
      rating: values.rating,
      date: new Date(Date.now()).toISOString(),
    }, {
      headers: {
        Authorization: 'Bearer ' + token,
    }
    })
  } catch (error) {
    console.error(error)
  }
}


  return (
    <>
      <Button outline onClick={() => setModalOpen(true)}>
        <i className="fa fa-pencil fa-lg" /> Add Comment
      </Button>
      <Modal isOpen={modalOpen}>
        <ModalHeader toggle={() => setModalOpen(false)}>
          Add Comment
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              rating: "",
              author: userId,
              commentText: "",
            }}
            onSubmit={handleSubmit}
            //validate={validateCommentForm}
          >
            <Form>
              <FormGroup>
                <Label htmlFor="rating">Rating</Label>
                <Field name="rating" as="select" className="form-control">
                  <option>Select...</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Field>
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
