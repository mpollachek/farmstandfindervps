import { useState, useContext, useEffect } from "react";
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
import Picker, {EmojiStyle} from "emoji-picker-react";
//import { validateCommentForm } from "../../utils/validateCommentForm";

const EditOwnerCommentForm = ({ farmstandId, commentId, commentText }) => {
  const { userId, userName } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(commentText)

  function onEmojiClick(emojiObject, event) {
    console.log("emojiData: ", emojiObject)
    setTextAreaValue((prevText) => prevText + emojiObject.emoji);
  }

  const handleSubmit = async (values) => {
    const token = await localStorage.getItem("token");
    try {
      console.log("post comment values: ", values);
      console.log("textareavalue", textAreaValue)
      axios.put(
        `http://localhost:8080/api/farms/${farmstandId}/ownercomments/${commentId}`,
        {
          text: textAreaValue,
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
    } catch (error) {
      console.error(error);
    }
  };

  // const getCommentText = () => {
  //   const getComment = axios.get(
  //     `http://localhost:8080/api/farms/${farmstandId}/ownercomments/${commentId}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   console.log("Comments response: ", getComment.data);
  //   setTextAreaValue(getComment.data);
  // }

  // useEffect(() => {
  //   if (modalOpen)
  //     getCommentText()
  //   }, [modalOpen])

  return (
    <>
      <Button
        outline
        onClick={() => setModalOpen(true)}
        style={{ fontWeight: "bold", color: "black" }}
      >
        <EditIcon /> Edit Message
      </Button>
      <Modal isOpen={modalOpen} size="lg">
        <ModalHeader toggle={() => setModalOpen(false)}>
          Post Message from Owner
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
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
                  <Label htmlFor="commentText">Provide updates about your farm or garden center</Label>
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

export default EditOwnerCommentForm;
