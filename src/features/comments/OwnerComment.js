import { Button } from "reactstrap";
import { useContext, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { UserContext } from "../../App";
import EditIcon from "@mui/icons-material/Edit";
import EditOwnerCommentForm from "../../forms/EditOwnerCommentForm";

const OwnerComment = ({ ownerComment, farmstandOwner }) => {

  const { _id: commentId, text: commentText, author, createdAt: date, updatedAt: updated, farmstandId } = ownerComment;

  const { userId } = useContext(UserContext);

  const [editCommentText, setEditCommentText] = useState("")

  const TextEdited = () => {
    return <p>Updated: {formatDate(updated)}</p>;
  };

  //console.log("farmstandOwner: ", farmstandOwner)

  const deleteSubmit = () => {
    
  }

  return (
    <div className="my-4" >
      <h6>
        {commentText}
      </h6>
      <p>
        Posted: {formatDate(date)} <br />
        <div>{updated && date !== updated ? <TextEdited /> : null}</div>
      </p>
      {farmstandOwner.includes(userId) ? (
        <div className="justify-content-between">
          <EditOwnerCommentForm farmstandId={farmstandId} commentId={commentId} commentText={commentText} />
        <Button onClick={deleteSubmit} color="primary" >
          Delete
        </Button>
        </div>
      ) : null}
    </div>
  );
};

export default OwnerComment;
