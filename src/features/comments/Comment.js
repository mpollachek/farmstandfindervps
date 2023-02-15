import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useContext, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { UserContext } from "../../App";
import axios from "axios";
import EditCommentForm from "../../forms/EditCommentForm";
import ReactStars from "react-rating-stars-component";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { selectCommentsByFarmstandId } from "./commentsFns";
import { CommentsContext } from "../../App";
import { SingleFarmstandContext } from "../../App";
import { selectFarmstandById } from "../../farmstands/farmstandFilter";

const Comment = ({ comment }) => {
  const { _id: commentId, text: commentText, rating, author, createdAt: date, updatedAt: updated, farmstandId } = comment;

  console.log("comment: ", comment)

  const { userId } = useContext(UserContext);
  const {farmstand, setFarmstand} = useContext(SingleFarmstandContext);
  //const { comments, setComments} = useContext(CommentsContext)

  const [modalOpen, setModalOpen] = useState(false);
  //const [editCommentText, setEditCommentText] = useState("")

  const TextEdited = () => {
    return <p>Updated: {formatDate(updated)}</p>;
  };

  const getFarmstand = async () => {
    console.log("run getFarmstand ownercomment");
      console.log("run getFarmstand2");
      const farm = await selectFarmstandById(farmstandId);
      console.log("farm:", farm);
      setFarmstand(farm);
  }

  // const getComments = async () => {
  //     const comments = await selectCommentsByFarmstandId(farmstandId);
  //     console.log("comments:", comments);
  //     setComments(comments);
  //   }

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
    getFarmstand()
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
        {author.username} <br />
        {/* {rating}/5 stars */}
        <ReactStars {...starsRating} className='stars' />
        {console.log("Rating: ", rating)}
      </h5>
      <p>
        {commentText}
        <br />
        Posted: {formatDate(date)} <br />
        <div>{updated && date !== updated ? <TextEdited /> : null}</div>
      </p>
      
      {author._id === userId ? (
        <div className="justify-content-between">
          <Col md={6} style={{display: 'inline-block'}}>
        <EditCommentForm farmstandId={farmstandId} commentId={commentId} prevRating={rating} commentText={commentText} getFarmstand={getFarmstand} />
        </Col>
        <Col md ={6} style={{display: 'inline-block'}}>
        <Button onClick={() => setModalOpen(true)} color="primary" block >
          Delete
        </Button>
        </Col>
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
