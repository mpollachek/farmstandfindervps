import { Button, Card, CardBody, CardFooter, CardHeader, CardImg, CardImgOverlay, CardTitle, Col, Modal, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";
import { selectMyComments } from "./commentsFns";
import EditCommentForm from "../../forms/EditCommentForm";
import DeleteComment from "../../components/DeleteComment";


const MyCommentsList = () => {
  const [myComments, setMyComments] = useState([]);
  const [runGetMyComments, setRunGetMyComments] = useState(false);

  const getMyComments = async () => {
    if (runGetMyComments) {
      const allComments = await selectMyComments();
      console.log("allComments: ", allComments);
      setMyComments(allComments);
      setRunGetMyComments(false);
    }
  };

  useEffect(() => {
    setRunGetMyComments(true);
  }, []);

  useEffect(() => {
    getMyComments();
  }, [runGetMyComments]);

  return(
    <Row className="ms-auto">
      {console.log("myComments: ", myComments)}
      {myComments.map((comment) => {
        console.log("comment: ", comment)
        // if farmstand is deleted code breaks due to null comment.farmstandId
        if (comment.farmstandId) {
        const farmId = comment.farmstandId._id
        const farmName = comment.farmstandId.farmstandName
        const commentId = comment._id
        const images = comment.farmstandId.images
        const imageLink = `http://localhost:8080/images/${farmId}/${images[0]}`
        return (
          <Col md="4" className="p-4" key={commentId}>
            <Card>
              <CardHeader>
              <Link to={`../farmstands/${farmId}`}>
                { images ? (
                  <div>
                  <CardImg width="100%" src={imageLink} alt={farmName} />
                  <CardImgOverlay>
                    <CardTitle>
                      {farmName}
                    </CardTitle>
                  </CardImgOverlay>
                  </div>
                ) : <h6>{farmName}</h6>}                
              </Link>
              </CardHeader>
              <CardBody>
            <Comment comment={comment} getMyComments={getMyComments} setRunGetMyComments={setRunGetMyComments} />
            </CardBody>
            <CardFooter className="justify-content-between">
            <EditCommentForm farmstandId={farmId} commentId={commentId} prevRating={comment.rating} commentText={comment.text} getFarmstand={getMyComments} setRunGetMyComments={setRunGetMyComments} />
            <DeleteComment getMyComments={getMyComments} farmstandId={farmId} commentId={commentId} />
            </CardFooter>
            </Card>
          </Col>
        );
    }
    })}
    </Row>
  )
}

export default MyCommentsList;