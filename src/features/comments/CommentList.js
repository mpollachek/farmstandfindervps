import { Row, Col } from 'reactstrap';
import { useState, useEffect } from 'react';
import Comment from './Comment';
import { selectCommentsByFarmstandId } from './commentsFns';
import CommentForm from '../../forms/CommentForm';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

const CommentsList = ({ farmstandId }) => { 

  const [runGet, setRunGet] = useState(false);
  const [comments, setComments] = useState([{rating: '', text: '', author: '', date: "2000-08-04T20:11Z"}])

const getComments = async () => {
  if (runGet) {
    const comments = await selectCommentsByFarmstandId(farmstandId);
    console.log('comments:', comments);
    setComments(comments);
    setRunGet(false);
  }}

  useEffect(() => {
    let timer = setTimeout(() => {
    console.log('setrunget true')
    setRunGet(true)
  }, 0);
  return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    getComments()
}, [runGet])

  
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

  if (comments && comments.length > 0) {
      return (
          <Col md='5' className='m-1'>
              <h4>Comments</h4>
              <CommentForm farmstandId={farmstandId}/>
              {comments.map((comment) => {
                  return <Comment key={comment.id} comment={comment} />;
              })}
          </Col>
      );
  }
  return (
      <Col md='5' className='m-1'>
        <CommentForm farmstandId={farmstandId}/>
          There are no comments for this farmstand yet.
      </Col>
  );
};

export default CommentsList;