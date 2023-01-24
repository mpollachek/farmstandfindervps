import { Row, Col, Container } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import Comment from "./Comment";
import { selectCommentsByFarmstandId } from "./commentsFns";
import CommentForm from "../../forms/CommentForm";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { UserContext } from "../../App";

import "../../css/CommentList.css";

const CommentsList = ({ farmstandId }) => {
  const { userId, userName } = useContext(UserContext);

  const [runGet, setRunGet] = useState(false);
  const [comments, setComments] = useState([
    {
      commentId: "",
      rating: "",
      text: "",
      author: "",
      date: "2000-08-04T20:11Z",
      updated: "",
    },
  ]);

  const getComments = async () => {
    if (runGet) {
      const comments = await selectCommentsByFarmstandId(farmstandId);
      console.log("comments:", comments);
      setComments(comments);
      setRunGet(false);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      console.log("setrunget true");
      setRunGet(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getComments();
  }, [runGet]);

  //   const isLoading = useSelector((state) => state.comments.isLoading);
  //   const errMsg = useSelector((state) => state.comments.errMsg);
  //   if (isLoading) {
  //     return (
  //       <Loading />
  //     );
  // }

  // if (errMsg) {
  //     return (
  //             <Error errMsg={errMsg} />
  //     );
  // }
  return (
    <Container>
      <Row>
        {comments && comments.length > 0 ? (
          <Col className="ms-1">
            <h4>Comments</h4>
            {userId ? <CommentForm farmstandId={farmstandId} /> : null}
            {comments.map((comment) => {
              return <Comment key={comment.commentId} comment={comment} />;
            })}
          </Col>
        ) : (
          <Col className="ms-1 ">
            {userId ? <CommentForm farmstandId={farmstandId} /> : null}
            There are no comments for this farmstand yet.
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CommentsList;
