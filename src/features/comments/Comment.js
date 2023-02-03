import { Button } from "reactstrap";
import { useContext, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { UserContext } from "../../App";
import EditCommentForm from "../../forms/EditCommentForm";

const Comment = ({ comment }) => {
  const { commentId, text: commentText, rating, author, createdAt: date, updatedAt: updated, farmstandId, authorId } = comment;

  console.log("comment: ", comment)

  const { userId } = useContext(UserContext);

  const [editCommentText, setEditCommentText] = useState("")

  const TextEdited = () => {
    return <p>Updated: {formatDate(updated)}</p>;
  };

  const deleteSubmit = () => {
    
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
        <Button onClick={deleteSubmit} color="primary">
          Delete
        </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Comment;
