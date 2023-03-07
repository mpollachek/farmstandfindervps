import { Button, Col, Modal, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";

const DeleteComment = ({getMyComments, farmstandId, commentId, setRunGetMyComments}) => {

  const [modalOpen, setModalOpen] = useState(false);

  const deleteSubmit = async () => {
    let token = ""
  if (localStorage.getItem("token")) {
    token = await localStorage.getItem("token");
  } else if (localStorage.getItem("google")) {
    token = await localStorage.getItem("google");
  } else if (localStorage.getItem("facebook")) {
    token = await localStorage.getItem("facebook");
  }
  
    try {
      const deleteComment = await axios.delete(
        `${backendUrl}/api/farms/${farmstandId}/comments/${commentId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
    )
    setModalOpen(false)
    setRunGetMyComments(true)
    getMyComments()
    console.log("delete comment: ", deleteComment)
  } catch (error) {
      
      console.error(error);
    }
  }
  
  return(
    <Row>
      <div>
    <Button 
      onClick={() => setModalOpen(true)} 
      color="primary" 
      className="mt-2"
      block
      >
        Delete
    </Button>
            </div>
            <Modal isOpen={modalOpen} size='lg'>
        <ModalHeader toggle={() => setModalOpen(false)}>
        Are you sure you wish to delete?
        </ModalHeader>
        <ModalFooter>
          <Button onClick={deleteSubmit} color="primary">
            Delete
          </Button>
          <Button onClick={() => setModalOpen(false)} color="primary">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Row>
  )
}

export default DeleteComment;


