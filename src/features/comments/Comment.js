import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useContext, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { UserContext } from "../../App";
import axios from "axios";
import EditCommentForm from "../../forms/EditCommentForm";
import ReactStars from "react-rating-stars-component";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const Comment = ({ comment }) => {
  const { commentId, text: commentText, rating, author, date, updated, farmstandId, authorId } = comment;

  console.log("comment: ", comment)

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

  const starsRating = {
    name: "rating",
    count: 5,
    color: "black",
    activeColor: "#f79707",
    value: rating,
    a11y: true,
    isHalf: true,
    emptyIcon: <StarOutlineIcon className="stars" />,
    halfIcon: <StarHalfIcon className="stars" />,
    filledIcon: <StarIcon className="stars" />,
    edit: false,
  };

  return (
    <div className="my-4">
      <h5>
        {author} <br />
        {/* {rating}/5 stars */}
        <ReactStars {...starsRating} className='stars' />
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
