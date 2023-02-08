import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useContext, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { UserContext } from "../../App";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import EditOwnerCommentForm from "../../forms/EditOwnerCommentForm";
import { SingleFarmstandContext } from "../../App";
import { selectFarmstandById } from "../../farmstands/farmstandFilter";

const OwnerComment = ({ ownerComment, farmstandOwner }) => {

  const { _id: commentId, text: commentText, author, createdAt: date, updatedAt: updated, farmstandId } = ownerComment;

  const { userId } = useContext(UserContext);
  const {farmstand, setFarmstand} = useContext(SingleFarmstandContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [editCommentText, setEditCommentText] = useState("")

  const TextEdited = () => {
    return <p>Updated: {formatDate(updated)}</p>;
  };

  //console.log("farmstandOwner: ", farmstandOwner)

  const getFarmstand = async () => {
      const farm = await selectFarmstandById(farmstandId);
      setFarmstand(farm);
  }
    

  const deleteSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const deleteOwnerComment = await axios.delete(
        `http://localhost:8080/api/farms/${farmstandId}/ownercomments/${commentId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
    )
  console.log("deleteOwnerComment: ", deleteOwnerComment)
  setModalOpen(false)
  getFarmstand()
  } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mb-5" >
      <h6>
        {commentText}
      </h6>
      <p>
        Posted: {formatDate(date)} <br />
        <div>{updated && date !== updated ? <TextEdited /> : null}</div>
      </p>
      {farmstandOwner.includes(userId) ? (
        <div className="justify-content-between">
          <EditOwnerCommentForm farmstandId={farmstandId} commentId={commentId} commentText={commentText} getFarmstand={getFarmstand} />
        <Button onClick={() => setModalOpen(true)} color="primary" >
          Delete
        </Button>
        </div>
      ) : null}
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
    </div>
  );
};

export default OwnerComment;
