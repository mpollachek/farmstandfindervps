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
import EditIcon from "@mui/icons-material/Edit";
//import { validateCommentForm } from "../../utils/validateCommentForm";

const OwnerCommentForm = ({ farmstandId, setRunGetFarmstands }) => {
  const { userId, userName } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");
    try {
      console.log("post comment values: ", values);
      axios.post(
        `http://localhost:8080/api/farms/${farmstandId}/ownercomments`,
        {
          author: userId,
          text: values.commentText,
          date: new Date(Date.now()).toISOString(),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setModalOpen(false)
      setRunGetFarmstands(true)
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
        <EditIcon /> Post Message
      </Button>
      <Modal isOpen={modalOpen}>
        <ModalHeader toggle={() => setModalOpen(false)}>
          Post Message from Owner
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              author: userId,
              commentText: "",
            }}
            onSubmit={handleSubmit}
            //validate={validateCommentForm}
          >
            <Form>
              <FormGroup>
                <Label htmlFor="rating">Rating</Label>
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

export default OwnerCommentForm;
