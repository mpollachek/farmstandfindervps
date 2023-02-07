import { useState, useContext, useEffect } from "react";
import {
  Container,
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


const RemoveImages = ({farmstandId, images}) => {

  const [files, setFiles] = useState(images)
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (values) => {
    const token = await localStorage.getItem("token");
    try {
      console.log("post comment values: ", values);
      axios.put(
        `http://localhost:8080/api/farms/${farmstandId}/removeImages`,
        {
          images: files,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setModalOpen(false)
    } catch (error) {
      console.error(error);
    }
  } 

  return(
    <Container>
      <Row>
        <Col>
        
        </Col>
      </Row>
    </Container>
  )
}

export default RemoveImages