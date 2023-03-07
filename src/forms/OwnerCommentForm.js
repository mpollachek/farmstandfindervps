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
import { SingleFarmstandContext } from "../App";
import { selectFarmstandById } from "../farmstands/farmstandFilter";
import EditIcon from "@mui/icons-material/Edit";
import Picker, {EmojiStyle} from "emoji-picker-react";
//import { validateCommentForm } from "../../utils/validateCommentForm";
import { backendUrl } from "../config";

const OwnerCommentForm = ({ farmstandId, setFarmstand }) => {
  const { userId, userName } = useContext(UserContext);
  //const {farmstand, setFarmstand} = useContext(SingleFarmstandContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("")

  function onEmojiClick(emojiObject, event) {
    console.log("emojiData: ", emojiObject)
    setTextAreaValue((prevText) => prevText + emojiObject.emoji);
  }

  const getFarmstand = async () => {
    console.log("run getFarmstand ownercomment");
      console.log("run getFarmstand2");
      const farm = await selectFarmstandById(farmstandId);
      console.log("farm:", farm);
      setFarmstand(farm);
  }

  const handleSubmit = async (values) => {
    const token = await localStorage.getItem("token");
    try {
      console.log("post comment values: ", values);
      console.log("textareavalue", textAreaValue)
      await axios.post(
        `${backendUrl}/api/farms/${farmstandId}/ownercomments`,
        {
          author: userId,
          text: textAreaValue,
          date: new Date(Date.now()).toISOString(),
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
        className="my-3"
      >
        <EditIcon /> Post Message
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

export default OwnerCommentForm;
