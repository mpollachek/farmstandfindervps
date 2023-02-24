import { Row, Col, Container } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import Comment from "./Comment";
import { selectCommentsByFarmstandId } from "./commentsFns";
import CommentForm from "../../forms/CommentForm";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { UserContext } from "../../App";
import { CommentsContext } from "../../App";
import { SingleFarmstandContext } from "../../App";
import { selectFarmstandById } from "../../farmstands/farmstandFilter";

import "../../css/CommentList.css";

const CommentsList = ({ currentFarmstand }) => {
  const { _id: farmstandId } = currentFarmstand

  const { userId, userName } = useContext(UserContext);
  const {farmstand, setFarmstand} = useContext(SingleFarmstandContext);
  //const { comments, setComments } = useContext(CommentsContext)

  const [runGet, setRunGet] = useState(false);

  //   const getFarmstand = async () => {
  //   console.log("run getFarmstand ownercomment");
  //     console.log("run getFarmstand2");
  //     const farm = await selectFarmstandById(farmstandId);
  //     console.log("farm:", farm);
  //     setFarmstand(farm);
  // }

  const emptyArray = []

  // const [comments, setComments] = useState([
  //   {
  //     commentId: "",
  //     rating: "",
  //     text: "",
  //     author: "",
  //     date: "2000-08-04T20:11Z",
  //     updated: "",
  //   },
  // ]);

  // const getComments = async () => {
  //   if (runGet) {
  //     const comments = await selectCommentsByFarmstandId(farmstandId);
  //     console.log("comments:", comments);
  //     setComments(comments);
  //     setRunGet(false);
  //   }
  // };

  

  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     console.log("setrunget true");
  //     setRunGet(true);
  //   }, 0);
  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  //   getComments();
  // }, [runGet]);

  return (
    <Container>
      <Row>
        {farmstand.comments && farmstand.comments.length > 0 ? (
          <Col className="ms-1">
            <h4>Comments</h4>
            {userId ? 
            <div>
            <CommentForm farmstandId={farmstandId} setFarmstand={setFarmstand} /> 
            {farmstand.comments.map((comment) => {
              console.log("comment with rating: ", comment)
              return (
              <div className='my-4' >
              <Comment key={comment._id} comment={comment} />
              </div>
            )})}
            
            </div> : farmstand.comments.map((comment) => {
              return <Comment key={comment._id} comment={comment} />;
            })}
          </Col>
        ) : (
          <Col className="ms-1 ">
            {userId ? 
            <div>
            <CommentForm farmstandId={farmstandId} setFarmstand={setFarmstand} /> 
            {"\n"} </div>
            : null}
            There are no comments for this farmstand yet.
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default CommentsList;
