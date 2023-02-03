import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useContext, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { UserContext } from "../../App";
import axios from "axios";
import EditCommentForm from "../../forms/EditCommentForm";

const Comment = ({ comment }) => {
  const { commentId, text: commentText, rating, author, createdAt: date, updatedAt: updated, farmstandId, authorId } = comment;

  //console.log("comment: ", comment)

  const { userId } = useContext(UserContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [editCommentText, setEditCommentText] = useState("")

  const TextEdited = () => {
    return <p>Updated: {formatDate(updated)}</p>;
  };

  const deleteSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const deleteComment = await axios.delete(
        `http://localhost:8080/api/farms/${farmstandId}/comments/${commentId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
    )
    setModalOpen(false)
    console.log("delete comment: ", deleteComment)
  } catch (error) {
      
      console.error(error);
    }
  }

  return (
    <div className="my-4">
      <h5>
        {author} <br />
        {rating}/5 stars
      </h5>
      <p>
        {commentText}
        <br />
        Posted: {formatDate(date)} <br />
        <div>{updated && date !== updated ? <TextEdited /> : null}</div>
      </p>
      {authorId === userId ? (
        <div className="justify-content-between">
        <EditCommentForm farmstandId={farmstandId} commentId={commentId} prevRating={rating} commentText={commentText} />
        <Button onClick={() => setModalOpen(true)} color="primary">
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

export default Comment;
