import { formatDate } from "../../utils/formatDate";

const OwnerComment = ({ ownerComment }) => {
  const { text: commentText, author, date, updated } = ownerComment;

  const TextEdited = () => {
    return <p>Updated: {formatDate(updated)}</p>;
  };

  return (
    <>
      <p>
        {author} <br />
      </p>
      <h6>
        {commentText}
      </h6>
      <p>
        Posted: {formatDate(date)} <br />
        <div>{updated && date !== updated ? <TextEdited /> : null}</div>
      </p>
    </>
  );
};

export default OwnerComment;
