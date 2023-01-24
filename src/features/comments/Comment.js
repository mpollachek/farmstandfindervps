import { formatDate } from "../../utils/formatDate";

const Comment = ({ comment }) => {
  const { text: commentText, rating, author, date, updated } = comment;

  const TextEdited = () => {
    return <p>Updated: {formatDate(updated)}</p>;
  };

  return (
    <>
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
    </>
  );
};

export default Comment;
